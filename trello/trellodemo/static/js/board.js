

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
  getInitialState: function() {
    return {showMe: false, url2: "deletecard/" + this.props.cardid + "/", url3: "", show: false, new_cardname: ''};
  },

  changeComponentToInput: function() {
    this.setState({showMe: !this.state.showMe});
  },

  handleCardnameModify: function(e) {
    this.setState({new_cardname: e.target.value, url3:"modifycard/" + this.props.cardid + "/" + e.target.value + "/"});
  },

  handleCardDelete: function(card) {
    $.ajax({
      url: this.state.url2,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: card});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },


  handleCardModify: function(card) {

    console.log(this.state.url3)

    this.setState({showMe: false});
    $.ajax({
      url: this.state.url3,
      dataType: 'json',
      success: function(data) {
        this.setState({data:data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: card});
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {

    var jumboStyle= {backgroundColor:"#0079bf", color:"white"};
    var closeStyle = {display: "inlineBlock", position:"absolute", top: "0", right:"10"};
    var userStyle = {display: "inlineBlock", position:"absolute", top: "0", left:"10"};
    var editStyle = {display: "inlineBlock", position:"absolute", top: "0", right:"40"};
    var glyphStyle = {color: "white"};

    var popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus">
        Added by: <strong>{this.props.created_by}</strong>
      </Popover>
    );
    
    const wellStyles = {margin: '0 auto 10px'};
    var clickableTitle;

    if(this.state.showMe) {
      clickableTitle =       <Form inline onSubmit={this.handleCardModify}>
        <FormGroup controlId="formInlineCardname">
          <FormControl type="text" placeholder="change" onChange={this.handleCardnameModify} block/>
        </FormGroup>
      </Form>;
    } else {
      clickableTitle = <div> <Button bsStyle="link" style={glyphStyle} onClick={this.changeComponentToInput}><h3> {this.props.card_text} </h3> </Button> </div>;
    }


    return (
      <div className="card">
        <Col md={4}>
          <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus}>
            <Jumbotron style={jumboStyle}>
              {clickableTitle}
              <a href="#">
                <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popoverHoverFocus}>
                  <Button bsStyle="link" style={editStyle}> <Glyphicon style={glyphStyle} glyph="edit" /></Button>
                </OverlayTrigger>
              </a>
              <a href="#">
                <Button bsStyle="link" style={closeStyle} onClick={this.handleCardDelete} > <Glyphicon style={glyphStyle} glyph="remove-sign" /> </Button>
              </a>
              <Messagebox url={"/trello/messages/" + this.props.cardid + "/"} pollInterval={1000}/>
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

    var buttonStyle = {color:"white"};
    const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

    let lgClose = () => this.setState({ lgShow: false });    
    return (
      <div className="message" >
        <Button bsStyle="link" bsSize="xsmall" style={buttonStyle} onClick={()=>this.setState({ lgShow: true })} >
          {this.props.message_text}
        </Button>
        <MyLargeModal card_text={this.props.card_text} show={this.state.lgShow} title={this.props.message_text} onHide={lgClose} />
      </div>
    );
  }
});



document.body.style.backgroundColor="#DEDEF6";

ReactDOM.render(
  <Cardbox url={"/trello/cards/" + boardid + "/"} pollInterval={2000}/> ,
  document.getElementById('cards_list_react')
);


