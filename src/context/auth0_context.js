import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const AuthenticationContext = React.createContext()

const AuthenticationProvider = ({ children }) => {
  const [myUser, setMyUser] = useState(null)
  const { logout, loginWithRedirect, user, isAuthenticated, isLoading } =
    useAuth0()

  useEffect(() => {
    if (isAuthenticated) setMyUser(user)
    else setMyUser(false)

    console.log({ user, isAuthenticated, isLoading })
  }, [isAuthenticated])

  return (
    <AuthenticationContext.Provider
      value={{ logout, loginWithRedirect, myUser }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

export { AuthenticationProvider, AuthenticationContext }
