// // import React, { Component } from 'react';
// // import {List, ListItem, makeSelectable} from 'material-ui/List';
// // import Avatar from 'material-ui/Avatar';
// // import Subheader from 'material-ui/Subheader';
// //
// // let SelectableList = makeSelectable(List);
// //
// // export default class InfoList extends Component {
// //   constructor(props){
// //     super(props);
// //
// //     this.state = {
// //       transaction: TranslatedStore.getTranslation(props.params.id),
// //       open: false
// //     }
// //
// //     this._onChange = this._onChange.bind(this);
// //   }
// //
// //   componentWillMount() {
// //     TranslatedStore.startListening(this._onChange);
// //   }
// //
// //   componentWillUnmount() {
// //     TranslatedStore.stopListening(this._onChange);
// //   }
// //
// //   _onChange() {
// //     this.setState({ transaction: TranslatedStore.getTranslation(this.props.params.id) });
// //   }
// //
// //   render() {
// //
// //     return (
// //       <div>
// //
// //       </div>
// //     )
// //   }
// // }
//
//
//
// import React, {Component, PropTypes} from 'react';
// import {List, ListItem, makeSelectable} from 'material-ui/List';
// import Avatar from 'material-ui/Avatar';
// import Subheader from 'material-ui/Subheader';
//
// import TranslatedStore from '../stores/TranslatedStore';
//
// let SelectableList = makeSelectable(List);
//
// let _translation = {};
// let id = TranslatedStore.getCurrentTranslation();
//
// function wrapState(ComposedComponent) {
//   return class SelectableList extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         selectedIndex: undefined,
//         transaction: TranslatedStore.getTranslation(id)
//       }
//       _translation = TranslatedStore.getTranslation(id);
//
//       this.handleRequestChange = this.handleRequestChange.bind(this);
//       this._onChange = this._onChange.bind(this);
//     }
//
//     componentWillMount() {
//       TranslatedStore.startListening(this._onChange);
//       this.setState({
//         selectedIndex: this.props.defaultValue,
//       });
//     }
//
//     componentWillUnmount() {
//       TranslatedStore.stopListening(this._onChange);
//     }
//
//     _onChange() {
//       this.setState({ transaction: TranslatedStore.getTranslation(id) });
//       _translation = TranslatedStore.getTranslation(id);
//     }
//
//     handleRequestChange(event, index) {
//       this.setState({
//         selectedIndex: index,
//       });
//     };
//
//     render() {
//       console.log('this.state.translation:', this.state.translation)
//       console.log('id:', id)
//       return (
//         <ComposedComponent
//           value={this.state.selectedIndex}
//           onChange={this.handleRequestChange}
//         >
//           {this.props.children}
//         </ComposedComponent>
//       );
//     }
//   };
// }
//
// SelectableList = wrapState(SelectableList);
// console.log('_translation:', _translation)
// const ListExampleSelectable = () => (
//   <div>
//     <SelectableList defaultValue={3}>
//       <ListItem
//         value={1}
//         primaryText="Image to Text Translation"
//         nestedItems={[
//           <ListItem
//             value={2}
//           >
//           <div>
//           </div>
//           </ListItem>
//         ]}
//       />
//       <ListItem
//         value={3}
//         primaryText="Language Translation"
//         nestedItems={[
//           <ListItem
//             value={4}
//           >
//           <h4>Translated from English to French</h4>
//           <div>
//             {/* {_translation.translation.text} */}
//           </div>
//           </ListItem>
//         ]}
//       />
//       <ListItem
//         value={5}
//         primaryText="Language Translation"
//         nestedItems={[
//           <ListItem
//             value={6}
//           >
//           <div>
//             {/* {_translation.text} */}
//           </div>
//           </ListItem>
//         ]}
//       />
//     </SelectableList>
//   </div>
// );
//
// export default ListExampleSelectable;
