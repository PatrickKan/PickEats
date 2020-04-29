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
import { getRecommendations} from '../../actions/yelp';
import { updateIndex } from '../../actions/recInfo'
import { geolocated } from "react-geolocated";
import LocationTracker from './Location';
import { FaUtensils } from "react-icons/fa";
import { Rating, Card } from 'semantic-ui-react';
import StarRatings from 'react-star-ratings';

import { Button, List, Dimmer, Loader, Transition } from 'semantic-ui-react'

class RecPage extends Component {
  state = {
    loading: true,
    noMore: false,
    length: 0
  }
  componentDidMount() {
    this.props.getRecommendations(0).then(()=>this.setState({loading: false, length: this.props.recs.length}));
    this.props.updateIndex(0);
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

  handlePrevious = () => {
    return this.props.index > 0 ? this.props.updateIndex(-1) : null
  }
  
  handleNext = () => {
    if (this.props.index + 1 >= this.props.recs.length) {
      this.props.getRecommendations(this.props.recs.length)
        .then(()=>this.setState({loading: false}))
        .then(()=>this.setState((prevState) => this.props.recs.length > prevState.length ? {length: this.props.recs.length} : {noMore: true}));
      console.log('next offset: ' + this.props.recs.length);
      this.setState({loading: true})
    }
    this.props.updateIndex(1);
  };

  renderNoMore() {
    return (<div className='ui cards' style={{ marginTop: '2rem' }}>
      <div className='ui centered card' style={{paddingTop: '12.5rem', paddingBottom: '12.5rem'}} key={1}>
        <div className="content" style={{textAlign: 'center'}}>
          <div className="header">No more restaurants 😫😢🤭</div>
        </div>
      </div>
    </div>);
  }

  renderRec(rec) {
    return (
      rec.name ? 
      ( <div className='ui centered card' key={rec.id}>
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
        {/* <Transition.Group
          as={List}
          animation="browse"
          duration={500}
        > */}
          <List.Item key={this.props.index}>
            <List.Content>
            {this.state.noMore && this.props.index >= this.state.length ?
            this.renderNoMore():
            this.state.loading ?
            <div className='ui cards' style={{ marginTop: '2rem' }}><div className='ui centered card' style={{paddingTop: '25rem'}} key={1}><div className="content">
              <Dimmer active inverted>
                <Loader inverted content='Loading' />
              </Dimmer>
            </div></div></div>:
            <div>
            <div className='ui cards' style={{ marginTop: '2rem' }} >
              {this.props.index < this.props.recs.length ? this.renderRec(this.props.recs[this.props.index]) : null}
            </div></div>}
            </List.Content>
          </List.Item>
        {/* </Transition.Group> */}

        <div style={{textAlign: 'center', marginTop:'2rem'}}>
          <Button.Group basic>
            <Button
              icon='caret left'
              size='big'
              onClick={this.handlePrevious}
              disabled={this.props.index<=0}
            />
            <Button
              icon='caret right'
              size='big'
              onClick={this.handleNext}
              disabled={this.state.noMore && this.props.index == this.state.length}
            />
          </Button.Group>
        </div>
        <LocationTracker/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  recs: Object.values(state.recInfo.businesses),
  index: state.recInfo.index
});

export default connect(
  mapStateToProps,
  { getRecommendations, updateIndex }
)(RecPage);
