import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut'
import * as ROUTES from '../../constants/routes';
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return { authUser: state.authUser };
};

const ConnectedNavigation = ({ authUser }) => (
  <div>{ authUser ? <NavigationAuth /> : <NavigationNonAuth /> }</div>
)

const NavigationAuth = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  </div>
);

const NavigationNonAuth = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
    </ul>
  </div>
);

const Navigation = connect(mapStateToProps)(ConnectedNavigation);

export default Navigation;