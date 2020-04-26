import React, { Component, Fragment } from 'react';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner'
import RestAPI from 'services/api';

import { handleServerErrors } from "utils/errorHandler";
import * as am4core from "@amcharts/amcharts4/core";

import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";


/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end


class CloudChartPage extends Component {
  state = {
    mydata: []
  }
  componentDidMount() {

    this.setState({ isLoding: true }, () => {
      RestAPI.cloudChart().then(response => {
        series.data = response.data
        this.setState({
          isLoding: false,
          // data : response.data
        })
      }).catch(error => {
        this.setState({ isLoding: false })
        handleServerErrors(error, toast.error)
      })
    })

    let chart = am4core.create("chartdiv", am4plugins_wordCloud.WordCloud);
    chart.fontFamily = "Courier New";
    let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
    series.randomness = 0.1;
    series.rotationThreshold = 0.5;


    series.dataFields.word = "keyword";
    series.dataFields.value = "weight";

    series.heatRules.push({
      "target": series.labels.template,
      "property": "fill",
      "min": am4core.color("#0000CC"),
      "max": am4core.color("#CC00CC"),
      "dataField": "value"
    });

    series.labels.template.urlTarget = "_blank";
    series.labels.template.tooltipText = "{source}";

    let hoverState = series.labels.template.states.create("hover");
    hoverState.properties.fill = am4core.color("#FF0000");


  }

  render() {
    return (
      <Fragment>
        {this.state.isLoding ?
          (
            <div className="text-center" style={{ padding: '20px' }}>
              <Loader type="Puff" color="#00BFFF" height={100} width={100} />
            </div>
          )
          :
          <div id="chartdiv" style={{ width: "100%", height: "600px" }}></div>

        }
      </Fragment>
    );
  }
}

export default CloudChartPage;