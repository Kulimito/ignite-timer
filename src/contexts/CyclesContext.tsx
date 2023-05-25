import React, {
  ReactNode,
  createContext,
  useCallback,
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
  intervalId: React.MutableRefObject<number | null>
  timeRemaining: number
  handleCycleEnds: (value: 'finishedDate' | 'interruptedDate') => void
  setTimeRemaining: React.Dispatch<React.SetStateAction<number>>
  createNewCycle: ({ task, minutesAmount }: CreateNewCycleData) => void
}

export const CountdownContext = createContext<ContextType>({} as ContextType)

export function CyclesContextProvider({ children }: { children: ReactNode }) {
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const intervalId = useRef<number | null>(null)

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

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const contextValue = {
    cycles,
    activeCycle,
    intervalId,
    timeRemaining,
    handleCycleEnds,
    setTimeRemaining,
    createNewCycle,
  }

  return (
    <CountdownContext.Provider value={contextValue}>
      {children}
    </CountdownContext.Provider>
  )
}
