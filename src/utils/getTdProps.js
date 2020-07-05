const handleClickRow = (navigate) => (_, rowInfo) => ({
  onClick: () => {
    navigate(rowInfo?.original?.id)
  },
  style: {
    cursor: 'pointer'
  }
})

export default handleClickRow
