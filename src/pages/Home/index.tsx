import { Play } from 'phosphor-react'
import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  SeparetorContainer,
  StartCountdownButton,
  TaskInput,
  MinutesamountInput,
} from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useState } from 'react'

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a Tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O Ciclo precisa ser de, no mínimo, 5 minutos')
    .max(60, 'O Ciclo precisa ser de, no máximo, 60 minutos'),
})

type newCycleFormData = zod.infer<typeof newCycleValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [secondsPassedAmount, setSecondsPassedAmount] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function createNewCycle(data: newCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalInSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalInSeconds - secondsPassedAmount : 0

  const minutesStarted = Math.floor(currentSeconds / 60)
  const secondsStarted = currentSeconds % 60

  const minutes = String(minutesStarted).padStart(2, '0')
  const seconds = String(secondsStarted).padStart(2, '0')

  const task: string = watch('task')
  const minutesAmount: number = watch('minutesAmount')

  const isSubmitDisabled = !(task && minutesAmount > 0)

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestion"
            placeholder="Dê um nome ao seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestion">
            <option value="Assento de Foguete" />
            <option value="Acampamento de código grátis" />
            <option value="Cabeça Primeiro" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesamountInput
            id="minutesAmount"
            placeholder="00"
            type="number"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <SeparetorContainer>:</SeparetorContainer>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Iniciar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
