import React, { useReducer } from 'react'

const UP = 'UP'
const DOWN = 'DOWN'
const RESET = 'RESET'

export const context = React.createContext(0)

const up = total => ({ type: UP, total })

const down = total => ({ type: DOWN, total })

const reset = () => ({ type: RESET })

const increment = (index, total) => Math.min(((index || 0) + 1), total - 1)

const decrement = (index, total) => {
  if (total === 1) return 0
  return Math.max(((index || 0) - 1), 0)
}

const reducer = (state, action) => {
  state = state || 0
  switch (action.type) {
    case UP: return decrement(state, action.total)
    case DOWN: return increment(state, action.total)
    case RESET: return 0
    default: return state
  }
}

const navKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

const KeyNavigator = ({ children, getTotal, onCancel, onSelect }) => {
  const [index, dispatch] = useReducer(reducer, 0)

  const onKeyDown = event => {
    if (!navKeys.includes(event.key)) {
      dispatch(reset())
    }

    if (event.key === 'Escape') {
      onCancel()
      return
    }

    if (!getTotal()) return

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault()
        dispatch(up(getTotal()))
        return
      case 'ArrowDown':
        event.preventDefault()
        dispatch(down(getTotal()))
        return
      case 'Tab':
        event.preventDefault()
        if (event.shiftKey) {
          dispatch(up())
        } else {
          dispatch(down(getTotal()))
        }
        return
      case 'Enter':
        event.preventDefault()
        if (index > getTotal()) return
        onSelect(index)
        break
      default:
    }
  }

  return (
    <context.Provider value={index}>
      <div tabIndex='0' onKeyDown={onKeyDown}>
        {children}
      </div>
    </context.Provider>
  )
}

export default KeyNavigator
