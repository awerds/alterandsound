// Singleton Web Audio studio player powering the persistent bottom Listening Bar.
// Zero bandwidth cost for catalog previews; cleanly switches between tracks.

import type { SleevePalette } from '@/types/domain'

export interface ActiveTrackState {
  trackId: string
  releaseId: string
  releaseSlug: string
  catalogNumber: string
  title: string
  artistName: string
  duration: string
  musicalKey: string
  sleevePalette: SleevePalette
  isPlaying: boolean
}

type Listener = (state: ActiveTrackState | null) => void

let audioCtx: AudioContext | null = null
let loopTimer: number | null = null
let activeGain: GainNode | null = null
let currentState: ActiveTrackState | null = null
let currentChords: number[][] = []
const listeners = new Set<Listener>()

function notify() {
  listeners.forEach((fn) => fn(currentState ? { ...currentState } : null))
}

export function subscribePlayer(listener: Listener): () => void {
  listeners.add(listener)
  listener(currentState ? { ...currentState } : null)
  return () => listeners.delete(listener)
}

function stopAudioNodes() {
  if (loopTimer !== null) {
    window.clearInterval(loopTimer)
    loopTimer = null
  }
  if (activeGain && audioCtx) {
    const now = audioCtx.currentTime
    activeGain.gain.cancelScheduledValues(now)
    activeGain.gain.setTargetAtTime(0.0001, now, 0.14)
    activeGain = null
  }
}

function startAudioLoop(chords: number[][]) {
  stopAudioNodes()

  const progression =
    chords.length > 0
      ? chords
      : [
          [146.83, 220.0, 277.18, 369.99],
          [123.47, 185.0, 246.94, 329.63],
        ]

  const AudioContextCtor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  if (!AudioContextCtor) return

  if (!audioCtx) {
    audioCtx = new AudioContextCtor()
  }
  if (audioCtx.state === 'suspended') {
    void audioCtx.resume()
  }

  const master = audioCtx.createGain()
  master.gain.setValueAtTime(0.18, audioCtx.currentTime)
  master.connect(audioCtx.destination)
  activeGain = master

  let step = 0

  const playVoicing = (freqs: number[]) => {
    if (!audioCtx || !activeGain) return
    const now = audioCtx.currentTime

    const filter = audioCtx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(1020, now)
    filter.connect(activeGain)

    freqs.forEach((freq, idx) => {
      if (!audioCtx) return
      const osc = audioCtx.createOscillator()
      const noteGain = audioCtx.createGain()
      osc.type = idx === 0 ? 'triangle' : 'sine'
      osc.frequency.setValueAtTime(freq, now)

      const start = now + idx * 0.09
      noteGain.gain.setValueAtTime(0.0001, start)
      noteGain.gain.linearRampToValueAtTime(0.17 / freqs.length, start + 0.18)
      noteGain.gain.exponentialRampToValueAtTime(0.0007, start + 3.4)

      osc.connect(noteGain)
      noteGain.connect(filter)
      osc.start(start)
      osc.stop(start + 3.5)
    })
  }

  playVoicing(progression[step % progression.length])
  step += 1

  loopTimer = window.setInterval(() => {
    if (!currentState?.isPlaying) return
    playVoicing(progression[step % progression.length])
    step += 1
  }, 3200)
}

export function playOrToggleTrack(
  meta: Omit<ActiveTrackState, 'isPlaying'>,
  chords: number[][]
): void {
  if (currentState?.trackId === meta.trackId) {
    if (currentState.isPlaying) {
      stopAudioNodes()
      currentState = { ...currentState, isPlaying: false }
      notify()
    } else {
      currentState = { ...currentState, isPlaying: true }
      startAudioLoop(currentChords)
      notify()
    }
    return
  }

  currentChords = chords
  currentState = { ...meta, isPlaying: true }
  startAudioLoop(chords)
  notify()
}

export function toggleCurrentTrack(): void {
  if (!currentState) return
  if (currentState.isPlaying) {
    stopAudioNodes()
    currentState = { ...currentState, isPlaying: false }
    notify()
  } else {
    currentState = { ...currentState, isPlaying: true }
    startAudioLoop(currentChords)
    notify()
  }
}

export function dismissPlayer(): void {
  stopAudioNodes()
  currentState = null
  notify()
}
