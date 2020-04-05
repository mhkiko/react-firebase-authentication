import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut'
import * as ROUTES from '../../constants/routes';
import { useSelector } from 'react-redux'


const Navigation = () => {
    const authUser = useSelector(store => store.authUser);
    return (
      <div>{ authUser ? <NavigationAuth /> : <NavigationNonAuth /> }</div>
    );
}

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


export default Navigation;