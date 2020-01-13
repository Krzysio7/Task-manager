import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { CardObject } from '../reducers/listsReducer';
import { UserObject } from '../reducers/usersReducer'
import ActionButton from './ActionButton';
import TrelloCard from './TrelloCard';


const TrelloList = ({ listID, title, cards, users }: { listID: number, title: string, cards: Array<CardObject>, users: UserObject[]}) => {
  return (
    <Droppable droppableId={String(listID)}>
      {(provided: any) => (
        <div {...provided.droppableProps} ref={provided.innerRef} style={styles.container}>
          <h4>{title}</h4>

          {cards.map((card, index) =>

            <TrelloCard key={card.id}
              index={index}
              text={card.text}
              id={card.id}
              listID={listID}
              users={users}/>
          )}
        
          {provided.placeholder}
          <ActionButton listID={listID} lastIndex={cards ? cards.length : 0}></ActionButton>
        </div>
      )}
    </Droppable>
  );
};

const styles = {
  container: {
    backgroundColor: "#ccc",
    borderRadius: 3,
    width: 300,
    height: '100%',
    padding: 8,
    marginRight: 8
  }
}
export { TrelloList };
