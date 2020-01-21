import { ListActions } from ".";
import { listsRef } from "../config/firebase";

export const addCard = (listID: number, text: any, lastIndex: number, date: Date) => async (dispatch: any) => {

  if (text === "") {
    alert("Card cannot be empty");
  } else {

    const newCardKey: any = listsRef
      .child("cards")
      .push().key;

    listsRef
      .child("cards")
      .update({
        [newCardKey]: {
          listKey: listID,
          cardName: text,
          index: lastIndex,
          date: date.toUTCString(),
          isFavourite: false,
        }
      });

    dispatch({
      type: ListActions.ADD_CARD,
      payload: { listID, text, newCardKey }
    });
  }
}

export const deleteCard = (id: number, listID: number) => async (dispatch: any) => {

  listsRef
    .child("cards")
    .child(String(id)).remove();

  dispatch({
    type: ListActions.DELETE_CARD,
    payload: { id, listID }
  });

}

export const updateCardAssignedUser = (id: number, userId: number, listID: number) => async (dispatch: any) => {

  dispatch({
    type: ListActions.UPDATE_CARD,
    payload: { id, userId, listID }
  });

  listsRef
    .child("cards")
    .child(String(id))
    .update({ userId: userId });
}

export const updateCardText = (id: number, text: string) => async () => {
  listsRef
    .child("cards")
    .child(String(id))
    .update({ cardName: text });
}

export const updateFavouriteStatus = (id: number, isFavourite: boolean) => async () => {

  listsRef
    .child("cards")
    .child(String(id))
    .update({ isFavourite: isFavourite });
  
}
