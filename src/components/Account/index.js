import React from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import { withAuthorization } from '../Session';
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return { authUser: state.authUser };
  };

const AccountPageConnected = ({authUser}) => (
  <div>
    <h1>Account Page {authUser.email}</h1>
    <PasswordForgetForm />
  </div>
);

const condition = authUser => !!authUser;



const AccountPage = connect(mapStateToProps)(AccountPageConnected);

export default withAuthorization(condition)(AccountPage);