import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
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

  const [orderedColumn, setOrderedColumn] = useState([])

  // cung` 1 thoi diem chi co 1 phan tu dang duoc keo tha(column hoac card)
  const [activeDragItemsId, setActiveDragItemsId] = useState(null)
  const [activeDragItemsType, setActiveDragItemsTyped] = useState(null)
  const [activeDragItemsData, setActiveDragItemsData] = useState(null)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrderedColumn(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumn.find(column => column.cards.map(card => card._id)?.includes(cardId))
  }


  const handleDragStart = (event) => {
    // console.log('handleDragStart', event)
    setActiveDragItemsId(event?.active?.id)
    setActiveDragItemsTyped(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemsData(event?.active?.data?.current)
  }

  // trigger trong qua trinh keo 1 phan tu
  const handleDragOver = (event) => {
    // khong lam gi them khi dang keo
    if (activeDragItemsType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // con neu keo card thi xu ly them de co the keo card giua cac column
    // console.log('handleDragOver', event)
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
    // console.log('handleDragEnd', event)
    if (activeDragItemsType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('keo tha card khong lam gi cal')
      return
    }
    const { active, over } = event

    // neu keo ra ngoai thi return tranh loi
    if (!active || !over) return

    if (active.id !== over.id) {
      const oldIndex = orderedColumn.findIndex(c => c._id === active.id) //Lay vi tri cu tu active
      const newIndex = orderedColumn.findIndex(c => c._id === over.id) //Lay vi tri moi tu over

      // Dung arrayMove de sap xep lai array columns ban dau
      const dndOrderedColumn = arrayMove(orderedColumn, oldIndex, newIndex)
      setOrderedColumn(dndOrderedColumn)
    }
    setActiveDragItemsId(null)
    setActiveDragItemsTyped(null)
    setActiveDragItemsData(null)
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