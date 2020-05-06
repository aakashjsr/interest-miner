import React from "react";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { handleServerErrors } from "utils/errorHandler";
import RestAPI from "../services/api";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  Row,
  Col,
  Form,
} from "reactstrap";

class Demo extends React.Component {
  state = {
    isLoding: true,
    weight: 4,
    wiki: false,
    keywords: "",
    algorithm: "",
    keywords_1: [],
    keywords_2: [],
    score: "",
    isDemoLoader: false,
  };
  componentDidMount() {
    this.setState({
      isLoding: false,
    });
  }
  interestExtraction = () => {
    let data = {
      num_of_keywords: this.state.weight,
      wiki_filter: this.state.wiki,
      text: this.state.keywords,
      algorithm: this.state.algorithm,
    };
    this.setState({ isDemoLoader: true }, () => {
      RestAPI.interestExtract(data)
        .then((response) => {
          this.setState({ isDemoLoader: false });
          if (response.status === 200) {
            toast.success("Sucess", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 100,
            });
          }
        })
        .catch((error) => {
          this.setState({ isDemoLoader: false });
          handleServerErrors(error, toast.error);
        });
    });
  };

  computeSimilarities = () => {
    if (this.state.keywords_1.length === 0) {
      toast.error("Please Add Keyword", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    if (this.state.keywords_2.length === 0) {
      toast.error("Please Add Keyword", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    if (this.state.algorithm === "") {
      toast.error("Please Select Algorithm", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      return;
    } else {
      let keyword1 = this.state.keywords_1.split(",");
      let keyword2 = this.state.keywords_2.split(",");
      let data = {
        algorithm: this.state.algorithm,
        keywords_1: keyword1,
        keywords_2: keyword2,
      };
      this.setState({
        isDemoLoader: true,
      });
      RestAPI.computeSimilarity(data).then((response) => {
        this.setState({
          score: response.data.score,
          isDemoLoader: false,
        });
        toast.success("Scores are Below", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      });
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleWikipedia = () => {
    this.setState({ wiki: !this.state.wiki });
  };
  selectchange = (e) => {
    this.setState({
      algorithm: e.target.value,
    });
  };
  render() {
    return (
      <>
        <Col lg="10" md="12">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4"></div>
              {this.state.isLoding ? (
                <div className="text-center">
                  <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                  />
                </div>
              ) : (
                <Tabs
                  style={{
                    border: "1px solid gainsboro",
                    borderRadius: "4px",
                    padding: "12px 16px",
                  }}
                >
                  <TabList>
                    <Tab>Interest Extraction</Tab>
                    <Tab>Similarity Computer</Tab>
                  </TabList>
                  <TabPanel>
                    {this.state.isDemoLoader ? (
                      <div className="text-center" style={{ padding: "20px" }}>
                        <Loader
                          type="Puff"
                          color="#00BFFF"
                          height={100}
                          width={100}
                          timeout={1000}
                        />
                      </div>
                    ) : (
                      <>
                        <Form>
                          <Row>
                            <br />
                            <br />
                            <Col lg="12">
                              <FormGroup>
                                <textarea
                                  rows="5"
                                  style={{
                                    width: "100%",
                                    padding: "12px",
                                    borderRadius: "4px",
                                  }}
                                  className="form-control-alternative"
                                  name="keywords"
                                  placeholder="Add Keyword"
                                  type="text"
                                  required
                                  onChange={this.handleChange}
                                ></textarea>
                              </FormGroup>
                            </Col>
                            <Col lg="4">
                              <FormGroup>
                                <select
                                  className="form-control-alternative"
                                  style={{
                                    background: "white",
                                    padding: " 12px 30px",
                                    borderRadius: "4px",
                                    fontSize: "15px",
                                    color: "#969fa9",
                                    width: "100%",
                                  }}
                                  name="algorithm"
                                  onChange={this.selectchange}
                                >
                                  <option value="">Algorithm</option>
                                  <option value="SingleRank">
                                    Single Rank
                                  </option>
                                  <option value="Yake">Yake</option>
                                </select>
                              </FormGroup>
                            </Col>
                            <Col lg="4">
                              <FormGroup>
                                <Input
                                  className="form-control-alternative"
                                  name="weight"
                                  placeholder="Weight"
                                  type="Number"
                                  required
                                  onChange={this.handleChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="4">
                              <FormGroup style={{ fontSize: "14px" }}>
                                <FormControlLabel
                                  value="end"
                                  control={
                                    <Checkbox
                                      color="primary"
                                      onChange={this.handleWikipedia}
                                      placeholder="Use Wikipedia"
                                      checked={this.state.wiki ? true : false}
                                      inputProps={{
                                        "aria-label": "secondary checkbox",
                                      }}
                                    />
                                  }
                                  label="Use Wikipedia"
                                  labelPlacement="end"
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="12">
                              <Button
                                color="primary"
                                type="button"
                                onClick={this.interestExtraction}
                                style={{ margin: "0 auto", display: "block" }}
                              >
                                Extract Interest
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </>
                    )}
                  </TabPanel>
                  <TabPanel>
                    {this.state.isDemoLoader ? (
                      <div className="text-center" style={{ padding: "20px" }}>
                        <Loader
                          type="Puff"
                          color="#00BFFF"
                          height={100}
                          width={100}
                        />
                      </div>
                    ) : (
                      <>
                        <Form>
                          <Row>
                            <br />
                            <br />
                            <Col lg="6">
                              <FormGroup>
                                <textarea
                                  rows="5"
                                  style={{
                                    width: "100%",
                                    padding: "12px",
                                    borderRadius: "4px",
                                  }}
                                  className="form-control-alternative"
                                  name="keywords_1"
                                  placeholder="Add Keyword"
                                  type="text"
                                  required
                                  onChange={this.handleChange}
                                ></textarea>
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <textarea
                                  rows="5"
                                  style={{
                                    width: "100%",
                                    padding: "12px",
                                    borderRadius: "4px",
                                  }}
                                  className="form-control-alternative"
                                  name="keywords_2"
                                  placeholder="Add Keyword"
                                  type="text"
                                  required
                                  onChange={this.handleChange}
                                ></textarea>
                              </FormGroup>
                            </Col>
                            <Col lg="12">
                              <FormGroup style={{ textAlign: "center" }}>
                                <select
                                  className="form-control-alternative"
                                  style={{
                                    background: "white",
                                    padding: " 12px 30px",
                                    borderRadius: "4px",
                                    fontSize: "15px",
                                    color: "#969fa9",
                                  }}
                                  onChange={this.selectchange}
                                >
                                  <option>Algorithm</option>
                                  <option value="WordEmbedding">
                                    Word Embedding
                                  </option>
                                  <option value="WikiLinkMeasure">
                                    Wiki Link Measure
                                  </option>
                                </select>
                              </FormGroup>
                            </Col>
                            <Button
                              color="primary"
                              type="button"
                              onClick={this.computeSimilarities}
                              style={{ display: "block", margin: "0 auto" }}
                            >
                              Compute Similarity
                            </Button>
                            <br />
                            <h2
                              className="text-center"
                              style={{
                                display: "block",
                                width: "100%",
                                marginTop: "20px",
                                fontSize: "28px",
                              }}
                            >
                              {this.state.score}
                            </h2>
                          </Row>
                        </Form>
                      </>
                    )}
                  </TabPanel>
                </Tabs>
              )}
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Demo;
