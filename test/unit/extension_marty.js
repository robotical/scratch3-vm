const test = require('tap').test;

const Scratch3MartyBlocks = require('../../src/extensions/scratch3_marty/martyBlocks');

function martyFactory() {
    Scratch3MartyBlocks.peripheralFactory = (runtime, EXTENSION_ID) => {
        var peripheral = [];
        peripheral.marty = [];
        return peripheral;
    };

    const marty = new Scratch3MartyBlocks(null);
    return marty;
}


test('stop', t => {
  const marty = martyFactory();
  marty._peripheral.marty.stop = function (args) {
    t.strictEqual(args, results[1], 'argument means ' + results[0]);
  };

  var results = [];
  var ARGS = {};

  results = ['finish move', 0];
  ARGS = {STOPTYPE: '0'};
  marty.m_stop(ARGS);

  results = ['freeze', 1];
  ARGS = {STOPTYPE: '1'};
  marty.m_stop(ARGS);

  results = ['disable motors', 2];
  ARGS = {STOPTYPE: '2'};
  marty.m_stop(ARGS);

  results = ['return to zero', 3];
  ARGS = {STOPTYPE: '3'};
  marty.m_stop(ARGS);

  results = ['pause', 4];
  ARGS = {STOPTYPE: '4'};
  marty.m_stop(ARGS);

  results = ['pause and disable motors', 5];
  ARGS = {STOPTYPE: '5'};
  marty.m_stop(ARGS);

  t.end();

});


test('circle dance', t => {
  const marty = martyFactory();
  marty.m_set_blocking({BLOCK: '1'});
  marty._peripheral.marty.circle_dance = function (direction, movetime) {
    t.strictEqual(direction, results[1], 'direction is ' + results[0]);
    t.strictEqual(movetime, 1000, 'movetime is one second');
  };

  var results = [];
  var ARGS = {};

  results = ['left','left'];
  ARGS = {DIRECTION: '0', MOVETIME: 1};
  marty.m_circle_dance(ARGS);

  results = ['right','right'];
  ARGS = {DIRECTION: '1', MOVETIME: 1};
  marty.m_circle_dance(ARGS);

  t.end();

});

test('kick', t => {
  const marty = martyFactory();
  marty.m_set_blocking({BLOCK: '1'});
  marty._peripheral.marty.kick = function (side, twist, movetime) {
    t.strictEqual(side, results[0], 'side is ' + results[1]);
    t.strictEqual(twist, 0, 'twist is zero');
    t.strictEqual(movetime, 2000, 'movetime is two seconds');
  };

  var results = [];
  var ARGS = {};

  results = ['left', 'left'];
  ARGS = {SIDE: '0'};
  marty.m_kick(ARGS);

  results = ['right', 'right'];
  ARGS = {SIDE: '1'};
  marty.m_kick(ARGS);

  t.end();

});

test('turn', t => {
  const marty = martyFactory();
  marty.m_set_blocking({BLOCK: '1'});
  marty._peripheral.marty.walk = function (steps, turn, move_time, step_length, side) {
    t.strictEqual(steps, results[0], 'turn two steps');
    t.strictEqual(turn, results[1], 'turn size is eighty');
    t.strictEqual(move_time, 1300, 'movetime is one point three seconds');
    t.strictEqual(step_length, 0, 'turn on the spot');
    t.strictEqual(side, undefined, 'side is not defined');
  };

  var results = [];
  var ARGS = {};

  results = [2, 80];
  ARGS = {DIRECTION: '0', NUMSTEPS: 2};
  marty.m_turn(ARGS);

  results = [2, -80];
  ARGS = {DIRECTION: '1', NUMSTEPS: 2};
  marty.m_turn(ARGS);

  t.end();
});

test('lean', t => {
  const marty = martyFactory();
  marty.m_set_blocking({BLOCK: '1'});
  marty._peripheral.marty.lean = function (dir, amount, move_time) {
    t.strictEqual(dir, results[0], 'lean to the ' + results[0]);
    t.strictEqual(amount, 60, 'lean by sixty units');
    t.strictEqual(move_time, results[1], 'move in ' + results[1] +'ms');
  };

  var results = [];
  var ARGS = {};

  results = ['left', 500];
  ARGS = {SIDE: '0', MOVETIME: 0.5};
  marty.m_lean(ARGS);

  results = ['right', 1500];
  ARGS = {SIDE: '1', MOVETIME: 1.5};
  marty.m_lean(ARGS);

  t.end();

});

test('sidestep', t => {
  const marty = martyFactory();
  marty.m_set_blocking({BLOCK: '1'});
  marty._peripheral.marty.sidestep = function (side, num_steps, move_time, step_length) {
    t.strictEqual(side, results[0], 'step to the ' + results[0]);
    t.strictEqual(num_steps, results[1], 'take ' + results[1] + ' steps');
    t.strictEqual(move_time, results[2], 'move in ' + results[2] + 'ms');
    t.strictEqual(step_length, results[3], 'step length is ' + results[3] + ' units');

  };

  var results = [];
  var ARGS = {};

  results = ['left', 1, 800, 50];
  ARGS = {STEPLEN: 50, SIDE: '0', NUMSTEPS: 1, MOVETIME: 0.8};
  marty.m_sidestep(ARGS);

  results = ['right', 10, 1800, 100];
  ARGS = {STEPLEN: 100, SIDE: '1', NUMSTEPS: 10, MOVETIME: 1.8};
  marty.m_sidestep(ARGS);

  t.end();

});

test('eyes', t => {
  const marty = martyFactory();
  marty.m_set_blocking({BLOCK: '1'});
  marty._peripheral.marty.move_joint = function (jointID, position, move_time) {
    t.strictEqual(jointID, results[0], 'move joint ' + results[0]);
    t.strictEqual(position, results[1], 'move to ' + results[1]);
    t.strictEqual(move_time, results[2], 'move in ' + results[2] + 'ms');
  };

  var results = [];
  var ARGS = {};

  results = [8, 0, 100]
  ARGS = {EYES: "0"};
  marty.m_eyes(ARGS);

  results = [8, -100, 100]
  ARGS = {EYES: "1"};
  marty.m_eyes(ARGS);

  results = [8, 50, 100]
  ARGS = {EYES: "2"};
  marty.m_eyes(ARGS);

  results = [8, -25, 100]
  ARGS = {EYES: "3"};
  marty.m_eyes(ARGS);

  t.end();

});

test('lift leg', t => {
  const marty = martyFactory();
  marty.m_set_blocking({BLOCK: '1'});
  marty._peripheral.marty.move_joint = function (jointID, position, move_time) {
    t.strictEqual(jointID, results[0], 'move joint ' + results[0]);
    t.strictEqual(position, results[1], 'move to ' + results[1]);
    t.strictEqual(move_time, results[2], 'move in ' + results[2] + 'ms');
  };

  var results = [];
  var ARGS = {};

  results = [2, -80, 750];
  ARGS = {LEG: '0'};
  marty.m_lift_leg(ARGS);

  results = [5, 80, 750];
  ARGS = {LEG: '1'};
  marty.m_lift_leg(ARGS);

  t.end();

});

test('move leg', t => {
  const marty = martyFactory();
  marty.m_set_blocking({BLOCK: '1'});
  marty._peripheral.marty.move_joint = function (jointID, position, move_time) {
    t.strictEqual(jointID, results[0], 'move joint ' + results[0]);
    t.strictEqual(position, results[1], 'move to ' + results[1]);
    t.strictEqual(move_time, results[2], 'move in ' + results[2] + 'ms');
  };

  var results = [];
  var ARGS = {};

  results = [0, -30, 750];
  ARGS = {LEG: '0', DIRECTION: '0'};
  marty.m_move_leg(ARGS);

  results = [3, 30, 750];
  ARGS = {LEG: '1', DIRECTION: '1'};
  marty.m_move_leg(ARGS);

  t.end();

});

test('move joint', t => {
  const marty = martyFactory();
  marty.m_set_blocking({BLOCK: '1'});
  marty._peripheral.marty.move_joint = function (jointID, position, move_time) {
    t.strictEqual(jointID, results[0], 'move joint ' + results[0]);
    t.strictEqual(position, results[1], 'move to ' + results[1]);
    t.strictEqual(move_time, results[2], 'move in ' + results[2] + 'ms');
  };

  var results = [];
  var ARGS = {};

  //Note the mismatch between the joint ID in the call and the one in results[0]
  results = [3, 100, 1000];
  ARGS = {JOINT: '0', POSITION: 100, MOVETIME: 1};
  marty.m_move_joint(ARGS);

  results = [4, 100, 1000];
  ARGS = {JOINT: '1', POSITION: 100, MOVETIME: 1};
  marty.m_move_joint(ARGS);

  results = [5, 100, 1000];
  ARGS = {JOINT: '2', POSITION: 100, MOVETIME: 1};
  marty.m_move_joint(ARGS);

  results = [0, 100, 1000];
  ARGS = {JOINT: '3', POSITION: 100, MOVETIME: 1};
  marty.m_move_joint(ARGS);

  results = [1, 100, 1000];
  ARGS = {JOINT: '4', POSITION: 100, MOVETIME: 1};
  marty.m_move_joint(ARGS);

  results = [2, 100, 1000];
  ARGS = {JOINT: '5', POSITION: 100, MOVETIME: 1};
  marty.m_move_joint(ARGS);

  results = [7, 100, 1000];
  ARGS = {JOINT: '6', POSITION: 100, MOVETIME: 1};
  marty.m_move_joint(ARGS);

  results = [6, 100, 1000];
  ARGS = {JOINT: '7', POSITION: 100, MOVETIME: 1};
  marty.m_move_joint(ARGS);

  results = [8, 100, 1000];
  ARGS = {JOINT: '8', POSITION: 100, MOVETIME: 1};
  marty.m_move_joint(ARGS);

  t.end();

});

test('get GPIO', t => {
  const marty = martyFactory();
  marty._peripheral.marty.get_sensor = function(sensorName) {
    t.strictEqual(sensorName, results[0], 'sensor name is ' + results[0]);
    return 100 * results[1];
  };

  var results = [];
  var ARGS = {};
  var result;

  results = ['gpio0', 0];
  ARGS = {GPIO: '0'};
  result = marty.m_get_gpio(ARGS);
  t.strictEqual(result, 0);

  results = ['gpio1', 1];
  ARGS = {GPIO: '1'};
  result = marty.m_get_gpio(ARGS);
  t.strictEqual(result, 100);

  results = ['gpio2', 2];
  ARGS = {GPIO: '2'};
  result = marty.m_get_gpio(ARGS);
  t.strictEqual(result, 200);

  results = ['gpio3', 3];
  ARGS = {GPIO: '3'};
  result = marty.m_get_gpio(ARGS);
  t.strictEqual(result, 300);

  results = ['gpio4', 4];
  ARGS = {GPIO: '4'};
  result = marty.m_get_gpio(ARGS);
  t.strictEqual(result, 400);

  results = ['gpio5', 5];
  ARGS = {GPIO: '5'};
  result = marty.m_get_gpio(ARGS);
  t.strictEqual(result, 500);

  results = ['gpio6', 6];
  ARGS = {GPIO: '6'};
  result = marty.m_get_gpio(ARGS);
  t.strictEqual(result, 600);

  results = ['gpio7', 7];
  ARGS = {GPIO: '7'};
  result = marty.m_get_gpio(ARGS);
  t.strictEqual(result, 700);


  t.end();
});

test('get motor current', t => {
  const marty = martyFactory();
  marty._peripheral.marty.get_sensor = function(sensorName) {
    t.strictEqual(sensorName, results[0], 'sensor name is ' + results[0]);
    return 100 * results[1];
  };

  var results = [];
  var ARGS = {};
  var result = 0;

  results = ['mc3', 0];
  ARGS = {MOTOR: '0'};
  result = marty.m_get_motor_current(ARGS);
  t.strictEqual(result, 0);

  results = ['mc4', 1];
  ARGS = {MOTOR: '1'};
  result = marty.m_get_motor_current(ARGS);
  t.strictEqual(result, 100);

  results = ['mc5', 2];
  ARGS = {MOTOR: '2'};
  result = marty.m_get_motor_current(ARGS);
  t.strictEqual(result, 200);

  results = ['mc0', 3];
  ARGS = {MOTOR: '3'};
  result = marty.m_get_motor_current(ARGS);
  t.strictEqual(result, 300);

  results = ['mc1', 4];
  ARGS = {MOTOR: '4'};
  result = marty.m_get_motor_current(ARGS);
  t.strictEqual(result, 400);

  results = ['mc2', 5];
  ARGS = {MOTOR: '5'};
  result = marty.m_get_motor_current(ARGS);
  t.strictEqual(result, 500);

  results = ['mc7', 6];
  ARGS = {MOTOR: '6'};
  result = marty.m_get_motor_current(ARGS);
  t.strictEqual(result, 600);

  results = ['mc6', 7];
  ARGS = {MOTOR: '7'};
  result = marty.m_get_motor_current(ARGS);
  t.strictEqual(result, 700);

  t.end();

});

test('get accel', t => {
  const marty = martyFactory();
  marty._peripheral.marty.get_sensor = function(sensorName) {
    t.strictEqual(sensorName, results[0], 'sensor name is ' + results[0]);
    return 100 * results[1];
  };

  var results = [];
  var ARGS = {};
  var result = 0;

  results = ['acc0', 0];
  ARGS = {AXIS: '0'};
  result = marty.m_get_accel(ARGS);
  t.strictEqual(result, 0);

  results = ['acc1', 1];
  ARGS = {AXIS: '1'};
  result = marty.m_get_accel(ARGS);
  t.strictEqual(result, 100);

  results = ['acc2', 2];
  ARGS = {AXIS: '2'};
  result = marty.m_get_accel(ARGS);
  t.strictEqual(result, 200);

  t.end();
});

test('set blocking', t => {
  const marty = martyFactory();

  marty._blockingMode = false;
  var ARGS = {BLOCK: '0'};

  marty.m_set_blocking(ARGS);

  t.strictEqual(marty._blockingMode, true, 'blocking mode now enabled');
  t.end();

});
