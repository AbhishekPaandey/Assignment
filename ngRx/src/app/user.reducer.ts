import { Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {User} from './user'
import {UserActions, UserActionTypes, PostUser} from './user.actions'


export const userFeatureKey = 'usersState';
export  const userAdapter: EntityAdapter<User>=createEntityAdapter<User>()

export interface State extends EntityState<User>{
  // users:User[],
  // error:string,
  // currentUser:User[]
 
}

export const initialState: State =userAdapter.getInitialState( {
  // users:[],
  // error:'',
  // currentUser:[],
});

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {

    case UserActionTypes.LoadUsers:
      return {
        ...state,
      }

    case UserActionTypes.LoadUsersSuccess:
     {
      console.log("inside loaduser success",state);
      console.log("payload data ",action.payload.data);
        return userAdapter.addAll(action.payload.data,state)
        // return {
        //   ...state,
        //   users:action.payload.data,
        //   error:'',
        // }
      }
      case UserActionTypes.EditUser:
        {
         console.log("inside loaduser success Edit",state);
         console.log("payload data ",action.payload.data);
         
           return userAdapter.updateOne({id:action.payload.id,changes:action.payload.data},state)
         }
      
    // case UserActionTypes.GetSingleUser:
        
    //      console.log("inside single user",state);
    //      console.log("payload data of single user",action.payload.data);
         
    //     return {
    //       ...state,
    //       currentUser:action.payload.data,
    //       error:''
    //     }
    // case UserActionTypes.LoadUsersFailure:
    //       return {
    //         ...state,
    //         users:[],
    //         error:action.payload.error,
         
    //       }
    case UserActionTypes.DeleteUser:
          return userAdapter.removeOne(action.payload.id,state)
    // case UserActionTypes.GetUserById:
    //      return {
    //         ...state,
    //   }
    case UserActionTypes.PostUser:
      {
        console.log("inside post user :::",action.payload);
        
        return userAdapter.addOne(action.payload.data,state);
      }
     

    default:
      return state;
  }
}
