import React from 'react';
import Review from './review.jsx';
import Helpful from './helpful.jsx';
import Stars from './stars.jsx'
import Img from 'react-image';

class PositiveReviews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      review: this.props.review
    }
  }

    stars() {
    let starsarr = [];
    
    for (var i = 0; i < 5; i++) {
      starsarr.push(<Img key={i} className='small-star' src={require('../../public/filled.png')} />)
  }
    return starsarr;
  }

  render() {
  
    return(
      <React.Fragment>
        <div className="review-container">
        <h3>{this.props.review.Title}</h3>
        <h4>(would recommend)</h4>
        <Stars stars={this.stars()} 
               User={this.state.review.Username}
               Date={this.state.review.Date} />
        <Review review={this.state.review.Review}/>
        <Helpful review={this.state.review.Upvotes} />
      
      </div>
      </React.Fragment>
  )
 }
}

export default PositiveReviews;