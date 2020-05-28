const Cast = require('../util/cast');
const MathUtil = require('../util/math-util');
const Timer = require('../util/timer');
const Marty2 = require('../util/mv2-rn');

/**
 * Questions:
 * - what is the util parameter for?
 * - what are the minimum moveTimes for various actions?
 * - in the requirements (18/05) - "Lower Legs" and new dances are mentioned - do these require new API commands?
 * - clarify reps - can be added to any function (and therefore block)?
 */


class Scratch3Mv2Blocks {

    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        //this.ip ="192.168.0.27";

        mv2 = new Marty2;
    }

    /**
     * Retrieve the block primitives implemented by this package.
     * @return {object.<string, Function>} Mapping of opcode to Function.
     */
    getPrimitives () {
        return {
            // trajectory commands
            mv2_walk: this.walk,
            mv2_step: this.step,
            mv2_kick: this.kick,
            mv2_sidestep: this.sidestep,
            mv2_sidefall: this.sidefall,
            mv2_wiggle: this.wiggle,
            mv2_wave: this.wave,
            mv2_waggleEyes: this.waggleEyes,
            mv2_circle: this.circle,
            mv2_stepLeft: this.stepLeft,
            mv2_stepRight: this.stepRight,
            mv2_kickLeft: this.kickLeft,
            mv2_kickRight: this.kickRight,
            mv2_sidestepLeft: this.sidestepLeft,
            mv2_sidestepRight: this.sidestepRight,
            mv2_circleLeft: this.circleLeft,
            mv2_circleRight: this.circleRight,
            // mv2_waveLeft: this.waveLeft,
            // mv2_waveRight: this.waveRight,
            // mv2_standStraight: this.standStraight,
            // misc/debugging commands
            mv2_demo_sensor: this.demo_sensor,
            mv2_set_demo_sensor: this.set_demo_sensor,
            mv2_set_ip: this.set_ip,
        };
    }

    // Functions for trajectory commands expected by Marty's REST API

    walk(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        if (moveTime < 500) moveTime = 500;
        let turn = parseInt(args.TURN);
        turn = Math.min(Math.max(turn,-100),100);
        let steps = parseInt(args.STEPS);
        steps = Math.min(Math.max(steps, 1), 20);
        let stepLength = parseInt(args.STEPLENGTH);
        stepLength = Math.min(Math.max(stepLength,-100),100);
        console.log("traj/step/?moveTime=" + moveTime + ";reps=" + steps + ";turn=" + turn + ";stepLength=" + stepLength);
        // mv2.send_REST("traj/step/?moveTime=" + moveTime + ";reps=" + steps + ";turn=" + turn + ";stepLength=" + stepLength);
        return new Promise((resolve) =>
            setTimeout(resolve, moveTime*steps));
    }

    step(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let stepLength = parseInt(args.STEPLEN);
        stepLength = Math.min(Math.max(stepLength,-100),100);
        let turn = parseInt(args.TURN);
        turn = Math.min(Math.max(turn,-100),100);
        console.log("traj/step/?moveTime=" + moveTime + ";stepLength=" + stepLength + ";turn=" + turn);
        // mv2.send_REST("traj/step/?moveTime=" + moveTime + ";stepLength=" + stepLength + ";turn=" + turn);
        return new Promise((resolve) =>
            setTimeout(resolve, moveTime));
    }

    kick(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let side = args.SIDE;
        if (side === 'left') {
            side = 0;
        } else {
            side = 1;
        }
        let turn = parseInt(args.TURN);
        turn = Math.min(Math.max(turn,-100),100);
        console.log("traj/kick/?moveTime=" + moveTime + ";side=" + side + ";turn=" + turn);
        // mv2.send_REST("traj/kick/?moveTime" + moveTime + ";side=" + side + ";turn=" + turn);
        return new Promise((resolve) =>
            setTimeout(resolve, moveTime));
    }

    sidestep(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let stepLength = parseInt(args.STEPLEN);
        stepLength = Math.min(Math.max(stepLength,-100),100);
        let side = args.SIDE;
        if (side === 'left') {
            side = 0;
        } else {
            side = 1;
        }
        console.log("traj/sidestep/?moveTime" + moveTime + ";stepLength=" + stepLength + ";side=" + side);
        // mv2.send_REST("traj/sidestep/?moveTime" + moveTime + ";stepLength=" + stepLength + ";side=" + side);
        return new Promise((resolve) =>
            setTimeout(resolve, moveTime));
    }

    sidefall(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let stepLength = parseInt(args.STEPLEN);
        stepLength = Math.min(Math.max(stepLength,-100),100);
        let side = args.SIDE;
        if (side === 'left') {
            side = 0;
        } else {
            side = 1;
        }
        console.log("traj/sidefall/?moveTime" + moveTime + ";stepLength=" + stepLength + ";side=" + side);
        // mv2.send_REST("traj/sidefall/?moveTime" + moveTime + ";stepLength=" + stepLength + ";side=" + side);
        return new Promise((resolve) =>
            setTimeout(resolve, moveTime));
    }

    wiggle (args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        if (moveTime < 1500) {
            moveTime = 1500;
        }
        console.log("traj/wiggle/?moveTime=" + moveTime);
        // mv2.send_REST("traj/wiggle/?moveTime=" + moveTime);
        return new Promise((resolve) =>
            setTimeout(resolve, moveTime));
    }

    wave(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let side = args.SIDE;
        // why is side defined differently for wave as opposed to other commands?
        if (!(side === 'left' || side === 'right')) {
            side = null;
        }
        console.log("traj/wave/?moveTime=" + moveTime + ";side=" + side);
        // mv2.send_REST("traj/wave/?moveTime=" + movetime + ";side=" + side);
        return new Promise((resolve) =>
            setTimeout(resolve, moveTime));
    }

    waggleEyes(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        console.log("traj/waggleEyes/?moveTime=" + moveTime);
        // mv2.send_REST("traj/waggleEyes/?moveTime=" + moveTime);
        return new Promise((resolve) =>
            setTimeout(resolve, moveTime));
    }

    circle(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let side = args.SIDE;
        if (side === 'left') {
            side = 0;
        } else {
            side = 1;
        }
        console.log("traj/circle/?moveTime=" + moveTime + ";side=" + side);
        // mv2.send_REST("traj/circle/?moveTime=" + moveTime + ";side=" + side);
        return new Promise((resolve) =>
            setTimeout(resolve, moveTime));
    }

    stepLeft(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let stepLength = parseInt(args.STEPLENGTH);
        stepLength = Math.min(Math.max(stepLength,-100),100);
        let turn = parseInt(args.TURN);
        turn = Math.min(Math.max(turn,-100),100);
        console.log("traj/stepLeft/?moveTime=" + moveTime + ";stepLength=" + stepLength + ";turn=" + turn);
        // mv2.send_REST("traj/stepLeft/?moveTime=" + moveTime + ";stepLength=" + stepLength + ";turn=" + turn);
        return new Promise((resolve) =>
            setTimeout(resolve, moveTime));
    }

    stepRight(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let stepLength = parseInt(args.STEPLENGTH);
        stepLength = Math.min(Math.max(stepLength,-100),100);
        let turn = parseInt(args.TURN);
        turn = Math.min(Math.max(turn,-100),100);
        console.log("traj/stepRight/?moveTime=" + moveTime + ";stepLength=" + stepLength + ";turn=" + turn);
        // mv2.send_REST("traj/stepRight/?moveTime=" + moveTime + ";stepLength=" + stepLength + ";turn=" + turn);
        return new Promise((resolve) =>
            setTimeout(resolve, moveTime));
    }

    kickLeft(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let turn = parseInt(args.TURN);
        turn = Math.min(Math.max(turn,-100),100);
        console.log("traj/kickLeft/?moveTime=" + moveTime + ";turn=" + turn);
        // mv2.send_REST("traj/kickLeft/?moveTime=" + moveTime + ";turn=" + turn);
        return new Promise((resolve) =>
            setTimeout(resolve, moveTime));
    }

    kickRight(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let turn = parseInt(args.TURN);
        turn = Math.min(Math.max(turn,-100),100);
        console.log("traj/kickRight/?moveTime=" + moveTime + ";turn=" + turn);
        // mv2.send_REST("traj/kickRight/?moveTime=" + moveTime + ";turn=" + turn);
        return new Promise((resolve) =>
            setTimeout(resolve, moveTime));
    }

    sidestepLeft(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let stepLength = parseInt(args.STEPLENGTH);
        stepLength = Math.min(Math.max(stepLength,-100),100);
        console.log("traj/sidestepLeft/?moveTime=" + moveTime + ";stepLength=" + stepLength);
        // mv2.send_REST("traj/sidestepLeft/?moveTime=" + moveTime + ";stepLength=" + stepLength);
        return new Promise((resolve) =>
            setTimeout(resolve, moveTime));
    }

    sidestepRight(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let stepLength = parseInt(args.STEPLENGTH);
        stepLength = Math.min(Math.max(stepLength,-100),100);
        console.log("traj/sidestepRight/?moveTime=" + moveTime + ";stepLength=" + stepLength);
        // mv2.send_REST("traj/sidestepRight/?moveTime=" + moveTime + ";stepLength=" + stepLength);
        return new Promise((resolve) =>
            setTimeout(resolve, moveTime));
    }

    circleLeft(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        console.log("traj/circleLeft/?moveTime=" + moveTime);
        // mv2.send_REST("traj/circleLeft/?moveTime=" + moveTime);
        return new Promise((resolve) =>
            setTimeout(resolve, moveTime));
    }

    circleRight(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        console.log("traj/circleRight/?moveTime=" + moveTime);
        // mv2.send_REST("traj/circleRight/?moveTime=" + moveTime);
        return new Promise((resolve) =>
            setTimeout(resolve, moveTime));
    }

    /*waveLeft(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        console.log("traj/waveLeft/?moveTime=" + moveTime);
        // mv2.send_REST("traj/waveLeft/?moveTime=" + moveTime);
        return new Promise((resolve) =>
            setTimeout(resolve, moveTime));
    }*/

    /*waveRight(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        console.log("traj/waveRight/?moveTime=" + moveTime);
        // mv2.send_REST("traj/waveRight/?moveTime=" + moveTime);
        return new Promise((resolve) =>
            setTimeout(resolve, moveTime));
    }*/

    /*standStraight(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        console.log("traj/standStraight/?moveTime=" + moveTime);
        // mv2.send_REST("traj/standStraight/?moveTime=" + moveTime);
        return new Promise((resolve) =>
            setTimeout(resolve, moveTime));
    }*/

    demo_sensor(args, util){
        return mv2.demo_sensor;
    }

    set_demo_sensor(args, util){
        let sensorval = parseFloat(args.SENSORVAL);
        mv2.demo_sensor= sensorval;
    }

    set_ip(args, util){
        mv2.set_ip(args.IP);
    }

}

module.exports = Scratch3Mv2Blocks;
