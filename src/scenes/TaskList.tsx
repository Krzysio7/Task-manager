import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { TrelloList } from '../components';
import React from 'react';
import ActionButton from "../components/ActionButton";
import { ListObject } from '../reducers/listsReducer';
import { UserObject } from '../reducers/usersReducer';
import { connect } from "react-redux";
import { fetchData, sort, updateCardsIndexes, fetchUsers } from '../actions';
import { withRouter } from "react-router-dom";
import FilterTab from "../components/FilterTab";

interface ListProps {
  lists: { lists: ListObject[], filter: any };
  dispatch?: any;
  fetchData: any;
  sort: any;
  updateCardsIndexes: any;
  fetchUsers: any;
  users: UserObject[];
}

class TaskList extends React.Component<ListProps>{

  componentDidMount() {
    const { fetchData, fetchUsers } = this.props;

    fetchData();
    fetchUsers();
  }

  onDragEnd = (result: any) => {
    const { sort, lists, updateCardsIndexes,users } = this.props;
    const { destination, source, draggableId, type } = result;

    console.log(result)

    if (!destination) {

      return;
    }

    sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type,
      lists,
      users
    );

    let sourceAndDestinationId: Array<number>;
    if (type == 'list') {
      sourceAndDestinationId = [source.index, destination.index];
    } else {
      sourceAndDestinationId = [source.droppableId, destination.droppableId];
    }
    updateCardsIndexes(lists, sourceAndDestinationId, type);

  }
  render() {
    const { lists, users } = this.props;

    console.log(lists)
    return (<div>
      <FilterTab />
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId='all-lists' direction='horizontal' type='list'>{provided => (
          <div style={styles.listsContainer}
            {...provided.droppableProps}
            ref={provided.innerRef}>

            {
              lists.lists.map((list: any, index) =>

                <TrelloList
                  listID={list.id}
                  key={list.id}
                  title={list.title}
                  cards={list.cards}
                  users={users}
                  index={index}
                  filter={lists.filter}/>
              )}
            {provided.placeholder}

          </div>
        )}

        </Droppable>

      </DragDropContext>
      </div>
    );
  }
}
const mapStateToProps = (state: ListProps) => ({
  lists: state.lists,
  users: state.users,
});

const styles = {
  listsContainer: {
    display: 'flex',

    borderWidth: '10px',
    marginRight: 8,
    marginTop: 20,
    marginLeft: 20
  }
}
export default withRouter(connect(mapStateToProps, { fetchData, fetchUsers, sort, updateCardsIndexes })(TaskList) as any);