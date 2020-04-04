import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from "react-redux";
import { addAuth } from "../Redux/actions/index";
import Navigation from '../Navigation'
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

function mapDispatchToProps(dispatch) {
    return {
      addAuth: authUser => dispatch(addAuth(authUser))
    };
  }

class ConnectedApp extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount(){
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.props.addAuth({ authUser})
                : this.props.addAuth({ authUser: null });
        },);
    }

    componentWillUnmount() {
        this.listener();
      }
    

    render() {
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
}

const App = connect(
    null,
    mapDispatchToProps
  )(ConnectedApp);

export default withFirebase(App);