import { getItemStorage, setItemStorage } from '@/utils/storage'
import { USER_LOGGED } from '@/constants/defaultValues'

export const getCurrentUser = () => getItemStorage(USER_LOGGED)

export const setCurrentUser = (data) => {
  setItemStorage(USER_LOGGED, data)
}
