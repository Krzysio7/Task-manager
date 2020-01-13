export enum ListActions {
  ADD_CARD,
  ADD_LIST,
  FETCH_DATA,
  DRAG_HAPPENED,
  DELETE_CARD,
  DELETE_LIST
}

export enum UsersActions { 
  FETCH_USERS,
}

export * from './listActions';
export * from './cardsActions';
export * from './usersActions';