/**
 * @fileoverview
 * Functions for interacting with Marty v2 via a REST interface
 */

class MartyStatus {

    /**
     * The idea:
     * - fetch json at hwstatus/name for list of hardware elements
     * - for name in names:
     * -    fetch hwstatus/mindata/name
     * -    store at this.name
     * - and then we can access at mv2.status.name.property
     * The problem:
     * - initially had some object properties printable in console
     * - but JSON responses not parsed correctly
     * - TODO: find out why and fix, link to blocks
     * - how often to refresh?
     * - TODO: once this is all working over ip, handle with BLE and the app
     */

    constructor (ipAddress) {

        // gather some simple proof-of-concept servo info

        this.leftHip = fetch(`http://${ipAddress}/api/hwstatus/mindata/LeftHip`).then(response => {
            if (response.ok) {
                return response.json();
            }
        });
    }
}

class Marty2 {
    constructor () {
        this.ip = '192.168.1.171';
        // this.ip = null;
        this.status = new MartyStatus(this.ip);
        this.demo_sensor = 0;
    }

    // eslint-disable-next-line camelcase
    send_REST (cmd) {
        // eslint-disable-next-line no-console
        console.log(`Marty REST command: ${cmd}`);
        if (this.ip !== null){
            fetch(`http://${this.ip}/api/${cmd}`)
                .then(response => {
                    if (response.ok){
                        return response.json();
                    }
                    let resp = response;
                    console.warn('Response not ok', resp.ok);
                })
                .catch(err => {
                    console.warn('er #2', err);
                });
        } else {
            try {
                window.ReactNativeWebView.postMessage(cmd);
            } catch (err) {
                // eslint-disable-next-line no-console
                console.log(`Error sending to react native: ${err}`);
            }
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
