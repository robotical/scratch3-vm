const Cast = require('../util/cast');
const MathUtil = require('../util/math-util');
const Timer = require('../util/timer');
const Marty2 = require('../util/mv2-rn');

// device type IDs for Robotical Standard Add-ons
const MV2_DTID_DISTANCE = 0x83;
const MV2_DTID_LIGHT    = 0x84;
const MV2_DTID_COLOUR   = 0x85;
const MV2_DTID_IRFOOT   = 0x86;
const MV2_DTID_NOISE    = 0x8A;
const MV2_DTID_LEDFOOT  = 0x87;
const MV2_DTID_LEDARM   = 0x88;
const MV2_DTID_LEDEYE   = 0x89;

/**
 * Questions:
 * - what is the util parameter for? // irrelevant
 * - what are the minimum moveTimes for various actions?
 * - in the requirements (18/05) - "Lower Legs" and new dances are mentioned - do these require new API commands?
 * - clarify reps - can be added to any function (and therefore block)? // this is fine
 * - clarify the categorisations!!!
 * Missing/non-functional Blocks:
 * - get ready (is this still necessary?)
 * - stop - what are various stop options (and what are the appropriate API calls?)
 * - lift/lower legs - API calls?
 * - Battery voltage
 * - GPIO in (do we need this?)
 * - blocking mode (???)
 */

class Scratch3Mv2Blocks {

    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        // this.ip ="192.168.0.27";
        mv2 = new Marty2();
    }

    /**
     * Retrieve the block primitives implemented by this package.
     * @return {object.<string, Function>} Mapping of opcode to Function.
     */
    getPrimitives () {
        return {
            // motion commands

            mv2_getReady: this.getReady,
            mv2_discoChangeBlockColour: this.discoChangeBlockColour,
            mv2_discoChangeBlockPattern: this.discoChangeBlockPattern,
            mv2_discoChangeRegionColour: this.discoChangeRegionColour,
            mv2_walk_fw: this.walk_fw,
            mv2_walk_bw: this.walk_bw,
            mv2_walk: this.walk,
            mv2_turn: this.turn,
            mv2_wiggle: this.wiggle,
            mv2_circle: this.circle,
            mv2_kick: this.kick,
            mv2_lean: this.lean,
            mv2_slide: this.slide,
            mv2_eyes: this.eyes,
            mv2_moveLeg: this.moveLeg,
            mv2_liftFoot: this.liftFoot,
            mv2_lowerFoot: this.lowerFoot,
            mv2_moveJoint: this.moveJoint,
            mv2_wave: this.wave,
            mv2_dance: this.dance,
            mv2_standStraight: this.standStraight,
            mv2_hold: this.hold,

            // sensors

            ServoPosition: this.position,
            ServoCurrent: this.current,
            XAxisMovement: this.accelerometerX,
            YAxisMovement: this.accelerometerY,
            ZAxisMovement: this.accelerometerZ,
            ObstacleProximity: this.proximity,
            BatteryPercentage: this.batteryLevel,
            mv2_obstaclesense: this.obstacleSense,
            mv2_groundsense: this.groundSense,
            mv2_coloursense: this.colourSense,
            mv2_coloursenseraw: this.colourSenseRaw,
            mv2_distancesense: this.distanceSense,
            mv2_lightsense: this.lightSense,
            mv2_noisesense: this.noiseSense,

            // sound commands

            mv2_playSound: this.playSound,

            // misc/debugging commands (including proposed/deprecated blocks)

            mv2_demo_sensor: this.demo_sensor,
            mv2_set_demo_sensor: this.set_demo_sensor,
            mv2_set_ip: this.set_ip

            /* mv2_kickLeft: this.kickLeft,

            mv2_sidefall: this.sidefall,
            mv2_stepLeft: this.stepLeft,
            mv2_stepRight: this.stepRight,
            mv2_sidestepLeft: this.sidestepLeft,
            mv2_sidestepRight: this.sidestepRight,
            mv2_circleLeft: this.circleLeft,
            mv2_stop: this.stop,
            mv2_circleRight: this.circleRight,
            mv2_waveLeft: this.waveLeft,
            mv2_waveRight: this.waveRight,
            mv2_kickRight: this.kickRight, */

        };
    }

    // DISCO Utils

    getColourHexString(colourChoiceStr){
        let colour;
        let colourChoice = parseInt(colourChoiceStr);

        switch (colourChoice) {
        case 0:
            //RED
            colour = 'ff0000';
            break;
        case 1:
            //GREEN
            colour = '00ff00';
            break;
        case 2:
            //BLUE
            colour = '0000ff';
            break;
        case 3:
            //PINK
            colour = 'ff00d9';
            break;
        case 4:
            //YELLOW
            colour = 'fcec00';
            break;
        case 5:
            //WHITE
            colour = 'ffffff';
            break;
        case 6:
            //OFF
            colour = 'off';
            break;
            
        default:
            //set default to mode 01 (OFF)
            colour = 'off'
            break;
        }

        return colour;
    }

    getDiscoBoardType(boardChoiceStr){
        let boardDeviceType;
        let boardChoice = parseInt(boardChoiceStr);

        switch (boardChoice) {
            case 0:
                //RED
                boardDeviceType = MV2_DTID_LEDEYE;
                break;
            case 1:
                //GREEN
                boardDeviceType = MV2_DTID_LEDARM;
                break;
            case 2:
                //BLUE
                boardDeviceType = MV2_DTID_LEDFOOT;
                break;     
            case 3:
                boardDeviceType = 'all';
                console.log("case 3: " + boardDeviceType);
                break;
            default:
                //set default to mode 10
                boardDeviceType = 0x00
                break;
        }

        console.log("returning: " + boardDeviceType);

        return boardDeviceType;
    }


    // MOTION

    getReady (args, util) {
        const moveTime = 3000;
        console.log('Ready, set, go!');
        mv2.send_REST(`traj/getReady/?moveTime=${moveTime}`);
        return new Promise(resolve => setTimeout(resolve, moveTime));
    }

    getAllDiscoBoards(addons){
        var addressList = [];

        for (var i=0; i < addons.length; i++){

            if (   addons[i].deviceTypeID == MV2_DTID_LEDEYE
                || addons[i].deviceTypeID == MV2_DTID_LEDARM
                || addons[i].deviceTypeID == MV2_DTID_LEDFOOT){
                
                addressList.push(addons[i].name);
            }
        }
        return addressList;
    }

    getFilteredDiscoBoards(addons, filterBoardType){
        var addressList = [];

        for (var i=0; i < addons.length; i++){
            if (addons[i].deviceTypeID == filterBoardType){
                addressList.push(addons[i].name);
            }
        }

        return addressList;
    }


    discoChangeBlockPattern (args, util) {
        const addons = JSON.parse(mv2.addons).addons;
        //so if it's set in a forever loop give 0.2s break between each update 
        const resolveTime = 200;
        const boardChoice = args.BOARDTYPE;
        let filterBoardType = this.getDiscoBoardType(boardChoice);
        const patternChoice = args.PATTERN;
        let patternProgram = '10';

        if(patternChoice == '0'){
            presetProgram = '10';

        } else if(patternChoice == '1'){
            patternProgram = '11';

        } else if(patternChoice == '2'){
            patternProgram = '01';

        }  else {
            //default to off
            patternProgram = '01';
        }

        // select all LED addons found
        let addressList = [];

        if( filterBoardType == 'all') {
            addressList = this.getAllDiscoBoards(addons);
        } else {
            addressList = this.getFilteredDiscoBoards(addons, filterBoardType)
        }

        let numberOfLEDAddons = addressList.length;
        mv2.send_REST("Number of addons is: " + numberOfLEDAddons);

        for(var i=0; i < numberOfLEDAddons; i++){
            let ledDeviceName = addressList.pop();
            // console.log(`elem/${ledDeviceName}/json?cmd=raw&hexWr=${patternProgram}`);
            mv2.send_REST(`elem/${ledDeviceName}/json?cmd=raw&hexWr=${patternProgram}`);
            // console.log(addressList.length);
        }
        return new Promise(resolve =>
            setTimeout(resolve, resolveTime));
    }


    discoChangeBlockColour (args, util) {
        const addons = JSON.parse(mv2.addons).addons;
        const resolveTime = 200;
        const colourChoice = args.COLOUR;
        const boardChoice = args.BOARDTYPE;
        mv2.send_REST("Number of addons is: " + addons.length);
        
        let colour = this.getColourHexString(colourChoice);
        let filterBoardType = this.getDiscoBoardType(boardChoice);




        // select all LED addons found that match the board type
        let addressList = [];

        if( filterBoardType == 'all') {
            addressList = this.getAllDiscoBoards(addons);
        } else {
            addressList = this.getFilteredDiscoBoards(addons, filterBoardType)
        }
     
        let numberOfLEDAddons = addressList.length;
        mv2.send_REST("Number of addons is: " + numberOfLEDAddons);
        for(var i=0; i < numberOfLEDAddons; i++){
            let ledDeviceName = addressList.pop();
            mv2.send_REST(`elem/${ledDeviceName}/json?cmd=raw&hexWr=02${colour}`);
        }
        return new Promise(resolve =>
            setTimeout(resolve, resolveTime));
    }

    discoChangeRegionColour (args, util) {
        const addons = JSON.parse(mv2.addons).addons;
        const resolveTime = 200;
        const colourChoice = args.COLOUR;
        const boardChoice = args.BOARDTYPE;
        const regionChoice = args.REGION;
        let colour = this.getColourHexString(colourChoice);
        let filterBoardType = this.getDiscoBoardType(boardChoice);

        // select all LED addons found that match the board type
        let addressList = [];

        if( filterBoardType == 'all') {
            addressList = this.getAllDiscoBoards(addons);
        } else {
            addressList = this.getFilteredDiscoBoards(addons, filterBoardType)
        }
     
        let numberOfLEDAddons = addressList.length;
        mv2.send_REST("Number of addons is: " + numberOfLEDAddons);

        for(var i=0; i < numberOfLEDAddons; i++){
            let ledDeviceName = addressList.pop();
            mv2.send_REST(`elem/${ledDeviceName}/json?cmd=raw&hexWr=040${regionChoice}${colour}`);
        }
        return new Promise(resolve =>
            setTimeout(resolve, resolveTime));
    }

    walk_fw (args, util) {
        const moveTime = 1500;
        let steps = parseInt(args.STEPS);
        steps = Math.min(Math.max(steps, 1), 20);
        const stepLength = 25;
        console.log(`traj/step/${steps}/?moveTime=${moveTime}&stepLength=${stepLength}`);
        mv2.send_REST(`traj/step/${steps}/?moveTime=${moveTime}&stepLength=${stepLength}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime * steps));
    }

    walk_bw (args, util) {
        const moveTime = 1500;
        let steps = parseInt(args.STEPS);
        steps = Math.min(Math.max(steps, 1), 20);
        const stepLength = -25;
        console.log(`traj/step/${steps}/?moveTime=${moveTime}&stepLength=${stepLength}`);
        mv2.send_REST(`traj/step/${steps}/?moveTime=${moveTime}&stepLength=${stepLength}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime * steps));
    }

    walk (args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        moveTime = Math.min(Math.max(moveTime, 1), 10000);
        let stepLength = parseInt(args.STEPLEN);
        stepLength = Math.min(Math.max(stepLength, -50), 50);
        let steps = parseInt(args.STEPS);
        steps = Math.min(Math.max(steps, 1), 20);
        let turn = parseInt(args.TURN);
        turn = Math.min(Math.max(turn, -25), 25);
        console.log(`traj/step/${steps}/?stepLength=${stepLength}&moveTime=${moveTime}&turn=${turn}`);
        mv2.send_REST(`traj/step/${steps}/?stepLength=${stepLength}&moveTime=${moveTime}&turn=${turn}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime * steps));
    }

    turn (args, util) {
        const moveTime = 1500;
        let steps = parseInt(args.STEPS);
        steps = Math.min(Math.max(steps, 1), 20);
        let turn = 20;
        const side = args.SIDE;
        if (side === '1'){
            turn *= -1;
        }
        console.log(`traj/step/${steps}/?moveTime=${moveTime}&turn=${turn}&stepLength=1`);
        mv2.send_REST(`traj/step/${steps}/?moveTime=${moveTime}&turn=${turn}&stepLength=1`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime * steps));
    }

    wiggle (args, util) {
        const moveTime = 5000;
        console.log(`traj/wiggle/1/?moveTime=${moveTime}`);
        mv2.send_REST(`traj/wiggle/1/?moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    circle (args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        moveTime = Math.min(Math.max(moveTime, 1), 10000);
        const side = args.SIDE;
        console.log(`traj/circle/1/?moveTime=${moveTime}&side=${side}`);
        mv2.send_REST(`traj/circle/1/?moveTime=${moveTime}&side=${side}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    kick (args, util) {
        const moveTime = 3000;
        const side = args.SIDE;
        console.log(`traj/kick/1/?moveTime=${moveTime}&side=${side}`);
        mv2.send_REST(`traj/kick/1/?moveTime=${moveTime}&side=${side}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    lean (args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        moveTime = Math.min(Math.max(moveTime, 1), 10000);
        const side = args.SIDE;
        console.log(`traj/lean/1/?moveTime=${moveTime}&side=${side}`);
        mv2.send_REST(`traj/lean/1/?moveTime=${moveTime}&side=${side}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    slide (args, util) {
        const moveTime = 1000;
        let steps = parseInt(args.STEPS);
        steps = Math.min(Math.max(steps, 1), 20);
        const side = args.SIDE;
        console.log(`traj/sidestep/${steps}/?side= ${side}&moveTime=${moveTime}`);
        mv2.send_REST(`traj/sidestep/${steps}/?side=${side}&moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime * steps));
    }

    eyes (args, util) {
        const eyeCommand = args.COMMAND;
        console.log(`traj/${eyeCommand}`);
        mv2.send_REST(`traj/${eyeCommand}`);
        let moveTime = 1000;
        if (eyeCommand === 'wiggleEyes'){
            moveTime = 2000;
        }
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    moveLeg (args, util) {
        const moveTime = 1000;
        const side = args.SIDE;
        const direction = args.DIRECTION;
        console.log(`traj/joint/1/?jointID=${side}&angle=${direction}&moveTime=${moveTime}`);
        mv2.send_REST(`traj/joint/1/?jointID=${side}&angle=${direction}&moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    liftFoot (args, util) {
        const side = args.SIDE;
        console.log(`traj/liftFoot/1/?side=${side}`);
        mv2.send_REST(`traj/liftFoot/1/?side=${side}`);
        return new Promise(resolve =>
            setTimeout(resolve, 1000));
    }

    lowerFoot (args, util) {
        const side = args.SIDE;
        console.log(`traj/lowerFoot/1/?side=${side}`);
        mv2.send_REST(`traj/lowerFoot/1/?side=${side}`);
        return new Promise(resolve =>
            setTimeout(resolve, 1000));
    }

    moveJoint (args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        moveTime = Math.min(Math.max(moveTime, 1), 10000);
        const jointID = args.SERVOCHOICE;
        const angle = args.ANGLE;
        console.log(`traj/joint/1/?jointID=${jointID}&angle=${angle}&moveTime=${moveTime}`);
        mv2.send_REST(`traj/joint/1/?jointID=${jointID}&angle=${angle}&moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    wave (args, util) {
        const side = args.SIDE;
        console.log(`traj/wave/1/?side=${side}`);
        mv2.send_REST(`traj/wave/1/?side=${side}`);
        return new Promise(resolve =>
            setTimeout(resolve, 2500));
    }

    /* waggleEyes (args, util) {
        console.log(`traj/waggleEyes`);
        mv2.send_REST(`traj/waggleEyes`);
        return new Promise(resolve =>
            setTimeout(resolve));
    } */

    dance (args, util) {
        console.log('Let\'s dance!');
        mv2.send_REST(`traj/dance/`);
        return new Promise(resolve =>
            setTimeout(resolve, 4500));
    }

    standStraight (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        console.log(`traj/standStraight/?moveTime=${moveTime}`);
        mv2.send_REST(`traj/standStraight/?moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    hold (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        console.log(`traj/hold/?moveTime=${moveTime}`);
        mv2.send_REST(`traj/hold/?moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    // SENSORS

    position (args, util) {
        //console.log("Report a servo's position!");
        let servoChoice = parseInt(args.SERVOCHOICE);
        if (servoChoice < 0 || servoChoice > 8) {
            servoChoice = 0;
        }
        const servoObj = JSON.parse(mv2.servos);
        let servo;
        switch (servoChoice) {
        case 0:
            servo = 'Left Hip: ';
            break;
        case 1:
            servo = 'Left Twist: ';
            break;
        case 2:
            servo = 'Left Knee: ';
            break;
        case 3:
            servo = 'Right Hip: ';
            break;
        case 4:
            servo = 'Right Twist';
            break;
        case 5:
            servo = 'Right Knee: ';
            break;
        case 6:
            servo = 'Left Arm: ';
            break;
        case 7:
            servo = 'Right Arm: ';
            break;
        case 8:
            servo = 'Eyes: ';
            break;
        default:
            break;
        }
        //return servo + servoObj.smartServos[servoChoice].pos;
        return servoObj.smartServos[servoChoice].pos;
    }

    current (args, util) {
        //console.log("Report a servo's current!");
        let servoChoice = parseInt(args.SERVOCHOICE);
        if (servoChoice < 0 || servoChoice > 8) {
            servoChoice = 0;
        }
        const servoObj = JSON.parse(mv2.servos);
        let servo;
        switch (servoChoice) {
        case 0:
            servo = 'Left Hip: ';
            break;
        case 1:
            servo = 'Left Twist: ';
            break;
        case 2:
            servo = 'Left Knee: ';
            break;
        case 3:
            servo = 'Right Hip: ';
            break;
        case 4:
            servo = 'Right Twist';
            break;
        case 5:
            servo = 'Right Knee: ';
            break;
        case 6:
            servo = 'Left Arm: ';
            break;
        case 7:
            servo = 'Right Arm: ';
            break;
        case 8:
            servo = 'Eyes: ';
            break;
        default:
            break;
        }
        //return servo + servoObj.smartServos[servoChoice].current;
        return servoObj.smartServos[servoChoice].current;
    }

    accelerometerX (args, util) {
        //console.log('Report accelerometer reading!');
        const accelObj = JSON.parse(mv2.accel);
        const xAccel = accelObj.accel.x;
        return xAccel;
    }

    accelerometerY (args, util) {
        //console.log('Report accelerometer reading!');
        const accelObj = JSON.parse(mv2.accel);
        const yAccel = accelObj.accel.y;
        return yAccel;
    }

    accelerometerZ (args, util) {
        //console.log('Report accelerometer reading!');
        const accelObj = JSON.parse(mv2.accel);
        const zAccel = accelObj.accel.z;
        return zAccel;
    }

    proximity (args, util) {
        //console.log('Report proximity!');
        // TODO: Do we have a proximity sensor yet?
        return;
    }

    batteryLevel (args, util) {
        //console.log('Report the battery percentage!');
        return mv2.battRemainCapacityPercent;
    }

    obstacleSense (args, util) {
        const addons = JSON.parse(mv2.addons).addons;

        // if ir sensor not found we will check for colour sensor
        let colourSensorName = "LeftColourSensorTouch";
        if (args.SENSORCHOICE.includes("Right")){ colourSensorName = "RightColourSensorTouch"; }

        let colourSensorVal = null;
        for (var i=0; i < addons.length; i++){
            if (args.SENSORCHOICE in addons[i].vals){
                //mv2.send_REST('return val: ' + addons[i].vals[args.SENSORCHOICE]);
                return addons[i].vals[args.SENSORCHOICE];
            }
            if (colourSensorName in addons[i].vals){
                colourSensorVal = addons[i].vals[colourSensorName];
            }
        }
        if (colourSensorVal !== null) return colourSensorVal;
        return false;
    }

    groundSense (args, util) {
        const addons = JSON.parse(mv2.addons).addons;
        // if ir sensor not found we will check for colour sensor
        let colourSensorName = "LeftColourSensorAir";
        if (args.SENSORCHOICE.includes("Right")){ colourSensorName = "RightColourSensorAir"; }

        let colourSensorVal = null;
        for (var i=0; i < addons.length; i++){
            if (args.SENSORCHOICE in addons[i].vals){
                //mv2.send_REST('return val: ' + addons[i].vals[args.SENSORCHOICE]);
                // sensor tells you if if the foot is in the air
                return !addons[i].vals[args.SENSORCHOICE];
            }
            if (colourSensorName in addons[i].vals){
                colourSensorVal = !addons[i].vals[colourSensorName];
            }
        }
        if (colourSensorVal !== null) return colourSensorVal;

        return false;
    }

    colourSense (args, util) {
        const addons = JSON.parse(mv2.addons).addons;
        let csID = -1, selectedID = -1;
        for (var i=0; i < addons.length; i++){
            if ((args.SENSORCHOICE + "Red") in addons[i].vals){
                selectedID = i;
            }
            if (addons[i].deviceTypeID == MV2_DTID_COLOUR){
                csID = i;
            }
        }

        let sensorname = args.SENSORCHOICE;
        // check if we found the specified sensor. If not, fall back to the last correctly typed sensor
        if (selectedID < 0){
            if (csID < 0) return null;
            selectedID = csID;
            sensorname = addons[selectedID].name;
        }

        if (addons[selectedID].vals[sensorname + "Air"]){
            return "air";
        } else {
            //mv2.send_REST('return val: ' + addons[i].vals[args.SENSORCHOICE]);
            let red = addons[selectedID].vals[sensorname + "Red"];
            let green = addons[selectedID].vals[sensorname + "Green"];
            let blue = addons[selectedID].vals[sensorname + "Blue"];
            let clear = addons[selectedID].vals[sensorname + "Clear"];
            let maxVal = Math.max(red, green, blue);
            red /= maxVal;
            green /= maxVal;
            blue /= maxVal;
            const colours = [
                {red: [0.3, 0.75], green: [0.85, 1], blue: [0.6, 1.0], clear: [40, 150], name: "green"},
                {red: [0.8, 1],  green: [0.3, 0.5], blue: [0.4, 0.77], clear: [40, 150], name: "red"},
                {red: [0.3, 0.55], green: [0.37, 0.62], blue: [0.8, 1], clear: [40, 150], name: "purple"},
                {red: [0.85, 1], green: [0.8, 1], blue: [0.45, 0.93], clear: [150, 255],name: "yellow"},
                {red: [0.1, 0.25], green: [0.4, 0.75], blue: [0.8, 1], clear: [100, 255], name: "blue"},
                {red: [0.75, 1], green: [0.6, 0.85], blue: [0.8, 1.0], clear: [110, 210], name: "pink"} 
            ];
            //mv2.send_REST("red: " + red + " | green: " + green + " | blue: " + blue);
            for (var i=0; i<colours.length; i++){
                if ((colours[i].red[0] <= red && red <= colours[i].red[1]) && 
                    (colours[i].green[0] <= green && green <= colours[i].green[1]) &&
                    (colours[i].blue[0] <= blue && blue <= colours[i].blue[1]) &&
                    (colours[i].clear[0] <= clear && clear <= colours[i].clear[1])){
                        return colours[i].name;
                    }
            }

            return "unclear";
        }
    }

    colourSenseRaw (args, util){
        const addons = JSON.parse(mv2.addons).addons;
        let csVal = null;
        for (var i=0; i < addons.length; i++){
            if ((args.SENSORCHOICE + args.SENSORCHANNEL) in addons[i].vals){
                return addons[i].vals[args.SENSORCHOICE + args.SENSORCHANNEL];
            }
            // in case we don't find the specific sensor, we'll return the last correctly device typed value
            if (addons[i].deviceTypeID == MV2_DTID_COLOUR){
                // device is a colour sensor. iterate through channels to find correct one
                for (const addon in addons[i].vals){
                    if (addon.includes(args.SENSORCHANNEL))
                        csVal = addons[i].vals[addon];
                }
            }
        }
        if (csVal !== null) return csVal;
        return null;
    }

    distanceSense (args, util) {
        const addons = JSON.parse(mv2.addons).addons;

        mv2.send_REST(addons);

        let dsVal = null;
        for (var i=0; i < addons.length; i++){
            if ("DistanceSensorReading" in addons[i].vals){
                //mv2.send_REST('return val: ' + addons[i].vals[args.SENSORCHOICE]);
                let reading = addons[i].vals["DistanceSensorReading"];
                return reading;
            }
            if (addons[i].deviceTypeID == MV2_DTID_DISTANCE){
                for (const val in addons[i].vals){
                    if (val.includes("Reading"))
                        dsVal = addons[i].vals[val];
                }
            }
        }
        if (dsVal !== null) return dsVal;
        return false;
    }

    lightSense (args, util){
        const addons = JSON.parse(mv2.addons).addons;
        let sensorVal = null;
        for (var i=0; i < addons.length; i++){
            if ((args.SENSORCHOICE + args.SENSORCHANNEL) in addons[i].vals){
                return addons[i].vals[args.SENSORCHOICE + args.SENSORCHANNEL];
            }
            // in case we don't find the specific sensor, we'll return the last correctly device typed value
            if (addons[i].deviceTypeID == MV2_DTID_LIGHT){
                // device is a light sensor. iterate through channels to find correct one
                for (const addon in addons[i].vals){
                    if (addon.includes(args.SENSORCHANNEL))
                        sensorVal = addons[i].vals[addon];
                }
            }
        }
        if (sensorVal !== null) return sensorVal;
        return null;
    }

    noiseSense (args, util){
        const addons = JSON.parse(mv2.addons).addons;
        let sensorVal = null;
        for (var i=0; i < addons.length; i++){
            if ((args.SENSORCHOICE + "HighestSinceLastReading") in addons[i].vals){
                return addons[i].vals[args.SENSORCHOICE + "HighestSinceLastReading"];
            }
            // in case we don't find the specific sensor, we'll return the last correctly device typed value
            if (addons[i].deviceTypeID == MV2_DTID_NOISE){
                // device is a light sensor. iterate through channels to find correct one
                for (const addon in addons[i].vals){
                    if (addon.includes("HighestSinceLastReading"))
                        sensorVal = addons[i].vals[addon];
                }
            }
        }
        if (sensorVal !== null) return sensorVal;
        return null;
    }

    // SOUND

    playSound (args, util) {
        const filename = args.SOUND;
        console.log(`filerun/spiffs/${filename}`);
        mv2.send_REST(`filerun/spiffs/${filename}`);
        return new Promise(resolve =>
            setTimeout(resolve));
    }

    // MISC/PROPOSED/DEPRECATED

    /* stepLeft (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let stepLength = parseInt(args.STEPLENGTH);
        stepLength = Math.min(Math.max(stepLength, -100), 100);
        let turn = parseInt(args.TURN);
        turn = Math.min(Math.max(turn, -100), 100);
        console.log(`traj/stepLeft/?moveTime=${moveTime};stepLength=${stepLength};turn=${turn}`);
        mv2.send_REST(`traj/stepLeft/?moveTime=${moveTime};stepLength=${stepLength};turn=${turn}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    stepRight (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let stepLength = parseInt(args.STEPLENGTH);
        stepLength = Math.min(Math.max(stepLength, -100), 100);
        let turn = parseInt(args.TURN);
        turn = Math.min(Math.max(turn, -100), 100);
        console.log(`traj/stepRight/?moveTime=${moveTime};stepLength=${stepLength};turn=${turn}`);
        mv2.send_REST(`traj/stepRight/?moveTime=${moveTime};stepLength=${stepLength};turn=${turn}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }*/

    /* kickLeft (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let turn = parseInt(args.TURN);
        turn = Math.min(Math.max(turn, -100), 100);
        console.log(`traj/kickLeft/?moveTime=${moveTime};turn=${turn}`);
        mv2.send_REST(`traj/kickLeft/?moveTime=${moveTime};turn=${turn}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    kickRight (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let turn = parseInt(args.TURN);
        turn = Math.min(Math.max(turn, -100), 100);
        console.log(`traj/kickRight/?moveTime=${moveTime};turn=${turn}`);
        mv2.send_REST(`traj/kickRight/?moveTime=${moveTime};turn=${turn}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    } */

    /* sidestepLeft (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let stepLength = parseInt(args.STEPLENGTH);
        stepLength = Math.min(Math.max(stepLength, -100), 100);
        console.log(`traj/sidestepLeft/?moveTime=${moveTime};stepLength=${stepLength}`);
        mv2.send_REST(`traj/sidestepLeft/?moveTime=${moveTime};stepLength=${stepLength}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    sidestepRight (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let stepLength = parseInt(args.STEPLENGTH);
        stepLength = Math.min(Math.max(stepLength, -100), 100);
        console.log(`traj/sidestepRight/?moveTime=${moveTime};stepLength=${stepLength}`);
        mv2.send_REST(`traj/sidestepRight/?moveTime=${moveTime};stepLength=${stepLength}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    circleLeft (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        console.log(`traj/circleLeft/?moveTime=${moveTime}`);
        mv2.send_REST(`traj/circleLeft/?moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    circleRight (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        console.log(`traj/circleRight/?moveTime=${moveTime}`);
        mv2.send_REST(`traj/circleRight/?moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    waveLeft (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        console.log(`traj/waveLeft/?moveTime=${moveTime}`);
        mv2.send_REST(`traj/waveLeft/?moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    waveRight (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        console.log(`traj/waveRight/?moveTime=${moveTime}`);
        mv2.send_REST(`traj/waveRight/?moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }*/

    /* sidefall (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let stepLength = parseInt(args.STEPLEN);
        stepLength = Math.min(Math.max(stepLength, -100), 100);
        let side = args.SIDE;
        if (side === 'left') {
            side = 0;
        } else {
            side = 1;
        }
        console.log(`traj/sidefall/?moveTime${moveTime};stepLength=${stepLength};side=${side}`);
        mv2.send_REST(`traj/sidefall/?moveTime${moveTime};stepLength=${stepLength};side=${side}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }*/

    /* stop (args, util) {
        console.log('Freeze!');
        return;
    }*/

    demo_sensor (args, util) {
        return mv2.demo_sensor;
    }

    set_demo_sensor (args, util) {
        const sensorval = parseFloat(args.SENSORVAL);
        mv2.demo_sensor = sensorval;
    }

    set_ip (args, util) {
        mv2.set_ip(args.IP);
    }

}

module.exports = Scratch3Mv2Blocks;
