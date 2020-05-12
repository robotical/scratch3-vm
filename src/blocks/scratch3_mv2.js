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
            mv2_wiggle:  this.wiggle,
            mv2_walk: this.walk,
            mv2_set_ip: this.set_ip,
        };
    }

    set_ip(args, util){
        mv2.set_ip(args.IP);
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
        mv2.send_REST("traj/step/?moveTime=" + movetime + ";reps=" + steps + ";turn=" + turn + ";stepLength=" + steplength);
        return new Promise((resolve) =>
            setTimeout(resolve, movetime*steps));

    }

    wiggle (args, util) {
        movetime = parseFloat(args.MOVETIME) * 1000;
        if (movetime < 1500) movetime = 1500;
        mv2.send_REST("traj/wiggle/?moveTime=" + movetime);
        console.log('wiggle');
        return new Promise((resolve) =>
            setTimeout(resolve, movetime));
    }

}

module.exports = Scratch3Mv2Blocks;