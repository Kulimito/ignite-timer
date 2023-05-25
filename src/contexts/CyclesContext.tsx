import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startedAt: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CreateNewCycleData {
  task: string
  minutesAmount: number
}

interface ContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  minutes: string
  seconds: string
  createNewCycle: ({ task, minutesAmount }: CreateNewCycleData) => void
  handleCycleEnds: (value: 'finishedDate' | 'interruptedDate') => void
}

export const CountdownContext = createContext<ContextType>({} as ContextType)

export function CyclesContextProvider({ children }: { children: ReactNode }) {
  const intervalId = useRef<number | null>(null)
  const [activeCycleId, setActiveCycleId] = useState<string | null>(() => {
    const activeCycleIdJSON = localStorage.getItem(
      '@ignite-timer:active-cycle-id-1.0.0',
    )

    if (activeCycleIdJSON) {
      return JSON.parse(activeCycleIdJSON)
    } else {
      return null
    }
  })
  const [timeRemaining, setTimeRemaining] = useState<number>(() => {
    const timeRemainingJSON = localStorage.getItem(
      '@ignite-timer:time-remaining-1.0.0',
    )

    if (timeRemainingJSON) {
      return JSON.parse(timeRemainingJSON)
    } else {
      return 0
    }
  })
  const [cycles, setCycles] = useState<Cycle[]>(() => {
    const storedCyclesStateJSON = localStorage.getItem(
      '@ignite-timer:cycles-state-1.0.0',
    )

    if (storedCyclesStateJSON) {
      return JSON.parse(storedCyclesStateJSON)
    } else {
      return []
    }
  })

  const handleCycleEnds = useCallback(
    (value: 'finishedDate' | 'interruptedDate') => {
      if (intervalId.current) {
        clearInterval(intervalId.current)

        setCycles((prev) =>
          prev.map((cycle) =>
            cycle.id === activeCycleId
              ? { ...cycle, [value]: new Date() }
              : cycle,
          ),
        )

        setActiveCycleId(null)
        setTimeRemaining(0)
      }
    },
    [activeCycleId],
  )

  function createNewCycle({ task, minutesAmount }: CreateNewCycleData) {
    const id = String(Date.now())

    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startedAt: new Date(),
    }

    setCycles((prev) => [...prev, newCycle])

    setActiveCycleId(id)
  }

  useEffect(() => {
    const cyclesStateJSON = JSON.stringify(cycles)
    const timeRemainingJSON = JSON.stringify(timeRemaining)
    const activeCycleIdJSON = JSON.stringify(activeCycleId)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', cyclesStateJSON)
    localStorage.setItem(
      '@ignite-timer:time-remaining-1.0.0',
      timeRemainingJSON,
    )
    localStorage.setItem(
      '@ignite-timer:active-cycle-id-1.0.0',
      activeCycleIdJSON,
    )
  }, [cycles, timeRemaining, activeCycleId])

  const startCountdown = useCallback(
    (value = 0) => {
      const startTime = Date.now()

      if (intervalId.current) {
        clearInterval(intervalId.current)
      }

      intervalId.current = setInterval(() => {
        const diff = Math.floor((Date.now() - startTime) / 1000)

        if (diff >= value) {
          handleCycleEnds('finishedDate')
        } else {
          setTimeRemaining(value - diff)
        }
      }, 1000)
    },
    [intervalId, handleCycleEnds, setTimeRemaining],
  )

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const minutes = String(Math.floor(timeRemaining / 60)).padStart(2, '0')
  const seconds = String(timeRemaining % 60).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      if (timeRemaining === 0) {
        startCountdown(activeCycle.minutesAmount * 60 + 1)
      } else {
        startCountdown(timeRemaining)
      }
    }
  }, [activeCycle, startCountdown, timeRemaining])

  useEffect(() => {
    activeCycle && (document.title = `${minutes}:${seconds}`)

    if (!activeCycle && document.title !== 'Ignite Timer') {
      document.title = 'Ignite Timer'
    }
  }, [activeCycle, minutes, seconds])

  const contextValue = {
    cycles,
    activeCycle,
    handleCycleEnds,
    createNewCycle,
    minutes,
    seconds,
  }

  return (
    <CountdownContext.Provider value={contextValue}>
      {children}
    </CountdownContext.Provider>
  )
}
