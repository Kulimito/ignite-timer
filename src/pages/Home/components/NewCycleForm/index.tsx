import { useContext } from 'react'
import { MinutesAmountInput, TaskInput, UserInputContainer } from './styles'
import { CountdownContext } from '../..'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycle } = useContext(CountdownContext)
  const { register } = useFormContext()

  return (
    <UserInputContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        list="task-sugestions"
        placeholder="Dê um nome para o seu projeto"
        {...register('task')}
        disabled={!!activeCycle}
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
        // step={5}
        min={1}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
        disabled={!!activeCycle}
        required
      />

      <span>minutos.</span>
    </UserInputContainer>
  )
}
