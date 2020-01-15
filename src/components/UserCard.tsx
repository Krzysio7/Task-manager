import React from 'react'
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from 'react-redux';
import { getUserById, fetchUsers } from '../actions';
import { UserObject } from '../reducers/usersReducer';
import { Card, CardContent, Typography, Icon } from '@material-ui/core';
import { userInfo } from 'os';
import styles from './UserCard.module.css';
import { Map, TileLayer, Popup, Marker } from 'react-leaflet';

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
    const { getUserById } = this.props;
    // const {user} = this.props.location.state;

    if (this.props.users.length > 0) {
      this.setState({ user: await getUserById(parseInt(this.props.match.params.userId), this.props.users) });

    } else {
      const { fetchUsers } = this.props;

      await fetchUsers();
      this.setState({ user: await getUserById(parseInt(this.props.match.params.userId), this.props.users) });
    }
  }

  render() {
    const { user } = this.state;
    let position: {
      lat: number
      lng: number
    }
    console.log(this.state.user.lat)
    position = {
      lat: parseFloat(user.lat),
      lng: parseFloat(user.lng)
    };


    return (
      <div style={{ display: 'flex', flexDirection: 'row' }} >
        <Card style={{ display: 'flex', width: '25%' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexWrap: 'wrap' }}>
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
        <div style={{ flex: 1 }}>
          {user.lat && <Map style={{ height: '100%' }} id="mapid" center={position} zoom={13}>
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
          }</div>

      </div>
    );
  }
}

const mapStateToProps = (state: UserCardProps) => ({
  users: state.users,
});

export default withRouter(connect(mapStateToProps, { getUserById, fetchUsers })(UserCard) as any);
