import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { CardObject } from '../reducers/listsReducer';
import { UserObject } from '../reducers/usersReducer'
import ActionButton from './ActionButton';
import TrelloCard from './TrelloCard';
import styles from './TrelloList.module.css';


const TrelloList = ({ listID, title, cards, users, index }: { listID: number, title: string, cards: Array<CardObject>, users: UserObject[], index: number }) => {
  return (
    <Draggable draggableId={String(listID)} index={index} >
      {provided => (
        <div className={styles.container} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
          <Droppable droppableId={String(listID)}>
            {(provided: any) => (
              <div {...provided.droppableProps} ref={provided.innerRef} >
                <h4>{title}</h4>

                {cards.map((card, index) => (

                  <TrelloCard key={card.id}
                    index={index}
                    text={card.text}
                    id={card.id}
                    listID={listID}
                    users={users}
                    userId={card.userId}
                    date={card.date}
                    isFavourite={card.isFavourite} />
                ))}
                {provided.placeholder}
                <ActionButton listID={listID} lastIndex={cards ? cards.length : 0}></ActionButton>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable >
  );
};

export { TrelloList };
