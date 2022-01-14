import React, { useContext } from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { BiLogIn, BiLogOut } from 'react-icons/bi'
import { AuthenticationContext } from '../context/auth0_context'
//css
import '../styles/userAuth.css'

const UserAuth = () => {
  const { loginWithRedirect, logout, myUser } = useContext(
    AuthenticationContext
  )

  return (
    <>
      {myUser ? (
        <div
          className="login-logout-container"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          <button className="user-btn">
            <BiLogOut />
          </button>
          <div>
            <p>logout</p>
          </div>
        </div>
      ) : (
        <div className="login-logout-container" onClick={loginWithRedirect}>
          <button className="user-btn">
            <BiLogIn />
          </button>
          <div>
            <p>login</p>
          </div>
        </div>
      )}
    </>
  )
}

export default UserAuth
