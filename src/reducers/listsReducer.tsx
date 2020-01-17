import { ListActions } from '../actions';

export interface CardObject {
  id: number;
  text: string;
  index: number;
  userId: number;
  date: string;
  isFavourite: boolean;
}
export interface ListObject {
  title: string;
  id: number;
  cards: Array<CardObject>;
  index: number;

}

const listsReducer = (state: ListObject[] = [], action: any) => {
  switch (action.type) {
    case ListActions.ADD_LIST:
      {
        const newList = {
          title: action.payload.title,
          cards: [],
          id: action.payload.newListKey
        }
        return [...state, newList];
      }

    case ListActions.ADD_CARD:
      {
        const newCard = {
          id: action.payload.newCardKey,
          text: action.payload.text
        }

        const newState = state.map((list: any) => {
          if (list.id === action.payload.listID) {
            return {
              ...list,
              cards: [...list.cards, newCard]
            }
          } else {
            return list;
          }
        });
        return newState;
      }

    case ListActions.DELETE_CARD:
      {
        const newState = state.map((list: ListObject) => {
          if (list.id === action.payload.listID) {

            const filteredCards = list.cards.filter((card) => card.id !== action.payload.id);
            return {
              ...list,
              cards: [...filteredCards]
            }

          } else {
            return list;
          }
        });
        return newState;
      }

    case ListActions.DELETE_LIST:
      {
        const newState = state.filter((list: ListObject) =>

          list.id !== action.payload

        );
        return newState;
      }

    case ListActions.FETCH_DATA:
      {
        const initialList: ListObject[] = [];
        if (action.payload.lists) {
          action.payload.lists.map((list: any) => {

            let temp: ListObject;
            temp = {
              title: list.listName,
              id: list.key,
              cards: [],
              index: list.index
            };
            if (action.payload.cards) {
              action.payload.cards.map((card: any) => {
                if (card.listKey === list.key) {

                  let tempCard: CardObject;
                  tempCard = {
                    id: card.key,
                    text: card.cardName,
                    index: card.index,
                    userId: card.userId,
                    date: card.date,
                    isFavourite: card.isFavourite
                  }
                  temp.cards.push(tempCard);
                }
              });
              temp.cards.sort((a, b) => {
                return a.index - b.index;
              });
            }

            initialList.push(temp);
          });
        }
        initialList.sort((a, b) => {
          return a.index - b.index;
        });

        return initialList;
      }

    case ListActions.DRAG_HAPPENED:
      {
        const {
          droppableIdStart,
          droppableIdEnd,
          droppableIndexStart,
          droppableIndexEnd,
          draggableId,
          type,
          isPermitted,
        } = action.payload;

        const newState = [...state];

        if (type === 'list') {
          const list = newState.splice(droppableIndexStart, 1);
          newState.splice(droppableIndexEnd, 0, ...list);
          return newState;
        }

        if (droppableIdStart === droppableIdEnd) {
          const list = state.find(list => droppableIdStart === list.id);
          if (list !== undefined) {
            const card: CardObject[] = list.cards.splice(droppableIndexStart, 1);
            list?.cards.splice(droppableIndexEnd, 0, ...card);
          }
        }

        if (droppableIdStart !== droppableIdEnd) {

          console.log(isPermitted)
          // find the list where drag happened
          const listStart = state.find(list => droppableIdStart === list.id)
          const listEnd = state.find(list => droppableIdEnd === list.id);

          if (listStart !== undefined) {

            if (listEnd !== undefined && listEnd.title === 'Zakończone' && isPermitted) {
              const card = listStart.cards.splice(droppableIndexStart, 1);
              listEnd?.cards.splice(droppableIndexEnd, 0, ...card);
            } else if (listEnd !== undefined && listEnd.title !== 'Zakończone') {
              const card = listStart.cards.splice(droppableIndexStart, 1);
              listEnd?.cards.splice(droppableIndexEnd, 0, ...card);
            }

          }

        }
        return newState;
      }

    case ListActions.UPDATE_CARD: {
      const { id, userId, listID, userName } = action.payload;
      const newState = [...state];

      let list = newState.find(list => list.id == listID);
      if (list != undefined) {
        let card = list.cards.find(card => card.id == id);
        if (card != undefined) {
          card.userId = userId;
        }
      }
      return newState;
    }
    default:
      return state;
  }
}
export default listsReducer;