import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addInfo } from '../../actions/info';
import TodoForm from './TodoForm';

class PickeatsCreate extends Component {
  onSubmit = formValues => {
    this.props.addInfo(this.props.type, formValues);
  };

  render() {
    return (
      <div style={{ marginTop: '2rem' }}>
        <TodoForm destroyOnUnmount={false} onSubmit={this.onSubmit} form={'create' + this.props.type}/>
      </div>
    );
  }
}

export default connect(
  null,
  { addInfo }
)(PickeatsCreate);
