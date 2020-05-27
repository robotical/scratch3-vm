const Cast = require('../util/cast');
const MathUtil = require('../util/math-util');
const Timer = require('../util/timer');
const Marty2 = require('../util/mv2-rn');


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
            mv2_demo_sensor: this.demo_sensor,
            mv2_set_demo_sensor: this.set_demo_sensor,
            mv2_set_ip: this.set_ip,
            mv2_hello: this.hello,
            mv2_stop: this.stop,
            mv2_disable_motors: this.disable_motors,
            mv2_enable_motors: this.enable_motors,
            mv2_stand_straight: this.stand_straight,
            mv2_wiggle:  this.wiggle,
            mv2_circle_dance: this.circle_dance,
            mv2_play_sound: this.play_sound,
            mv2_walk: this.walk,
            mv2_walkf: this.walkf,
            mv2_walkb: this.walkb,
            mv2_kick: this.kick,
            mv2_turn: this.turn,
            mv2_lean: this.lean,
            mv2_sidestep: this.sidestep,
            mv2_eyes: this.eyes,
            mv2_lift_leg: this.lift_leg,
            mv2_lower_leg_action: this.lower_leg_action,
            mv2_lower_leg: this.lower_leg,
            mv2_move_leg: this.move_leg,
            mv2_move_joint: this.move_joint,
            mv2_get_batt: this.get_batt,
            mv2_get_gpio: this.get_gpio,
            mv2_get_motor_current: this.get_motor_current,
            mv2_get_accel: this.get_accel,
            mv2_get_prox: this.get_prox,
            mv2_set_blocking: this.set_blocking,
        };
    }

    demo_sensor(args, util){
        return mv2.demo_sensor;
    }

    set_demo_sensor(args, util){
        sensorval = parseFloat(args.SENSORVAL);
        mv2.demo_sensor= sensorval;
    }

    set_ip(args, util){
        mv2.set_ip(args.IP);
    }

    hello(args, util) {
        // TODO: what is hello built in command?
    }

    stop(args, util) {
        // TODO: what is stop built in command?
    }

    disable_motors(args, util) {
        // TODO: what bic?
    }

    enable_motors(args, util) {
        // TODO: what bic?
    }

    stand_straight(args, util) {
        movetime = parseFloat(args.MOVETIME) * 1000;
        // what is the minimum time to stand straight?
        if (movetime < 500) {
            movetime = 500;
        }
        console.log("traj/standStraight/?moveTime=" + movetime);
        // mv2.send()
        return new Promise((resolve) => setTimeout(resolve, movetime));
    }

    wiggle (args, util) {
        movetime = parseFloat(args.MOVETIME) * 1000;
        if (movetime < 1500) movetime = 1500;
        mv2.send_REST("traj/wiggle/?moveTime=" + movetime);
        console.log('wiggle');
        return new Promise((resolve) =>
            setTimeout(resolve, movetime));
    }

    circle_dance (args, util) {
        direction = args.DIRECTION;
        // TODO: which cirle command to use? all 3?
    }

    play_sound (args, util) {
        // TODO: look up sound API commands
    }

    walk(args, util){
        movetime = parseFloat(args.MOVETIME) * 1000;
        if (movetime < 500) movetime = 500;
        turn = parseInt(args.TURN);
        turn = Math.min(Math.max(turn,-100),100);
        steps = parseInt(args.STEPS);
        steps = Math.min(Math.max(steps, 1), 20);
        steplength = parseInt(args.STEPLENGTH);
        steplength = Math.min(Math.max(steplength,-100),100);
        console.log("traj/step/?moveTime=" + movetime + ";reps=" + steps + ";turn=" + turn + ";stepLength=" + steplength);
        // mv2.send_REST("traj/step/?moveTime=" + movetime + ";reps=" + steps + ";turn=" + turn + ";stepLength=" + steplength);
        return new Promise((resolve) =>
            setTimeout(resolve, movetime*steps));
    }

    walkf(args, util) {
        movetime = 1500;
        turn = 0;
        steps = parseInt(args.NUMSTEPS);
        steplength = 45;
        console.log("traj/step/?moveTime=" + movetime + ";reps=" + steps + ";turn=" + turn + ";stepLength=" + steplength);
        //mv2.send_REST();
        return new Promise((resolve) => setTimeout(resolve, movetime*steps));
    }

    walkb(args, util) {
        movetime = 1500;
        turn = 0;
        steps = parseInt(args.NUMSTEPS);
        steplength = -45;
        console.log("traj/step?moveTime=" + movetime + ";reps=" + steps + ";turn=" + turn + ";stepLength=" + steplength);
        //mv2.send_REST();
        return new Promise((resolve) => setTimeout(resolve, movetime*steps));
    }

    kick(args, util) {
        side = args.SIDE;
        // TODO: what options should scratch allow?
    }

    turn




}

module.exports = Scratch3Mv2Blocks;
