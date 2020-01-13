import { UsersActions } from ".";
import { Client } from "../services";


export const fetchUsers = () => async (dispatch: any) => {

  let users = await Client.getUsers();
  console.log(users.data);
  if (users.status) {
    dispatch({
      type: UsersActions.FETCH_USERS,
      payload: users.data
    });
  } else { 

  }

}