/**
 * @fileoverview
 * Functions for interacting with Marty v2 via a REST interface
 */

class Marty2 {
    constructor () {
        //this.ip = '192.168.1.171';
        this.ip = null;
        this.demo_sensor = 0;
        this.power = 0;
        this.servos = 0;
        this.accel = 0;
        this.savedProjectStates = null;
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

    set_demo_sensor (sensorval) {
        sensorval = parseFloat(sensorval);
        this.demo_sensor = sensorval;
    }

    set_ip (ip) {
        this.ip = ip;
    }
}

module.exports = Marty2;
