import React, { Component } from 'react';
import ImageActions from '../actions/ImageActions';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import DropDownMenu from 'material-ui/DropDownMenu';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


export default class FileUploader extends Component {
  constructor(){
    super();

    this.state = {
      file: '',
      imagePreviewURL: '',
      open1: false,
      open2: false,
      url: undefined,
      origLang: 'from',
      transLang: 'to',
      name: ''
    }
    this._onInputChangeUrl = this._onInputChangeUrl.bind(this)
    this._onInputChangeUpload = this._onInputChangeUpload.bind(this)
    this.handleTouchTap1 = this.handleTouchTap1.bind(this)
    this.handleTouchTap2 = this.handleTouchTap2.bind(this)
    this.handleRequestClose1 = this.handleRequestClose1.bind(this)
    this.handleRequestClose2 = this.handleRequestClose2.bind(this)
    this.changeOrigLang = this.changeOrigLang.bind(this)
    this.changeTransLang = this.changeTransLang.bind(this)
    this.handleChangeOrig = this.handleChangeOrig.bind(this)
    this.handleChangeTrans = this.handleChangeTrans.bind(this)
    this._onSubmit = this._onSubmit.bind(this)
    this._onInputChangeName = this._onInputChangeName.bind(this)
  }

  handleChangeOrig(event, index, origLang) {
    this.setState({ origLang });
  }

  handleChangeTrans(event, index, transLang) {
    this.setState({ transLang });
  }

  handleTouchTap1(event) {
    event.preventDefault();

    this.setState({
      open1: true,
      anchorEl1: event.currentTarget,
    });
  };

  handleRequestClose1() {
    this.setState({
      open1: false,
    });
  };

  handleTouchTap2(event) {
    event.preventDefault();

    this.setState({
      open2: true,
      anchorEl2: event.currentTarget,
    });
  };

  handleRequestClose2() {
    this.setState({
      open2: false,
    });
  };

  _onSubmit(e) {
    let {file, origLang, transLang, url, name} = this.state;
    if (file) {
      ImageActions.createImage(file, origLang, transLang, name);
      this.setState({file: ''});
    } else {
      ImageActions.createImageFromUrl(url, origLang, transLang, name);
      this.setState({url: undefined});
    }
  }

  _onInputChangeUpload(e){
    let reader = new FileReader();
    let file = e.target.files[0]
    reader.onloadend = () =>{
      this.setState({ file, imagePreviewURL: reader.result });
    };
    reader.readAsDataURL(file);
  }

  _onInputChangeUrl(e){
    this.setState({ url: e.target.value });
  }

  changeOrigLang(origLang) {
    this.setState({ origLang });
  }

  changeTransLang(transLang) {
    this.setState({ transLang });
  }

  _onInputChangeName(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    let { imagePreviewURL } = this.state;
    let ImagePreview = imagePreviewURL &&  <img src={imagePreviewURL} className="center-block img-rounded img-responsive" />
    const styles = {
      customWidth: {
        width: 230,
      },
    };

    return (
      <div className="container">
        <h3 className="text-center">ADD NEW</h3>
        <div className="formArea">
          <div className="row">
            <TextField floatingLabelText="Name" onChange={this._onInputChangeName} fullWidth={true}/>
          </div>
          <div className="row">
            <div className='col-xs-12 col-md-6 uploadInput fileArea'>
              <FlatButton containerElement='label' className="flatBtn">
                <input type="file" onChange={this._onInputChangeUpload} />
              </FlatButton>
            </div>
            <div className='col-xs-12 col-md-6 uploadInput'>
              <span className="orTag">OR</span><TextField floatingLabelText="URL" onChange={this._onInputChangeUrl}/>
            </div>
          </div>
          <div className="text-center col-xs-12 col-md-12">
            <span>
              <DropDownMenu
                value={this.state.origLang}
                onChange={this.handleChangeOrig}
                style={styles.customWidth}
                autoWidth={false}
                className="ddMF"
              >
                <MenuItem value='from' primaryText="From" />
                <MenuItem value='unk' primaryText="Auto Detect" />
                <MenuItem value='zh-Hans' primaryText="Chinese (simplified)" />
                <MenuItem value='zh-Hant' primaryText="Chinese (traditional)" />
                <MenuItem value='cs' primaryText="Czech" />
                <MenuItem value='da' primaryText="Danish" />
                <MenuItem value='nl' primaryText="Dutch"/>
                <MenuItem value='en' primaryText="English"/>
                <MenuItem value='fi' primaryText="Finnish"/>
                <MenuItem value='fr' primaryText="French"/>
                <MenuItem value='de' primaryText="German"/>
                <MenuItem value='el' primaryText="Greek"/>
                <MenuItem value='hu' primaryText="Hungarian"/>
                <MenuItem value='it' primaryText="Italian"/>
                <MenuItem value='Ja' primaryText="Japanese"/>
                <MenuItem value='ko' primaryText="Korean"/>
                <MenuItem value='nb' primaryText="Norwegian"/>
                <MenuItem value='pl' primaryText="Polish"/>
                <MenuItem value='pt' primaryText="Portuguese"/>
                <MenuItem value='ru' primaryText="Russian"/>
                <MenuItem value='es' primaryText="Spanish"/>
                <MenuItem value='sv' primaryText="Swedish"/>
                <MenuItem value='tr' primaryText="Turkish"/>
              </DropDownMenu>
            </span>
            <span>
            <DropDownMenu
              value={this.state.transLang}
              onChange={this.handleChangeTrans}
              style={styles.customWidth}
              autoWidth={false}
            >
              <MenuItem value='to' primaryText="To"/>
              <MenuItem value='en' primaryText="English"/>
              <MenuItem value='fr' primaryText="French"/>
              <MenuItem value='de' primaryText="German"/>
              <MenuItem value='zh' primaryText="Chinese"/>
            </DropDownMenu>
            </span>
          </div>
          <div className="row text-center">
            <RaisedButton
              onTouchTap={this._onSubmit}
              label="TRANSLATE"
              secondary={true}
              className='fromTo'
            />
          </div>
        </div>
        { ImagePreview }
      </div>
    )
  }
}
