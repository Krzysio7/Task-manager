import React from 'react'
import { Card, CardContent, Icon, Typography } from "@material-ui/core";

class UserCard extends React.Component { 

  render(){ 
    return (
      <Card >
      <CardContent >
        <Typography gutterBottom noWrap={false} style={{
          wordBreak: 'break-all'
        }} ></Typography>
      </CardContent>
      <Icon style={{cursor: 'pointer',color:'red' }}
        >
        close</Icon>
      </Card>
    );
  }
}
