import React, { Component, Fragment } from "react";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import RestAPI from "services/api";

import { handleServerErrors } from "utils/errorHandler";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import { TwitterTweetEmbed } from "react-twitter-embed";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

/* Chart code */
// Themes begin
// Themes end

class CloudChartPage extends Component {
  state = {
    mydata: [],
    isModalLoader: false,
    isTweetData: false,
    isPaperData: false,
    tweetIds: [],
    userPageIDs: [],
    isData:true,
    title: "",
    url: "",
    year: "",
    abstract: "",

  };
  componentDidMount() {
    this.setState({ isLoding: true }, () => {
      RestAPI.cloudChart()
        .then((response) => {
          if(response.data.length===0){
            this.setState({
              isData:false
            })
          }

          series.data = response.data.slice(0,15);
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
    series.animationDuration = 50;

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
      this.setState({ modal: true, isModalLoader: true }, () => {
        if (ev.target.dataItem.dataContext.tweet_ids) {
          this.setState({
            isTweetData: true,
            tweetIds: ev.target.dataItem.dataContext.tweet_ids,
          });
          if (ev.target.dataItem.dataContext.tweet_ids.length === 0) {
            this.setState({
              isTweetData: false,
            });
          }
        }
        if (ev.target.dataItem.dataContext.papers) {
          this.setState({
            isPaperData: true,
            userPageIDs: ev.target.dataItem.dataContext.papers,
          });

          if (ev.target.dataItem.dataContext.papers.length === 0) {
            this.setState({
              isPaperData: false,
            });
          }
        }
        this.setState({
          isModalLoader: false,
        });
      });
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

  render() {
    return (
      <Fragment>
        {this.state.isLoding ? 
          <div className="text-center" style={{ padding: "20px" }}>
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          </div>
         :
         this.state.isData ?
         <div id="chartdiv" style={{ width: "100%", height: "600px" }}></div>
         :<div id="chartdiv" style={{textAlign:"center"}}>No Data Found</div>
      
          }
        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>Papers</Tab>
                <Tab>Tweets</Tab>
              </TabList>
              <TabPanel>
                {this.state.isModalLoader ? (
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
                    {this.state.isPaperData ? (
                      <>
                        {this.state.userPageIDs.map((data, idx) => (
                          <>
                            <strong>Title: </strong> <p>{data.title}</p>
                            <strong>Year: </strong> <p>{data.year}</p>
                            <strong>URL: </strong> <p>{data.url}</p>
                            <strong>Abstract: </strong> <p>{data.abstract}</p>
                          </>
                        ))}
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
                  <div className="text-center" style={{ padding: "20px" }}>
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
      </Fragment>
    );
  }
}

export default CloudChartPage;
