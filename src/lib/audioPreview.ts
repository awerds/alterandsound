// Minimal Web Audio studio chord progression previewer for seed sample showcases.
// Keeps playback strictly singleton across cards and requires zero external audio bandwidth.

type Listener = (activeWorkId: string | null) => void

let audioCtx: AudioContext | null = null
let activeId: string | null = null
let loopTimer: number | null = null
let activeGain: GainNode | null = null
const listeners = new Set<Listener>()

function notify() {
  listeners.forEach((fn) => fn(activeId))
}

export function subscribeAudioPreview(listener: Listener): () => void {
  listeners.add(listener)
  listener(activeId)
  return () => listeners.delete(listener)
}

export function stopStudioPreview(): void {
  if (loopTimer !== null) {
    window.clearInterval(loopTimer)
    loopTimer = null
  }
  if (activeGain && audioCtx) {
    const now = audioCtx.currentTime
    activeGain.gain.cancelScheduledValues(now)
    activeGain.gain.setTargetAtTime(0.0001, now, 0.12)
    activeGain = null
  }
  activeId = null
  notify()
}

export function toggleStudioPreview(workId: string, chords?: number[][]): void {
  if (activeId === workId) {
    stopStudioPreview()
    return
  }

  stopStudioPreview()

  const progression =
    chords && chords.length > 0
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
  activeId = workId
  notify()

  let step = 0

  const playChord = (freqs: number[]) => {
    if (!audioCtx || !activeGain) return
    const now = audioCtx.currentTime

    // Warm low-pass filter for acoustic felt-piano / ambient pad character
    const filter = audioCtx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(1050, now)
    filter.connect(activeGain)

    freqs.forEach((freq, idx) => {
      if (!audioCtx) return
      const osc = audioCtx.createOscillator()
      const noteGain = audioCtx.createGain()
      osc.type = idx === 0 ? 'triangle' : 'sine'
      osc.frequency.setValueAtTime(freq, now)

      const start = now + idx * 0.085
      noteGain.gain.setValueAtTime(0.0001, start)
      noteGain.gain.linearRampToValueAtTime(0.18 / freqs.length, start + 0.16)
      noteGain.gain.exponentialRampToValueAtTime(0.0008, start + 3.2)

      osc.connect(noteGain)
      noteGain.connect(filter)
      osc.start(start)
      osc.stop(start + 3.35)
    })
  }

  playChord(progression[step % progression.length])
  step += 1

  loopTimer = window.setInterval(() => {
    if (activeId !== workId) return
    playChord(progression[step % progression.length])
    step += 1
  }, 3100)
}
