const Cast = require('../../util/cast');
const log = require('../../util/log');
//const nets = require('nets');
const languageNames = require('scratch-translate-extension-languages');
const MartyBlocks = require('./martyBlocks');
const Marty = require('./marty');


// ----------------------------
// local IP discovery tool from net.ipcalf.com

var localIp = null;

// NOTE: window.RTCPeerConnection is "not a constructor" in FF22/23
/*window.RTCPeerConnection ||*/ 
var RTCPeerConnection = window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

if (RTCPeerConnection) (function () {

    var rtc = new RTCPeerConnection({iceServers:[]});

    try {
        if (1 || window.mozRTCPeerConnection) {
            rtc.createDataChannel('', {reliable:false});
        };
    } catch(err) {
        console.log(err.message);
    }
    
    rtc.onicecandidate = function (evt) {
        if (evt.candidate) grepSDP("a="+evt.candidate.candidate);
    };

    rtc.createOffer(function (offerDesc) {
        grepSDP(offerDesc.sdp);
        rtc.setLocalDescription(offerDesc);
    }, function (e) { console.warn("offer failed", e); });
    
    function grepSDP(sdp) {
        var hosts = [];
        sdp.split('\r\n').forEach(function (line) {
            if (~line.indexOf("a=candidate")) {
                var parts = line.split(' '),
                    addr = parts[4],
                    type = parts[7];
                if (type === 'host' && addr != "0.0.0.0" && addr.length < 16){
                    localIp = addr;
                }
            } else if (~line.indexOf("c=")) {
                var parts = line.split(' '),
                    addr = parts[2];
                if (addr != "0.0.0.0" && addr.length < 16){ localIp = addr;}
            }
        });
    }
})();

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}


// end of local IP discovery
// ----------------------------




class MartyPeripheral {

    constructor (runtime, extensionId) {

        /**
         * The Scratch 3.0 runtime used to trigger the green flag button.
         * @type {Runtime}
         * @private
         */
        this._runtime = runtime;

        
        /**
         * The Bluetooth socket connection for reading/writing peripheral data.
         * @type {object}
         * @private
         */
        this.marty = null;
        this._runtime.registerPeripheralExtension(extensionId, this);

        this._availablePeripherals = [];
        this._CHresp = null;

        this._scanTimeout = 5000;
        this._onScanTimeout = null;

        this._connectingInterval = null;

        /**
         * Local IP/Subnet state variables
         * @type {str}
         * @private
         */
        if (localIp != null){
            this._localIpFound = true;
            this._localIp = localIp.split('.').slice(0, -1).join('.');
        } else {
            this._localIpFound = false;
            this._localIp = '192.168.0';
        }
        console.log('Local IP for Marty Peripheral is ' + this._localIp);
        this.RTCPeerConnection = window.webkitRTCPeerConnection ||
                                 window.mozRTCPeerConnection;


        console.log('in marty constructor');
        // check for arguments with martyIP
        // TODO use for something more clever than this (use whole IP rather than subnet)
        var params = getQueryParams(location.search);
        if (params['marty_ip'] != null){
        	this._localIp = params['marty_ip'].split('.').slice(0, -1).join('.');
        	this.marty_ip = params['marty_ip'];
        	console.log('received marty ip: ' + this.marty_ip);
        }

        /**
         * Bind members to this
         */
        
        this._pushPeripheralList = this._pushPeripheralList.bind(this);
        this._sendDiscoverTimeout = this._sendDiscoverTimeout.bind(this);
        this._sendError = this._sendError.bind(this);
        this._scanForMartys = this._scanForMartys.bind(this);
    }


    /**
     * Called by the runtime when user wants to scan for a peripheral.
     */
    scan () {
        console.log("Scanning for Martys...");

        // Clear array and start a new scan:
        this._availablePeripherals = [];

        //this._availablePeripherals.push({
        //    name: 'Add Marty By IP Address',
        //    rssi: -10, // TODO: Better RSSI representation? (dB)
        //    peripheralId: 'add_by_ip'
        //});

        // if there is an
        if (~this._onScanTimeout){
        	// first try to retrieve json list of Martys from command hub scanner, if that fails fall back to ip scanning
    	    fetch("/cgi-bin/list-martys")
    	    //fetch("/static/list-martys.json") // dummy file for debugging
		        .then(response => {
		            if (response.ok){return response.json()} else {
		            	resp = response;
		            	console.warn("er #1 Could not load list of Martys from command hub. Switching to old school IP Scan", response.ok);
		            	// the catch below will initiate the IP scan
		            	//this._scanTimeout = 20000;
		            	//this._scanRange(this._localIp);
		            }})
		        .then(jsonResponse => this._parseCHMartyList(jsonResponse.martys))
		        .catch(err => {
		        	this._scanTimeout = 20000;
		            console.warn("er #2 Could not load list of Martys from command hub. Switching to old school IP Scan", err);           
		            this._scanRange(this._localIp);
			    });
		            
            this._onScanTimeout = window.setTimeout(this._sendDiscoverTimeout, this._scanTimeout);
        }
    }

    // paese a JSON list of Martys received from the command hub
	_parseCHMartyList(martys){
	    this._CHresp = martys;
	    for (m in martys){
	        console.log(martys[m].ip);
	        this._sendRequest(martys[m].ip);
	    }
	    setTimeout(this._checkCHResults, this._scanTimeout, this);
	}

	// last check of received Martys. If a Matry hasn't replied in time just list it by IP
	_checkCHResults(context){
	    if (context._availablePeripherals.length != context._CHresp.length){
	        // we didn't resolve all the Marty names. Add the others just by IP
	        for (m in context._CHresp){
	            var found = false;
	            for (ml in context._availablePeripherals){
	                if (context._availablePeripherals[ml].peripheralId == context._CHresp[m].ip){found = true;}
	            }
	            if (!found){
            	    context._availablePeripherals.push({
                        name: context._CHresp[m].ip,
                        rssi: -100+context._CHresp[m].SNR, // TODO: Better RSSI representation? (dB)
                        peripheralId: context._CHresp[m].ip
                    });
                    context._pushPeripheralList();
	            }
	        }

	    }
	}


    _sendRequest (requestIp) {
        fetch("http://" + requestIp + "/service-discovery")
            .then(res => res.text())
            .then(
                (text) => {
                    console.log("Response from " + requestIp + ".....");
                    var magic_signature = text.substring(0, 2); // [0, 1]
                    var marty_name = text.substring(2);     // [2, ...]

                    if (magic_signature == "AA") {
                        console.log("Found a Marty called " + marty_name + "!");
                        var rssi = -10;
                        if (this._CHresp != null){
                        	console.log("looking for real SNR");
                        	for (m in this._CHresp){
                        		if (this._CHresp[m].ip == requestIp){
                        			console.log("SNR: " + this._CHresp[m].SNR);
                        			rssi = -100+this._CHresp[m].SNR;
                        			
                        		}
                        	}
                        }
                        this._availablePeripherals.push({
                            name: marty_name,
                            rssi: rssi, // TODO: Better RSSI representation? (dB)
                            peripheralId: requestIp
                        });
                        this._pushPeripheralList();
                        if (this._onScanTimeout){
                            window.clearTimeout(this._onScanTimeout);
                        }
                    } else {
                        // TODO: else?
                    }
                },
                (error) => {
                    console.debug(error);
                },
                e => {
                    console.debug(e);
                }
            )
            .catch(
                e => {
                    console.debug(e);
                }
            );
    }

    _scanRange (ip) {
    	console.log("gonna scan " + ip);
        for (var i = 1; i < 255; i++) {
            this._sendRequest(ip + "." + i);
        }
        if (!this._localIpFound && ip == "192.168.0"){
            this._scanRange('192.168.1');
        }             
    }

    _scanForMartys (ip) {
        if (ip === undefined){ 
            if (this._localIp != null){
                var ip_parts = this._localIp.split(".");
                ip_parts.pop();
                ip = ip_parts.join(".");
                console.log("gonna scan: " + ip);
            } else {
                ip = "192.168.0";
            }
        }
        console.log("scanning: " + ip);
        scanRange(ip, martylist, 15000); // TODO martylist doesn't exist
        //checkTimeout = setTimeout(checkResults, 1000, ip);
        //setTimeout(checkMartys, 16000, ip);
    }


    /**
     * Called to tell the runtime that we connected successfully
     * TODO check if connection was actually successful and do something if not
     */
    _setConnected(context){
    	//if (!this.marty){console.log("NO MARTY DEFINED"); return;}
    	console.log("marty alive: " + context.marty.alive);
    	if (context.marty.alive){
    		console.log("successfully connected to Marty!");
    		context._runtime.emit(context._runtime.constructor.PERIPHERAL_CONNECTED);
    		clearInterval(context._connectingInterval);
    	}
    }

    /**
     * Called by the runtime when user wants to connect to a specified peripheral.
     */
    add () {
        var id = prompt('Please enter Marty\'s IP Address');
        this.connect(id);
    }

    /**
     * Called by the runtime when user wants to connect to a detected peripheral.
     * @param {number} id - the id of the peripheral to connect to.
     */
    connect (id) {

        console.log("Connecting to Marty "+ id);
        //this._runtime.emit(this._runtime.constructor.PERIPHERAL_CONNECTED);
        var that = this;
        this._connectingInterval = setInterval(this._setConnected, 500, that);
        
        this.marty = new Marty(id, 'Marty the Robot'); // TODO get real name
    }


    /**
     * Called by the runtime when user wants to connect to a specific peripheral.
     * TODO this won't fail properly, and always shows 'connected'
     */
    manual_connect () {
    	var id = prompt('Please enter Marty\'s IP Address');
        
        console.log("Connecting to Marty "+ id);
        //this._runtime.emit(this._runtime.constructor.PERIPHERAL_CONNECTED);
        this._connectingInterval = setInterval(this._setConnected, 500, this._runtime);
        
        this.marty = new Marty(id, 'Marty the Robot'); // TODO get real name
    }


    /**
     * Disconnect from Marty.
     */
    disconnect () {
        console.warn("Marty scratch blocks Disconnect hit");
        if (this._connectingInterval){clearInterval(this._connectingInterval);}
        this.marty = null;
    }


    /**
     * Return true if connected to the micro:bit.
     * @return {boolean} - whether the micro:bit is connected.
     */
    isConnected () {
        let connected = false;
        if (this.marty) {
            connected = this.marty.alive;
            //connected = thismarty.isConnected(); // TODO isConnected deosn't exist in Marty
        }
        return connected;
    }

    _addPeripheralToList (periph) {
        this._availablePeripherals[periph.id] = periph;
        this._pushPeripheralList()
    }

    _pushPeripheralList () {
        this._runtime.emit(
            this._runtime.constructor.PERIPHERAL_LIST_UPDATE,
            this._availablePeripherals
        ); 
    }
    
    _sendDiscoverTimeout () {
        this._runtime.emit(this._runtime.constructor.PERIPHERAL_SCAN_TIMEOUT);
    }

    /**
     * Shows connection debug info, but not very useful for us as
     * it is BlueTooth specific
     */
    _sendError () {
        this.disconnect();
        this._runtime.emit(this._runtime.constructor.PERIPHERAL_ERROR);
    }

};

MartyBlocks.peripheralFactory = (runtime, EXTENSION_ID) => {
  return new MartyPeripheral(runtime, EXTENSION_ID);
};

module.exports = MartyBlocks;
