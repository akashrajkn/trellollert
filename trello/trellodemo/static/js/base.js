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
var Navbar = ReactBootstrap.Navbar;
var NavDropdown = ReactBootstrap.NavDropdown;
var NavItem = ReactBootstrap.NavItem;
var MenuItem = ReactBootstrap.MenuItem;
var Nav = ReactBootstrap.Nav;
var DropdownButton = ReactBootstrap.DropdownButton;

const navbarInstance = (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="#">{loggedInUser}</a>
            </Navbar.Brand>
            <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav pullRight>
                <a href="/trello/logout/">
                    <Button bsStyle="link">Sign out</Button>
                </a>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

ReactDOM.render(navbarInstance, document.getElementById('mount_node'));
