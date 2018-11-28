let analyser
let input
let scriptProcessor

const processInput = () => {
  const tempArray = new Uint8Array(analyser.frequencyBinCount)
  analyser.getByteFrequencyData(tempArray)
  document.querySelector('div').style.width = `${getAverageVolume(tempArray)}%`
}

const getAverageVolume = array => {
  const length = array.length
  let values = 0
  let i = 0

  for (; i < length; i++) {
    values += array[i]
  }

  return Math.round(values / length)
}

(() => {
  const audioContext = new AudioContext()

  if (!audioContext) {
    document.body.innerHTML = 'Seu navagador não sabe como lidar com áudio, tente algum mais moderno :D'
    return
  }

  navigator.getUserMedia({
    audio: true
  }, (stream) => {
    input = audioContext.createMediaStreamSource(stream)
    analyser = audioContext.createAnalyser()
    scriptProcessor = audioContext.createScriptProcessor()

    analyser.smoothingTimeConstant = 0.3
    analyser.fftSize = 1024

    input.connect(analyser)
    analyser.connect(scriptProcessor)
    scriptProcessor.connect(audioContext.destination)

    scriptProcessor.onaudioprocess = processInput
  }, (error) => {
    document.body.innerHTML = `Oops! Tivemos um pequeno erro: ${error}`
  })
})()
