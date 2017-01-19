/* eslint semi: ["error", "never"]*/

import midi			from 'midi'

// Set up a new output.
const output = new midi.output()

// Count the available output ports.
const portCount = output.getPortCount()

// Get the name of a specified output port.
const portName = []
let selected = NaN
for (let i = 0; i < portCount; i += 1) {
	portName[i] = output.getPortName(i)
	if (portName[i].match(/01\. Ethernet/)) selected = i
}
console.log(portCount, portName)
// const selected = portName.indexOf('01. Ethernet MIDI 5')

// Open the first available output port.
console.log(`Opening MIDI port ${selected} : ${portName[selected]}`)
output.openPort(selected)

// Send a MIDI message.
const ring = (sound, tone) => {
	output.sendMessage(sound)
	process.stdout.write(`${tone} `)
}
// 144 = Note on
setInterval(() => {ring([144,33,1], 'A0')}, 480)

// Close the port when done.
// output.closePort()
