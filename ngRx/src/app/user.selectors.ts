import { createFeatureSelector, createSelector } from '@ngrx/store';
import {State,userAdapter} from './user.reducer'

const getUserFeatureState=createFeatureSelector<State>('usersState');

// export const getUsers=createSelector(
//     getUserFeatureState,
//     state=>state
// )
export const { selectAll: getUsers } = userAdapter.getSelectors(
    getUserFeatureState
  );
  export const { selectEntities: getOneUsers } = userAdapter.getSelectors(
    getUserFeatureState
  );

// export const getError=createSelector(
//     getUserFeatureState,
//     state=>state.error
// )




