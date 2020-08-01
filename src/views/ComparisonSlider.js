import React from "react";

// reactstrap components
import { Button, Card, Row, Col, CardHeader } from "reactstrap";
// core components
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import Carousel from "react-bootstrap/Carousel";
import { handleServerErrors } from "utils/errorHandler";
import RestAPI from "../services/api";
import Chart from "react-apexcharts";
import CloudChart from "../components/Chart/CloudChart";
import PieChart from "../components/Chart/PieChart";
import PaperBar from "../components/UserCharts/PaperBarCharts";
import TweetBar from "../components/UserCharts/TweetBarChart";
import TwitterCharts from "../components/UserCharts/TwitterCharts";
import PaperCharts from "../components/UserCharts/PaperCharts.js";
import { getItem } from "utils/localStorage";
import "d3-transition";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "../assets/scss/custom.css";
import UserPieChart from "../components/Chart/UserPieChart";

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
  padding: 5,
  rotations: 2,
  rotationAngles: [0, 90],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 0,
};

class ComparisonSlider extends React.Component {
  state = {
    data: [],
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    twitter_account_id: "",
    author_id: "",
    papercount: null,
    paper_count: "",
    tweet_count: "",
    keyword_count: "",
    word: "",
    score: "",
    isLoding: false,
    isLoding1: false,
    radarChartData: {},
    original_keyword: "",
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
    series1: [],
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
    Loader: false,
  };

  componentDidMount() {
    this.setState({ isLoding: true, Loader: true }, () => {
      RestAPI.barChartUser()
        .then((response) => {
          let categorieList = Object.keys(response.data.papers);
          let value = Object.values(response.data.papers);
          let tweetscategorieList = Object.keys(response.data.tweets);
          let tweetsvalue = Object.values(response.data.tweets);
          this.setState({
            data: response.data,
            series: [{ name: "Paper", data: [...value] }],
            tweetseries: [{ name: "Tweet", data: [...tweetsvalue] }],
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
              papercount: response.data[i].papers.length,
              source: response.data[i].source,
              original_keyword: response.data[i].original_keyword,
            });
          }
          if (response.data.length === 0) {
            this.setState({
              isData: false,
            });
          }
          this.setState({
            wordArray: keywordArray,
            Loader: false,
          });
        })
        .catch((error) => {
          this.setState({ isLoding: false });
          handleServerErrors(error, toast.error);
        });
    });
  }

  getMarkedAbstract = (text, word) => {
    if (word === undefined) {
      return text;
    }
    text = text || "";
    text = text.split(word).join(`<mark>${word}</mark>`);
    word = word[0].toUpperCase() + word.slice(1);
    text = text.split(word).join(`<mark>${word}</mark>`);
    return text;
  };

  getCallback = (callback) => {
    let reactRef = this;
    return function (word, event) {
      reactRef.setState({
        modal: true,
        isModalLoader: true,
        isManualData: false,
      });
      if (word.tweet_ids) {
        reactRef.setState({
          isTweetData: true,
          tweetIds: word.tweet_ids,
          weight: word.value,
          original_keyword: word.original_keyword,
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
          papercount: word.papers.length,
          word: word.text,
          weight: word.value,
          original_keyword: word.original_keyword,
        });

        if (word.papers.length === 0) {
          reactRef.setState({
            isPaperData: false,
          });
        }
      }
      if (word.source == "Manual") {
        reactRef.setState({
          isManualData: true,
        });
      }
      reactRef.setState({
        isModalLoader: false,
      });
      let str = word.papers.abstract;
      let res = str;
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

  render() {
    const { first_name, last_name } = this.props;
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
      getWordTooltip: (word) =>
        `${
          word.source == "Scholar"
            ? "Extracted from Paper"
            : word.source == "Twitter"
            ? "Extracted from Twitter"
            : word.source == "Manual"
            ? "Manually added"
            : "Extracted from Paper & Twitter"
        }`,
      onWordClick: this.getCallback("onWordClick"),
    };
    return (
      <Card className="card-profile shadow" style={{ padding: "15px" }}>
        <Row>
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="12">
                <h3 className="mb-0">Comparison Slider</h3>
                <p>
                  Comparison chart is used to compare the difference between two
                  users.
                </p>
              </Col>
            </Row>
          </CardHeader>
        </Row>
        {this.state.Loader ? (
          <div className="text-center" style={{ padding: "20px" }}>
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          </div>
        ) : (
          <>
            <Row>
              <Col className="order-xl-2 mb-5 mb-xl-0" lg="12">
                <h1 style={{ color: "#076ec6", textAlign: "center" }}>
                  {first_name + " " + last_name}
                </h1>
              </Col>
            </Row>
            <Carousel
              interval={1000000000}
              indicators={false}
              style={{
                background: "rgba(50, 151, 211, 0.25)",
                borderRadius: "6px",
                overflow: "hidden",
                padding: "10px",
              }}
            >
              <Carousel.Item>
                <Row>
                  <Col className="order-xl-2 mb-5 mb-xl-0" lg="12">
                    <PieChart />
                  </Col>
                </Row>
                <Row>
                  <Col className="order-xl-2 mb-5 mb-xl-0" lg="12">
                    <h1 className="second-user">
                      {getItem("name") + " " + getItem("lastname")}
                    </h1>
                    <UserPieChart />
                  </Col>
                </Row>
              </Carousel.Item>
              <Carousel.Item>
                <Row>
                  <Col className="order-xl-2 mb-5 mb-xl-0" lg="12">
                    <PaperBar style={{ width: "450px", margin: "0 auto" }} />
                  </Col>

                  <Col className="order-xl-2 mb-5 mb-xl-0" lg="12">
                    <h1 className="second-user">
                      {getItem("name") + " " + getItem("lastname")}
                    </h1>
                    <div>
                      <div
                        className="mixed-chart"
                        style={{ width: "450px", margin: "0 auto" }}
                      >
                        <h1>Paper Data</h1>
                        <Chart
                          options={this.state.options}
                          series={this.state.series}
                          type="bar"
                          width="350"
                          height="250"
                          id="chart-1"
                        />
                        <p className="h1-s rtl-1">Papers Published</p>
                        <p
                          className="h1-s"
                          style={{ width: "350px", marginLeft: "50px" }}
                        >
                          Year
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Carousel.Item>
              <Carousel.Item>
                <Row>
                  <Col className="order-xl-2 mb-5 mb-xl-0" lg="12">
                    <TweetBar />
                  </Col>
                  <Col className="order-xl-2 mb-5 mb-xl-0" lg="12">
                    <h1 className="second-user">
                      {getItem("name") + " " + getItem("lastname")}
                    </h1>
                    <div>
                      <div
                        className="mixed-chart"
                        style={{ width: "450px", margin: "0 auto" }}
                      >
                        <h1>Tweet Data</h1>
                        <Chart
                          style={{ margin: "0 auto" }}
                          options={this.state.tweetoptions}
                          series={this.state.tweetseries}
                          type="bar"
                          width="350"
                          height="250"
                          id="chart-1"
                        />
                        <p
                          className="h1-s rtl-1"
                          style={{ marginTop: "-300px" }}
                        >
                          Tweets
                        </p>
                        <p
                          className="h1-s"
                          style={{ width: "350px", marginLeft: "50px" }}
                        >
                          Year
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Carousel.Item>
              <Carousel.Item>
                <Row>
                  <Col
                    className="order-xl-2 mb-5 mb-xl-0"
                    lg="12"
                    style={{ overflow: "hidden" }}
                  >
                    <div>
                      <CloudChart />
                    </div>
                  </Col>

                  <Col
                    className="order-xl-2 mb-5 mb-xl-0"
                    lg="12"
                    style={{ overflow: "hidden" }}
                  >
                    <h1 className="second-user">
                      {getItem("name") + " " + getItem("lastname")}
                    </h1>
                    <div>
                      <div style={{ height: "500px", width: "100%" }}>
                        <ReactWordcloud
                          options={options}
                          callbacks={callbacks}
                          words={this.state.wordArray}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
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
                                <p>
                                  {this.state.papercount} Papers Contain this
                                  interest
                                </p>
                                <p>
                                  The weight of interest :{this.state.weight}{" "}
                                </p>
                                <p>
                                  Interest keywords before Wikipedia filter
                                  related to this interest :
                                  {this.state.original_keyword}
                                </p>
                                <p>
                                  Algorithm used to extract keywords :
                                  Singlerank
                                </p>

                                {this.state.userPageIDs.map((data, idx) => (
                                  <>
                                    <div
                                      style={{
                                        borderRadius: "20px",
                                        padding: "20px",
                                        margin: "20px 0",
                                        boxShadow: "4px 4px 24px 4px gainsboro",
                                      }}
                                    >
                                      <strong>Title: </strong>{" "}
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: this.getMarkedAbstract(
                                            data.title,
                                            this.state.original_keyword
                                          ),
                                        }}
                                      ></p>
                                      <strong>Year: </strong> <p>{data.year}</p>
                                      <strong>URL: </strong> <p>{data.url}</p>
                                      <strong>Abstract: </strong>{" "}
                                      <p
                                        id="abstract"
                                        dangerouslySetInnerHTML={{
                                          __html: this.getMarkedAbstract(
                                            data.abstract,
                                            this.state.original_keyword
                                          ),
                                        }}
                                      ></p>
                                    </div>
                                  </>
                                ))}
                              </>
                            ) : this.state.isManualData ? (
                              <p style={{ textAlign: "center" }}>
                                This interest was added manually
                              </p>
                            ) : (
                              <p style={{ textAlign: "center" }}>
                                No Matching Papers Found{" "}
                              </p>
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
                                <p>
                                  The weight of interest :{this.state.weight}{" "}
                                </p>
                                <p>
                                  Interest keywords before Wikipedia filter
                                  related to this interest :
                                  {this.state.original_keyword}
                                </p>
                                <p>Algorithm used to extract keywords : YAKE</p>
                                {this.state.tweetIds.map((data, idx) => (
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
                                ))}
                              </>
                            ) : this.state.isManualData ? (
                              <p style={{ textAlign: "center" }}>
                                This interest was added manually
                              </p>
                            ) : (
                              <p style={{ textAlign: "center" }}>
                                No Matching Papers Found{" "}
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
                <Row id="twitter">
                  <Col className="order-xl-2 mb-5 mb-xl-0" lg="12">
                    <TwitterCharts />
                  </Col>
                  <Col className="order-xl-2 mb-5 mb-xl-0" lg="12">
                    <h1 className="second-user">
                      {getItem("name") + " " + getItem("lastname")}
                    </h1>
                    <div style={{ width: "450px", margin: "0 auto" }}>
                      <div align="center">Twitter Keyword Trends</div>
                      <div id="chart">
                        <Chart
                          type="area"
                          series={this.state.chartOptions.twitterSeries}
                          options={twitterGraphOptions}
                          width="400"
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Carousel.Item>
              <Carousel.Item>
                <Row>
                  <Col className="order-xl-2 mb-5 mb-xl-0" lg="12">
                    <PaperCharts />
                  </Col>
                  <Col className="order-xl-2 mb-5 mb-xl-0" lg="12">
                    <h1 className="second-user">
                      {getItem("name") + " " + getItem("lastname")}
                    </h1>
                    <div style={{ width: "450px", margin: "0 auto" }}>
                      <div align="center">Paper Keyword Trends</div>
                      <div id="chart">
                        <Chart
                          type="area"
                          series={this.state.chartOptions.paperSeries}
                          options={paperGraphOptions}
                          width="400"
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Carousel.Item>
            </Carousel>
          </>
        )}
      </Card>
    );
  }
}

export default ComparisonSlider;
