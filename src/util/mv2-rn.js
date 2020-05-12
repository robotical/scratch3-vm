/**
 * @fileoverview 
 * Functions for interacting with Marty v2 via a REST interface
 */

class Marty2 {
    constructor () {
        //this.ip = '192.168.0.27';
        this.ip = null;
    }

    send_REST(cmd){
    	console.log("Marty REST command: " + cmd);
    	if (this.ip != null){
    		fetch("http://" + this.ip + "/api/" + cmd)
	            .then(response => {
	                if (response.ok){return response.json()} else {
	                    resp = response;
	                    console.warn("Response not ok", response.ok);
	                }})
	            .catch(err => {
	                console.warn("er #2", err);           
	            });
    	} else {
    		try {
    			window.ReactNativeWebView.postMessage(cmd);
    		} catch(err){
    			console.log("Error sending to react native: " + err);
    		}    		
    	}
    }

    set_ip(ip){
    	this.ip = ip;
    }
}

module.exports = Marty2;