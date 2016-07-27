
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
var Overlay = ReactBootstrap.Overlay;
var Glyphicon = ReactBootstrap.Glyphicon;
var Panel = ReactBootstrap.Panel;



var Room = React.createClass({
  loadBoardsFromServer: function() {
//    var user = document.getElementById('alpha').innerHTML;
//    console.log(user);
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
  handleBoardSubmit: function(board) {
    var boards = this.state.data;
    board.id = Date.now();
    var newBoards = boards.concat([board]);
    this.setState({data: newBoards});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: board,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: boards});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: [], searchString: '',};
  },
  handleChange: function(e) {
    this.setState({searchString:e.target.value});
  },
  componentDidMount: function() {
    this.loadBoardsFromServer();
    setInterval(this.loadBoardsFromServer, this.props.pollInterval);
  },
  render: function() {
    var libraries = this.state.data;
    var searchString = this.state.searchString.trim().toLowerCase();
    //console.log(searchString);
    if(searchString.length > 0){

      libraries = libraries.filter(function(l){
        console.log(l.boardname);
          return l.boardname.toLowerCase().match( searchString );
      });

    };

    var boardlistfilter = libraries.map(function(l) {

      var newdata = [];
      newdata.push({
        id: l.id,
        key: l.id,
        boardname: l.boardname
      });

      return(
        <BoardList data={newdata}/>
      );
    });

    var dividerStyle = {width:"5px", height:"auto"};

    return (
      <div className="room"> 
      <Glyphicon glyph="search"/>
      <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder= "Search Boards" />
        <Grid>
          <h2>My Room</h2>
            {boardlistfilter}
          <BoardForm onBoardSubmit={this.handleBoardSubmit} />
        </Grid>
      </div>  
    );
  }
});

var BoardList = React.createClass({



  render: function() {

    var boardNodes = this.props.data.map(function(board) {
      return (
        <Board boardname={board.boardname} key={board.id} boardid={board.id}>
          {board.boardname}
        </Board>
      );
    });
    return (
      <div className="boardList">
        {boardNodes}
      </div>
    );
  }
});


var BoardForm = React.createClass({
  getInitialState: function() {
    return {boardname: '', show:false};
  },
  handleBoardnameChange: function(e) {
    this.setState({boardname: e.target.value, show:this.state.show});
  },
  toggle:function () {
    this.setState({boardname: this.state.boardname,show: !this.state.show})
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var boardname = this.state.boardname.trim();
    if (!boardname) {
      return;
    }
    this.setState({boardname: '',show: false});
    this.props.onBoardSubmit({boardname: boardname, csrfmiddlewaretoken: csrftoken});
  },
  render: function() {

    var popoverStyle={
      position: 'absolute',
      backgroundColor: '#EEE',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
      border: '1px solid #CCC',
      borderRadius: 3,
      marginLeft: -240,
      marginTop:-10,
      padding: 25,
    };

    var popoverHoverFocus = (
      <Popover style={popoverStyle} id="popover2" >
        <Form inline onSubmit={this.handleSubmit}>
          <FormGroup controlId="formInlineCardName">
            <FormControl type="text" placeholder="+ board" onChange={this.handleBoardnameChange}/>
          </FormGroup>
        </Form>
      </Popover>
    );

    var jumboStyle = {backgroundColor: "#DCD1CE",};

    return (
      <div className="boardForm">
        <Grid>
          <Row>
            <Col md={3}>
              <OverlayTrigger trigger="click" rootClose overlay={popoverHoverFocus} show={this.state.show}>
                <Jumbotron style={jumboStyle}>
                  <h3>Add Board</h3>
                </Jumbotron>
              </OverlayTrigger>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

const CustomPopover = React.createClass({
  render() {
    return (
      <div
        style={{
          position: 'absolute',
          backgroundColor: '#EEE',
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
          border: '1px solid #CCC',
          borderRadius: 3,
          marginLeft: 0,
          marginTop:-15,
          padding: 10,
        }}
      >
        <strong>Holy guacamole!</strong> Check this info.
      </div>
    );
  },
});

var Board = React.createClass({
  
  getInitialState: function() {
    return {url2: "deleteboard/" + this.props.boardid + "/", url3: "modifyboard/" + this.props.boardid + "/" + this.props.boardname + "/", show: false, new_boardname: ''};
  },

  handleBoardnameModify: function(e) {
    this.setState({new_boardname: e.target.value, show:this.state.show, url3:"modifyboard/" + this.props.boardid + "/" + e.target.value});
  },

  handleBoardDelete: function(board) {
    $.ajax({
      url: this.state.url2,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: board});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleBoardModify: function(board) {
    $.ajax({
      url: this.state.url3,
      dataType: 'json',
      success: function(data) {
        this.setState({data:data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: board});
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var boardname = this.state.boardname.trim();
    if (!boardname) {
      return;
    }

    this.props.onBoardSubmit({boardid: this.state.boardid, csrfmiddlewaretoken: csrftoken});
  },

  render: function() {

    var popoverHoverFocus = (
      <Popover id="popover3">
        <Form inline onSubmit={this.handleBoardModify}>
          <FormGroup controlId="formInlineCardName">
            <FormControl type="text" placeholder="" onChange={this.handleBoardnameModify}/>
          </FormGroup>
        </Form>
      </Popover>
    ); 

    var jumboStyle={backgroundColor:"#088A08", color:"white"};
    var closeStyle = {display: "inlineBlock", position:"absolute", top: "0", right:"10"};
    var editStyle = {display: "inlineBlock", position:"absolute", top: "0", right:"40"};
    var glyphStyle = {color: "white"};

    return (
      <div className="board">
        <Col md={3}>
          <a href={'' + this.props.boardid}>
            <Jumbotron style={jumboStyle}>
              <h3>{this.props.boardname}</h3>
              <a href="#">
                <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popoverHoverFocus}>
                  <Button bsStyle="link" style={editStyle}> <Glyphicon style={glyphStyle} glyph="edit" /></Button>
                </OverlayTrigger>
              </a>
              <a href="#">
                <Button bsStyle="link" style={closeStyle} onClick={this.handleBoardDelete} > <Glyphicon style={glyphStyle} glyph="remove-sign" /> </Button>
              </a>
            </Jumbotron>
          </a>
        </Col>
      </div>
    );
  }
});


ReactDOM.render(
  <Room url="/trello/room/" pollInterval={1000}/>,
  document.getElementById('boards_list_react')
);
