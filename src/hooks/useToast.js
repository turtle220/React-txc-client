import { toast } from 'react-toastify'

const useToast = () => {
  const showToast = (type, message) => {
    toast[type](message)
  }

  return showToast
}

export default useToast
