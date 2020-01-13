import { UsersActions } from ".";
import { Client } from "../services";
import { UserObject } from "../reducers/usersReducer";


export const fetchUsers = () => async (dispatch: any) => {

  let users = await Client.getUsers();
  if (users.status) {
    dispatch({
      type: UsersActions.FETCH_USERS,
      payload: users.data
    });
  } else {

  }
}

export const getUserById = (id: number, users: UserObject[]) => async (dispatch: any) => {
  console.log(id)

  const user = await users.filter((item, index) => item.id == id);
  return user[0];
} 