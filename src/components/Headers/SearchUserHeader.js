
import React from "react";
import { getItem } from "utils/localStorage";
import { BASE_URL } from "../../constants";
import axios from "axios";
import Suggestion from '../suggestion'
// reactstrap components
import { Button, Container, Row, Col,Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup, } from "reactstrap";

class SearchUserHeader extends React.Component {

  state = {
    query: '', 
    results: []
  }


  

  getInfo = () => {
    const TOKEN = getItem("accessToken");
    axios({
      method: "get",
      url: `${BASE_URL}/api/accounts/user-search/${this.state.query}/`,
      headers: {
          "Content-Type": "application/json",
            Accept: "application/json",
           'Authorization' :  `Token ${TOKEN}`
    }
    }).then(({ data }) => {
        this.setState({
          results: data,
        })
      })
  }
 
  handleInputChange = (e) => {
    console.log('SERC',e.target.value)

    this.setState({
      query: e.target.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } 
    })
  }


  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage:
              "url(" + require("assets/img/theme/profile-cover.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid style={{position:'absolute',top: '70px'}}>
            <Row>
              <Col lg="12" md="10">
            

                {/* <h1 className="display-2 text-white">
                  Hello {getItem("name")? getItem("name"):'User' }
                </h1>
                <p className="text-white mt-0 mb-5">
                This is your profile page.
                </p> */}
                {/* <Button
                  color="info"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  Edit profile
                </Button> */}
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default SearchUserHeader;
