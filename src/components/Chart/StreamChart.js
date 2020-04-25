import React, { Component } from "react";
import Chart from "react-apexcharts";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import RestAPI from 'services/api';

import { handleServerErrors } from "utils/errorHandler";
class StreamChart extends React.Component {


  state = {
    chartOptions: {
      xaxis: {},
      series: [],
    },
    isLoding: true
  };


  componentDidMount() {

    this.setState({ isLoding: true }, () => {
      RestAPI.streamChart().then(response => {
        let chartOptions = {};

        let xAxisOptions = Object.keys(response.data);
        let seriesData = [];
        let keywords = {}


        let keywordDataOverTime = Object.values(response.data);
        for (let index=0; index < keywordDataOverTime.length; index++) {
          for (let itemIndex=0; itemIndex < keywordDataOverTime[index].length; itemIndex++ )
            keywords[keywordDataOverTime[index][itemIndex]["keyword__name"]] = true;
        }


        for (let keywordName of Object.keys(keywords)) {
          let monthRank = [];
          for (let index=0; index < xAxisOptions.length; index++) {
            let searchedList = response.data[xAxisOptions[index]].filter(item=>item["keyword__name"] == keywordName);
            monthRank.push(searchedList.length ? searchedList[0].weight: 0);
          }
          seriesData.push({
            name: keywordName, data: monthRank
          });
        }
        chartOptions = {xaxis: xAxisOptions, series: seriesData};


        this.setState({chartOptions, isLoding: false});
      }).catch(error => {
        this.setState({ isLoding: false })
        handleServerErrors(error, toast.error)
      })
    })
  }


  render() {
    console.log(this.state.chartOptions.series)
    let options = {
      chart: {
        height: 500,
        type: 'area',
        stacked: true
      },
      // fill: {type: "solid", fillOpacity: 0.4},
      colors: ["#1F85DE", "#D81FDE", "#DE1F85", "#DE781F", "#DE1F26", "#BFDE1F", "#6C0D5D", "#0D6C1C", "#25DE1F", "#3E1FDE"],
      dataLabels: {enabled: true},
      stroke: {
        curve: 'smooth',
        width: 1
      },
      xaxis: {
        categories: this.state.chartOptions.xaxis
      },
    }
    return (
      <div>
         {
           this.state.isLoding ? <div className="text-center" style={{padding:'20px'}}>
                  <Loader type="Puff" color="#00BFFF" height={100} width={100} />
            </div> :

           <div id="chart">
             <Chart
               type="area"
               series={this.state.chartOptions.series}
               options={options}
               height={500}
             />
           </div>
         }
      </div>

    );
  }
}

export default StreamChart;
