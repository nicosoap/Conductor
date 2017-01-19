/* eslint semi: ["error", "never"]*/

import express					from 'express'
import path						from 'path'
import bodyParser				from 'body-parser'
import cors						from 'cors'

import midi						from './model/midi'

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

midi()

app.get('/test', notImplemented)

app.listen(8080, () => console.log('SERVER STARTED ON PORT 8080'))
