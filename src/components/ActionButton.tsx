import { Button, Card } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import React from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { addCard, addList, deleteList } from '../actions';

interface ListType {
  list?: boolean;
  dispatch?: any;
  listID?: number;
  addList: any;
  addCard: any;
  lastIndex?: number;
  deleteList?: any;
}

class ActionButton extends React.Component<ListType> {

  state = {
    formOpen: false,
    text: '',
  }

  openForm = () => {
    this.setState({
      formOpen: true
    })
  }

  onTextChange = (event: any) => {
    this.setState({ text: event.target.value });
  }

  handleAddList = () => {
    const { addList } = this.props;
    const { text } = this.state;

    if (text) {
      addList(text);
      this.setState({ text: '' });
    }
    return;
  }

  handleAddCard = () => {
    const { listID, addCard, lastIndex } = this.props;
    const { text } = this.state;

    if (text && typeof listID === 'string') {
      addCard(listID, text, lastIndex);
      this.setState({ text: '' });
    }
    return;
  }

  deleteList = () => {
    const { listID, deleteList } = this.props;
    deleteList(listID);
  }

  renderAddButton = () => {
    const { list } = this.props;
    const buttonText = list ? 'Add another list' : 'Add antoher card';
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? 'white' : 'inherit';
    const buttonTextBackground = list ? 'rgba(0,0,0,.15)' : 'inherit';

    return (
      <div
        onClick={this.openForm}
        style={{
          ...styles.openFormButtonGroup,
          opacity: buttonTextOpacity,
          color: buttonTextColor,
          backgroundColor: buttonTextBackground,
          display: 'flex',
          flexDirection: 'row'
        }}>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          flex: 1
        }}>
          <Icon>add</Icon>
          <p>{buttonText}</p>
        </div>
        {!list &&
          <Icon style={{
          display: 'flex',
          marginLeft: 'auto',
          backgroundColor: 'red'
        }} onClick={this.deleteList}>close</Icon>}
      </div>
    );
  }

  closeForm = (e: any) => {
    this.setState({ formOpen: false });
  }

  renderForm = () => {
    const { list } = this.props;
    const placeHolder = list ? 'Enter list title...' : 'Enter a title for this card';
    const buttonTitle = list ? 'Add List' : 'Add Card';

    return (
      <div>
        <Card style={styles.cardStyle}>
          <TextareaAutosize
            placeholder={placeHolder}
            onBlur={this.closeForm}
            autoFocus
            value={this.state.text}
            onChange={this.onTextChange}
            style={{
              resize: 'none',
              width: '100%',
              overflow: 'hidden',
              outline: 'none',
              border: 'none'
            }}
          />
        </Card>
        <div style={styles.formButtonGroup}>
          <Button
            onMouseDown={list ? this.handleAddList : this.handleAddCard}
            variant='contained'
            style={{ color: 'white', backgroundColor: '#5aac44' }}>
            {buttonTitle}{''}
          </Button>
          <Icon style={{ marginLeft: 8, cursor: 'pointer' }}>close</Icon>
        </div>
      </div>
    );
  }

  render() {
    return (
      this.state.formOpen ? this.renderForm() : this.renderAddButton()
    );
  }
}

const styles = {
  openFormButtonGroup: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: 3,
    height: 36,
    width: 272,
    paddingLeft: 10
  },
  formButtonGroup: {
    marginTop: 8,
    display: 'flex',
    alignItems: 'center',
  },
  cardStyle: {
    overflow: 'visible',
    minHeight: 80,
    minWidth: 272,
    padding: '6px 8px 2px',
  }
}
export default connect(null, { addList, addCard, deleteList })(ActionButton);
