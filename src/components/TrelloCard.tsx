import { Card, CardContent, Icon, Typography } from "@material-ui/core";
import React from "react";
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { deleteCard } from '../actions';
import styles from './TrelloCard.module.css';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { UserObject } from "../reducers/usersReducer";

interface CardProps {
  text: string;
  id: number;
  index: number;
  deleteCard?: any;
  listID: number;
  users: UserObject[];
}

class TrelloCard extends React.Component<CardProps> {

  state = {
    editModeEnabled: false,
    userAssigned: ""
  }

  private inputRef: any;

  deleteCard = (id: number, listID: number) => {
    const { deleteCard } = this.props;
    deleteCard(id, listID)

  }

  handleClick = () => {
    this.setState({ editModeEnabled: !this.state.editModeEnabled });
  }
  
  handleChangeAssignedUser = (event: any) => { 
    this.setState({userAssigned: event.target.value})
  }

  render() {
    const { users } = this.props;
    return (
      <Draggable draggableId={String(this.props.id)} index={this.props.index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card className={styles.cardContainer}>
              <CardContent >
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <div className={styles.inputContainer} style={{
                    boxShadow: this.state.editModeEnabled ? "inset 0 0 1em #c0c0c0" : 'none',
                    border: this.state.editModeEnabled ? "1px solid #c0c0c0" : 'none'
                  }}>

                    <textarea value={this.props.text} disabled={!this.state.editModeEnabled}
                      className={styles.textareaDescription}
                      style={{ pointerEvents: this.state.editModeEnabled ? 'auto' : 'none' }} />
                    <a href="/usercard">{this.state.userAssigned}</a>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Icon style={{ cursor: 'pointer' }} onClick={this.handleClick}>edit</Icon>
                    <FormControl >
                      <Select onChange={this.handleChangeAssignedUser} displayEmpty>
                        <MenuItem value="" disabled>
                          None
                        </MenuItem>
                        {users.map((user, index) => {
                          if (user.jobTitle) {
                            return <MenuItem  key={user.id} value={user.firstName + " " + user.lastName}> {user.firstName} {user.lastName} </MenuItem>
                          }
                        }
                        )}
                      </Select>
                      <FormHelperText>Assign User</FormHelperText>
                    </FormControl>
                  </div>
                </div>
              </CardContent>
              <Icon style={{ cursor: 'pointer', color: 'red' }}
                onClick={() => this.deleteCard(this.props.id, this.props.listID)}>
                close</Icon>
            </Card>
          </div>
        )}
      </Draggable>
    );
  }

}



export default connect(null, { deleteCard })(TrelloCard)