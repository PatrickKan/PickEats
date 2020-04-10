import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInfos, deleteInfo } from '../../actions/info';

import { Label, Icon, Popup } from 'semantic-ui-react';
import PickeatsEdit from './PickeatsEdit';

class PickeatsList extends Component {
  componentDidMount() {
    this.props.getInfos(this.props.type);
  }

  render() {
    return (
      <div className='ui relaxed' style={{ marginTop: '2rem' }}>
        {this.props.todos.map(todo => (
          todo.description ? (
            <Popup
              trigger={
                <Label as='a' style={{margin: '0.2rem'}}>
                  {todo.description}
                  <Icon name='delete' onClick={()=>this.props.deleteInfo(this.props.type, todo.id)}/>
                </Label>
              }
              key={todo.type+todo.id}
              hoverable
            >
              <Popup.Content>
                <PickeatsEdit type={this.props.type} id={todo.id}/>
              </Popup.Content>
            </Popup>
          ) : (<span/>)
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  todos: Object.values(state.todos).filter(obj=>obj.type === ownProps.type),
});

export default connect(
  mapStateToProps,
  { getInfos, deleteInfo }
)(PickeatsList);
