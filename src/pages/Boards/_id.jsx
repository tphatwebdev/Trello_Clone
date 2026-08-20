import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import {
  fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI,
  deleteColumnDetailsAPI
} from '~/apis'
import { mapOrder } from '~/utils/sorts'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'


// import { mockData } from '~/apis/mock-data'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '6a82b3095080dc199a3efc54'
    fetchBoardDetailsAPI(boardId).then((board) => {

      // sắp xếp lại thứ tự column trước khi truyền props
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
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
          // Nếu column rỗng (đang chứa PlaceholderCard)
          const isColumnEmpty = column.cards.some(card => card.FE_PlaceholderCard)
          return {
            ...column,
            cards: isColumnEmpty ? [createdCard] : [...column.cards, createdCard],
            cardOrderIds: isColumnEmpty ? [createdCard._id] : [...column.cardOrderIds, createdCard._id]
          }
        }
        return column
      })
    }
    setBoard(newBoard)
  }

  const moveColumns = (dndOrderedColumn) => {
    // Update cho chuẩn dữ liệu state board
    const dndOrderedColumnIds = dndOrderedColumn.map(c => c._id)
    const newBoard = {
      ...board,
      columns: dndOrderedColumn,
      columnOrderIds: dndOrderedColumnIds
    }
    setBoard(newBoard)
    // gọi api update board
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnIds })
  }
  // chỉ cần gọi API cập nhật mảng cardOrderIds của column chứa nó
  const moveCardInTheSameColumn = (dndOrderedCards, dndOderedCardIds, columnId) => {
    // Update cho chuẩn dữ liệu state board
    const newBoard = {
      ...board,
      columns: board.columns.map(column => {
        if (column._id === columnId) {
          return {
            ...column,
            cards: dndOrderedCards,
            cardOrderIds: dndOderedCardIds
          }
        }
        return column
      })
    }
    setBoard(newBoard)
    // gọi api update board
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOderedCardIds })
  }

  /**
   * Khi di chuyển card sang column khác:
   * B1: cập nhật mảng cardOrderIds của column ban đầu(xoá _id ra khỏi mảng)
   * B2: cập nhật mảng cardOrderIds tiếp theo(thêm _id của card vào mảng)
   * B3: cập nhật lại columnId mới của card đã kéo
   * => làm 1 api support riêng
   */
  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumn) => {
    // Update cho chuẩn dữ liệu state board
    const dndOrderedColumnIds = dndOrderedColumn.map(c => c._id)
    const newBoard = {
      ...board,
      columns: dndOrderedColumn,
      columnOrderIds: dndOrderedColumnIds
    }
    setBoard(newBoard)
    // gọi API xử lý phía BE
    let prevCardOrderIds = dndOrderedColumn.find(c => c._id === prevColumnId)?.cardOrderIds
    // xử lí vấn đề khi kéo card cuối cùng ra khỏi column rỗng
    // xoá nó đi trước khi gửi lên BE
    if (prevCardOrderIds[0].includes('placehoder-card')) prevCardOrderIds = []
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumn.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }

  // xử lý xoá 1 column và cards trong nó
  const deleteColumnDetails = (columnId) => {
    // update cho chuẩn dữ liệu state board
    const newBoard = {
      ...board,
      columns: board.columns.filter(c => c._id !== columnId),
      columnOrderIds: board.columnOrderIds.filter(_id => _id !== columnId)
    }
    setBoard(newBoard)
    // gọi API xử lý phía BE
    deleteColumnDetailsAPI(columnId).then(res => {
      toast.success(res?.deleteResult)
    })
  }

  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh'
      }}>
        <CircularProgress aria-label="Loading…" />
        <Typography>Loading Board...</Typography>
      </Box>
    )
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
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
        deleteColumnDetails={deleteColumnDetails}
      />
    </Container>
  )
}
export default Board
