import React from 'react';
import { useSelector } from 'react-redux'

const SignOutButton = () => {
  const firebase = useSelector(state => state.firebase)

  return(
    <button type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>

  )
}

export default SignOutButton;