import React, { Component } from 'react';
import ImageActions from '../actions/ImageActions';
import RouteActions from '../actions/RouteActions';
import TranslatedStore from '../stores/TranslatedStore';

import moment from 'moment';

export default class AllTranslations extends Component {
  constructor(){
    super();

    this.state = {
      transactions: TranslatedStore.getAllTranslations()
    }

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    ImageActions.loadAllImages();
    TranslatedStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    TranslatedStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({ transactions: TranslatedStore.getAllTranslations() });
  }


  render() {
    let { transactions } = this.state;

    let Transactions = '';

    if (transactions.length) {
      Transactions = transactions.map(t => {
      return <div key={t._id} className='col-xs-12 col-md-4' onClick={RouteActions.route.bind(null,(`/translations/${t._id}`))}>
        <div className='curved_box'>
          <img src={t.url} className="docThumbnail" height='300'/>
          <p className='nameText'>{t.name}</p>
          <p className="timeArea">{moment(t.timestamp.toString()).format('lll')}</p>
          <p className="lang"><b>Language: </b>{t.language} <i className='glyphicon glyphicon-arrow-right'></i> <b>Translation: </b>{t.translation.language}</p>
        </div>
      </div>;
    })
    }

    return (
      <div>
        <h1 className='text-center'>Saved Translations</h1>
        <div className="container">
          <div className="row">
            {Transactions}
          </div>
        </div>
      </div>
    )
  }
}
