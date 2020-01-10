import { Card, CardContent, Icon, Typography } from "@material-ui/core";
import React from "react";
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { deleteCard } from '../actions';
import styles from './TrelloCard.module.css';

interface CardProps {
  text: string;
  id: number;
  index: number;
  deleteCard?: any
  listID: number
}

class TrelloCard extends React.Component<CardProps> {

  state = {
    editModeEnabled: false,
  }

  private inputRef: any;

  deleteCard = (id: number, listID: number) => {
    const { deleteCard } = this.props;
    deleteCard(id, listID)

  }

  handleClick = () => {
    this.setState({ editModeEnabled: !this.state.editModeEnabled });
    
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
            <Card className={styles.cardContainer}>
              <CardContent >
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between' }}>
                  <div className={styles.inputContainer} style={{
                    boxShadow: this.state.editModeEnabled ? "inset 0 0 1em #c0c0c0" : 'none',
                    border:this.state.editModeEnabled ?"1px solid #c0c0c0":'none'}}>
                   
                    <textarea value={this.props.text} disabled={!this.state.editModeEnabled}
                      className={styles.textareaDescription}
                      style={{ pointerEvents: this.state.editModeEnabled ? 'auto' : 'none' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Icon style={{cursor: 'pointer'}} onClick={this.handleClick}>edit</Icon>
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