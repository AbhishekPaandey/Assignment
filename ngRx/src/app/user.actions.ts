import { Action } from '@ngrx/store';
import {User} from './user';
import { from } from 'rxjs';

export enum UserActionTypes {
  LoadUsers = '[User] Load Users',
  LoadUsersSuccess = '[User] Load Users Success',
  LoadUsersFailure = '[User] Load Users Failure',
  PostUser='[User] Post User Success',
  DeleteUser='[User] Delete User Success',
  EditUser='[User] Edit User Success ',
 
}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LoadUsers;
}


export class LoadUsersSuccess implements Action {
  readonly type = UserActionTypes.LoadUsersSuccess;
  constructor(public payload: { data: User[] }) { }
}

export class PostUser implements Action {
  readonly type = UserActionTypes.PostUser;
  constructor(public payload: { data: User }) { }
}
export class DeleteUser implements Action {
  readonly type = UserActionTypes.DeleteUser;
  constructor(public payload: { id:string }) { }
}
export class EditUser implements Action {
  readonly type = UserActionTypes.EditUser;
  constructor(public payload: { data:Partial<User>,id:string }) { }
}
// export class GetUserById implements Action {
//   readonly type = UserActionTypes.GetUserById;
//   constructor(public payload: { id:string }) { }
// }

export class LoadUsersFailure implements Action {
  readonly type = UserActionTypes.LoadUsersFailure;
  constructor(public payload: { error: any }) { }
}

export type UserActions = LoadUsers | LoadUsersSuccess | LoadUsersFailure | DeleteUser | EditUser | PostUser

