/* eslint semi: ["error", "never"]*/

import axios	from 'axios'
import mic		from 'mic'
import fs		from 'fs'

const micInstance = mic({ rate: '16000', channels: '1', debug: true, exitOnSilence: 6 })
const micInputStream = micInstance.getAudioStream()

const outputFileStream = fs.createWriteStream('operator.wav')

export const onMessage = (data, message) => {
	console.log(`new audio message from operator : "${message}"`)
	micInputStream.on('silence', function() {
		console.log('end of operator command')
		axios.post('http://localhost:8085/speakToText', { data: 'operator.raw', message: 'end' })
	})
}

export const listen = () => {
	micInstance.start()
}

micInputStream.pipe(outputFileStream)

micInputStream.on('data', onMessage)

micInputStream.on('error', function(err) {
    console.log("Error in Input Stream: " + err)
})

micInputStream.on('startComplete', function() {
    console.log("Got SIGNAL startComplete")
    setTimeout(function() {
            micInstance.pause()
        }, 5000)
})

micInputStream.on('stopComplete', function() {
    console.log("Got SIGNAL stopComplete")
})

micInputStream.on('pauseComplete', function() {
    console.log("Got SIGNAL pauseComplete")
    setTimeout(function() {
            micInstance.resume()
        }, 5000)
})

micInputStream.on('resumeComplete', function() {
        console.log("Got SIGNAL resumeComplete")
        setTimeout(function() {
                micInstance.stop()
            }, 5000)
    })

micInputStream.on('processExitComplete', function() {
        console.log("Got SIGNAL processExitComplete")
    })
