import { DragDropContext } from "react-beautiful-dnd";
import { TrelloList } from '../components';
import React from 'react';
import ActionButton from "../components/ActionButton";
import { ListObject } from '../reducers/listsReducer';
import { connect } from "react-redux";
import { fetchData, sort, updateCardsIndexes } from '../actions';
import { withRouter } from "react-router-dom";

interface ListProps {
  lists: Array<ListObject>;
  dispatch?: any;
  fetchData: any;
  sort: any;
  updateCardsIndexes: any;

}

class TaskList extends React.Component<ListProps>{ 

  componentDidMount() {

    const { fetchData } = this.props;
    fetchData();
  }

  onDragEnd = (result: any) => {
    const { sort, lists, updateCardsIndexes } = this.props;
    const { destination, source, draggableId } = result;

    if (!destination) {

      return;
    }

    sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId
    );

    updateCardsIndexes(lists, source.droppableId);

  }

  
  render() {
    const { lists } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
          {/* <h2>Trello Clone</h2> */}
          <div style={styles.listsContainer}>
            {lists.map((list: any) =>
              <TrelloList
                listID={list.id}
                key={list.id}
                title={list.title}
                cards={list.cards} />
            )}
            <ActionButton list={true} ></ActionButton>
          </div>
  
      </DragDropContext>
    );
  }
}
const mapStateToProps = (state: ListProps) => ({
  lists: state.lists,
});

const styles = {
  listsContainer: {
    display: 'flex',
    borderWidth:'10px',
    marginRight: 8,
    marginTop: 20,
    marginLeft:20
  }
}
export default withRouter(connect(mapStateToProps, { fetchData, sort, updateCardsIndexes })(TaskList) as any);