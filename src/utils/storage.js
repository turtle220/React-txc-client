export const setItemStorage = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data))
}

export const getItemStorage = (key) => (
  JSON.parse(sessionStorage.getItem(key))
)

export const clearStorage = () => sessionStorage.clear()
