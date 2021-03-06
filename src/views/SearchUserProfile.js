import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import SearchUserHeader from "components/Headers/SearchUserHeader.js";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { handleServerErrors } from "utils/errorHandler";
import RestAPI from "../services/api";
import ReactApexChart from "react-apexcharts";
import BarChart from "../components/UserCharts/BarChart";
import "d3-transition";
import ComparisonSlider from "../views/ComparisonSlider.js";
import VennDiagram from "../components/UserCharts/VennDiagram.js";
import HeatMap from "../components/UserCharts/HeatMap.js";
import "react-tabs/style/react-tabs.css";
import "../assets/scss/custom.css";
import swal from "@sweetalert/with-react";
import { setItem } from "utils/localStorage";
import { ThemeProvider } from "@material-ui/core";

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
  constructor(props) {
    super(props);
    this.state = {
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
      imageTooltipOpen: false,
      score: "",
      isLoding: false,
      isLoding1: false,
      series1: [],
      data: [],
      series: [],
      barchartdata: [],
      paramid: "",
      venn_chart_data: [],
      HeatMap: [],
    };
  }

  componentDidMount() {
    this.setState({ isLoding: true }, () => {
      RestAPI.getScore(this.props.match.params.id)
        .then((response) => {
          this.setState({
            score: response.data.score,
            venn_chart_data: response.data.venn_chart_data,
            barchart: response.data.bar_chart_data,
            HeatMap: response.data.heat_map_data,
          });
        })
        .catch((error) => {
          this.setState({ isLoding1: false });
          handleServerErrors(error, toast.error);
        });
      RestAPI.getUserProfile(this.props.match.params.id)
        .then((response) => {
          this.setState({
            id: response.data.id,
            first_name: response.data.first_name,
            email: response.data.email,
            last_name: response.data.last_name,
            twitter_account_id: response.data.twitter_account_id,
            author_id: response.data.author_id,
            paper_count: response.data.paper_count,
            tweet_count: response.data.tweet_count,
            keyword_count: response.data.keyword_count,
            paramid: this.props.match.params.id,
          });
        })
        .catch((error) => {
          handleServerErrors(error, toast.error);
        });
      this.setState({ isLoding: false });
    });
  }

  componentDidUpdate(prevPro) {
    if (prevPro.match.params.id !== this.props.match.params.id) {
      this.setState({ isLoding: true }, () => {
        RestAPI.getUserProfile(this.props.match.params.id)
          .then((response) => {
            setItem("userId", response.data.id);
            window.location.reload();
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
              paramid: this.props.match.params.id,
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

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  // handleChange = (e) => {
  //   let getValue = e.target.value;
  //   let getName = e.target.name;
  //   this.setState(() => ({ [getName]: getValue }));
  // };

  // _handleSubmit = (e) => {
  //   const {
  //     id,
  //     email,
  //     first_name,
  //     last_name,
  //     twitter_account_id,
  //     author_id,
  //   } = this.state;
  //   e.preventDefault();
  //   let data = {
  //     email: email,
  //     first_name: first_name,
  //     last_name: last_name,
  //     twitter_account_id: twitter_account_id,
  //     author_id: author_id,
  //   };

  //   this.setState({ isLoding: true }, () => {
  //     RestAPI.updateUserProfile(data, id)
  //       .then((response) => {
  //         toast.success("Update Profile Data !", {
  //           position: toast.POSITION.TOP_RIGHT,
  //           autoClose: 2000,
  //         });
  //         this.setState({ isLoding: false });
  //         // this.props.history.push("/admin/view-paper");
  //       })
  //       .catch((error) => {
  //         this.setState({ isLoding: false });
  //         handleServerErrors(error, toast.error);
  //       });
  //   });
  // };

  modalDetail = () => {
    swal(
      <div>
        <h1>How the bar chart generated?</h1>
        <img src={require("../assets/img/barchart.png")} />
      </div>
    );
  };

  render() {
    return (
      <>
        <SearchUserHeader
          first_name={this.state.first_name}
          last_name={this.state.last_name}
          score={this.state.score}
        />

        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2" xl="6">
              <Card className="card-profile shadow">
                <CardHeader className="bg-white border-0">
                  <h3>Bar Chart</h3>
                  <p>
                    Bar chart explaining the weight of users occupied by
                    interest.
                    <i
                      style={{ cursor: "pointer" }}
                      onClick={this.modalDetail}
                      className="fa fa-question-circle"
                    />
                  </p>
                </CardHeader>
                {/* <Row className="justify-content-center">
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
                </Row> */}
                <CardBody className="pt-0 pt-md-4">
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
                    <BarChart
                      barchart={this.state.barchart}
                      paramid={this.state.paramid}
                    />
                  )}
                  {/* <Row>
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
                        <div>
                          <span className="heading">
                            {this.state.data && tweet_count}
                          </span>
                          <span className="description">Tweet Count</span>
                        </div>
                      </div>
                    </div>
                  </Row> */}
                  {/* <div className="text-center">
                    <h3>{this.state.data && first_name + " " + last_name}</h3>
                    <hr className="my-4" />
                  </div> */}
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="6">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="12">
                      <h3 className="mb-0">Venn Diagram</h3>
                      <p>
                        Venn-chart Visualization explaining how the similarity
                        between users was measured.
                      </p>
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
                    <VennDiagram
                      first_name={this.state.first_name}
                      last_name={this.state.last_name}
                      paramid={this.state.paramid}
                      venn_chart_data={this.state.venn_chart_data}
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>

          <br />

          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="12">
                      <h3 className="mb-0">Heat Map</h3>
                      <p>
                        Heatmap Visualization explaining how the similarity
                        between each interest keyword was measured.
                      </p>
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
                    <HeatMap
                      HeatMap={this.state.HeatMap}
                      paramid={this.state.paramid}
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <br />
          <ComparisonSlider
            first_name={this.state.first_name}
            last_name={this.state.last_name}
          />
        </Container>
      </>
    );
  }
}

export default SearchUserProfile;
