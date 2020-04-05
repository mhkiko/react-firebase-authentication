import React from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import { withAuthorization } from '../Session';
import { useSelector } from 'react-redux'

const AccountPage = () => {
  const authUser = useSelector(state => state.authUser)

  return (
    <div>
      <h1>Account Page {authUser.email}</h1>
      <PasswordForgetForm />
    </div>

  )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);