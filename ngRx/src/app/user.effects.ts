import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {Observable,of} from 'rxjs';
import { Action } from '@ngrx/store';
import * as userActions from './user.actions';
import { MainService} from './main.service';
import {mergeMap,map,catchError, tap} from 'rxjs/operators'
import { dispatch } from 'rxjs/internal/observable/pairs';
import { on } from 'process';



@Injectable()
export class UserEffects {



  constructor(private actions$: Actions,
    private mainService:MainService) {}
  @Effect()
  loadUser$: Observable<Action> =this.actions$.pipe(
    ofType(userActions.UserActionTypes.LoadUsers),
    mergeMap(
      action=>this.mainService.getUser().pipe(
        map(users=>(new userActions.LoadUsersSuccess({data:users}))),
        tap(users=>console.log("data inside box ",users)
        ),
        catchError(err=>of(new userActions.LoadUsersFailure({error:err})))
      )
    )
  )

  @Effect({
    dispatch:false
  })
  EditUser$:any=this.actions$.pipe(
    ofType(userActions.UserActionTypes.EditUser),
    tap(user=>{console.log("users value.....",user["payload"]["data"],user["payload"]["id"]);
    }),
    mergeMap(
      action=>this.mainService.updateUser(action["payload"]["data"],action["payload"]["id"]).pipe(
        tap(users=>console.log("data inside box ",users)
        ),
        catchError(err=>of(new userActions.LoadUsersFailure({error:err})))
      )
    )
   )

  @Effect({
    dispatch:false
  })
  deleteUser$:any=this.actions$.pipe(
    ofType(userActions.UserActionTypes.DeleteUser),
    tap(user=>{console.log("users value.....",user);
    }),
    mergeMap(
      action=>this.mainService.deleteUser(action["payload"]).pipe(
        tap(users=>console.log("data inside box ",users)
        ),
        catchError(err=>of(new userActions.LoadUsersFailure({error:err})))
      )
    )
   )
   @Effect()
  // getUserById$:any=this.actions$.pipe(
  //   ofType(userActions.UserActionTypes.GetUserById),
  //   tap(user=>{console.log("get value ",user)}),
  //   mergeMap(
  //     action=>this.mainService.getByUserId(action["payload"]).pipe(
  //       map(users=>(new userActions.GetSingleUser({data:users}))),

  //       tap(users=>console.log("value of get by id",users)
  //       ),

  //     )
  //   )
  // )
  @Effect({
    dispatch:false
  })
  postUser$:any=this.actions$.pipe(
    ofType(userActions.UserActionTypes.PostUser),
    tap(user=>{console.log("post value ",user)}),
    mergeMap(
      action=>this.mainService.postUser(action["payload"]["data"]).pipe(
        tap(users=>console.log("value of Post ",users)),

      )
    )
  )
      
    
  
}
