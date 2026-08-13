import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
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

  const handleDragStart = (event) => {
    // console.log('handleDragStart', event)
    setActiveDragItemsId(event?.active?.id)
    setActiveDragItemsTyped(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemsData(event?.active?.data?.current)
  }

  const handleDragEnd = (event) => {
    console.log('handleDragEnd', event)
    const { active, over } = event

    // neu keo ra ngoai thi return tranh loi
    if (!over) return

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
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={mySensors}>
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