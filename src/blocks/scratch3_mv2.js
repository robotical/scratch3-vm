const Cast = require('../util/cast');
const MathUtil = require('../util/math-util');
const Timer = require('../util/timer');
const Marty2 = require('../util/mv2-rn');

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

            mv2_position: this.position,
            mv2_current: this.current,
            mv2_accelerometerX: this.accelerometerX,
            mv2_accelerometerY: this.accelerometerY,
            mv2_accelerometerZ: this.accelerometerZ,
            mv2_proximity: this.proximity,
            mv2_batteryLevel: this.batteryLevel,

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

    // MOTION

    getReady (args, util) {
        let moveTime = 3000;
        console.log('Ready, set, go!');
        mv2.send_REST(`traj/getReady/?moveTime=${moveTime}`);
        return new Promise(resolve => setTimeout(resolve, moveTime));
    }

    walk_fw (args, util) {
        let moveTime = 1500;
        let steps = parseInt(args.STEPS);
        steps = Math.min(Math.max(steps, 1), 20);
        const stepLength = 25;
        console.log(`traj/step/${steps}/?moveTime=${moveTime}&stepLength=${stepLength}`);
        mv2.send_REST(`traj/step/${steps}/?moveTime=${moveTime}&stepLength=${stepLength}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime * steps));
    }

    walk_bw (args, util) {
        let moveTime = 1500;
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
        let side = args.SIDE;
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
        if (eyeCommand === 'wiggleEyes'){moveTime = 2000;}
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
        mv2.send_REST(null);
        console.log("Report a servo's position!");
        let servoChoice = parseInt(args.SERVOCHOICE);
        if (servoChoice < 0 || servoChoice > 8) {
            servoChoice = 0;
        }
        const servoObj = JSON.parse(mv2.servos);
        return servoObj.smartServos[servoChoice].pos;
    }

    current (args, util) {
        mv2.send_REST(null);
        console.log("Report a servo's current!");
        const servoChoice = parseInt(args.SERVOCHOICE);
        const servoObj = JSON.parse(mv2.servos);
        return servoObj.smartServos[servoChoice].current;
    }

    accelerometerX (args, util) {
        mv2.send_REST(null);
        console.log('Report accelerometer reading!');
        const accelObj = JSON.parse(mv2.accel);
        const xAccel = accelObj.accel.x;
        return xAccel;
    }

    accelerometerY (args, util) {
        mv2.send_REST(null);
        console.log('Report accelerometer reading!');
        const accelObj = JSON.parse(mv2.accel);
        const yAccel = accelObj.accel.y;
        return yAccel;
    }

    accelerometerZ (args, util) {
        mv2.send_REST(null);
        console.log('Report accelerometer reading!');
        const accelObj = JSON.parse(mv2.accel);
        const zAccel = accelObj.accel.z;
        return zAccel;
    }

    proximity (args, util) {
        mv2.send_REST(null);
        console.log('Report proximity!');
        // TODO: Do we have a proximity sensor yet?
        return;
    }

    batteryLevel (args, util) {
        mv2.send_REST(null);
        console.log('Report the battery percentage!');
        const batteryObj = JSON.parse(mv2.power);
        return batteryObj.powerStatus.battRemainCapacityPercent;
    }

    // SOUND

    playSound(args, util) {
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
