import { useContext } from 'react'
import { HistoryContainer, HistoryList, HistoryTable, Status } from './styles'
import { CountdownContext } from '../Home'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export function History() {
  const { cycles } = useContext(CountdownContext)

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <HistoryTable>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{`${cycle.minutesAmount} ${
                  cycle.minutesAmount > 1 ? 'minutos' : 'minuto'
                }`}</td>
                <td>
                  {formatDistanceToNow(cycle.startedAt, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {cycle.finishedDate ? (
                    <Status statusColor="green">Concluído</Status>
                  ) : cycle.interruptedDate ? (
                    <Status statusColor="red">Interrompido</Status>
                  ) : (
                    <Status statusColor="yellow">Em andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </HistoryTable>
      </HistoryList>
    </HistoryContainer>
  )
}
