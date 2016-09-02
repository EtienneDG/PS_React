// Code goes here
var StarsContainer = React.createClass({
  render : function(){
    var numberOfStars = Math.floor(Math.random()*9)+1;
    var stars = []
    
    for(var i = 0 ; i < numberOfStars; i++)
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
    return (
      <div id="answer-container">
      <div className="well">
        
        </div>
      </div>
      )
  }
});

var Main = React.createClass({
  render : function(){
    return(
      <div id="game">
      <hr/>
      <h2>The game</h2>
        <div className="clearfix">
          < StarsContainer/>
          < ButtonContainer />
          < AnswerContainer /> 
        </div>
      </div>
      )
  }
})


ReactDOM.render(
  <Main />,
  document.getElementById('container')
);
