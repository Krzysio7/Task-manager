import { Card, CardContent, Icon, Typography } from "@material-ui/core";
import React from "react";
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { deleteCard, updateCardAssignedUser, getUserById, updateCardText, updateFavouriteStatus } from '../actions';
import styles from './TrelloCard.module.css';
import { MenuItem } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { UserObject } from "../reducers/usersReducer";
import { Link } from "react-router-dom";

interface CardProps {
  text: string;
  id: number;
  index: number;
  deleteCard?: any;
  listID: number;
  users: UserObject[];
  updateCardAssignedUser: any;
  getUserById: any;
  userId: number;
  updateCardText: any;
  date: string;
  updateFavouriteStatus: any;
  isFavourite: boolean;
}

class TrelloCard extends React.Component<CardProps> {

  state = {
    editModeEnabled: false,
    userAssigned: "",
    currentUserId: undefined,
    cardText: '',
    isFavourite: false
  }

  async componentDidMount() {

    const { getUserById, userId, users } = this.props;
    let user: UserObject = await getUserById(userId, users);
    if (user) {
      this.setState({
        userAssigned: user.firstName + " " + user.lastName,
        currentUserId: userId, cardText: this.props.text,
        isFavourite: this.props.isFavourite
      });
    } else {
      this.setState({
        cardText: this.props.text,
        isFavourite: this.props.isFavourite
      });
    }

  }

  deleteCard = (id: number, listID: number) => {
    const { deleteCard } = this.props;
    deleteCard(id, listID);
  }

  handleClick = async () => {
    if (this.state.editModeEnabled) {
      const { id, updateCardText } = this.props;
      await updateCardText(id, this.state.cardText);
    }
    this.setState({
      editModeEnabled:
        !this.state.editModeEnabled
    });
  }

  handleTextChange = (event: any) => {
    this.setState({
      cardText:
        event.target.value
    })
  }

  handleChangeAssignedUser = (event: any, child: any) => {
    const { updateCardAssignedUser, id, listID } = this.props;
    this.setState({
      userAssigned:
        event.target.value,
      currentUserId: child.key
    }, () => {
      updateCardAssignedUser(id, child.key, listID);
    });
  }

  handleFavourite = () => {
    const { id, updateFavouriteStatus } = this.props;
    this.setState({
      isFavourite:
        !this.state.isFavourite
    }, () => {
      updateFavouriteStatus(id, this.state.isFavourite);
    })

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
            <Card className={this.state.isFavourite ? styles.cardContainerFavourite : styles.cardContainer}>
              <CardContent >
                <div className={styles.cardContentContainer}>
                  <Icon className={styles.iconStyle}
                    onClick={() => this.deleteCard(this.props.id, this.props.listID)}>
                    close</Icon>
                </div>
                <div className={styles.textContainer}>
                  <div className={this.state.editModeEnabled ?
                    styles.inputContainerEnabled :
                    styles.inputContainerDisabled} 
                  >
                    <textarea onChange={this.handleTextChange} value={this.state.cardText} disabled={!this.state.editModeEnabled}
                      className={this.state.editModeEnabled ?
                        styles.textareaDescriptionEnabled :
                        styles.textareaDescriptionDisabled}
                    
                    />
                    {/* Assigned: <a href={"/user/" + this.props.userId}> {this.state.userAssigned} </a> */}

                    {/* <Link to={{
                      pathname: '/usercard',
                      state:{

                      }
                    }}></Link> */}
                  </div>


                </div>
                <div className={styles.assignedContainer}>
                  Assigned:
                     {
                    this.state.currentUserId && <Link to={{
                    pathname: '/user/' + this.state.currentUserId
                    }}> {this.state.userAssigned}</Link>
                  }
                  <FormControl >
                    <Select onChange={this.handleChangeAssignedUser} displayEmpty>
                      <MenuItem value="" disabled>
                        None
                        </MenuItem>
                      {
                        users.map((user, index) => {
                        if (user.jobTitle) {
                          return <MenuItem itemProp={user.id + ""}
                            key={user.id}
                            value={user.firstName + " " + user.lastName
                            }> {user.firstName} {user.lastName}
                          </MenuItem>
                        }
                      }
                      )}
                    </Select>
                    <FormHelperText>Assign User</FormHelperText>
                  </FormControl>
                </div>
                <div className={styles.cardActionsStyle}>
                  <text className={styles.dateTextStyle}>{this.props.date}</text>
                  <div>
                    <Icon style={{ cursor: 'pointer' }} onClick={this.handleFavourite}>star</Icon>
                    <Icon style={{ cursor: 'pointer' }} onClick={this.handleClick}>edit</Icon>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </Draggable>
    );
  }

}

export default connect(null, { deleteCard, updateCardAssignedUser, getUserById, updateCardText, updateFavouriteStatus })(TrelloCard)