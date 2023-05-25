import { useContext, useEffect, useRef, useState } from 'react'
import { MinutesAmountInput, TaskInput, UserInputContainer } from './styles'
import { CountdownContext } from '../..'
import { useFormContext, Controller } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycle } = useContext(CountdownContext)
  const { register, control } = useFormContext()
  const taskInputRef = useRef<HTMLInputElement>(null)
  const [placeHolder, setPlaceHolder] = useState(
    'Dê um nome para o seu projeto',
  )
  const [taskInputValue, setTaskInputValue] = useState('')

  useEffect(() => {
    if (window.matchMedia('(max-width: 500px)').matches) {
      setPlaceHolder('Digite a tarefa!')
    }
  }, [])

  useEffect(() => {
    if (taskInputRef.current) {
      if (window.matchMedia('(max-width: 500px)').matches) {
        taskInputRef.current.style.width = `${
          (taskInputValue.length || placeHolder.length) + 1
        }ch`
      } else {
        taskInputRef.current.style.width = ''
      }
    }
  }, [taskInputValue, placeHolder])

  return (
    <UserInputContainer>
      <label htmlFor="task">Vou trabalhar em</label>

      <Controller
        name="task"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TaskInput
            {...field}
            ref={taskInputRef}
            type="text"
            id="task"
            list="task-sugestions"
            placeholder={placeHolder}
            onChange={(e) => {
              field.onChange(e.target.value)
              setTaskInputValue(e.target.value)
            }}
            disabled={!!activeCycle}
            required
          />
        )}
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
