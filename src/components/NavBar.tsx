import React from 'react'
import { MenuItem } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { ListObject } from '../reducers/listsReducer';
import { UserObject } from '../reducers/usersReducer';

export interface NavProps { 
  lists: ListObject[],
  users: UserObject[]
}

class NavBar extends React.Component<NavProps> {

  handleChangeAssignedUser = (event: any, child: any) => {
    // const { updateCardAssignedUser, id, listID } = this.props;
    // this.setState({ userAssigned: event.target.value, currentUserId: child.key }, () => {
    //   updateCardAssignedUser(id, child.key, listID);
    // });
  }

  render() {
    const { users } = this.props;
    return (
      <nav className="nav-wrapper red darken-3">
        <div className="container">
          <a className="brand-logo">Task List</a>
          <ul className="right">
            {/* <li><a href="/">Home</a></li>
            <li><a href="/">Task List</a></li> */}
            <FormControl >
              <Select onChange={this.handleChangeAssignedUser} displayEmpty>
                <MenuItem value="" disabled>
                  None
                        </MenuItem>
                {users.map((user: UserObject, index) => {
                  if (user.jobTitle) {
                    return <MenuItem itemProp={user.id + ""} key={user.id} value={user.firstName + " " + user.lastName}> {user.firstName} {user.lastName} </MenuItem>
                  }
                }
                )}
              </Select>
              <FormHelperText>Assign User</FormHelperText>
            </FormControl>

          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state: NavProps) => ({
  lists: state.lists,
  users: state.users,
});

export default connect(mapStateToProps)(NavBar);