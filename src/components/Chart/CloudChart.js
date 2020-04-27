import React, { Component, Fragment } from "react";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import RestAPI from "services/api";

import { handleServerErrors } from "utils/errorHandler";
import * as am4core from "@amcharts/amcharts4/core";

import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import {
  TwitterTweetEmbed,
} from "react-twitter-embed";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

class CloudChartPage extends Component {
  state = {
    mydata: [],
    modal: false,
    pmodal: false,
    TweetId: null,
    id:'',
    title:'',
    url:'',
    year:'',
    abstract:'',
  };
  componentDidMount() {
    this.setState({ isLoding: true }, () => {
      RestAPI.cloudChart()
        .then((response) => {
          console.log(response);
          series.data = response.data;
          this.setState({
            isLoding: false,
            // data : response.data
          });
        })
        .catch((error) => {
          this.setState({ isLoding: false });
          handleServerErrors(error, toast.error);
        });
    });

    let chart = am4core.create("chartdiv", am4plugins_wordCloud.WordCloud);
    chart.fontFamily = "Courier New";
    let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
    series.randomness = 0.1;
    series.rotationThreshold = 0.5;

    series.dataFields.word = "keyword";
    series.dataFields.value = "weight";

    series.heatRules.push({
      target: series.labels.template,
      property: "fill",
      min: am4core.color("#0000CC"),
      max: am4core.color("#CC00CC"),
      dataField: "value",
    });
    series.labels.template.events.on("hit", (ev) => {
      this.setState({ modal: true });
      if (ev.target.dataItem.dataContext.tweet_id) {
        this.setState({
          pmodal: false,
          TweetId: ev.target.dataItem.dataContext.tweet_id,
        });
      }
      if (ev.target.dataItem.dataContext.paper_db_id) {
        this.getPaper(ev.target.dataItem.dataContext.paper_db_id);
        this.setState({
          pmodal: true,
          id:ev.target.dataItem.dataContext.paper_db_id,
        });
      }
    });

    series.labels.template.urlTarget = "_blank";
    series.labels.template.tooltipText = "{source}";

    let hoverState = series.labels.template.states.create("hover");
    hoverState.properties.fill = am4core.color("#FF0000");
  }

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  getPaper = (id) => {
    RestAPI.getPaper(id).then(response => {
      this.setState({
        title: response.data.title,
        url: response.data.url,
        year: response.data.year,
        abstract: response.data.abstract
      })
    }).catch(error => {
      this.setState({ isLoding: false })
      handleServerErrors(error, toast.error)
    })
  }
  render() {
    return (
      <Fragment>
        {this.state.isLoding ? (
          <div className="text-center" style={{ padding: "20px" }}>
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          </div>
        ) : (
          <div id="chartdiv" style={{ width: "100%", height: "600px" }}>
            <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
              {this.state.pmodal ? (
                <>
                  <ModalHeader toggle={this.toggle}>Paper Detail</ModalHeader>
                  <ModalBody>
                    <strong>Title: </strong>{" "}
                    <p>
                      {this.state.title}
                    </p>
                    <strong>Year: </strong>{" "}
                    <p>
                    {this.state.year}
                    </p>
                    <strong>URL: </strong>{" "}
                    <p>
                      {this.state.url}
                    </p>
                    <strong>Abstract: </strong> <br />{" "}
                    {this.state.abstract}
                  </ModalBody>
                </>
              ) : (
                <>
                  <ModalHeader toggle={this.toggle}>Twitter Detail</ModalHeader>
                  <ModalBody>
                    <TwitterTweetEmbed tweetId={this.state.TweetId} />
                  </ModalBody>
                </>
              )}
              <ModalFooter>
                <Button color="primary" onClick={this.toggle}>
                  OK
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        )}
      </Fragment>
    );
  }
}

export default CloudChartPage;
