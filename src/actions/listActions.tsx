import { ListActions } from ".";
import { listsRef } from "../config/firebase";
import { CardObject, ListObject } from "../reducers/listsReducer";
import { UserObject } from "../reducers/usersReducer";

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
          listName: myListFromDatabase[key].listName,
          index: myListFromDatabase[key].index
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
          date: myCardFromDatabase[key].date,
          isFavourite: myCardFromDatabase[key].isFavourite
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
  draggableId: any,
  type: any,
  lists: { lists: ListObject[], filter: any },
  users: UserObject[]) => async (dispatch: any) => {

    if (type !== 'list') {
      const listStart = lists.lists.find(list => droppableIdStart === list.id)

      if (listStart != undefined) {
        let dragCard = listStart.cards[droppableIndexStart];
        const cardAssignedUser = users.find(user => dragCard.userId == user.id);
        const isPermitted: boolean = cardAssignedUser?.jobTitle === 'Project Manager';

        dispatch({
          type: ListActions.DRAG_HAPPENED,
          payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId,
            type,
            isPermitted
          }
        });
      }

    } else {

      dispatch({
        type: ListActions.DRAG_HAPPENED,
        payload: {
          droppableIdStart,
          droppableIdEnd,
          droppableIndexStart,
          droppableIndexEnd,
          draggableId,
          type
        }
      });
    }


  }

export const updateCardsIndexes = (lists: { lists: ListObject[], filter: any }, id: number[], type: string) => async () => {

  if (type == 'list') {
    const newList = { ...lists };

    // console.log(  newList)
    // const list = newList.lists.splice(id[0], 1);
    // console.log("id: " + id[0]);
    // console.log(list)
    // console.log("id: " + id[1]);
    // newList.lists.splice(id[1], 0, ...list);

    newList.lists.forEach((element, index) => {
      listsRef
        .child("lists")
        .child(String(element.id))
        .update({ index: index });
    });

    // const sourceList = lists.find(list => list.index == id[0]);
    // const destinationList = lists.find(list => list.index == id[1]);

    // listsRef
    //   .child("lists")
    //   .child(String(sourceList?.id))
    //   .update({ index: destinationList?.index });

    // listsRef
    //   .child("lists")
    //   .child(String(destinationList?.id))
    //   .update({ index: sourceList?.index })

  } else {

    id.forEach(element => {

      const list = lists.lists.find(list => element === list.id);

      list?.cards.map((card: CardObject, index) => {

        listsRef
          .child("cards")
          .update({
            [card.id]: {
              listKey: list.id,
              cardName: card.text,
              index: index,
              userId: card.userId ? card.userId : null,
              date: card.date ? card.date : null,
              isFavourite: card.isFavourite ? card.isFavourite : null
            }
          });
      });
    });
  }

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

export const updateFilter = (filter: number) => async (dispatch: any) => {

  dispatch({
    type: ListActions.FILTER_LIST,
    payload: filter,
  });
} 