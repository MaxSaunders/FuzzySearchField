const fuzzySearch = (searchString = '', valueString = '') =>
  new RegExp(searchString.split('').join('.*').toUpperCase()).test(valueString.toUpperCase())

const fuzzySearchOptions = (array, searchTerm, limit) => {
  if (searchTerm.length < 3) return array

  let count = 0
  return array.filter(entry => {
    if (count < limit) {
      const { label, value } = entry
      if (fuzzySearch(searchTerm, label) || fuzzySearch(searchTerm, value)) {
        count++
        return true
      }
    }
    return false
  })
}

const fuzzySearchFunctions = {
  fuzzySearchOptions,
  fuzzySearch
}

export default fuzzySearchFunctions
