/**
 * @fileoverview
 * Functions for interacting with Marty v2 via a REST interface
 */

class Marty2 {
    constructor () {
        this.ip = null;
        this.power = 0;
        this.servos = 0;
        this.accel = 0;
        this.savedProjectStates = null;
    }

    // refactor send_REST to handle a generic payload for RN to deal with (REST API requests, save/load, whatever)
    // trigger from the download call somewhere in scratch-vm
    // loading may have to be handled from injectedJavaScript

    // eslint-disable-next-line camelcase
    send_REST (cmd) {

        // eslint-disable-next-line no-console
        console.log(`Marty REST command: ${cmd}`);

        // to send commands over wifi

        // eslint-disable-next-line no-alert
        /* if (this.ip !== null){
            fetch(`http://${this.ip}/api/${cmd}`)
                 .then(response => {
                     if (response.ok)
                         return response.json();
                     }
                     const resp = response;
                     console.warn('Response not ok', resp.ok);
                 })
                 .catch(err => {
                     console.warn('er #2', err);
                 });
        } else { */


        try {
            window.ReactNativeWebView.postMessage(cmd); // this call triggers onMessage in the app
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(`Error sending to react native: ${err}`);
        }
    }

    // eslint-disable-next-line camelcase
    set_ip (ip) {
        this.ip = ip;
    }
}

module.exports = Marty2;
