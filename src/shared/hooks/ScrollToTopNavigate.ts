import { useEffect } from 'react'
import { useLocation, useMatch } from 'react-router-dom'

function ScrollToTopOnNavigate() {
  const { pathname } = useLocation()
  const match = useMatch('/sorvetes/:idOrName')

  useEffect(() => {
    if (!match) {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}

export default ScrollToTopOnNavigate
