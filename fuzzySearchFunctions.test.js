import fuzzySearchFunctions from './fuzzySearchFunctions'

describe('fuzzySearch', () => {
  const { fuzzySearch, fuzzySearchOptions } = fuzzySearchFunctions
  it('exists', () => {
    expect(fuzzySearch).toBeDefined()
    expect(fuzzySearchOptions).toBeDefined()
  })

  it('returns expected output', () => {
    expect(fuzzySearch('TYPES', 'HELLO')).toEqual(false)
    expect(fuzzySearch('HELLO THERE', 'THERE')).toEqual(false)

    expect(fuzzySearch('hello', 'HELLO')).toEqual(true)
    expect(fuzzySearch('HELLO', 'HELLO')).toEqual(true)
    expect(fuzzySearch('HEL', 'HELLO')).toEqual(true)
    expect(fuzzySearch('H', 'HELLO')).toEqual(true)
    expect(fuzzySearch('H', 'HELLO')).toEqual(true)
    expect(fuzzySearch('ello', 'HELLO')).toEqual(true)
    expect(fuzzySearch('lo', 'HELLO THERE')).toEqual(true)
    expect(fuzzySearch('ho thr', 'HELLO THERE')).toEqual(true)
  })

  const arrayOfStrings = [
    { key: 'HELLO', value: 'HELLO' },
    { key: 'HELP', value: 'HELP' },
    { key: 'HELPING', value: 'HELPING' },
    { key: 'HOLDING', value: 'HOLDING' },
    { key: 'TYPES', value: 'TYPES' },
    { key: 'LIMITS', value: 'LIMITS' },
    { key: 'LIMITS', value: 'LIMITS' },
    { key: 'LIMITS', value: 'LIMITS' },
    { key: 'LIMITS', value: 'LIMITS' },
    { key: 'LIMITS', value: 'LIMITS' },
    { key: 'LIMITS', value: 'LIMITS' },
    { key: 'LIMITS', value: 'LIMITS' }
  ]

  it('returns expected array', () => {
    expect(fuzzySearchOptions(arrayOfStrings, 'hello', 2)).toEqual([{ value: 'HELLO', key: 'HELLO' }])
    expect(fuzzySearchOptions(arrayOfStrings, 'TYPES', 2).length).toEqual(1)
    expect(fuzzySearchOptions(arrayOfStrings, 'HEL', 2)).toEqual([{ value: 'HELLO', key: 'HELLO' }, { value: 'HELP', key: 'HELP' }])
    expect(fuzzySearchOptions(arrayOfStrings, 'HELLO', 2).length).toEqual(1)
    expect(fuzzySearchOptions(arrayOfStrings, 'HEL', 2).length).toEqual(2)
    expect(fuzzySearchOptions(arrayOfStrings, 'typ', 2).length).toEqual(1)
    expect(fuzzySearchOptions(arrayOfStrings, 'H', 2).length).toEqual(arrayOfStrings.length)
    expect(fuzzySearchOptions(arrayOfStrings, 'H', 10).length).toEqual(arrayOfStrings.length)
    expect(fuzzySearchOptions(arrayOfStrings, 'H', null).length).toEqual(arrayOfStrings.length)
    expect(fuzzySearchOptions(arrayOfStrings, 'H', 0).length).toEqual(arrayOfStrings.length)
    expect(fuzzySearchOptions(arrayOfStrings, 'H', undefined).length).toEqual(arrayOfStrings.length)
  })
})
