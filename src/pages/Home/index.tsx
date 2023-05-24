import { Play } from 'phosphor-react'

import {
  CountdownContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartButton,
  TaskInput,
  UserInputContainer,
} from './styles'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

//  Criando o schema do formulário com Zod
const newCycleFormValidationSchema = z.object({
  task: z.string().min(5),
  minutesAmount: z.number().min(5).max(60),
})

//  Extraindo a tipagem do formulário com o zod infer
type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>

//  Criando a tipagem do ciclo
interface Cycle extends NewCycleFormData {
  id: string
}

export function Home() {
  // Estado que armazena todos os ciclos
  const [cycles, setCycles] = useState<Cycle[]>([])

  // Estado que armazena o id do ciclo ativo
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  // Instanciando o useForm
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  // Função chamada no onSubmit do Form
  function handleCreateNewCycle({ task, minutesAmount }: NewCycleFormData) {
    // Criando um id para o novo ciclo
    const id = String(Date.now())

    // Criando o novo ciclo
    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
    }

    // Registrando o novo ciclo
    setCycles((prev) => [...prev, newCycle])

    // Registrando o id do ciclo ativo
    setActiveCycleId(id)

    // Resetando o formulário para os valores padrões
    reset()
  }

  // Buscando o ciclo ativo dentro de todos os ciclos através do id do ciclo ativo
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // Monitorando o input task
  const task = watch('task')
  // Controlando o botão começar baseado no input task
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <UserInputContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            list="task-sugestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
            required
          />

          <datalist id="task-sugestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            required
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </UserInputContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartButton>
      </form>
    </HomeContainer>
  )
}
