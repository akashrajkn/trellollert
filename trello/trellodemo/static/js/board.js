

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
var Popover = ReactBootstrap.Popover;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var Modal = ReactBootstrap.Modal;
var Glyphicon = ReactBootstrap.Glyphicon;
var Panel = ReactBootstrap.Panel;



var MyLargeModal = React.createClass({
  render() {
    return (
      <Modal {...this.props} aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg"><h2>{this.props.title}</h2></Modal.Title>
          in Card: <b>{this.props.card_text}</b>
        </Modal.Header>
        <Modal.Body>

          <Grid>
            <Row>
              <h4>Add a Comment</h4>
            </Row>
            <Row>
              <textarea cols="35" rows="3" placeholder="Write a comment...">
              </textarea>
            </Row>
            <Row>
              <Button bsStyle="success"><Glyphicon glyph="send" /> Send</Button>
            </Row>
          </Grid>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});


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


var Messagebox = React.createClass({
  loadMessagesFromServer: function() {

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
  handleMessageSubmit: function(message) {
    var messages = this.state.data;
    message.id = Date.now();
    var newMessages = messages.concat([message]);
    this.setState({data: newMessages});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: message,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: messages});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadMessagesFromServer();
    setInterval(this.loadMessagesFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="messagebox">
        <MessageList data={this.state.data} />
        <MessageForm onMessageSubmit={this.handleMessageSubmit} />
      </div>
    );
  }
});



var CardList = React.createClass({
  render: function() {
    var cardNodes = this.props.data.map(function(card) {
      return (
        <Card card_text={card.card_text} created_by={card.created_by} key={card.id} cardid={card.id}>
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
      return (
        <Message card_text={message.card_text} message_text={message.message_title} key={message.id} messageid={message.id}>
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


var MessageForm = React.createClass({
  getInitialState: function() {
    return {message_text: ''};
  },
  handleMessagenameChange: function(e) {
    this.setState({message_text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var message_text = this.state.message_text.trim();
    if (!message_text) {
      return;
    }
    this.props.onMessageSubmit({message_text: message_text, csrfmiddlewaretoken: csrftoken});
    this.setState({message_text: ''});
  },
  render: function() {
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormGroup controlId="formInlineMessageName">
          <FormControl type="text" placeholder="message" onChange={this.handleMessagenameChange} block/>
        </FormGroup>
      </Form>
    );
  }
});



var Card = React.createClass({
  render: function() {

    var jumboStyle= {backgroundColor:"#0079bf", color:"white"};

    var popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus">
        Added by: <strong>{this.props.created_by}</strong>
      </Popover>
    );

    return (
      <div className="card">
        <Col md={4}>
          <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus}>
            <Jumbotron style={jumboStyle}>
              <h3><b>{this.props.card_text}</b></h3>
              <Messagebox url={"/trello/messages/" + this.props.cardid + "/"} pollInterval={2000}/>
            </Jumbotron>
          </OverlayTrigger>
        </Col>
      </div>
    );
  }
});

var Message = React.createClass({

  getInitialState() {
    return { lgShow: false };
  },

  render: function() {

    var buttonStyle = {color:"black"};
    const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

    let lgClose = () => this.setState({ lgShow: false });    
    return (
      <div className="message" style={wellStyles}>
        <Button bsStyle="default" bsSize="xsmall" style={buttonStyle} onClick={()=>this.setState({ lgShow: true })} block>
          {this.props.message_text}
        </Button>
        <MyLargeModal card_text={this.props.card_text} show={this.state.lgShow} title={this.props.message_text} onHide={lgClose} />
      </div>
    );
  }
});



document.body.style.backgroundColor="#DEDEF6";

ReactDOM.render(
  <Cardbox url={"/trello/cards/" + boardid + "/"} pollInterval={5000}/> ,
  document.getElementById('cards_list_react')
);


