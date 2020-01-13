import { UsersActions } from '../actions';

export interface UserObject {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  avatar: string;
  description: string;
  jobTitle: string;
  lat: string;
  lng: string;
  postalCode: string;
  street: string;
  city: string;
}

const usersReducer = (state: UserObject[] = [], action: any) => {
  switch (action.type) {
    case UsersActions.FETCH_USERS:
      {
        let payload:UserObject[] = action.payload;
        const initialUsers: UserObject[] = [];
        
        payload.forEach((element : any) => {
          let tempUser: UserObject = {
            id: element.id,
            firstName: element.first_name,
            lastName: element.last_name,
            email: element.email,
            gender: element.gender,
            avatar: element.avatar,
            description: element.description,
            jobTitle: element.job_title,
            lat: element.lat,
            lng: element.lng,
            postalCode: element.postal_code,
            street: element.street,
            city: element.city
          } 
          initialUsers.push(tempUser);
        });
        return initialUsers;
      }
    default: return state;
  };
}
export default usersReducer;