/**
 * @fileoverview
 * Functions for interacting with Marty v2 via a REST interface
 */

const marty2js = require('marty2js');
const { RICEvent } = require('marty2js/dist/RICTypes');

class EventDispatcher {
    constructor () {
        this._listeners = [];
    }

    hasEventListener (type, listener) {
        return this._listeners.some(item => item.type === type && item.listener === listener);
    }

    addEventListener (type, listener) {
        if (!this.hasEventListener(type, listener)) {
            this._listeners.push({type, listener, options: {once: false}});
        }
        return this;
    }

    removeEventListener (type, listener) {
        const index = this._listeners.findIndex(item => item.type === type && item.listener === listener);
        if (index >= 0) this._listeners.splice(index, 1);
        return this;
    }

    removeEventListeners () {
        this._listeners = [];
        return this;
    }

    dispatchEvent (evt) {
        this._listeners
            .filter(item => item.type === evt.type)
            .forEach(item => {
                const {type, listener, options: {once}} = item;
                listener.call(this, evt);
                if (once === true) this.removeEventListener(type, listener)
            });
        return this;
    }
}


class Marty2 extends EventDispatcher {
    constructor () {
        super();
        this.isConnected = false;
        this.ip = null;
        this.ipAddress = '';
        this.demo_sensor = 0;
        this.battRemainCapacityPercent = '100';
        this.rssi = '0';
        this.servos = '{"smartServos":{}}';
        this.accel = '{"accel":{"x":0,"y":0,"z":0}}';
        this.addons = '{"addons":[]}'
        this.commandPromise = null;
        this.onCommandReply = this.onCommandReply.bind(this);
        this.sendCommand = this.sendCommand.bind(this);
        this.saveScratchFile = this.saveScratchFile.bind(this);
        this.loadScratchFile = this.loadScratchFile.bind(this);
        this.listSavedScratchFiles = this.listSavedScratchFiles.bind(this);
        this.deleteScratchFile = this.deleteScratchFile.bind(this);
        this.setRSSI = this.setRSSI.bind(this);
        this.isInApp = false;
        this._martyConnector = new marty2js.Marty();
        this._martyConnector.setEventListener(this);

    }

    isWorkingInApp() {
        this.isInApp = true;
    }

    setRSSI (rssi) {
        if (rssi !== this.rssi) {
            this.rssi = rssi;
            this.dispatchEvent({type: 'onRSSIChange', rssi: this.rssi});
        }
    }

    setBattRemainCapacityPercent (battRemainCapacityPercent) {
        if (battRemainCapacityPercent !== this.battRemainCapacityPercent) {
            this.battRemainCapacityPercent = battRemainCapacityPercent;
            this.dispatchEvent({type: 'onBattRemainCapacityPercentChange', battRemainCapacityPercent: this.battRemainCapacityPercent});
        }
    }

    setIsConnected (isConnected) {
        if (isConnected !== this.isConnected) {
            this.isConnected = isConnected;
            this.dispatchEvent({type: 'onIsConnectedChange', isConnected: this.isConnected});
            console.log("Marty is connected.");
        }
    }

    // eslint-disable-next-line camelcase
    send_REST (cmd) {
        // eslint-disable-next-line no-console,no-alert
        console.log(`Marty REST command: ${cmd}`);
        // eslint-disable-next-line no-alert
        //        if (this.ip !== null){
        //            fetch(`http://${this.ip}/api/${cmd}`)
        //                 .then(response => {
        //                     if (response.ok)
        //                         return response.json();
        //                     }
        //                     const resp = response;
        //                     console.warn('Response not ok', resp.ok);
        //                 })
        //                 .catch(err => {
        //                     console.warn('er #2', err);
        //                 });
        //        } else {
        try {
            if (mv2.isInApp) {
                window.ReactNativeWebView.postMessage(cmd); // this call triggers onMessage in the app
            } else {
                this._martyConnector.runCommand(cmd);
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(`Error sending to react native: ${err}`);
        }
    }

    /**
     * Save a scratch file
     * @param {string} fileName Filename to save to
     * @param {string} contents Base64 encoded project data
     * @returns {Promise} Promise
     */
    saveScratchFile (fileName, contents) {
        if (window.ReactNativeWebView) {
            return this.sendCommand({
                command: 'saveFile',
                fileName,
                contents
            });
        }
        // not running in react native, fallback to web storage
        window.localStorage.setItem(`scratch_${fileName}`, contents);
        return Promise.resolve();
    }

    /**
     * Delete a saved scratch file
     * @param {string} fileName File to delete
     * @returns {Promise} Promise
     */
    deleteScratchFile (fileName) {
        if (window.ReactNativeWebView) {
            return this.sendCommand({
                command: 'deleteFile',
                fileName
            });
        }
        // not running in react native, fallback to web storage
        window.localStorage.removeItem(`scratch_${fileName}`);
        return Promise.resolve();
    }

    /**
     * Load a scratch file
     * @param {string} fileName File to load
     * @returns {Promise} Promise
     */
    loadScratchFile (fileName) {
        if (window.ReactNativeWebView) {
            return this.sendCommand({
                command: 'loadFile',
                fileName
            });
        }
        // not running in react native, fallback to web storage
        const contents = window.localStorage.getItem(`scratch_${fileName}`);
        return Promise.resolve({contents});
    }

    /**
     * List the saved scratch files
     * @returns {Promise} Promise
     */
    listSavedScratchFiles () {
        if (window.ReactNativeWebView) {
            return this.sendCommand({
                command: 'listFiles'
            });
        }
        // not running in react native, fallback to web storage
        const fileNames = Object.keys(window.localStorage)
            .filter(key => key.startsWith('scratch_'))
            .map(key => key.replace(/^scratch_/, ''));
        return Promise.resolve({fileNames});
    }

    /**
     * Sends a command to the react-native code and returns a promise that will be 
     * fulfilled when the react-native code replies
     * @param {{command: string}} payload Payload to send to the react-native code
     * @returns {Promise} Promise
     */
    sendCommand(payload) {
        if (mv2.isInApp) {
            if (this.commandPromise) {
                // eslint-disable-next-line no-console
                console.warn('Command already in flight');
            }
            const promise = new Promise((resolve, reject) => {
                this.commandPromise = { resolve, reject };
            });
            window.ReactNativeWebView.postMessage(JSON.stringify(payload));
            return promise;

        } else {
            return this._martyConnector.runCommand(JSON.stringify(payload));
        }
    }

    /**
     * Called by the react-native code to respond to sendCommand
     * @param {{success: boolean, error: string}} args Response from the react native side
     */
    onCommandReply(args) {
        if (this.commandPromise) {
            if (args.success) {
                this.commandPromise.resolve(args);
            } else {
                this.commandPromise.reject(new Error(args.error));
            }
            this.commandPromise = null;
        } else {
            // eslint-disable-next-line no-console
            console.warn('Unhandled command reply');
        }
    }

    set_demo_sensor (sensorval) {
        sensorval = parseFloat(sensorval);
        this.demo_sensor = sensorval;
    }

    set_ip (ip) {
        this.ip = ip;
    }

    async connect(ipAddress) {
        console.log(`mv2 connect to ${ipAddress}`);
        try {
            this.ipAddress = ipAddress;
            return await this._martyConnector.connect(new marty2js.DiscoveredRIC(
                ipAddress,
                "Marty"
            ));
        } catch (error) {
            console.warn(`Failed to connect to Marty`);
            this.dispatchEvent({ type: 'connectionFailed', isConnected: false });
        }
        return false;
    }

    async disconnect() {
        await this._martyConnector.disconnect();
    }

    onConnEvent(eventCode, args) {
        console.log(`conn event ${eventCode}`);
        if (eventCode === RICEvent.CONNECTED_RIC) {
            this.setIsConnected(true);
            this.setRSSI(-50);
            (async () => {
                await this._martyConnector.getHWElemList();
            })();

        } else if (eventCode === RICEvent.DISCONNECTED_RIC) {
            this.setIsConnected(false);
        }
    }

    getHWElemList(){
        try {
            return this.addons;
        } catch (error) {
            console.log('eventConnect - failed to get HWElems ' + error);
            return null;
        }
        
    }

    convertHWElemType(whoAmITypeCode){
        return this._martyConnector.convertHWElemType(whoAmITypeCode);
    }


    onRxSmartServo(smartServos) {
        // console.log(`servo`, smartServos);
        this.servos = JSON.stringify(smartServos);
    }

    onRxIMU(imuData) {
        // console.log(`imu`);
        this.accel = JSON.stringify(imuData);
    }

    onRxPowerStatus(powerStatus) {
        this.setBattRemainCapacityPercent(powerStatus.powerStatus.battRemainCapacityPercent);
        // console.log(`power now ${this.battRemainCapacityPercent}`, powerStatus);
    }

    onRxAddOnPub(addOnInfo) {
        this.addons = JSON.stringify(addOnInfo);
        // console.log('mv2-rn this.addons');
        // console.log(this.addons);
    }
}

module.exports = Marty2;
