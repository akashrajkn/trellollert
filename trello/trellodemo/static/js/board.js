

var Button = ReactBootstrap.Button;
var Jumbotron = ReactBootstrap.Jumbotron;
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;
var Form = ReactBootstrap.Form;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
var ControlLabel = ReactBootstrap.ControlLabel;

var Cardbox = React.createClass({
  loadCardsFromServer: function() {

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

  },
  handleCardSubmit: function(card) {
    var cards = this.state.data;
    card.id = Date.now();
    var newCards = cards.concat([card]);
    this.setState({data: newCards});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: card,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: cards});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCardsFromServer();
    setInterval(this.loadCardsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="cardbox">
        <CardList data={this.state.data} />
        <CardForm onCardSubmit={this.handleCardSubmit} />
      </div>  
    );
  }
});

var CardList = React.createClass({
  render: function() {
    var cardNodes = this.props.data.map(function(card) {
      return (
        <Card card_text={card.card_text} key={card.id} cardid={card.id} message_data={card.message_data}>
        </Card>
      );
    });
    return (
      <div className="cardList">
        <Grid>
          <Row>
            {cardNodes}
          </Row>
        </Grid>
      </div>
    );
  }
});


var MessageList = React.createClass({

  render: function() {

    var messageNodes = this.props.data.map(function(message) {
      console.log(message);

      return (
        <Message message_text={message.message_title} key={message.id} messageid={message.id}>
          {message.message_title}
        </Message>
      );
    });


    return (
      <div className="messageList">
            {messageNodes}
      </div>
    );
  }
});

var CardForm = React.createClass({
  getInitialState: function() {
    return {card_text: ''};
  },
  handleCardnameChange: function(e) {
    this.setState({card_text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var card_text = this.state.card_text.trim();
    if (!card_text) {
      return;
    }
    this.props.onCardSubmit({card_text: card_text, csrfmiddlewaretoken: csrftoken});
    this.setState({card_text: ''});
    console.log(this.state.card_text);
  },
  render: function() {
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormGroup controlId="formInlineCardName">
          <FormControl type="text" placeholder="Add new card" onChange={this.handleCardnameChange}/>
        </FormGroup>
      </Form>
    );
  }
});

var Card = React.createClass({
  render: function() {

    var jumboStyle= {backgroundColor:"yellow"};


    return (
      <div className="card">
        <Col md={3}>
          <Jumbotron style={jumboStyle}>
            <h3>{this.props.card_text}</h3>
            <MessageList data={this.props.message_data} />
          </Jumbotron>
        </Col>
      </div>
    );
  }
});

var Message = React.createClass({
  render: function() {
    return (
      <div className="message">
        {this.props.message_text}
      </div>
    );
  }
});


var divStyle = {
  color: "#5FB404"
};



ReactDOM.render(
  <Cardbox style={divStyle} url={"/trello/cards/" + boardid + "/"} pollInterval={5000}/> ,
  document.getElementById('cards_list_react')
);


