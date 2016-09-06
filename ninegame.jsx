  // Code goes here
  
  var  possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
  };
  
  
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
    
    switch(this.props.correct){
      case true:
        var button = (
          <button className="btn btn-success" onClick={this.props.acceptAnswer}> 
          <span className="glyphicon glyphicon-ok"></span>
          </button>
      )
      break;
      case false:
      var button = (
          <button className="btn btn-danger">
          <span className="glyphicon glyphicon-remove"></span>
      </button>)
      break;
      default:
      var disabled = this.props.selectedNumbers.length == 0 ? "disabled" : "" ;
      var button = (<button className="btn btn-primary" onClick={this.props.checkAnswer} disabled={disabled}>
        =
      </button>)
      break;
    }
    
    var disableRedraw = this.props.numberOfTryLeft == 0 ? "disabled" : "" ;
    
    return (
      <div id="button-container">
      {button} 
      <div>
        <button className="btn btn-warning btn-xs" disabled={disableRedraw} onClick={this.props.redraw}>
          <span className="glyphicon glyphicon-refresh">&nbsp;{this.props.numberOfTryLeft}</span>
        </button>
      </div>
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
    var usedNumbers = this.props.usedNumbers;
    

    for(var i=1; i <=9; i++)
    {
      var isUsed = (usedNumbers.indexOf(i) >=0);
      className = "number selected-" + (selectedNumbers.indexOf(i) >=0);
      className += " used-" + isUsed;
      
      if(!isUsed)
      {
      numberDivs.push(
        <div className={className} onClick={this.props.selectNumber.bind(null,i)}>{i}</div>
        )
      }
      else{
        numberDivs.push(
        <div className={className}>{i}</div>
        )
      }
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

var DoneContainer = React.createClass({
  render: function(){
    return (
      <div id="done-container" className="well text-cemter">
        <h2>{this.props.doneStatus}</h2>
      </div>
      )
  }
});


var Game = React.createClass({
  getInitialState : function(){
    return {
      selectedNumbers:[],
      numberOfStars : this.randomNumber(),
      numberOfTryLeft : 5,
      correct: null,
      usedNumbers : [],
      doneStatus : null
    };
  },
  randomNumber : function(){
    return Math.floor(Math.random()*9)+1;
  },
  selectNumber : function(clicked){
    if(this.state.selectedNumbers.indexOf(clicked) < 0 )
    {
      this.setState(
        {
        selectedNumbers : this.state.selectedNumbers.concat(clicked), 
        correct:null
      });
    } 
  },
  unselectNumber : function(unclicked){
    var index = this.state.selectedNumbers.indexOf(unclicked);

    if(index >= 0)
    {
      var t = this.state.selectedNumbers.splice(index,1);
      this.setState(
        {
        selectedNumbers : this.state.selectedNumbers,        
        correct:null
          
        });
    }
      
  },
  checkAnswer : function(){
    var sumAnswer =  this.state.selectedNumbers.reduce(function(pv, cv) { return pv + cv; }, 0);
    var correct = this.state.numberOfStars === sumAnswer;
    this.setState({correct: correct});
  },
  acceptAnswer : function(){
    var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
    this.setState({
      usedNumbers:usedNumbers,
      correct : null,
      selectedNumbers: [],
      numberOfStars : this.randomNumber()
    }, function(){
      this.updateDoneStatus()
    });
  },
  redraw : function(){
    if(this.state.numberOfTryLeft > 0)
    {
      this.setState({ selectedNumbers:[],
          numberOfStars : this.randomNumber(),
          correct: null,
          numberOfTryLeft: this.state.numberOfTryLeft-1 
      }, function(){
      this.updateDoneStatus()
    });
    }
  },
   possibleSolutions: function(){
    var numberOfStars = this.state.numberOfStars, 
        possibleNumbers= [],
        usedNumbers = this.state.usedNumbers;
   
    for(var i = 1; i < 10; i++)
    {
      if(usedNumbers.indexOf(i) < 0)
      {
        possibleNumbers.push(i); 
      }
    }
    var t = possibleCombinationSum(possibleNumbers,numberOfStars); 
    return t; 
  },
  updateDoneStatus: function(){
    console.log("tries left:" + (this.state.numberOfTryLeft));
    if(this.state.usedNumbers.lenght === 9){
      this.setState({doneStatus:"YOU WON!"})
      return;
    }
    console.log(!this.possibleSolutions() && this.state.numberOfTryLeft <= 0);
    if(!this.possibleSolutions() && this.state.numberOfTryLeft <= 0)
    {
      this.setState({doneStatus:"Game over!"})
      return;
    }
    
  },
  render : function(){
    var selectedNumbers = this.state.selectedNumbers,
    bottomContainer;
    
    if(this.state.doneStatus)
    {
      bottomContainer = (
         < DoneContainer doneStatus={this.state.doneStatus} />
        )
    }
    else
    {
      bottomContainer = (
        <NumberContainer selectedNumbers={this.state.selectedNumbers} 
                         usedNumbers={this.state.usedNumbers}
                        selectNumber={this.selectNumber}/>
        )
    }
    
    return(
      <div id="game">
      <h2>The game</h2>
      <hr/>
        <div className="clearfix">
          < StarsContainer numberOfStars={this.state.numberOfStars} />
          < ButtonContainer numberOfTryLeft={this.state.numberOfTryLeft}
                            checkAnswer={this.checkAnswer}
                            acceptAnswer={this.acceptAnswer}
                            selectedNumbers={selectedNumbers}
                            correct={this.state.correct}
                            redraw={this.redraw}
                            />
          < AnswerContainer selectedNumbers={selectedNumbers}
                            unselectNumber={this.unselectNumber}/> 
        </div>

       {bottomContainer}

      </div>
      )
  }
})


ReactDOM.render(
  <Game />,
  document.getElementById('container')
);
