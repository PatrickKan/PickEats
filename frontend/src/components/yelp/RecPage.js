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
import { geolocated } from "react-geolocated";
import LocationTracker from './Location';
import { FaUtensils } from "react-icons/fa";
import { Rating } from 'semantic-ui-react';
import StarRatings from 'react-star-ratings';
import './styles.css';

class RecPage extends Component {
  componentDidMount() {
    // this.props.getTodos();
    this.props.getRecommendations();
  }

  metersToMiles(meters) {
    return (meters/1609.344).toFixed(2);
  }

  render() {
    return (
      <div>
        <div className='ui cards' style={{ marginTop: '2rem' }}>
          {this.props.recs.map(rec => (
            rec.name ? 
            ( <div className='ui card' key={rec.id}>
                <div class="image">
                  <img src={rec.image_url} resizeMode="cover" style={{height: 300, backgroundColor: "red" }}/>
                </div>
                <div className='content'>
                  <div class="header">{rec.name}</div>
                  <div class="meta">{rec.price}</div>
                  <div className='description'><FaUtensils/>{"  " + rec.location.address1 + " "}</div>
                  <div className='description'>
                    {rec.rating.toFixed(1) + " "}  
                    <StarRatings
                    rating={rec.rating}
                    starRatedColor="black"
                    numberOfStars={5}
                    starDimension='15px'
                    starSpacing='1px'
                    name='rating'
                    />
                    {" " + rec.review_count + "  reviews"}</div>
                </div>
                <div class="extra content">
                  <a>
                    {this.metersToMiles(rec.distance) + " miles away"} 
                  </a>
                </div>
              </div> ) : (<div/>)
          ))}
        </div>
        <LocationTracker/>
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
