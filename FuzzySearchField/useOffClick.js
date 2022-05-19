import { useRef, useEffect } from 'react'

const useOffClick = (handleOffClick, handleOnClick) => {
  const elementRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = ev => {
      if (elementRef.current && !elementRef.current.contains(ev.target)) {
        handleOffClick()
      } else {
        handleOnClick && handleOnClick()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [elementRef, handleOffClick, handleOnClick])

  return { elementRef }
}

export default useOffClick
