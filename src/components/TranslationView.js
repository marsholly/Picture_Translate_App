import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ImageActions from '../actions/ImageActions';
import TranslatedStore from '../stores/TranslatedStore';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import $ from 'jquery';
import RichTextEditor from 'react-rte';

import {Editor, EditorState} from 'draft-js';

export default class TranslationView extends Component {
  constructor(props){
    super(props);

    let translation = TranslatedStore.getTranslation(props.params.id);

    this.state = {
      transaction: translation,
      open: false,
      edit: false,
      untransText: translation.text,
      transText: translation.translation.text
    }

    this._onChange = this._onChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.changeToEdit = this.changeToEdit.bind(this);
    this.updateTranslateText = this.updateTranslateText.bind(this);
    this.func = this.func.bind(this);
  }

  func() {
    this.setState({ color: true });
  }

  componentWillMount() {
    TranslatedStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    TranslatedStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({ transaction: TranslatedStore.getTranslation(this.props.params.id) });
  }

  changeToEdit() {
    this.setState({ edit: true });
  }

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  updateTranslateText(t) {
    let translation = this.state.transaction.translation;
    translation.text = t;
    let updated = Object.assign({}, this.state.transaction, { translation });
    ImageActions.updateTranslation(updated);
    this.setState({edit: false});
  }

  render() {

    let { transaction, edit } = this.state;
    let { name, url, timestamp, language, text, translation } = transaction;
    let TEXT = <div id='text'></div>;
    // $('#text').html(text);
    // $('#translationText').html(translation.text);
    if (!edit) {
      return (
        <div className='container'>
          <h1 className='text-center'>{name}</h1>
          <div className="col-xs-12 col-md-3">
            <img src={url} className='viewThumbnail' onClick={this.handleOpen}/>
            <div onClick={this.changeToEdit} id='edit'><a>Edit</a></div>
          </div>
          <div className="col-xs-12 col-md-8">
            <ListItem value={11} key={11} primaryText={`Date Added: ${moment(timestamp).format('lll')}`}
            />
            <ListItem value={22} key={22} primaryText={`Original Language: ${language.toUpperCase()}`}
            />
            <ListItem value={1} key={1} primaryText="Image to Text Translation"
              nestedItems={[
                <ListItem value={2} key={2} >
                {TEXT}
                </ListItem>
              ]}
            />
            <ListItem value={3} key={3} primaryText="Language Translation"
              nestedItems={[
                <ListItem value={4} key={4} >
                <h4>`Translated from ${language.toUpperCase()} to ${translation.language.toUpperCase()}`</h4>
                <div id='translationText'></div>
                </ListItem>
              ]}
            />
          </div>
          <div className="col-xs-12 col-md-1">
            <PlaceHold text={text} transText={translation.text} func={this.func}/>
          </div>
          <Dialog modal={false} open={this.state.open} onRequestClose={this.handleClose} autoScrollBodyContent={true}>
            <img src={url} className='modalImage'/>
          </Dialog>
          {/* <MyStatefulEditor2 text={translation.text} updateTranslateText={this.updateTranslateText}/> */}
        </div>
      );
    } else {
      return (
        <div className='container'>
          <h1 className='text-center'>{name}</h1>
          <div className="col-xs-12 col-md-3">
            <img src={url} className='viewThumbnail' onClick={this.handleOpen}/>
          </div>
          <div className="col-xs-12 col-md-9">
            <MyStatefulEditor text={translation.text} updateTranslateText={this.updateTranslateText}/>
            <div id="divdiv"></div>
          </div>
          <Dialog modal={false} open={this.state.open} onRequestClose={this.handleClose} autoScrollBodyContent={true}>
            <img src={url} className='modalImage'/>
          </Dialog>
        </div>
      );
    }
  }
}

class PlaceHold extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.props.func();
  }

  render () {
    let { text, transText } = this.props;
    $('#text').html(text);
    $('#translationText').html(transText);
    return (<div><span onClick={this.onChange} onMouseOver={this.onChange} className='hellohello'><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div><div>|||||</div></span></div>);
  }
}

// class MyStatefulEditor2 extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       value: RichTextEditor.createValueFromString(`<p>${props.text}</p>`, 'html')
//     }
//
//     this.onChange = this.onChange.bind(this);
//   }
//
//   onChange(value) {
//     this.setState({value});
//     if (this.props.onChange) {
//       this.props.onChange(
//         value.toString('html')
//       );
//     }
//   };
//
//   render () {
//     $('#text').html('hello');
//     return (
//       <div>
//       </div>
//     );
//   }
// }


class MyStatefulEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: RichTextEditor.createValueFromString(`<p>${props.text}</p>`, 'html')
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({value});
    if (this.props.onChange) {
      this.props.onChange(
        value.toString('html')
      );
    }
  };

  render () {
    // $('#divdiv').html(this.state.value.toString('html'));
    return (
      <div>
        <RichTextEditor
          value={this.state.value}
          onChange={this.onChange}
        />
        <FlatButton label='save' onClick={this.props.updateTranslateText.bind(null, this.state.value.toString('html'))}></FlatButton>
      </div>
    );
  }
}
