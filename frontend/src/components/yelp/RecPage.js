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
import { Rating, Card } from 'semantic-ui-react';
import StarRatings from 'react-star-ratings';

import { Form, Grid, List, Transition } from 'semantic-ui-react'

class RecPage extends Component {
  state = {
    index: 0,
  }
  componentDidMount() {
    this.props.getRecommendations(0).then(() => {
      // console.log("force updating")
      // this.forceUpdate();
    });
    // this.forceUpdate();
    // console.log(this.props.recs) // TODO: Set offset equal to a variable offset stored in state
    // this.forceUpdate();
  }

  metersToMiles(meters) {
    return (meters/1609.344).toFixed(2);
  }

  imgStyle = {
      height: 300,
      objectFit: "cover"
  }

  handlePrevious = () =>
    this.setState((prevState) => prevState.index > 0 ? { index: prevState.index - 1} : {index: 0})
  
  handleNext = () =>
    this.setState((prevState) => {
      if (prevState.index + 1 >= this.props.recs.length) {
        this.props.getRecommendations(this.props.recs.length);
        console.log('next offset: ' + this.props.recs.length);
      }
      return { index: prevState.index + 1};
    })

  renderRec(rec) {
    return (
      rec.name ? 
      ( <div className='ui card' key={rec.id}>
          <div className="image">
            <img style={this.imgStyle} src={rec.image_url}/>
          </div>
          <div className='content'>
            <div className="header">{rec.name}</div>
            <div className="meta">{rec.price}</div>
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
          <div className="extra content">
            <a>
              {this.metersToMiles(rec.distance) + " miles away"} 
            </a>
          </div>
        </div> ) : (<div/>)
    )
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column>
              {/* <Transition.Group
                as={List}
                animation="browse"
                duration={500}
              > */}
                {<List.Item key={this.state.index}>
                  <List.Content>
                  <div className='ui cards' style={{ marginTop: '2rem' }}>
                    {this.state.index < this.props.recs.length ? this.renderRec(this.props.recs[this.state.index]) : null}
                  </div>
                  </List.Content>
                </List.Item>}
              {/* </Transition.Group> */}
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={6}>
            <Grid.Column/>
            <Grid.Column/>

            <Grid.Column textAlign='center'>
              <Form.Button
                content="Previous"
                onClick={this.handlePrevious}
              />
            </Grid.Column>
            <Grid.Column textAlign='left'>
              <Form.Button
                content="Next"
                onClick={this.handleNext}
              />
            </Grid.Column>

            <Grid.Column/>
            <Grid.Column/>
          </Grid.Row>
        </Grid>
        <LocationTracker/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  recs: ownProps.recs ? ownProps.recs.concat(Object.values(state.todos)) : Object.values(state.todos)
});

export default connect(
  mapStateToProps,
  { getRecommendations }
)(RecPage);
