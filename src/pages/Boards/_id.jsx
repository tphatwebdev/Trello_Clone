import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI, updateBoardDetailsAPI } from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
// import { mockData } from '~/apis/mock-data'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '6a82b3095080dc199a3efc54'
    fetchBoardDetailsAPI(boardId).then((board) => {
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        }
      })
      setBoard(board)
    })
  }, [])

  const createNewColumn = async (newColumnData) => {
    if (!board) return
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
    // tự làm đúng lại state data board (thay vì gọi api fetchBoardDetailsAPI)
    const newBoard = {
      ...board,
      columns: [...board.columns, createdColumn],
      columnOrderIds: [...board.columnOrderIds, createdColumn._id]
    }
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    if (!board) return
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    const newBoard = {
      ...board,
      columns: board.columns.map(column => {
        if (column._id === createdCard.columnId) {
          return {
            ...column,
            cards: [...column.cards, createdCard],
            cardOrderIds: [...column.cardOrderIds, createdCard._id]
          }
        }
        return column
      })
    }
    setBoard(newBoard)
  }

  const moveColumns = async (dndOrderedColumn) => {
    const dndOrderedColumnIds = dndOrderedColumn.map(c => c._id)
    const newBoard = {
      ...board,
      columns: dndOrderedColumn,
      columnOrderIds: dndOrderedColumnIds
    }
    setBoard(newBoard)
    await updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnIds })
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar/>
      <BoardBar board={board}/>
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
      />
    </Container>
  )
}
export default Board