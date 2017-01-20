/* eslint semi: ["error", "never"]*/

import midi			from 'midi'

const __machines = [
	''
]

export default function Live() {
	if (!(this instanceof Live)) return new Live()
		const self = this
	// Set up a new output.
	this.output = new midi.output()

	// Count the available output ports.
	const portCount = this.output.getPortCount()

	// Get the name of a specified output port.
	this.portName = []
	this.selected = false
	for (let i = 0; i < portCount; i += 1) {
		this.portName[i] = this.output.getPortName(i)
		if (this.portName[i].match(/Conductor/)) this.selected = i
	}
	console.log(`${portCount} midi interface${portCount > 1 ? 's' : ''} found,`, `now connecting to '${this.portName}'`)
	// const selected = portName.indexOf('01. Ethernet MIDI 5')

	// Open the first available output port.
	console.log(`Opening MIDI port ${this.selected} : ${this.portName[this.selected]}`)
	if (this.selected) this.output.openPort(this.selected)

	// 144 = Note on


	// Close the port when done.
	// output.closePort()
}

// Send a MIDI message.
Live.prototype.ring =  function (sound, tone) {
	this.output.sendMessage(sound)
	process.stdout.write(`${tone} `)
}

// Send a note
Live.prototype.note = function (tone, machine) {
	if (!machine) machine = 0
	if (!tone) tone = 11
	this.ring([144 + machine, 33 + tone, 1], `Silent alarme on machine ${__machines[machine]}`)
}

// Send a beat
Live.prototype.trail = function (bpm, decay) {
	if (!bpm || this.carpet || this.flush) return
	if (!decay) decay = 1/2
	const tempo = 60000 / bpm
	this.carpet = setInterval(() => {this.ring([145, 44, 1], 'A0')}, tempo)
	this.flush = null
	setTimeout(() => {
		flush = setInterval(() => { this.ring([144, 41, 1], 'D0') }, tempo) }, tempo * decay)
}
