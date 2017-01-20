/* eslint semi: ["error", "never"]*/

import express					from 'express'
import path						from 'path'
import bodyParser				from 'body-parser'
import cors						from 'cors'
// import player from 'play-sound'
const player = require('play-sound')({ player: 'live' })

import Live					from './model/midi'
import mic					from './model/listen'

const app				= express()
const notImplemented	= (req, res) => res.status(501).json({
	status: 'error',
	message: 'Not implemented',
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/public', express.static(`${__dirname}${path.sep}public`))
app.use(express.static(path.resolve(__dirname, 'build')))

const live = new Live()

app.get('/alarm', (req, res) => {
	const { tone, machine } = req.query
	live.note(tone, machine)
	res.send({ status: 'OK', success: true, message: 'alarm transmitted to operator' })
})

app.get('/speak', (req, res) => {
	const { file, machine } = req.query
	// must read and play file
	player.play(file, err => {
		if (err) {
			console.log('Error while speaking to Operator')
			res.send({ status: 'ERROR', success: false, message: 'Error while speaking to Operator' })
		} else {
			res.send({ status: 'OK', success: true, message: 'Message spoken to Operator' })
		}
	})
})
app.get('/test', notImplemented)

app.listen(8087, () => console.log('AUDIO SERVER STARTED ON PORT 8087'))
