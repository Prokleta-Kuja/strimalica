import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export interface IRadioStream {
  id: number
  title: string
  url: string
}

export interface IRadioPlayer {
  currentStream?: IRadioStream
  currentVolume: number
  isPlaying?: boolean
  changeDevice: () => void
  changeStream: (radio: IRadioStream) => void
  changeVolume: (vol: number) => void
  togglePlaying: () => void
}

export const useRadioPlayer = defineStore('radio-player', () => {
  const player = new Audio()

  const volumeSteps: number[] = [10, 20, 35, 50, 65, 75, 85, 100]
  const radioStreams: IRadioStream[] = [
    {
      id: 1,
      title: 'Antena ZG',
      url: 'http://live.antenazagreb.hr:8000/;'
    },
    {
      id: 2,
      title: 'Radio 101',
      url: 'http://live.radio101.hr:9531/stream.mp3'
    },
    { id: 3, title: 'Otvoreni', url: 'http://stream2.otvoreni.hr/otvoreni' },
    { id: 4, title: 'Narodni', url: 'http://live.narodni.hr:8059/narodni' },
    {
      id: 5,
      title: 'Enter ZG',
      url: 'http://live.enterzagreb.hr:8023/stream/'
    },
    {
      id: 6,
      title: 'Radio Sljeme',
      url: 'https://21223.live.streamtheworld.com/SLJEMEAAC.aac'
    }
  ]
  const currentStreamId = ref<number | undefined>()
  const isPlaying = ref(false)
  const screenSaver = reactive<{ shown: boolean; time: string; color: string }>({
    shown: false,
    time: '',
    color: ''
  })
  const currentVolume = ref(100)

  const changeDevice = async () => {
    // @ts-ignore
    if (player.setSinkId === undefined)
      alert(
        'Please enable setSinkId to switch audio device.\n1. Open about:config in firefox.\n2. Search for media.setsinkid.enabled.\n3. Set the value to true.'
      )
    else {
      // @ts-ignore
      const selected = await navigator.mediaDevices.selectAudioOutput()
      // @ts-ignore
      player.setSinkId(selected.deviceId)
    }
  }

  const changeStation = (stream: IRadioStream) => {
    player.src = `${stream.url}?t=${new Date().toISOString()}`
    player.load()
    player.play().catch(() => {})
    isPlaying.value = true
    currentStreamId.value = stream.id

    if (navigator.mediaSession)
      navigator.mediaSession.metadata = new MediaMetadata({
        artist: 'Strimalica',
        title: stream.title
      })
  }

  const changeVolume = (vol: number) => {
    player.volume = vol / 100
    currentVolume.value = vol
  }

  const toggleRadio = () => {
    if ((player.paused || player.ended) && player.src) {
      player.load()
      player.play()
      isPlaying.value = true
    } else {
      player.pause()
      isPlaying.value = false
      toggleScreenSaver()
    }
  }

  let timeout: number
  const toggleScreenSaver = () => {
    screenSaver.shown = !screenSaver.shown

    if (screenSaver.shown) changeColor()
    else clearTimeout(timeout)
  }
  const randomNumber = () => Math.floor(Math.random() * 256)
  const scheduleColor = () => (timeout = setTimeout(changeColor, 3000))
  const changeColor = () => {
    screenSaver.time = new Date().toLocaleTimeString('hr-HR', {
      hour: '2-digit',
      minute: '2-digit'
    })
    screenSaver.color = `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`
    scheduleColor()
  }

  const { mediaSession } = navigator
  const next = () => {
    if (currentStreamId.value) {
      const currentIdx = radioStreams.findIndex((e) => e.id === currentStreamId.value)
      if (currentIdx + 1 < radioStreams.length) changeStation(radioStreams[currentIdx + 1])
      else changeStation(radioStreams[0])
    } else changeStation(radioStreams[0])
  }
  const previous = () => {
    if (currentStreamId.value) {
      const currentIdx = radioStreams.findIndex((e) => e.id === currentStreamId.value)
      if (currentIdx === 0) changeStation(radioStreams[radioStreams.length - 1])
      else changeStation(radioStreams[currentIdx - 1])
    } else changeStation(radioStreams[0])
  }

  mediaSession.setActionHandler('nexttrack', next)
  mediaSession.setActionHandler('previoustrack', previous)

  return {
    isPlaying,
    screenSaver,
    volumeSteps,
    radioStreams,
    currentVolume,
    currentStreamId,
    changeDevice,
    changeStation,
    changeVolume,
    toggleRadio,
    toggleScreenSaver
  }
})
