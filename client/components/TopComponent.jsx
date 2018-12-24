import React from 'react';
import Img from 'react-image';



var TopComponent = (props) => {
  var numReviews = props.reviews.length;

	return ( 
		<React.Fragment>
		<h1>Ratings & reviews <a href="">{numReviews}</a></h1>
		<div className='star-container'>
		<Img src={require('../../public/filled.png')} />
		<Img src={require('../../public/filled.png')} />
		<Img src={require('../../public/empty.png')} />
		<Img src={require('../../public/empty.png')} />
		<Img src={require('../../public/empty.png')} />
		</div>
       </React.Fragment>
		)

}

export default TopComponent;