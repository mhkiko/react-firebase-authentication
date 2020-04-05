import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import * as ROUTES from '../../constants/routes';
import { useSelector } from 'react-redux'


const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink/>
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};



const SignInFormBase = (props) => {
  const firebase = useSelector(store => store.firebase);
  const [state, setState] = useState( {...INITIAL_STATE} );

  const onSubmit = event => {
    const { email, password } = state;
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setState({ ...INITIAL_STATE });
        props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        setState({ error });
      });
    event.preventDefault();
  };

  const onChange = event => {
    setState ({...state, [event.target.name]: event.target.value })
  };
  
    //const { email, password, error } = state;
    const isInvalid = state.password === '' || state.email === '';
    return (
      <form onSubmit={onSubmit}>
        <input
          name="email"
          value={state.email}
          onChange={onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={state.password}
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        {state.error && <p>{state.error.message}</p>}
      </form>
    );
}

const SignInForm = compose(
  withRouter,
)(SignInFormBase);

export default SignInPage;
export { SignInForm };