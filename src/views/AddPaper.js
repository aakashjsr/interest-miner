
import React from "react";
// react plugin used to create google maps
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner'
import { handleServerErrors } from "utils/errorHandler";
import user from '../services/api';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";


class AddPaper extends React.Component {

  state = {
    title: '',
    url:'',
    year:'',
    abstract:'',
    isLoding: false
  }

  handleChange = e => {
    let getValue = e.target.value;
    let getName = e.target.name;
    this.setState(() => ({ [getName]: getValue }))
  };

  _handleSubmit = e => {
    e.preventDefault();
      let data = {
        title: this.state.title,
        url: this.state.url,
        year: this.state.year,
        abstract: this.state.abstract,
      };

      this.setState({ isLoding: true })
      // loder true ka code 
      user.addPaper(data).then(response => {
       toast.success("Add Papaer !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        });
        this.setState({ title:'', url:'',year:'',abstract:'' })

      }).catch(error => {
        this.setState({ isLoding: false })
        // console.log(error)
        handleServerErrors(error, toast.error)
        
      })
    
  };


  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            {/* <div className="col">
              <Card className="shadow border-0">
              Add Form
              
              </Card>
            </div> */}
             <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Add Paper</h3>
                    </Col>
                    {/* <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Settings
                      </Button>
                    </Col> */}
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this._handleSubmit} method="post">
                    <h6 className="heading-small text-muted mb-4">
                      Paper information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Title
                            </label>
                            <Input
                              className="form-control-alternative"
                              // defaultValue="lucky.jesse"
                              id="input-username"
                              name="title" value={this.state.title} onChange={this.handleChange} 
                              placeholder="Title"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              URL
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              name="url" value={this.state.url} onChange={this.handleChange} 
                              placeholder="https://www.zyz.com"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Year
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Lucky"
                              id="input-first-name"
                              name="year" value={this.state.year} onChange={this.handleChange} 
                              placeholder="Year"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Abstract
                            </label>
                            <Input
                              className="form-control-alternative"
                              // defaultValue="Jesse"
                              id="input-last-name"
                              name="abstract" value={this.state.abstract} onChange={this.handleChange} 
                              placeholder="Abstract"
                              type="textarea"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    {/* <hr className="my-4" /> */}
                    {/* Address */}
                    {/* <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                              id="input-address"
                              placeholder="Home Address"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              City
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="New York"
                              id="input-city"
                              placeholder="City"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Country
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="United States"
                              id="input-country"
                              placeholder="Country"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Postal code
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              placeholder="Postal code"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div> */}
                    <hr className="my-4" />
                    {/* Description */}
                    {/* <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          className="form-control-alternative"
                          placeholder="A few words about you ..."
                          rows="4"
                          defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                          Open Source."
                          type="textarea"
                        />
                      </FormGroup>
                    </div> */}
                     <Button
                        color="primary"
                        type="submit"
                        // onClick={e => e.preventDefault()}
                        // size="md"
                      >
                        Save
                      </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default AddPaper;
