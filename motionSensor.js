var sleep = require('sleep'); //npm function for sleep time ex: 3 seconds (npm install sleep)
var Gpio = require('onoff').Gpio; //onoff function fot looping thru the sensor (npm install onoff)
var LED = new Gpio(18, 'out'); // gpio18 in this case (physical pin 18)
var sensor = new Gpio(17, 'in', 'both'); // gpio17 (physical pin 11)

sensor.watch(function(err, value){ // .watch is a callback function for 2 arguments (err,value) is for an err & value is for 0 or 1 input from the sensor
	if (err){
		console.log('error');
		exit();
	}
	if(value == 1) { // if value from the sensor is 1 
		console.log('Motion Detected');
		LED.writeSync(value); // senting output to the LED (if motion detected LED on )
		sleep.sleep(3); // sleep for 3 sec 
	}
	else if(value == 0) {
		console.log('No Motion');
		LED.writeSync(value); // .writeSync(value) is a function for 0 or 1. sending the value to the LED 
		sleep.sleep(3);
	}
});

function exit() {
	LED.unexport();
	sensor.unexport();
	process.exit();
}

