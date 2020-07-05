import ApolloClient from 'apollo-boost'
import { toast } from 'react-toastify'

import { getCurrentUser } from '@/utils/session'

const apiUrl = process.env.REACT_APP_API_URL

export const apolloClient = new ApolloClient({
  uri: apiUrl,
  request: (operation) => {
    const currentUser = getCurrentUser()

    if (currentUser) {
      operation.setContext({
        headers: {
          authorization: currentUser.token
        }
      })
    }
  },
  onError: (({ graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        if (!message.includes('uncompletedTasksError: ', 0)) {
          toast.error(message)
        }
      })
    }
  })
})
