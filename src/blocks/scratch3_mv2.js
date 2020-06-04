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
 * - play sound
 * - eyes <emotion>
 * - lift/lower legs - API calls?
 * - move arms (other than wave?)
 * - Battery voltage
 * - GPIO in
 * - current
 * - accelerometer
 * - proximity
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
            mv2_sidefall: this.sidefall,
            mv2_wave: this.wave,
            mv2_waggleEyes: this.waggleEyes,
            mv2_stepLeft: this.stepLeft,
            mv2_stepRight: this.stepRight,
            mv2_sidestepLeft: this.sidestepLeft,
            mv2_sidestepRight: this.sidestepRight,
            mv2_circleLeft: this.circleLeft,
            mv2_circleRight: this.circleRight,
            mv2_waveLeft: this.waveLeft,
            mv2_waveRight: this.waveRight,

            // sound commands

            mv2_playsound: this.playsound,

            // misc/debugging commands (including proposed/deprecated blocks)

            mv2_stop: this.stop,
            mv2_standStraight: this.standStraight,
            mv2_demo_sensor: this.demo_sensor,
            mv2_set_demo_sensor: this.set_demo_sensor,
            mv2_set_ip: this.set_ip

            /* mv2_kickLeft: this.kickLeft,
            mv2_kickRight: this.kickRight, */

        };
    }

    // Functions for trajectory commands expected by Marty's REST API

    stop (args, util) {
        console.log('Freeze!');
        return;
    }

    getReady (args, util) {
        console.log('Ready, set, go!');
        return;
    }

    walk_fw (args, util) {
        let moveTime = 1500;
        moveTime = Math.min(Math.max(moveTime, 1), 10);
        let steps = parseInt(args.STEPS);
        steps = Math.min(Math.max(steps, 1), 20);
        const stepLength = 25;
        console.log(`traj/step/${steps}/?moveTime=${moveTime};stepLength=${stepLength}`);
        mv2.send_REST(`traj/step/${steps}/?moveTime=${moveTime};stepLength=${stepLength}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime * steps));
    }

    walk_bw (args, util) {
        let moveTime = 1500;
        moveTime = Math.min(Math.max(moveTime, 1), 10);
        let steps = parseInt(args.STEPS);
        steps = Math.min(Math.max(steps, 1), 20);
        const stepLength = -25;
        console.log(`traj/step/${steps}/?moveTime=${moveTime};stepLength=${stepLength}`);
        mv2.send_REST(`traj/step/${steps}/?moveTime=${moveTime};stepLength=${stepLength}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime * steps));
    }

    walk (args, util) {
        let moveTime = parseInt(args.MOVETIME) * 1000;
        moveTime = Math.min(Math.max(moveTime, 1), 10);
        let stepLength = parseInt(args.STEPLEN);
        stepLength = Math.min(Math.max(stepLength, -100), 20);
        let steps = parseInt(args.STEPS);
        steps = Math.min(Math.max(steps, 1), 20);
        let turn = parseInt(args.TURN);
        turn = Math.min(Math.max(turn, -100), 100);
        console.log(`traj/step/${steps}/?stepLength=${stepLength};moveTime=${moveTime};turn=${turn}`);
        mv2.send_REST(`traj/step/${steps}/?stepLength=${stepLength};moveTime=${moveTime};turn=${turn}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime * steps));
    }

    turn (args, util) {
        const moveTime = 1500;
        let steps = parseInt(args.STEPS);
        steps = Math.min(Math.max(steps, 1), 20);
        let turn = 50;
        const side = args.SIDE;
        if (side === 'right'){
            turn *= -1;
        }
        console.log(`traj/step/${steps}/?moveTime=${moveTime};turn=${turn}`);
        mv2.send_REST(`traj/step/${steps}/?moveTime=${moveTime};turn=${turn}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime * steps));
    }

    wiggle (args, util) {
        console.log(`traj/wiggle`);
        mv2.send_REST(`traj/wiggle`);
        return new Promise(resolve =>
            setTimeout(resolve));
    }

    circle (args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        moveTime = Math.min(Math.max(moveTime, 1), 10000);
        let side = args.SIDE;
        console.log(`traj/circle/?moveTime=${moveTime};side=${side}`);
        mv2.send_REST(`traj/circle/?moveTime=${moveTime};side=${side}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    kick (args, util) {
        const moveTime = 1500;
        let side = args.SIDE;

        /* let turn = parseInt(args.TURN);      // proposed optional parameter
        turn = Math.min(Math.max(turn, -100), 100); */

        console.log(`traj/kick/?moveTime=${moveTime};side=${side}`);
        mv2.send_REST(`traj/kick/?moveTime${moveTime};side=${side}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    lean (args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        moveTime = Math.min(Math.max(moveTime, 1), 10000);
        const side = args.SIDE;
        console.log(`traj/lean/1/?moveTime=${moveTime};side=${side}`);
        mv2.send_REST(`traj/lean/1/?moveTime=${moveTime};side=${side}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    slide (args, util) {
        const moveTime = 1000;
        let steps = parseInt(args.STEPS);
        steps = Math.min(Math.max(steps, 1), 20);
        const side = args.SIDE;
        console.log(`traj/sidestep/${steps}/?side=  ${side};moveTime=${moveTime}`);
        mv2.send_REST(`traj/sidestep/${steps}/?side=${side};moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime*steps));
    }

    eyes (args, util) {
        const eyeCommand = args.COMMAND;
        console.log(`traj/${eyeCommand}`);
        mv2.send_REST(`traj/${eyeCommand}`);
        return new Promise(resolve =>
            setTimeout(resolve));
    }

    standStraight (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        console.log(`traj/standStraight/?moveTime=${moveTime}`);
        mv2.send_REST(`traj/standStraight/?moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    playsound(args, util) {
        const filename = args.FILENAME;
        console.log(`api/filerun/${filename}`);
        mv2.send_REST(`api/filerun/${filename}`);
        return new Promise(resolve =>
            setTimeout(resolve));
    }

    sidefall (args, util) {
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
    }


    wave (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let side = args.SIDE;
        // why is side defined differently for wave as opposed to other commands?
        if (!(side === 'left' || side === 'right')) {
            side = null;
        }
        console.log(`traj/wave/?moveTime=${moveTime};side=${side}`);
        mv2.send_REST(`traj/wave/?moveTime=${movetime};side=${side}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    waggleEyes (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        console.log(`traj/waggleEyes/?moveTime=${moveTime}`);
        mv2.send_REST(`traj/waggleEyes/?moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    stepLeft (args, util) {
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
    }

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

    sidestepLeft (args, util) {
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
    }

    demo_sensor (args, util) {
        console.log('hi');
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
