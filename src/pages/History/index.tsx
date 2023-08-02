import { HistoryContainer, HistoryList, StatusSpan } from './styles'

export function History() {
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
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 dias</td>
              <td>
                <StatusSpan status="onGoing">Em andamento</StatusSpan>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 dias</td>
              <td>
                <StatusSpan status="onGoing">Em andamento</StatusSpan>
              </td>
            </tr>
            <tr>
              <td>Banana time</td>
              <td>20 minutos</td>
              <td>Há 2 dias</td>
              <td>
                <StatusSpan status="concluded">Concluída</StatusSpan>
              </td>
            </tr>
            <tr>
              <td>Web Dev for monekys</td>
              <td>20 minutos</td>
              <td>Há 2 dias</td>
              <td>
                <StatusSpan status="interrupted">Interrompida</StatusSpan>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
