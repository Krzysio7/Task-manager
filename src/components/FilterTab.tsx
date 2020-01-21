import React from 'react'
import { updateFilter } from '../actions'
import { MenuItem, InputLabel } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { ListObject } from '../reducers/listsReducer';
import { UserObject } from '../reducers/usersReducer';
import styles from './FilterTab.module.css';

export interface FilterTabProps {
  lists: { lists: ListObject[], filter: any },
  users: UserObject[],
  updateFilter: any
}

class FilterTab extends React.Component<FilterTabProps> {

  handleChangeAssignedUser = (event: any, child: any) => {
   
    const { updateFilter } = this.props;
    updateFilter(child.key)
  }
  render() {
    const { users } = this.props;
    return (
      <div className={styles.mainFilterContainer}>
        <FormControl variant="filled" className={styles.formContainer} >
          <InputLabel id="demo-simple-select-filled-label">User</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            onChange={this.handleChangeAssignedUser}
          >
            <MenuItem value="">
              <em>Any</em>
            </MenuItem>
            {
              users.map((user: UserObject, index) => {
              if (user.jobTitle) {
                return <MenuItem itemProp={user.id + ""} key={user.id}
                  value={user.firstName + " " + user.lastName}>
                  {user.firstName} {user.lastName} </MenuItem>
              }
            }
            )}
          </Select>
        </FormControl>
      </div>
    )
  }
}

const mapStateToProps = (state: FilterTabProps) => ({
  lists: state.lists,
  users: state.users,
});

export default connect(mapStateToProps, { updateFilter })(FilterTab);