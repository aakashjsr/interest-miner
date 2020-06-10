import React from "react";

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
  Col,
} from "reactstrap";
// core components
import SearchUserHeader from "components/Headers/SearchUserHeader.js";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import Carousel from "react-bootstrap/Carousel";
import { handleServerErrors } from "utils/errorHandler";
import RestAPI from "../services/api";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import { getItem } from "utils/localStorage";
import "d3-transition";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { TwitterTweetEmbed } from "react-twitter-embed";
import UserCarousel from "../components/carousel";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import ReactWordcloud from "react-wordcloud";
/* Chart code */
// Themes begin
// Themes end
const options = {
  colors: ["#0000CC", "#CC00CC"],
  enableTooltip: true,
  deterministic: true,
  fontFamily: "impact",
  fontSizes: [14, 60],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 3,
  rotations: 2,
  rotationAngles: [0, 90],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 0,
};

const SimilarityComponent = (props) => {
  if (props.showLoader) {
    return (
      <div className="text-center" style={{ padding: "20px" }}>
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      </div>
    );
  } else {
    if (props.score) {
      return (
        <div>
          <h3
            className="rounded-circle"
            style={{
              color: "rgb(94, 114, 228)",
              textAlign: "center",
              marginTop: "15px",
              fontSize: "45px",
            }}
          >
            {props.score} %
          </h3>

          <div id="chart">
            <ReactApexChart
              options={props.radarChartData.options}
              series={props.radarChartData.series}
              type="radar"
              height={300}
            />
          </div>
        </div>
      );
    } else {
      return (
        <Button
          onClick={props.getScore}
          style={{ marginTop: "30px" }}
          color="primary"
        >
          Get Similarity Score
        </Button>
      );
    }
  }
};

class SearchUserProfile extends React.Component {
  state = {
    data: [],
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    twitter_account_id: "",
    author_id: "",
    paper_count: "",
    tweet_count: "",
    keyword_count: "",
    score: "",
    isLoding: false,
    isLoding1: false,
    radarChartData: {},
    options: {
      chart: {
        id: "basic-bar",
      },

      fill: {
        colors: ["#9C27B0"],
      },
      xaxis: {
        categories: [],
      },
    },
    series: [],
    tweetoptions: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
    },
    tweetseries: [],
    data: [],
    series: [],

    coloroptions: {
      colors: [
        "#e53a64",
        "#3bce15",
        "#cab805",
        "#eb013f",
        "#5ae2f2",
        "#707a9d",
        "#ad2aba",
        "#4c4bb4",
        "#b49b0a",
        "#FF5733",
        "#FFE633",
        "#D4FF33",
        "#33FFA8",
        "#0CF3E1",
        "#0C56F3",
      ],
      chart: {
        width: 380,
        type: "pie",
      },
      fill: {
        colors: [
          "#e53a64",
          "#3bce15",
          "#cab805",
          "#eb013f",
          "#5ae2f2",
          "#707a9d",
          "#ad2aba",
          "#4c4bb4",
          "#b49b0a",
          "#FF5733",
          "#FFE633",
          "#D4FF33",
          "#33FFA8",
          "#0CF3E1",
          "#0C56F3",
        ],
      },

      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 50,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
    chartOptions: {
      twitterXaxis: {},
      paperXaxis: {},
      twitterSeries: [],
      paperSeries: [],
    },
    mydata: [],
    wordArray: [],
    isModalLoader: false,
    isTweetData: false,
    isPaperData: false,
    tweetIds: [],
    userPageIDs: [],
    isData: true,
    title: "",
    url: "",
    year: "",
    abstract: "",
  };

  componentDidMount() {
    this.setState({ isLoding: true }, () => {
      RestAPI.getUserProfile(this.props.match.params.id)
        .then((response) => {
          this.setState({
            isLoding: false,
            id: response.data.id,
            first_name: response.data.first_name,
            email: response.data.email,
            last_name: response.data.last_name,
            twitter_account_id: response.data.twitter_account_id,
            author_id: response.data.author_id,
            paper_count: response.data.paper_count,
            tweet_count: response.data.tweet_count,
            keyword_count: response.data.keyword_count,
          });
        })
        .catch((error) => {
          this.setState({ isLoding: false });
          handleServerErrors(error, toast.error);
        });

      RestAPI.barChartUser()
        .then((response) => {
          let categorieList = Object.keys(response.data.papers);
          let value = Object.values(response.data.papers);
          let tweetscategorieList = Object.keys(response.data.tweets);
          let tweetsvalue = Object.values(response.data.tweets);
          this.setState({
            isLoding: false,
            data: response.data,
            series: [{ name: "Paper", data: [...value] }],
            tweetseries: [{ name: "Tweet", data: [...tweetsvalue] }],
            // options: { ...this.state.options, ...this.state.options.xaxis, ...this.state.options.xaxis.categories = categorieList },
            // tweetoptions: { ...this.state.tweetoptions, ...this.state.tweetoptions.xaxis, ...this.state.tweetoptions.xaxis.categories = tweetscategorieList },
            options: {
              chart: {
                id: "basic-bar",
              },

              fill: {
                colors: ["#9C27B0"],
              },
              xaxis: {
                categories: [...categorieList],
              },
            },
            tweetoptions: {
              chart: {
                id: "basic-bar",
              },
              xaxis: {
                categories: [...tweetscategorieList],
              },
            },
          });
        })
        .catch((error) => {
          this.setState({ isLoding: false });
          handleServerErrors(error, toast.error);
        });
      RestAPI.barChart()
        .then((response) => {
          let categorieList = Object.keys(response.data.papers);
          let value = Object.values(response.data.papers);
          let tweetscategorieList = Object.keys(response.data.tweets);
          let tweetsvalue = Object.values(response.data.tweets);
          this.setState({
            isLoding: false,
            data: response.data,
            series: [{ name: "Paper", data: [...value] }],
            tweetseries: [{ name: "Tweet", data: [...tweetsvalue] }],
            // options: { ...this.state.options, ...this.state.options.xaxis, ...this.state.options.xaxis.categories = categorieList },
            // tweetoptions: { ...this.state.tweetoptions, ...this.state.tweetoptions.xaxis, ...this.state.tweetoptions.xaxis.categories = tweetscategorieList },
            options: {
              chart: {
                id: "basic-bar",
              },

              fill: {
                colors: ["#9C27B0"],
              },
              xaxis: {
                categories: [...categorieList],
              },
            },
            tweetoptions: {
              chart: {
                id: "basic-bar",
              },
              xaxis: {
                categories: [...tweetscategorieList],
              },
            },
          });
        })
        .catch((error) => {
          this.setState({ isLoding: false });
          handleServerErrors(error, toast.error);
        });
      RestAPI.pieChartUser()
        .then((response) => {
          let mydata = response.data.map((val) => val.keyword);
          let values = response.data.map((val) => val.weight);

          this.setState({
            isLoding: false,
            data: response.data,
            series: values,
            options: {
              ...this.state.options,
              labels: mydata,
            },
          });
        })
        .catch((error) => {
          this.setState({ isLoding: false });
          handleServerErrors(error, toast.error);
        });
      RestAPI.streamChartUser()
        .then((response) => {
          let twitterData = this.getChartOptions(response.data.twitter_data);
          let paperData = this.getChartOptions(response.data.paper_data);

          let chartOptions = {
            twitterXaxis: twitterData.xAxis,
            twitterSeries: twitterData.series,
            paperXaxis: paperData.xAxis,
            paperSeries: paperData.series,
          };

          this.setState({ chartOptions, isLoding: false });
        })
        .catch((error) => {
          this.setState({ isLoding: false });
          handleServerErrors(error, toast.error);
        });
      RestAPI.cloudChartUser()
        .then((response) => {
          let keywordArray = [];
          for (let i = 0; i < response.data.length; i++) {
            keywordArray.push({
              text: response.data[i].keyword,
              value: response.data[i].weight,
              tweet_ids: response.data[i].tweet_ids,
              papers: response.data[i].papers,
              source: response.data[i].source,
            });
          }
          if (response.data.length === 0) {
            this.setState({
              isData: false,
            });
          }
          this.setState({
            isLoding: false,
            wordArray: keywordArray,
          });
        })
        .catch((error) => {
          this.setState({ isLoding: false });
          handleServerErrors(error, toast.error);
        });
    });
  }

  componentDidUpdate(prevPro) {
    if (prevPro.match.params.id !== this.props.match.params.id) {
      this.setState({ isLoding: true }, () => {
        RestAPI.getUserProfile(this.props.match.params.id)
          .then((response) => {
            this.setState({
              isLoding: false,
              id: response.data.id,
              first_name: response.data.first_name,
              email: response.data.email,
              last_name: response.data.last_name,
              twitter_account_id: response.data.twitter_account_id,
              author_id: response.data.author_id,
              paper_count: response.data.paper_count,
              tweet_count: response.data.tweet_count,
              keyword_count: response.data.keyword_count,
              score: "",
              radarChartData: {},
            });
          })
          .catch((error) => {
            this.setState({ isLoding: false });
            handleServerErrors(error, toast.error);
          });
      });
    }
  }

  getCallback = (callback) => {
    let reactRef = this;
    return function (word, event) {
      reactRef.setState({ modal: true, isModalLoader: true });
      if (word.tweet_ids) {
        reactRef.setState({
          isTweetData: true,
          tweetIds: word.tweet_ids,
        });
        if (word.tweet_ids.length === 0) {
          reactRef.setState({
            isTweetData: false,
          });
        }
      }
      if (word.papers) {
        reactRef.setState({
          isPaperData: true,
          userPageIDs: word.papers,
        });

        if (word.papers.length === 0) {
          reactRef.setState({
            isPaperData: false,
          });
        }
      }
      reactRef.setState({
        isModalLoader: false,
      });
    };
  };

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  getChartOptions = (data) => {
    let chartOptions = {};

    let xAxisOptions = Object.keys(data);
    let seriesData = [];
    let keywords = {};

    let keywordDataOverTime = Object.values(data);
    for (let index = 0; index < keywordDataOverTime.length; index++) {
      for (
        let itemIndex = 0;
        itemIndex < keywordDataOverTime[index].length;
        itemIndex++
      )
        keywords[keywordDataOverTime[index][itemIndex]["keyword__name"]] = true;
    }

    for (let keywordName of Object.keys(keywords)) {
      let monthRank = [];
      for (let index = 0; index < xAxisOptions.length; index++) {
        let searchedList = data[xAxisOptions[index]].filter(
          (item) => item["keyword__name"] === keywordName
        );
        monthRank.push(searchedList.length ? searchedList[0].weight : 0);
      }
      seriesData.push({
        name: keywordName,
        data: monthRank,
      });
    }
    return { xAxis: xAxisOptions, series: seriesData };
  };

  handleChange = (e) => {
    let getValue = e.target.value;
    let getName = e.target.name;
    this.setState(() => ({ [getName]: getValue }));
  };

  _handleSubmit = (e) => {
    const {
      id,
      email,
      first_name,
      last_name,
      twitter_account_id,
      author_id,
    } = this.state;
    e.preventDefault();
    let data = {
      email: email,
      first_name: first_name,
      last_name: last_name,
      twitter_account_id: twitter_account_id,
      author_id: author_id,
    };

    this.setState({ isLoding: true }, () => {
      RestAPI.updateUserProfile(data, id)
        .then((response) => {
          toast.success("Update Profile Data !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
          this.setState({ isLoding: false });
          // this.props.history.push("/admin/view-paper");
        })
        .catch((error) => {
          this.setState({ isLoding: false });
          handleServerErrors(error, toast.error);
        });
    });
  };

  getScore = () => {
    this.setState({ isLoding1: true }, () => {
      RestAPI.getScore(this.props.match.params.id)
        .then((response) => {
          const radarChartData = {
            series: [
              {
                name: "Your Interests",
                data: Object.values(response.data.user_1_data || {}),
              },
              {
                name: "User's Interests",
                data: Object.values(response.data.user_2_data || {}),
              },
            ],
            options: {
              chart: {
                toolbar: { show: false },
                height: 350,
                type: "radar",
                dropShadow: {
                  enabled: true,
                  blur: 1,
                  left: 1,
                  top: 1,
                },
              },
              stroke: {
                width: 2,
              },
              fill: {
                opacity: 0.1,
              },
              markers: {
                size: 0,
              },
              xaxis: {
                categories: Object.keys(response.data.user_1_data || {}),
              },
            },
          };
          this.setState({
            isLoding1: false,
            score: response.data.score,
            radarChartData,
          });
          // this.props.history.push("/admin/view-paper");
        })
        .catch((error) => {
          console.log(error);
          this.setState({ isLoding1: false });
          handleServerErrors(error, toast.error);
        });
    });
  };

  render() {
    const {
      email,
      first_name,
      last_name,
      twitter_account_id,
      author_id,
      paper_count,
      tweet_count,
      keyword_count,
    } = this.state;
    let graphOptions = {
      chart: {
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: false,
            selection: true,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: false,
            customIcons: [],
          },
          autoSelected: "zoom",
        },

        type: "area",
        stacked: true,
      },
      colors: [
        "#1F85DE",
        "#D81FDE",
        "#DE1F85",
        "#DE781F",
        "#DE1F26",
        "#BFDE1F",
        "#6C0D5D",
        "#0D6C1C",
        "#25DE1F",
        "#3E1FDE",
      ],
      dataLabels: { enabled: false },
      stroke: {
        curve: "smooth",
        width: 1,
      },
      fill: { type: "solid" },
      xaxis: {},
    };
    let twitterGraphOptions = JSON.parse(JSON.stringify(graphOptions));
    twitterGraphOptions.xaxis.categories = this.state.chartOptions.twitterXaxis;

    let paperGraphOptions = JSON.parse(JSON.stringify(graphOptions));
    paperGraphOptions.xaxis.categories = this.state.chartOptions.paperXaxis;

    const callbacks = {
      getWordTooltip: (word) => `${word.source}`,
      onWordClick: this.getCallback("onWordClick"),
    };
    return (
      <>
        <SearchUserHeader />
        {/* Page content */}

        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="12">
                    <div
                      className="card-profile-image"
                      style={{ textAlign: "center" }}
                    >
                      <SimilarityComponent
                        radarChartData={this.state.radarChartData}
                        score={this.state.score}
                        showLoader={this.state.isLoding1}
                        getScore={this.getScore}
                      />
                    </div>
                  </Col>
                </Row>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div
                        className="card-profile-stats d-flex justify-content-center "
                        style={{ marginTop: "0px !important" }}
                      >
                        <div>
                          <span className="heading">
                            {this.state.data && paper_count}
                          </span>
                          <span className="description">Papers</span>
                        </div>

                        {/* <div>
                          <span className="heading">{this.state.data && keyword_count}</span>
                          <span className="description">Keywords</span>
                        </div> */}
                        <div>
                          <span className="heading">
                            {this.state.data && tweet_count}
                          </span>
                          <span className="description">Tweet Count</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>{this.state.data && first_name + " " + last_name}</h3>
                    <hr className="my-4" />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">User Account Detils</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {this.state.isLoding ? (
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
                      <Form onSubmit={this._handleSubmit} method="post">
                        <h6 className="heading-small text-muted mb-4">
                          User information
                        </h6>
                        <div className="pl-lg-4">
                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                >
                                  First name
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  // defaultValue="Lucky"

                                  id="input-first-name"
                                  name="first_name"
                                  defaultValue={first_name}
                                  disabled
                                  placeholder="First name"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-last-name"
                                >
                                  Last name
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  // defaultValue="Jesse"
                                  id="input-last-name"
                                  disabled
                                  name="last_name"
                                  defaultValue={last_name}
                                  placeholder="Last name"
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
                                  htmlFor="input-email"
                                >
                                  Email address
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-email"
                                  name="email"
                                  defaultValue={email}
                                  disabled
                                  placeholder="jesse@example.com"
                                  type="email"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                        <hr className="my-4" />
                        {/* Address */}
                        <h6 className="heading-small text-muted mb-4">
                          Source information
                        </h6>
                        <div className="pl-lg-4">
                          <Row></Row>
                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-city"
                                >
                                  Author Id
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-city"
                                  name="author_id"
                                  defaultValue={author_id}
                                  disabled
                                  placeholder="City"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-country"
                                >
                                  Twitter Id
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-country"
                                  name="twitter_account_id"
                                  defaultValue={twitter_account_id}
                                  disabled
                                  placeholder="Twitter Acount id"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                        <hr className="my-4" />
                      </Form>
                      <h1 style={{ color: "#076ec6" }}>
                        {this.state.data && first_name + " " + last_name}
                      </h1>
                      <UserCarousel />
                      <br />
                      <h1 style={{ color: "#076ec6" }}>{getItem("name")}</h1>
                      <Carousel
                        interval={1000000000}
                        indicators={false}
                        style={{
                          background: "rgba(50, 151, 211, 0.25)",
                          borderRadius: "6px",
                          height: "550px",
                          overflow: "hidden",
                          padding: "10px",
                        }}
                      >
                        <Carousel.Item>
                          <div
                            style={{ maxWidth: "560px", margin: "35px auto" }}
                          >
                            <Chart
                              options={this.state.coloroptions}
                              series={this.state.series}
                              type="pie"
                            />
                          </div>
                        </Carousel.Item>
                        <Carousel.Item>
                          <div className="mixed-chart">
                            <h1>Paper Data</h1>
                            <Chart
                              options={this.state.options}
                              series={this.state.series}
                              type="bar"
                              width="600"
                            />
                          </div>
                        </Carousel.Item>
                        <Carousel.Item>
                          <div className="mixed-chart">
                            <h1>Tweet Data</h1>
                            <Chart
                              options={this.state.tweetoptions}
                              series={this.state.tweetseries}
                              type="bar"
                              width="600"
                            />
                          </div>
                        </Carousel.Item>
                        <Carousel.Item>
                          <div style={{ height: 400, width: "100%" }}>
                            <ReactWordcloud
                              options={options}
                              callbacks={callbacks}
                              words={this.state.wordArray}
                            />
                          </div>
                          <Modal
                            isOpen={this.state.modal}
                            toggle={this.toggle}
                            size="lg"
                            id="modal"
                          >
                            <ModalBody>
                              <Tabs>
                                <TabList>
                                  <Tab>Papers</Tab>
                                  <Tab>Tweets</Tab>
                                </TabList>
                                <TabPanel>
                                  {this.state.isModalLoader ? (
                                    <div
                                      className="text-center"
                                      style={{ padding: "20px" }}
                                    >
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
                                      {this.state.isPaperData ? (
                                        <>
                                          {this.state.userPageIDs.map(
                                            (data, idx) => (
                                              <>
                                                <strong>Title: </strong>{" "}
                                                <p>{data.title}</p>
                                                <strong>Year: </strong>{" "}
                                                <p>{data.year}</p>
                                                <strong>URL: </strong>{" "}
                                                <p>{data.url}</p>
                                                <strong>Abstract: </strong>{" "}
                                                <p>{data.abstract}</p>
                                              </>
                                            )
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          <p style={{ textAlign: "center" }}>
                                            No matching papers found
                                          </p>
                                        </>
                                      )}
                                    </>
                                  )}
                                </TabPanel>
                                <TabPanel>
                                  {this.state.isModalLoader ? (
                                    <div
                                      className="text-center"
                                      style={{ padding: "20px" }}
                                    >
                                      <Loader
                                        type="Puff"
                                        color="#00BFFF"
                                        height={100}
                                        width={100}
                                        timeout={3000}
                                      />
                                    </div>
                                  ) : (
                                    <>
                                      {this.state.isTweetData ? (
                                        <>
                                          {this.state.tweetIds.map(
                                            (data, idx) => (
                                              <div
                                                style={{
                                                  display: "flex",
                                                  justifyContent: "center",
                                                }}
                                              >
                                                <TwitterTweetEmbed
                                                  tweetId={data}
                                                  placeholder={
                                                    <Loader
                                                      type="Puff"
                                                      color="#00BFFF"
                                                      height={100}
                                                      style={{
                                                        padding: "200px 0px",
                                                      }}
                                                      width={100}
                                                    />
                                                  }
                                                />
                                              </div>
                                            )
                                          )}
                                        </>
                                      ) : (
                                        <p style={{ textAlign: "center" }}>
                                          No matching tweets found{" "}
                                        </p>
                                      )}
                                    </>
                                  )}
                                </TabPanel>
                              </Tabs>
                            </ModalBody>

                            <ModalFooter>
                              <Button color="primary" onClick={this.toggle}>
                                OK
                              </Button>
                            </ModalFooter>
                          </Modal>
                        </Carousel.Item>
                        <Carousel.Item>
                          <div align="center">Twitter Keyword Trends</div>
                          <div id="chart">
                            <Chart
                              type="area"
                              series={this.state.chartOptions.twitterSeries}
                              options={twitterGraphOptions}
                            />
                          </div>
                        </Carousel.Item>
                        <Carousel.Item>
                          <div align="center">Paper Keyword Trends</div>
                          <div id="chart">
                            <Chart
                              type="area"
                              series={this.state.chartOptions.paperSeries}
                              options={paperGraphOptions}
                              height={500}
                            />
                          </div>
                        </Carousel.Item>
                      </Carousel>
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default SearchUserProfile;
