import  React, { Component } from 'react';
import ImageActions from '../actions/ImageActions';
import {RaisedButton} from 'material-ui';

export default class SplashPage extends Component {
  render() {
    return (
      <div className='splashPage'>
        <div className="titleFrame"><h1 className='titles text-center'>PicTranslate</h1>
          <h3 className='titles text-center'>translate your pictures to any language</h3>
          </div>{/* <img src="https://hd.unsplash.com/photo-1465929639680-64ee080eb3ed" width='100%' height='836'/> */}
      </div>
    );
  }
}
