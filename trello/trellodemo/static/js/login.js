
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
var Tab = ReactBootstrap.Tab;
var Tabs = ReactBootstrap.Tabs;




var LoginBox = React.createClass({

  handleLoginSubmit: function(comment) {
    console.log(comment);
    console.log(this.state.url);
    $.ajax({
      url: this.state.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comment});
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    }).then(this.pqr);
  },

  pqr: function() {
    history.pushState({},'','/trello/')
    window.location.reload()
  },

  getInitialState: function() {
    return {data: [], url: "/", urltrello: "/trello/"};
  },
  render: function() {
    return (
      <div className="loginBox">
      <Grid>
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
      
      <Tab eventKey={1} title="login">
        <h1>Login</h1>
        <LoginForm onLoginSubmit={this.handleLoginSubmit} />
        </Tab>
        <Tab eventKey={2} title="register">
        <h3>New User? </h3> 
        <SignupForm />

        </Tab>      
      </Tabs>
      </Grid>
      </div>
    );
  }
});

var SignupForm = React.createClass({
  getInitialState: function() {
    return {username: '', password: '', email: '',};
  },
  handleUsernameChange: function(e) {
    this.setState({username: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var username = this.state.username.trim();
    var password = this.state.password.trim();
    if (!username || !password) {
      return;
    }
    this.props.onLoginSubmit({username: username, password: password});
    this.setState({username: '', password: ''});
  },
  render: function() {
    return (
        <div className="loginForm">
            <Form inline onSubmit={this.handleSubmit}>
              <FormGroup controlId="formInlineLogin">
                <Row>
                <ControlLabel>Username</ControlLabel>
                </Row>
                <Row>
                <FormControl type="text" placeholder="Username" onChange={this.handleUsernameChange}/>
                </Row>
                <Row>
                <ControlLabel>E-mail address</ControlLabel>
                </Row>

                <Row>
                <FormControl type="text" placeholder="email" onChange={this.handleEmailChange} />
                </Row>
                <Row>
                <ControlLabel>Password</ControlLabel>
                </Row>
                <Row>
                <FormControl type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
                </Row>
                <Row>
                <FormControl type="password" placeholder="Re-type Password" onChange={this.handlePasswordChange}/>
                </Row>
                <Row>
                <ControlLabel> </ControlLabel>
                </Row>

                <Row>
                <Button bsStyle="success"  onClick={this.handleSubmit}> Submit</Button>
                </Row>
              </FormGroup>
            </Form>
        </div>
    );
  }
});


var LoginForm = React.createClass({
  getInitialState: function() {
    return {username: '', password: ''};
  },
  handleUsernameChange: function(e) {
    this.setState({username: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var username = this.state.username.trim();
    var password = this.state.password.trim();
    if (!username || !password) {
      return;
    }
    this.props.onLoginSubmit({username: username, password: password, csrfmiddlewaretoken: csrftoken});
    this.setState({username: '', password: ''});
  },
  render: function() {
    return (
        <div className="loginForm">
            <Form inline onSubmit={this.handleSubmit}>
              <FormGroup controlId="formInlineLogin">
              <Row>
                <FormControl type="text" placeholder="Username" onChange={this.handleUsernameChange}/>
                </Row>
                <Row>
                <ControlLabel></ControlLabel>
                </Row>

                <Row>
                <FormControl type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
                </Row>
                <Row>
                <ControlLabel></ControlLabel>
                </Row>
                <Row>
                <Button bsStyle="success" type="submit" onClick={this.handleSubmit}> Sign In </Button>
                </Row>
              </FormGroup>
            </Form>
        </div>
    );
  }
});



ReactDOM.render(
<LoginBox />,
document.getElementById('mount_node')
);
