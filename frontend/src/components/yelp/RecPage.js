// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { getRecommendations } from '../../actions/yelp';

// class RecPage extends Component {
//   componentDidMount() {
//     this.props.getRecommendations();
//   }

//   render() {
//     return (
//       <div className='ui relaxed divided list' style={{ marginTop: '2rem' }}>
//         {this.props.recs.map(rec => (
//           <div className='item' key={rec.id}>
//             <div className='right floated content'>
//             </div>
//             <i className='large calendar outline middle aligned icon' />
//             <div className='content'>
//               <div className='description'>{rec.created_at}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   recs: Object.values(state.recs)
// });

// export default connect(
//   mapStateToProps,
//   { getRecommendations }
// )(RecPage);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTodos, deleteTodo } from '../../actions/todos';
import { getRecommendations } from '../../actions/yelp';


class RecPage extends Component {
  componentDidMount() {
    // this.props.getTodos();
    this.props.getRecommendations();
  }

  render() {
    return (
      <div className='ui relaxed divided list' style={{ marginTop: '2rem' }}>
        {this.props.recs.map(rec => (
          <div className='item' key={rec.id}>
            <i className='large calendar outline middle aligned icon' />
            <div className='content'>
              <div className='description'>{rec.name}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recs: Object.values(state.todos)
});

export default connect(
  mapStateToProps,
  { getRecommendations }
)(RecPage);
