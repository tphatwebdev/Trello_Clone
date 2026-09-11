// cấu hình socket-io ở client và export ra biến socketIoInstance
import { io } from 'socket.io-client'
import { API_ROOT } from '~/utils/constant'
export const socketIoInstance = io(API_ROOT)
