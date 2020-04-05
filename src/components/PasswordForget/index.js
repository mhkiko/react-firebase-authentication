import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { useSelector } from 'react-redux'


const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

const PasswordForgetForm = () => {
  const [state, setState] = useState({ ...INITIAL_STATE})
  const firebase = useSelector(state => state.firebase)
  const [isInvalid, setIsInvalid] = useState(true)

  const onSubmit = event => {
    const { email } = state;
    firebase
      .doPasswordReset(email)
      .then(() => {
        setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        setState({...state, error: error });
      });
    event.preventDefault();
  };

  const onChange = event => {
    setState({...state, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    setIsInvalid(state.email === '')
  })
    return (
      <form onSubmit={onSubmit}>
        <input
          name="email"
          value={state.email}
          onChange={onChange}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>
        {state.error && <p>{state.error.message}</p>}
      </form>
    );
  
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;
export { PasswordForgetForm, PasswordForgetLink };