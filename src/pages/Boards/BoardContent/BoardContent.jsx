import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision
} from '@dnd-kit/core'
import { useState, useRef, useCallback } from 'react'
import { cloneDeep } from 'lodash'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import CardTrello from './ListColumns/Column/ListCards/CardTrello/CardTrello'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

const BoardContent = ({ board }) => {
  // yeu cau chuot di chuyen 10px moi kich hoat event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  // nhan giu 250ms va dung sai cua cam ung thi kich hoat event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  // Uu tien su dung 2 loai sensor la mouseSensor, touchSensor de co ux tot tren mobile
  const mySensors = useSensors(mouseSensor, touchSensor)

  // Khởi tạo state ban đầu cho danh sách column đã được sắp xếp.
  // Sử dụng callback () => ... (Lazy Initial State) để hàm sắp xếp `mapOrder`
  // chỉ chạy DUY NHẤT một lần khi component vừa được tạo (mount), tránh chạy lại mỗi khi re-render.
  const [orderedColumn, setOrderedColumn] = useState(() => {
    return mapOrder(board?.columns, board?.columnOrderIds, '_id')
  })
  // Kỹ thuật "Adjusting state when a prop changes" (Đồng bộ state khi props thay đổi):
  // So sánh trực tiếp trong quá trình render (render phase). Nếu `board` truyền từ component cha
  // đã bị thay đổi (ví dụ: dữ liệu được fetch mới từ API hoặc cập nhật từ bên ngoài):
  const [prevBoard, setPrevBoard] = useState(board)
  if (board !== prevBoard) {
    setPrevBoard(board) // Cập nhật lại board cũ để dùng cho lần so sánh render kế tiếp
    setOrderedColumn(mapOrder(board?.columns, board?.columnOrderIds, '_id')) // Sắp xếp lại danh sách columns theo dữ liệu board mới
  }
  // cung` 1 thoi diem chi co 1 phan tu dang duoc keo tha(column hoac card)
  const [activeDragItemsId, setActiveDragItemsId] = useState(null)
  const [activeDragItemsType, setActiveDragItemsTyped] = useState(null)
  const [activeDragItemsData, setActiveDragItemsData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  // Ref để track giá trị overId cuối cùng phục vụ cho việc tính toán va chạm
  const lastOverId = useRef(null)


  const findColumnByCardId = (cardId) => {
    return orderedColumn.find(column => column.cards.map(card => card._id)?.includes(cardId))
  }

  // Custom collision detection strategy để sửa bug flickering và lặp vô tận (infinite re-render)
  const customCollisionDetection = useCallback((args) => {
    // 1. Nếu đang kéo Column thì dùng closestCorners chuẩn hơn
    if (activeDragItemsType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }

    // 2. Tìm các điểm giao nhau, va chạm (intersections) với con trỏ pointer
    const pointerCollisions = pointerWithin(args)

    // Nếu pointerCollisions là rỗng (kéo ra ngoài hoặc khoảng trống giữa các column)
    // thì trả về lastOverId cũ để giữ cho card không bị nhảy (flicker)
    if (!pointerCollisions?.length) {
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    }

    // 3. Tìm overId đầu tiên trong danh sách pointerCollisions
    let overId = getFirstCollision(pointerCollisions, 'id')

    if (overId) {
      // Nếu overId là một Column, ta sẽ tìm cardId gần nhất trong Column đó
      const checkColumn = orderedColumn.find(c => c._id === overId)
      if (checkColumn) {
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            c => c.id !== overId && checkColumn.cardOrderIds?.includes(c.id)
          )
        })[0]?.id
      }

      lastOverId.current = overId
      return [{ id: overId }]
    }

    // Fallback trả về lastOverId nếu có
    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemsType, orderedColumn])


  const handleDragStart = (event) => {
    setActiveDragItemsId(event?.active?.id)
    setActiveDragItemsTyped(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemsData(event?.active?.data?.current)

    // Nếu là kéo card thì mới thực hiện hành động set giá trị oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  // trigger trong qua trinh keo 1 phan tu
  const handleDragOver = (event) => {
    // khong lam gi them khi dang keo
    if (activeDragItemsType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // con neu keo card thi xu ly them de co the keo card giua cac column
    const { active, over } = event
    if (!active || !over) return
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over

    // tim 2 column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    // Xu ly khi 'KEO CARD' qua 2 column khac nhau, con` neu' keo' card trong chinh column thi khong lam gi
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumn(prevColumns => {
        // tim` vi tri' (index) cua cai' card chuan bi duoc thả (overCard)
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        // logic tinh toan 'card index mới' trên hoặc dưới của overCard
        let newCardIndex
        const isBelowOverItem = active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0

        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        // Clone 'orderedColumn' ra array moi' de xu ly data roi` return orderedColumn moi'
        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        // nextActiveColumn: column cũ
        if (nextActiveColumn) {
          // xoa' card ở column active
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

          // cap nhat lai array cardOderIds cho chuan du lieu
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }

        // nextOverColumn: column mới
        if (nextOverColumn) {
          // kiểm tra xem card đang kéo có tồn tại ở column mới chưa, nếu có thì xoá trước
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

          // Tiếp theo là thêm card đang kéo vào column đó theo vị trí index
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

          // cap nhat lai array cardOderIds cho chuan du lieu
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }

        return nextColumns
      })
    }
  }

  // khi keo' card hoac column xong xuoi.
  const handleDragEnd = (event) => {
    const { active, over } = event

    // neu keo ra ngoai thi return tranh loi
    if (!active || !over) return

    // Xử lý kéo thả Card
    if (activeDragItemsType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over

      // tim 2 column theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      // hành động kéo thả card giữa 2 column khác nhau
      // phải dùng tới activeDragItemData.columnId hoặc oldColumnWhenDraggingCard._id (đã set vào state ở bước handleDragStart)
      // chứ không phải activeData trong Scope handleDragEnd này
      // vì khi đi qua onDragOver tới đây là state của card đã bị cập nhật 1 lần rồi
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        console.log('hanh dong keo tha card giua 2 column khac nhau')
      } else {
        // kéo thả card trong cùng 1 column

        // lấy vị trí cũ từ thằng oldColumnWhenDraggingCard
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemsId) //Lay vi tri cu tu active
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId) //Lay vi tri moi tu over

        // Dung arrayMove de sap xep lai array cards ban dau
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumn(prevColumns => {
          // Clone 'orderedColumn' ra array moi' de xu ly data roi` return orderedColumn moi'
          const nextColumns = cloneDeep(prevColumns)

          // Tìm tới cái column mà chúng ta đang thả
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)

          // Cập nhật lại 2 giá trị mới là card và cardOrderIds trong cái targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
          return nextColumns
        })
      }
    }

    // Xử lý kéo thả Column
    if (activeDragItemsType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumn.findIndex(c => c._id === active.id) //Lay vi tri cu tu active
        const newColumnIndex = orderedColumn.findIndex(c => c._id === over.id) //Lay vi tri moi tu over

        // Dung arrayMove de sap xep lai array columns ban dau
        const dndOrderedColumn = arrayMove(orderedColumn, oldColumnIndex, newColumnIndex)
        setOrderedColumn(dndOrderedColumn)
      }
    }

    // Sau khi kéo thả xong, reset toàn bộ state kéo thả và ref tracking
    setActiveDragItemsId(null)
    setActiveDragItemsTyped(null)
    setActiveDragItemsData(null)
    lastOverId.current = null
    setOldColumnWhenDraggingCard(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext
      sensors={mySensors}
      // thuật toán phát hiện va chạm tùy chỉnh để hỗ trợ kéo thả card giữa các columns mượt mà, tránh lặp vô tận
      collisionDetection={customCollisionDetection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={(theme) => ({
        bgcolor: '#1976d2',
        ...theme.applyStyles('dark', {
          bgcolor: '#31495e'
        }),
        width: '100%',
        height: theme.trello.boardContentHeight,
        p: '10px 0'
      })}>
        <ListColumns columns={orderedColumn}/>
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemsType && null}
          {(activeDragItemsType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemsData}/>}
          {(activeDragItemsType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <CardTrello card={activeDragItemsData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent