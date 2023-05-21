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

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <UserInputContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            list="task-sugestions"
            placeholder="Dê um nome para o seu projeto"
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
            min={1}
            max={60}
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

        <StartButton>
          <Play size={24} />
          Começar
        </StartButton>
      </form>
    </HomeContainer>
  )
}
