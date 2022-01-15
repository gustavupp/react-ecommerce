import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthenticationContext } from '../context/auth0_context'

const PrivateRoute = ({ children, ...rest }) => {
  const { myUser } = useContext(AuthenticationContext)

  //if the user tries to access the /checkout through the URL while not logged in, he is redirected to the homepage
  return (
    <Route
      {...rest}
      render={() => {
        return myUser ? children : <Redirect to="/" />
      }}
    ></Route>
  )
}

export default PrivateRoute
