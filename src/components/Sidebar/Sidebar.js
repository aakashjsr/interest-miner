
import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import Autosuggest from 'react-autosuggest';
import { logout } from "../../helper/index";
import { getItem } from "utils/localStorage";
import { BASE_URL } from "../../constants";
import axios from "axios";

// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

var ps;
function getSuggestionValue(suggestion) {
  // debugger;
  return suggestion.first_name;
}

function renderSuggestion(suggestion) {
  // debugger;

  return (
    <Link to={`/app/profile/${suggestion.id}`} >

      <div style={{ padding: '10px 20px' }}>{`${suggestion.first_name} ${suggestion.last_name}`}</div>
    </Link>
  );
}


// handleInputChange = (e) => {
//   if (!this.state.popupVisible) {
//     document.addEventListener('click', this.handleOutsideClick, false);
//   } else {
//     document.removeEventListener('click', this.handleOutsideClick, false);
//   }
//   this.setState({
//     query: e.currentTarget.value,

//   }, () => {
//     if (this.state.query && this.state.query.length > 1) {
//       if (this.state.query.length % 2 === 0) {
//         this.getInfo()
//       }
//     }
//   })
// }



// handleClick = () => {
//   if (!this.state.popupVisible) {
//     // attach/remove event handler
//     document.addEventListener('click', this.handleOutsideClick, false);
//   } else {
//     document.removeEventListener('click', this.handleOutsideClick, false);
//   }

//   this.setState(prevState => ({
//     popupVisible: !prevState.popupVisible,
//     results: []
//   }));
// }

// handleOutsideClick = (e) => {
//   this.handleClick();

// }




class Sidebar extends React.Component {
  state = {
    collapseOpen: false,
    dropdownOpen: false,
    query: '',
    results: [],
    activeSuggestion: 0,
    showSuggestions: false,
    popupVisible: false,
    suggestions: [],
    value: ''
  };
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }

  _onBlur = () => {
    this.setState({
      value: '',
  
    });
  }
  
  
  //** START SUGGESTION**//
  getInfo = () => {
    const TOKEN = getItem("accessToken");
    axios({
      method: "get",
      url: `${BASE_URL}/api/accounts/user-search/${this.state.value}/`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        'Authorization': `Token ${TOKEN}`
      }
    }).then(({ data }) => {
      this.setState({
        suggestions: data,
        popupVisible: !this.state.popupVisible,
      })
    })
  }
  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.getInfo();
  };
  
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  // const [dropdownOpen, setDropdownOpen] = useState(false);

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }
  // setDropdownOpen(!dropdownOpen);
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };
  // creates the links that appear in the left menu / Sidebar
  createLinks = routes => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key} style={{ display: prop.display }}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"

          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };
  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search for users..",
      value,
      onChange: this.onChange,
      onBlur: this._onBlur
    };

    const { bgColor, routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <span style={{ fontWeight: 'bolder', color: '#1189ef' }}>INTEREST MINER</span>
          </NavbarBrand>


          {/* User */}
          <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
              <DropdownToggle nav className="nav-link-icon">
                <i className="ni ni-bell-55" />
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbar-default_dropdown_1"
                className="dropdown-menu-arrow"
                right
              >
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    {/* <img
                      alt="..."
                      src={require("assets/img/theme/team-1-800x800.jpg")}
                    /> */}
                  </span>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* Collapse */}
          <Collapse navbar isOpen={this.state.collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        INTEREST MINER
                        {/* <img alt={logo.imgAlt} src={logo.imgSrc} /> */}
                      </Link>
                    ) : (
                        <a href={logo.outterLink}>
                          <img alt={logo.imgAlt} src={logo.imgSrc} />
                        </a>
                      )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Form */}
            <Form className="mt-4 mb-3 d-md-none">
              <InputGroup className="input-group-rounded input-group-merge">
                {/* <Input
                  aria-label="Search"
                  className="form-control-rounded form-control-prepended"
                  placeholder="Search"
                  type="search"
                /> */}
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps} />

                <InputGroupAddon addonType="prepend">
                  {/* <InputGroupText>
                    <span className="fa fa-search" />
                  </InputGroupText> */}
                </InputGroupAddon>
              </InputGroup>
            </Form>


            <h6 className="navbar-heading text-muted">Data Management</h6>
            <hr className="my-2" />


            {/* Navigation */}
            <Nav navbar>{this.createLinks(routes)}</Nav>

            <hr className="my-3" />
            <h6 className="navbar-heading text-muted">Visualizations</h6>
            <hr className="my-2" />

            <Nav navbar>
              <NavItem>
                <NavLink
                  to="/app/pie-chart"
                  tag={NavLinkRRD}
                  onClick={this.closeCollapse}
                  activeClassName="active"
                >
                  <i className="fas fa-chart-pie text-orange" />
                  Short Term Interest
              </NavLink>
              </NavItem>
            </Nav>

            <Nav navbar>
              <NavItem>
                <NavLink
                  to="/app/bar-chart"
                  tag={NavLinkRRD}
                  onClick={this.closeCollapse}
                  activeClassName="active"
                >
                  <i className="fas fa-chart-bar text-pink" />
                  Activities
              </NavLink>
              </NavItem>
            </Nav>

            <Nav navbar>
              <NavItem>
                <NavLink
                  to="/app/cloud-chart"
                  tag={NavLinkRRD}
                  onClick={this.closeCollapse}
                  activeClassName="active"
                >
                  <i className="fas fa-cloud text-info" />
                  Long Term Interest
              </NavLink>
              </NavItem>
            </Nav>

            <Nav navbar>
              <NavItem>
                <NavLink
                  to="/app/concept-chart"
                  tag={NavLinkRRD}
                  onClick={this.closeCollapse}
                  activeClassName="active"
                >
                  <i className="fas fa-brain text-blue"/>
                  Concept Map Chart
              </NavLink>
              </NavItem>
            </Nav>

            <Nav navbar>
              <NavItem>
                <NavLink
                  to="/app/stream-chart"
                  tag={NavLinkRRD}
                  onClick={this.closeCollapse}
                  activeClassName="active"
                >
                  <i class="fas fa-wave-square text-green"></i>
                 
                  Interests
              </NavLink>
              </NavItem>
            </Nav>

            

          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default Sidebar;
