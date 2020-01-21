import React from 'react'
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from 'react-redux';
import { getUserById, fetchUsers, fetchData } from '../actions';
import { UserObject } from '../reducers/usersReducer';
import { Card, CardContent, Typography, Icon } from '@material-ui/core';
import { userInfo } from 'os';
import styles from './UserCard.module.css';
import { Map, TileLayer, Popup, Marker } from 'react-leaflet';
import { ListObject, CardObject } from '../reducers/listsReducer';

type TRouteParams = {
  userId: string;
}

interface State {
  user: UserObject;
}

interface UserCardProps {
  getUserById: any;
  users: UserObject[];
  fetchUsers: any;
  lists: { lists: ListObject[], filter: any };
  fetchData: any;
}

class UserCard extends React.Component<UserCardProps & RouteComponentProps<TRouteParams>, State> {

  state = {
    user: {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      avatar: '',
      description: '',
      jobTitle: '',
      lat: '',
      lng: '',
      postalCode: '',
      street: '',
      city: '',
    }
  }
  async componentDidMount() {
    const { getUserById, lists } = this.props;

    if (this.props.users.length > 0 && lists) {
      this.setState({
        user: await getUserById(parseInt(this.props.match.params.userId),
          this.props.users)
      });

    } else {
      const { fetchUsers, fetchData } = this.props;

      await fetchUsers();
      await fetchData();
      this.setState({
        user: await getUserById(parseInt(this.props.match.params.userId),
          this.props.users)
      });
    }
  }

  render() {
    const { user } = this.state;
    const { lists } = this.props;
  
    let position: {
      lat: number
      lng: number
    }
    position = {
      lat: parseFloat(user.lat),
      lng: parseFloat(user.lng)
    };

    return (
      <div className={styles.mainContainer}>
        <div className={styles.innerCardContainer} >
          <Card className={styles.cardContainer}>
            <CardContent className={styles.cardContentStyle}>
              <text className={styles.userText}><span className={styles.bold}>First Name:</span> {user.firstName}</text>
              <text className={styles.userText}><span className={styles.bold}>Last Name:</span> {user.lastName}</text>
              <text className={styles.userText}><span className={styles.bold}>Email:</span> {user.email}</text>
              <text className={styles.userText}><span className={styles.bold}>Gender:</span> {user.gender}</text>
              <text className={styles.userText}><span className={styles.bold}>Description:</span> {user.description}</text>
              <text className={styles.userText}><span className={styles.bold}>Job title:</span> {user.jobTitle}</text>
              <text className={styles.userText}><span className={styles.bold}>Postal Code:</span> {user.postalCode}</text>
              <text className={styles.userText}><span className={styles.bold}>Street: </span>{user.street}</text>
              <text className={styles.userText}><span className={styles.bold}>City: </span>{user.city}</text>
            </CardContent>

          </Card>
          <div className={styles.mapContainerStyle}>
            {
              user.lat && <Map style={{ height: '100%' }} id="mapid" center={position} zoom={13}>
              <TileLayer
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
              />
              <Marker position={position}>
                <Popup>
                  <span>{user.firstName}<br />{user.lastName}</span>
                </Popup>
              </Marker>
            </Map>
            }
          </div>

        </div>
        <div className={styles.tasksContainer}>
        <h4>User tasks</h4>
          {
            lists.lists.map((list: ListObject, index) => {
              
              return list.cards.map((card: CardObject, index) => {

                if (card.userId + "" == this.props.match.params.userId) {

                  return (
                    <Card className={styles.taskCardStyle}>
                    <CardContent className={styles.taskCardContentStyle}>
                        <text className={styles.userText}>
                          <span className={styles.bold}>Task name: </span>
                          {card.text}</text>
                    </CardContent>
                    </Card>
                  )
                }
              })
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: UserCardProps) => ({
  users: state.users,
  lists: state.lists
});

export default withRouter(connect(mapStateToProps, { getUserById, fetchUsers, fetchData })(UserCard) as any);
