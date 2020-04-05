import { ADD_AUTH } from '../constants/action-types'
import Firebase from '../../Firebase/firebase'

const initialState = {
    authUser: null,
    firebase: new Firebase()
  };
  
  function rootReducer(state = initialState, action) {
    if (action.type === ADD_AUTH){
        return Object.assign({}, state, {
            authUser: action.payload
          });
  
    }
    
    return state;
  };
  
  export default rootReducer;