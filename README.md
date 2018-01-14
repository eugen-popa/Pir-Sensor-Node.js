# Pir-Sensor-Node.js
PIR Sensor for Raspberry Pi (motion detecting)

# onoff

GPIO access and interrupt detection with **Node.js** on Linux boards like the
Raspberry Pi,

onoff supports Node.js versions 0.10, 0.12, 4, 5, 6, 7, 8 and 9.

## Contents

 * [Installation](https://github.com/fivdi/onoff#installation)
 * [Usage](https://github.com/fivdi/onoff#usage)
 * [API](https://github.com/fivdi/onoff#api)
 * [How Does onoff Work?](https://github.com/fivdi/onoff#how-does-onoff-work)
 * [Configuring Pullup and Pulldown Resistors](https://github.com/fivdi/onoff#configuring-pullup-and-pulldown-resistors)
 * [Benchmarks](https://github.com/fivdi/onoff#benchmarks)
 * [Related Packages](https://github.com/fivdi/onoff#related-packages)
 * [Additional Information](https://github.com/fivdi/onoff#additional-information)

## Installation

```
npm install onoff
npm install sleep
```

## Usage

<img width="1118" alt="screen shot 2018-01-13 at 4 44 41 pm" src="https://user-images.githubusercontent.com/26783549/34911666-da7a135a-f883-11e7-8273-cca8ba16a5df.png">
<img width="946" alt="raspberry pi gpio" src="https://user-images.githubusercontent.com/26783549/34911670-eae9bff6-f883-11e7-8121-1af2855b7c1d.png">

When the Motion is detected the LED should turn on
This can be achieved with the following code:
```
var sleep = require('sleep'); 
var Gpio = require('onoff').Gpio; 
var LED = new Gpio(18, 'out');
var sensor = new Gpio(17, 'in', 'both'); 

sensor.watch(function(err, value){ 
	if (err){
		console.log('error');
		exit();
	}
	if(value == 1) {  
		console.log('Motion Detected');
		LED.writeSync(value); 
		sleep.sleep(3); 
	}
	else if(value == 0) {
		console.log('No Motion');
		LED.writeSync(value);  
		sleep.sleep(3);
	}
});

function exit() {
	LED.unexport();
	sensor.unexport();
	process.exit();
}
```

## PIR MOTION SENSOR 
mor information << https://learn.adafruit.com/pir-passive-infrared-proximity-motion-sensor/overview  >> 

## API

### Class Gpio

  * [Gpio(gpio, direction [, edge] [, options]) - Constructor](https://github.com/fivdi/onoff#gpiogpio-direction--edge--options)
  * [read([callback]) - Read GPIO value asynchronously](https://github.com/fivdi/onoff#readcallback)
  * [readSync() - Read GPIO value synchronously](https://github.com/fivdi/onoff#readsync)
  * [write(value[, callback]) - Write GPIO value asynchronously](https://github.com/fivdi/onoff#writevalue-callback)
  * [writeSync(value) - Write GPIO value synchronously](https://github.com/fivdi/onoff#writesyncvalue)
  * [watch(callback) - Watch for hardware interrupts on the GPIO](https://github.com/fivdi/onoff#watchcallback)
  * [unwatch([callback]) - Stop watching for hardware interrupts on the GPIO](https://github.com/fivdi/onoff#unwatchcallback)
  * [unwatchAll() - Remove all watchers for the GPIO](https://github.com/fivdi/onoff#unwatchall)
  * [direction() - Get GPIO direction](https://github.com/fivdi/onoff#direction)
  * [setDirection(direction) - Set GPIO direction](https://github.com/fivdi/onoff#setdirectiondirection)
  * [edge() - Get GPIO interrupt generating edge](https://github.com/fivdi/onoff#edge)
  * [setEdge(edge) - Set GPIO interrupt generating edge](https://github.com/fivdi/onoff#setedgeedge)
  * [activeLow() - Get GPIO activeLow setting](https://github.com/fivdi/onoff#activelow)
  * [setActiveLow(invert) - Set GPIO activeLow setting](https://github.com/fivdi/onoff#setactivelowinvert)
  * [unexport() - Reverse the effect of exporting the GPIO to userspace](https://github.com/fivdi/onoff#unexport)
  
  ##### Gpio(gpio, direction [, edge] [, options])
- gpio - An unsigned integer specifying the GPIO number.
- direction - A string specifying whether the GPIO should be configured as an
input or output. The valid values are: 'in', 'out', 'high', and 'low'. If 'out'
is specified the GPIO will be configured as an output and the value of the GPIO
will be set to 0. 'high' and 'low' are variants of 'out' that configure the
GPIO as an output with an initial level of 1 or 0 respectively.
- [edge] - An optional string specifying the interrupt generating edge or
edges for a GPIO input. The valid values are: 'none', 'rising', 'falling' or
'both'. The default value is 'none' indicating that the GPIO does not generate
interrupts. On Linux kernels prior to 3.13 it was possible for both inputs
and outputs to generate interrupts. The 3.13 kernel dropped support for
interrupt generating outputs, irrespective of whether the underlying hardware
supports them or not. Whether or not interrupts are supported is GPIO specific.
If interrupts are not supported the edge argument should not be specified.
- [options] - An optional options object.

Returns a new Gpio object that can be used to access a GPIO.

The following options are supported:
- activeLow - A boolean value specifying whether the values read from or
written to the GPIO should be inverted. The interrupt generating edge for the
GPIO also follow this this setting. The valid values for activeLow are true
and false. Setting activeLow to true inverts. Optional, the default value is
false.

GPIOs on Linux are identified by unsigned integers. These are the numbers that
should be passed to the onoff Gpio constructor function when exporting GPIOs
to userspace. For example, pin 11 on the Raspberry Pi expansion header
corresponds to GPIO17 in Raspbian Linux. 17 is therefore the number to pass
to the onoff Gpio constructor when using pin 11 on the expansion header.

##### read([callback])
- [callback] - An optional completion callback that gets two arguments (err,
value), where err is reserved for an error object and value is the number 0
or 1 and represents the state of the GPIO.

Read GPIO value asynchronously.

Note that most systems support readback of GPIOs configured as outputs. The
read method can therefore be called for any GPIO, irrespective of whether it
was configured as an input or an output. The Raspberry Pi and BeagleBone are
examples of such systems.

##### readSync()
Read GPIO value synchronously. Returns the number 0 or 1 to represent the
state of the GPIO.

Note that most systems support readback of GPIOs configured as outputs. The
readSync method can therefore be called for any GPIO, irrespective of whether
it was configured as an input or an output. The Raspberry Pi and BeagleBone
are examples of such systems.

##### write(value[, callback])
- value - The number 0 or 1.
- [callback] - An optional completion callback that gets one argument (err),
where err is reserved for an error object.

Write GPIO value asynchronously.

##### writeSync(value)
- value - The number 0 or 1.

Write GPIO value synchronously.

##### watch(callback)
- callback - A callback that gets two arguments (err, value), where err is
reserved for an error object and value is the number 0 or 1 and represents the
state of the GPIO. The value can also be used to determine whether the
interrupt occurred on a rising or falling edge. A value of 0 implies a falling
edge interrupt and a value of 1 implies a rising edge interrupt.

Watch for hardware interrupts on the GPIO. The edge argument that was passed
to the constructor determines which hardware interrupts to watch for.

##### unwatch([callback])
- [callback] - The callback to remove.

Stop watching for hardware interrupts on the GPIO. If callback is specified,
only that particular callback is removed. Otherwise all callbacks are removed.

##### unwatchAll()
Remove all hardware interrupt watchers for the GPIO.

##### direction()
Returns the string 'in' or 'out' indicating whether the GPIO is an input or
output.

##### setDirection(direction)
- direction - A string specifying whether the GPIO should be configured as an
input or output. The valid values are 'in' and 'out'.

Set GPIO direction.

##### edge()
Returns the string 'none', 'falling', 'rising', or 'both' indicating the
interrupt generating edge or edges for the GPIO. Whether or not interrupts are
supported is GPIO specific. If interrupts are not supported the edge method
should not be used.

##### setEdge(edge)
- edge - A string specifying the interrupt generating edge or edges for the
GPIO. The valid values are: 'none', 'rising', 'falling' or 'both'. On Linux
kernels prior to 3.13 it was possible for both inputs and outputs to generate
interrupts. The 3.13 kernel dropped support for interrupt generating outputs,
irrespective of whether the underlying hardware supports them or not.
Whether or not interrupts are supported is GPIO specific. If interrupts are
not supported the setEdge method should not be used.

Set GPIO interrupt generating edge.

##### activeLow()
Returns true or false indicating whether or not the values read from or written
to the GPIO are inverted.

##### setActiveLow(invert)
- invert - A boolean value specifying whether the values read from or written
to the GPIO should be inverted. The interrupt generating edge for the GPIO also
follow this this setting. The valid values for invert are true and false.
Setting activeLow to true inverts. Optional, the default value is false.

Set GPIO activeLow setting.

##### unexport()
Reverse the effect of exporting the GPIO to userspace. A Gpio object should not
be used after calling its unexport method.


https://www.npmjs.com/package/pigpio
https://www.w3schools.com/nodejs/nodejs_raspberrypi_gpio_intro.asp
