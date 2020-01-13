import { ListActions } from ".";
import { listsRef } from "../config/firebase";
import { CardObject, ListObject } from "../reducers/listsReducer";

export const addList = (title: any) => async (dispatch: any) => {

  if (title === "") {
    alert("List cannot be empty");
  } else {
    const newListKey: any = listsRef
      .child("lists")
      .push().key;

    listsRef
      .child("lists")
      .update({
        [newListKey]: {
          listName: title
        }
      });

    dispatch({
      type: ListActions.ADD_LIST,
      payload: { title, newListKey }
    });
  }

}

export const fetchData = () => async (dispatch: any) => {

  const myList = listsRef.child("lists");
  let lists;

  await myList.once("value", (snapshot: any) => {
    const myListFromDatabase = snapshot.val();

    if (myListFromDatabase === null) {
      console.log("List at our firebase is null");
    } else {

      lists = Object.keys(snapshot.val()).map(key => {
        return {
          key: key,
          listName: myListFromDatabase[key].listName
        };
      });

    }
  });

  const myCard = listsRef.child("cards");
  let cards = undefined;

  await myCard.once("value", (snapshot: any) => {
    const myCardFromDatabase = snapshot.val();

    if (myCardFromDatabase === null) {
      console.log("Card at our firebase is null");
    } else {
      cards = Object.keys(snapshot.val()).map(key => {

        return {
          key: key,
          cardName: myCardFromDatabase[key].cardName,
          listKey: myCardFromDatabase[key].listKey,
          index: myCardFromDatabase[key].index,
          userId: myCardFromDatabase[key].userId,
        };
      });

    }
  });

  dispatch({
    type: ListActions.FETCH_DATA,
    payload: { lists, cards }
  });
}

export const sort = (

  droppableIdStart: any,
  droppableIdEnd: any,
  droppableIndexStart: any,
  droppableIndexEnd: any,
  draggableId: any) => async (dispatch: any) => {

    dispatch({
      type: ListActions.DRAG_HAPPENED,
      payload: {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId
      }
    });
  }

export const updateCardsIndexes = (lists: ListObject[], id: number) => async () => {

  const list = lists.find(list => id === list.id);
  list?.cards.map((card: CardObject, index) => {

    listsRef
      .child("cards")
      .update({
        [card.id]: {
          listKey: list.id,
          cardName: card.text,
          index: index,
        }
      });
  });
}

export const deleteList = (listID: number) => async (dispatch: any) => {

  listsRef
    .child("lists")
    .child(String(listID)).remove();

  const query = listsRef
    .child("cards").orderByChild('listKey').equalTo(listID);

  await query.once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      if (childSnapshot.key) {
        listsRef
          .child("cards")
          .child(childSnapshot.key).remove();
      }
    })
  });

  dispatch({
    type: ListActions.DELETE_LIST,
    payload: listID,
  });
} 