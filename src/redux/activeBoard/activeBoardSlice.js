import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constant'
import { mapOrder } from '~/utils/sorts'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

// khởi tạo giá trị State của 1 slice trong redux
const initialState = {
  currentActiveBoard: null
}

// Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào redux, dùng middleware createAsyncThunk đi kèm với extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
    return response.data
  }
)


// khởi tạo một cái slice trong kho lưu trữ redux store
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // Reducers: nơi xử lý dữ liệu 'đồng bộ'
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      // action.payload là chuẩn đặt tên nhận dữ liệu vào reducer
      const board = action.payload
      // xử lý dữ liệu nếu cần thiết
      // Update lại dữ liệu của cái currentActiveBoard
      state.currentActiveBoard = board
    }
  },
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      // action.payload ở đây chính là response.data trả về ở trên
      let board = action.payload

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
      // Update lại dữ liệu của cái currentActiveBoard
      state.currentActiveBoard = board
    })
  }
})

// Action: là nơi dành cho các components bên dưới gọi tới nó bằng dispatch()
// để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
export const { updateCurrentActiveBoard } = activeBoardSlice.actions

// Selector:
/**
 * Selectors: là nơi dành cho các components bên dưới gọi bằng hook useSelector()
 * để lấy dữ liệu từ trong kho redux store ra sử dụng
*/
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

// export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer