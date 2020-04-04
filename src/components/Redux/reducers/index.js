import { ADD_AUTH } from '../constants/action-types'

const initialState = {
    authUser: null
  };
  
  function rootReducer(state = initialState, action) {
    if (action.type === ADD_AUTH){
        return Object.assign({}, state, {
            authUser: action.payload.authUser
          });
  
    }
    
    return state;
  };
  
  export default rootReducer;