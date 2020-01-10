import { Card, CardContent, Icon, Typography } from "@material-ui/core";
import React from "react";
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { deleteCard } from '../actions';

interface CardProps {
  text: string;
  id: number;
  index: number;
  deleteCard?: any
  listID: number
}

class TrelloCard extends React.Component<CardProps> {

  deleteCard = (id: number, listID: number) => {
    const { deleteCard } = this.props;
    deleteCard(id, listID)

  }

  render() {
    return (
      <Draggable draggableId={String(this.props.id)} index={this.props.index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card style={styles.cardContainer}>
              <CardContent >
                <Typography gutterBottom noWrap={false} style={{
                  wordBreak: 'break-all'
                }} >{this.props.text}</Typography>
              </CardContent>
              <Icon style={{cursor: 'pointer',color:'red' }}
                onClick={() => this.deleteCard(this.props.id, this.props.listID)}>
                close</Icon>
            </Card>
          </div>
        )}
      </Draggable>
    );
  }

}

const styles = {
  cardContainer: {
    marginBottom: 8,
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  }
}
export default connect(null, { deleteCard })(TrelloCard)