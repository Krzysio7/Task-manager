import { Button, Card } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import React from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { addCard, addList, deleteList } from '../actions';
import styles from './ActionButton.module.css';

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

  // handleAddList = () => {
  //   const { addList } = this.props;
  //   const { text } = this.state;

  //   if (text) {
  //     addList(text);
  //     this.setState({ text: '' });
  //   }
  //   return;
  // }

  handleAddCard = () => {
    const { listID, addCard, lastIndex } = this.props;
    const { text } = this.state;
    const date: Date = new Date();

    if (text && typeof listID === 'string') {
      addCard(listID, text, lastIndex, date);
      this.setState({ text: '' });
    }
    return;
  }

  // deleteList = () => {
  //   const { listID, deleteList } = this.props;
  //   deleteList(listID);
  // }

  renderAddButton = () => {
    const buttonText = 'Add antoher card';

    return (
      <div
        onClick={this.openForm}
        className={styles.openFormButtonGroup}>
        <div className={styles.addButtonContainer}>
          <Icon>add</Icon>
          <p>{buttonText}</p>
        </div>
      </div>
    );
  }

  closeForm = (e: any) => {
    this.setState({ formOpen: false });
  }

  renderForm = () => {
    const placeHolder = 'Enter a title for this card';
    const buttonTitle = 'Add Card';

    return (
      <div>
        <Card className={styles.cardStyle}>
          <TextareaAutosize
            placeholder={placeHolder}
            onBlur={this.closeForm}
            autoFocus
            value={this.state.text}
            onChange={this.onTextChange}
            className={styles.textAreaStyle}
          />
        </Card>
        <div className={styles.formButtonGroup}>
          <Button
            onMouseDown={this.handleAddCard}
            variant='contained'
            className={styles.addCardButton}>
            {buttonTitle}{''}
          </Button>
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

export default connect(null, { addList, addCard, deleteList })(ActionButton);
