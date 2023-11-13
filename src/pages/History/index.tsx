import { useContext } from 'react'
import { HistoryContainer, HistoryList, StatusSpan } from './styles'
import { formatDistanceToNow } from 'date-fns'
import { CyclesContext } from '../../contexts/CyclesContext'
import ptBR from 'date-fns/locale/pt-BR'

export function History() {
  const { cycles } = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <h1>Thaiza - Histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycles) => (
              <tr key={cycles.id}>
                <td>{cycles.task}</td>
                <td>{cycles.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(cycles.startDate, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {cycles.finishedDate && (
                    <StatusSpan status="concluded">Concluído</StatusSpan>
                  )}
                  {cycles.interrupetdDate && (
                    <StatusSpan status="interrupted">Interrompido</StatusSpan>
                  )}
                  {!cycles.finishedDate && !cycles.interrupetdDate && (
                    <StatusSpan status="onGoing">Em andamento</StatusSpan>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
