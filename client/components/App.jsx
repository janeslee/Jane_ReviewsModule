import React from 'react';
import $ from 'jquery';
import TopComponent from './topComponent.jsx';
import BottomButtons from './bottomButtons.jsx';
import PositiveReviews from './positiveReviews.jsx';
import NegativeReviews from './negativeReviews.jsx';
import PHID from './ph-id.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      topFour: [],
      botFour: []
    };
    this.selectProductID = this.selectProductID.bind(this);
  }

  //get ID from placeholder button and does magic
  selectProductID(e) {
    e.preventDefault();
    var data = new FormData(e.target);
    var ID = data.get('ID');
    console.log(ID);

    fetch(`/api/item/${ID}`)
      .then(res => res.json())
      .then(data => {
        this.sortHighest(data);
        let top = this.getFirstFour(data);

        this.sortLowest(data);
        let bot = this.getFirstFour(data);

        this.setState({
          reviews: data,
          topFour: top,
          botFour: bot
        });
      })
      .catch(err => console.log(err));
  }

  //used to sort data with highest stars/upvotes
  sortHighest(state) {
    let a = state;
    function compare(a, b) {
      if (a.upvotes < b.upvotes) return 1;
      if (a.upvotes > b.upvotes) return -1;
      return 0;
    }

    function compare2(a, b) {
      if (a.stars < b.stars) return 1;
      if (a.stars > b.stars) return -1;
      return 0;
    }

    a.sort(compare);
    a.sort(compare2);
  }

  //used to sorta data with lowest stars/ highest upvotes
  sortLowest(state) {
    let b = state;
    function compare(a, b) {
      if (a.upvotes < b.upvotes) return 1;
      if (a.upvotes > b.upvotes) return -1;
      return 0;
    }

    function compare2(a, b) {
      if (a.stars < b.stars) return -1;
      if (a.stars > b.stars) return 1;
      return 0;
    }

    b.sort(compare);
    b.sort(compare2);
  }

  //used to grab the first four reviews in data array
  getFirstFour(array) {
    let top = [];
    for (var i = 0; i < 4; i++) {
      top.push(array[i]);
    }
    return top;
  }

  //get request for data from database
  componentDidMount() {
    var itemId;
    var id = window.location.pathname.slice(1, window.location.pathname.length - 1);
    itemId = Number(id);

    // refactored to ajax from native fetch method, was getting error with res.json()
    $.ajax({
      method: 'GET',
      url: `/api/item/${itemId}`,
      type: 'application/json',
      success: (data) => {        
        this.sortHighest(data);
        let top = this.getFirstFour(data);

        this.sortLowest(data);
        let bot = this.getFirstFour(data);

        this.setState({
          reviews: data,
          topFour: top,
          botFour: bot
        });
      },
      error: (error) => {
        console.error('there was an error', error);
      }
    });
  }

  render() {
    return (
      <div className="module-container">
        <PHID handleSubmit={this.selectProductID.bind(this)} />
        <TopComponent reviews={this.state.reviews} />
        <div className="a-r">
          <div className="pos-r">
            <h2 className="left-text">Most helpful positive reviews</h2>
            <div className="reviews">
              {this.state.topFour.map((review, index) => {
                return <PositiveReviews review={review} key={'Pos' + index} />;
              })}
            </div>
          </div>
          <div className="neg-r">
            <h2 className="left-text">Most helpful negative reviews</h2>
            <div className="reviews">
              {this.state.botFour.map((review, index) => {
                return <NegativeReviews review={review} key={'Neg' + index} />;
              })}
            </div>
          </div>
        </div>
        <BottomButtons />
      </div>
    );
  }
}

export default App;
