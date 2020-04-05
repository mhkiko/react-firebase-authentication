import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { useSelector } from 'react-redux'
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

const SignUpFormBase = (props) => {

  const firebase = useSelector(store => store.firebase);
  const [state, setState] = useState( {...INITIAL_STATE} );
  const [isInvalid, setIsInvalid] = useState(true)

  const onSubmit = event => {
    const { username, email, passwordOne } = state;
    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then(() => {
        setState({ ...INITIAL_STATE });
        props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        setState({...state, error: error });
      });
    event.preventDefault();
  }

  const onChange = event => {
      setState({ ...state, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    setIsInvalid(state.passwordOne !== state.passwordTwo || state.passwordOne === '' || state.email === '' || state.username === '')
  })

    return (
        <form onSubmit={onSubmit}>
            <input
            name="username"
            value={state.username}
            onChange={onChange}
            type="text"
            placeholder="Full Name"
            />
            <input
            name="email"
            value={state.email}
            onChange={onChange}
            type="text"
            placeholder="Email Address"
            />
            <input
            name="passwordOne"
            value={state.passwordOne}
            onChange={onChange}
            type="password"
            placeholder="Password"
            />
            <input
            name="passwordTwo"
            value={state.passwordTwo}
            onChange={onChange}
            type="password"
            placeholder="Confirm Password"
            />
            <button disabled={isInvalid} type="submit">Sign Up</button>
            {state.error && <p>{state.error.message}</p>}
      </form>
    );
  }


const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
    withRouter
  )(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };