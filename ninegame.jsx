  // Code goes here
var StarsContainer = React.createClass({
  render : function(){
    var stars = []
    
    for(var i = 0 ; i < this.props.numberOfStars; i++)
    {
      stars.push(
        <span className="glyphicon glyphicon-star"></span>
        )
    }
    
    return (
      <div id="stars-container">
        <div className="well">
          {stars}
        </div>
      </div>
      )
  }
});

var ButtonContainer = React.createClass({
  render : function(){
    return (
      <div id="button-container">
      <button className="btn btn-primary">
        =
      </button>
      </div>
      )
  }
});

var AnswerContainer = React.createClass({
  render : function(){
    
    var answer = [];
    
    for(var n in this.props.selectedNumbers)
    {
      var val = this.props.selectedNumbers[n];
      answer.push(
        <div className="number" onClick={this.props.unclickNumber.bind(null,val)}>{val}</div>
        )
    }
    
    return (
      <div id="answer-container">
        <div className="well">
          {answer}
        </div>
      </div>
      )
  }
});

var NumberContainer = React.createClass({
  render : function(){
    
    var numberDivs = [];
    var className;
    var selectedNumbers = this.props.selectedNumbers;

    for(var i=1; i <=9; i++)
    {
      className = "number selected-" + (selectedNumbers.indexOf(i) >=0);
      numberDivs.push(
        <div className={className} onClick={this.props.clickNumber.bind(null,i)}>{i}</div>
        )
    }

    return (
      <div id="number-container">
      <div className="well">
          {numberDivs}
        </div>
      </div>
      )
  }
});


var Game = React.createClass({
  getInitialState : function(){
    return {
      selectedNumbers:[],
      numberOfStars : Math.floor(Math.random()*9)+1
    };
  },
  clickNumber : function(clicked){
    if(this.state.selectedNumbers.indexOf(clicked) < 0 )
    {
      this.setState({selectedNumbers : this.state.selectedNumbers.concat(clicked)});
    }
  },
  unclickNumber : function(unclicked){
      var index = this.state.selectedNumbers.indexOf(unclicked);
      console.log(index);
      
      if(index >= 0)
      {
        console.log(unclicked);
        var t = this.state.selectedNumbers.splice(index,1);
        console.log(t);
        this.setState({selectedNumbers : this.state.selectedNumbers});
        console.log(this.state.selectedNumbers);
      }
      
  },
  render : function(){
    return(
      <div id="game">
      <h2>The game</h2>
      <hr/>
        <div className="clearfix">
          < StarsContainer numberOfStars={this.state.numberOfStars} />
          < ButtonContainer />
          < AnswerContainer selectedNumbers={this.state.selectedNumbers}
                            unclickNumber={this.unclickNumber}/> 
        </div>
        
        <NumberContainer selectedNumbers={this.state.selectedNumbers} 
                        clickNumber={this.clickNumber}/>
        
      </div>
      )
  }
})


ReactDOM.render(
  <Game />,
  document.getElementById('container')
);
