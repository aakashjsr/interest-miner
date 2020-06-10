import React, { Component } from "react";
import { toast } from "react-toastify";
import Carousel from "react-bootstrap/Carousel";
import PieChart from "./Chart/PieChart";
import { handleServerErrors } from "utils/errorHandler";
import RestAPI from "../services/api";
import Chart from "react-apexcharts";
import CloudChart from "./Chart/CloudChart";
import "d3-transition";
import "react-tabs/style/react-tabs.css";

class UserCarousel extends Component {
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
      RestAPI.pieChart()
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
      RestAPI.streamChart()
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
      RestAPI.cloudChart()
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

    return (
      <>
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
            <PieChart />
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="mixed-chart"
              style={{ margin: "0 auto", width: "600px" }}
            >
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
            <div
              className="mixed-chart"
              style={{ margin: "0 auto", width: "600px" }}
            >
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
            <CloudChart />
          </Carousel.Item>
          <Carousel.Item>
            <div align="center">Twitter Keyword Trends</div>
            <div id="chart">
              <Chart
                type="area"
                width="600"
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
    );
  }
}

export default UserCarousel;
