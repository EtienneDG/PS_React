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
      <button className="btn btn-primary" onClick={this.props.checkAnswer}>
        {this.props.numberOfTryLeft}
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
        <div className="number" onClick={this.props.unselectNumber.bind(null,val)}>{val}</div>
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
        <div className={className} onClick={this.props.selectNumber.bind(null,i)}>{i}</div>
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
      numberOfStars : Math.floor(Math.random()*9)+1,
      numberOfTryLeft : 3
    };
  },
  selectNumber : function(clicked){
    if(this.state.selectedNumbers.indexOf(clicked) < 0 )
    {
      this.setState({selectedNumbers : this.state.selectedNumbers.concat(clicked)});
    } 
  },
  unselectNumber : function(unclicked){
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
  checkAnswer : function(){
    console.log("check answer");
    var sumAnswer =  this.state.selectedNumbers.reduce(function(pv, cv) { return pv + cv; }, 0);
    if(this.state.numberOfStars == sumAnswer)
    {
      console.log("good");
    }
    else{
      this.setState({numberOfTryLeft :this.state.numberOfTryLeft-1});
      console.log("tries left:" + this.state.numberOfTryLeft);
    }
  },
  render : function(){
    return(
      <div id="game">
      <h2>The game</h2>
      <hr/>
        <div className="clearfix">
          < StarsContainer numberOfStars={this.state.numberOfStars} />
          < ButtonContainer numberOfTryLeft={this.state.numberOfTryLeft}
                            checkAnswer={this.state.checkAnswer}/>
          < AnswerContainer selectedNumbers={this.state.selectedNumbers}
                            unselectNumber={this.unselectNumber}/> 
        </div>
        
        <NumberContainer selectedNumbers={this.state.selectedNumbers} 
                        selectNumber={this.selectNumber}/>
        
      </div>
      )
  }
})


ReactDOM.render(
  <Game />,
  document.getElementById('container')
);
