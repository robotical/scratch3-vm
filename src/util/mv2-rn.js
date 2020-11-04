/**
 * @fileoverview
 * Functions for interacting with Marty v2 via a REST interface
 */
class EventDispatcher {
    constructor() {
        this._listeners = [];
    }

    hasEventListener(type, listener) {
        return this._listeners.some(item => item.type === type && item.listener === listener);
    }

    addEventListener(type, listener) {
        if (!this.hasEventListener(type, listener)) {
            this._listeners.push({type, listener, options: {once: false}});
        }
        return this
    }

    removeEventListener(type, listener) {
        let index = this._listeners.findIndex(item => item.type === type && item.listener === listener);
        if (index >= 0) this._listeners.splice(index, 1);
        return this;
    }

    removeEventListeners() {
        this._listeners = [];
        return this;
    }

    dispatchEvent(evt) {
        this._listeners
            .filter(item => item.type === evt.type)
            .forEach(item => {
                const {type, listener, options: {once}} = item;
                listener.call(this, evt);
                if (once === true) this.removeEventListener(type, listener)
            });
        return this
    }
}


class Marty2 extends EventDispatcher {
    constructor () {
        super();
        //this.ip = '192.168.1.171';
        this.ip = null;
        this.demo_sensor = 0;
        this.battRemainCapacityPercent = 0;
        this.rssi = 0;
        this.servos = 0;
        this.accel = 0;
        this.commandPromise = null;
        this.onCommandReply = this.onCommandReply.bind(this);
        this.sendCommand = this.sendCommand.bind(this);
        this.saveScratchFile = this.saveScratchFile.bind(this);
        this.loadScratchFile = this.loadScratchFile.bind(this);
        this.listSavedScratchFiles = this.listSavedScratchFiles.bind(this);
        this.deleteScratchFile = this.deleteScratchFile.bind(this);
        this.setRSSI = this.setRSSI.bind(this);
    }

    setRSSI(rssi) {
        console.log('setRSSI', rssi);
        if (rssi !== this.rssi) {
            this.rssi = rssi;
            this.dispatchEvent({type: "onRSSIChange", rssi: this.rssi});
        }
    }

    setBattRemainCapacityPercent(battRemainCapacityPercent) {
        if (battRemainCapacityPercent !== this.battRemainCapacityPercent) {
            this.battRemainCapacityPercent = battRemainCapacityPercent;
            this.dispatchEvent({type: "onBattRemainCapacityPercentChange", battRemainCapacityPercent: this.battRemainCapacityPercent});
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
            window.ReactNativeWebView.postMessage(cmd); // this call triggers onMessage in the app
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(`Error sending to react native: ${err}`);
        }
    }

    /**
     * Save a scratch file
     * @param string fileName Filename
     * @param string contents Base64 data URL
     */
    saveScratchFile(fileName, contents) {
        return this.sendCommand({
            command: 'saveFile',
            fileName,
            contents
        });
    }

    /**
     * Delete a saved scratch file
     * @param string fileName File to delete
     */
    deleteScratchFile(fileName) {
        return this.sendCommand({
            command: 'deleteFile',
            fileName,
        });
    }

    /**
     * Load a scratch file
     * @param string fileName File to load
     */
    loadScratchFile(fileName) {
        return this.sendCommand({
            command: 'loadFile',
            fileName,
        });
    }

    /**
     * List the saved scratch files
     */
    listSavedScratchFiles() {
        return this.sendCommand({
            command: 'listFiles'
        });
    }

    /**
     * Sends a command to the react-native code and returns a promise that will be fulfilled when the react-native code replies
     * @param {command: string} payload Payload to send to the react-native code
     */
    sendCommand(payload) {
        if (this.commandPromise) {
            console.warn("Command already in flight");
        }
        const promise = new Promise((resolve, reject) => {
            this.commandPromise = { resolve, reject };
        });
        window.ReactNativeWebView.postMessage(JSON.stringify(payload));
        return promise;
    }

    /**
     * Called by the react-native code to respond to sendCommand
     * @param {success: boolean, error?: string} args Response from the react native side
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
            console.warn("Unhandled command reply");
        }
    }

    set_demo_sensor (sensorval) {
        sensorval = parseFloat(sensorval);
        this.demo_sensor = sensorval;
    }

    set_ip (ip) {
        this.ip = ip;
    }
}

module.exports = Marty2;
