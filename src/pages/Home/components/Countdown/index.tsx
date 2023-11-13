import { useContext, useEffect } from 'react'
import { CountdownContainer, SeparetorContainer } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    secondsPassedAmount,
    setSecondsPassed,
  } = useContext(CyclesContext)

  const totalInSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalInSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalInSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalInSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  const currentSeconds = activeCycle ? totalInSeconds - secondsPassedAmount : 0

  const minutesStarted = Math.floor(currentSeconds / 60)
  const secondsStarted = currentSeconds % 60

  const minutes = String(minutesStarted).padStart(2, '0')
  const seconds = String(secondsStarted).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = 'Pomodoro Ignite'
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <SeparetorContainer>:</SeparetorContainer>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
