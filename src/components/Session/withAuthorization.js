import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return { authUser: state.authUser ,
      firebase: state.firebase
    };
  };

const withAuthorization = condition => Component => {
 
  class WithAuthorization extends React.Component {
    constructor(props){
      super(props);
    }
    
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        },
      );
    }
   
    componentWillUnmount() {
      this.listener();
    }
    
    render() {
      return (
          condition(this.props.authUser) ? <Component {...this.props} /> : null
      );   
    }
  }
  const withAuthorizationConnected = connect(mapStateToProps)(WithAuthorization);

  return compose(
    withRouter,
  )(withAuthorizationConnected);

};


export default withAuthorization;