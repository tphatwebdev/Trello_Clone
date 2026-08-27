import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'
import { userReducer } from './user/userSlice'
import { combineReducers } from 'redux'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/es/storage'

// cấu hình persist
const rootPersistConfig = {
  key: 'root', // key của persist do ta chỉ định, mặc định là root
  storage: storage, // biến storage ở trên lưu vào localstorage
  whitelist: ['user'] // định nghĩa các slide dữ liệu được phép duy trì mỗi lần f5 trình duyệt
  // blacklist: ['user'] // định nghĩa các slide dữ liệu không được phép duy trì mỗi lần f5 trình duyệt
}

const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer
})

const persistedReducers = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] // hoac ignore action: false
      }
    })
})
