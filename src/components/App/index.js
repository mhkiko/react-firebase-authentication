import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from '../Navigation'
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import { useSelector, useDispatch } from 'react-redux'


import * as ROUTES from '../../constants/routes';
import * as actions from '../Redux/actions'

const App = () => {
    const firebase = useSelector(store => store.firebase);
    const dispatch = useDispatch()

    useEffect(() => {
        firebase.auth.onAuthStateChanged(authUser => {
        authUser
            ? dispatch(actions.addAuth(authUser))
            : dispatch(actions.addAuth(null))
    },);
    })
    
    return (
            <Router>
                <div>
                    <Navigation />
                    <hr />
                    <Route exact path={ROUTES.LANDING} component={LandingPage} />
                    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                    <Route path={ROUTES.HOME} component={HomePage} />
                    <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                    <Route path={ROUTES.ADMIN} component={AdminPage} />
                </div>
            </Router>  
        )
    }


export default App;