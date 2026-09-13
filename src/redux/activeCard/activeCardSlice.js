import { createSlice } from '@reduxjs/toolkit'


// khởi tạo giá trị State của 1 slice trong redux
const initialState = {
  currentActiveCard: null,
  isShowModalActiveCard: false,
  isFocusComment: false
}

// khởi tạo một cái slice trong kho lưu trữ redux store
export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  // Reducers: nơi xử lý dữ liệu 'đồng bộ'
  reducers: {
    // lưu ý: ở đây cần cặp ngoặc nhọn cho function trong reducer cho dù code bên trong chỉ có 1 dòng vì đây là rule của redux
    showModalActiveCard: (state, action) => {
      state.isShowModalActiveCard = true
      // Nếu có truyền { focusComment: true } thì bật cờ
      state.isFocusComment = !!action.payload?.focusComment
    },
    resetFocusComment: (state) => {
      state.isFocusComment = false
    },
    // clear data và đóng modal activeCard
    clearAndHideCurrentActiveCard: (state) => {
      state.currentActiveCard = null
      state.isShowModalActiveCard = false
      state.isFocusComment = false
    },
    updateCurrentActiveCard: (state, action) => {
      const fullCard = action.payload
      // update lại dữ liệu currentActiveCard trong redux
      state.currentActiveCard = fullCard
    }
  },
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {}
})

// Action: là nơi dành cho các components bên dưới gọi tới nó bằng dispatch()
// để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
export const {
  clearAndHideCurrentActiveCard,
  updateCurrentActiveCard,
  showModalActiveCard,
  resetFocusComment
} = activeCardSlice.actions

// Selector:
/**
 * Selectors: là nơi dành cho các components bên dưới gọi bằng hook useSelector()
 * để lấy dữ liệu từ trong kho redux store ra sử dụng
*/
export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard
}

export const selectIsShowModalActiveCard = (state) => {
  return state.activeCard.isShowModalActiveCard
}

export const selectIsFocusComment = (state) => {
  return state.activeCard.isFocusComment
}

export const activeCardReducer = activeCardSlice.reducer