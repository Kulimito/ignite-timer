import { useCallback, useContext, useEffect } from 'react'
import { CountdownContainer, Separator } from './styles'
import { CountdownContext } from '../..'

export function Countdown() {
  const {
    activeCycle,
    intervalId,
    handleCycleEnds,
    timeRemaining,
    setTimeRemaining,
  } = useContext(CountdownContext)

  const minutes = String(Math.floor(timeRemaining / 60)).padStart(2, '0')
  const seconds = String(timeRemaining % 60).padStart(2, '0')

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
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
