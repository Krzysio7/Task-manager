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
          date: date.toString(),
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

export const updateCardAssignedUser = (id: number, userId: number) => async () => {

  listsRef
    .child("cards")
    .child(String(id))
    .update({ userId: userId });
}