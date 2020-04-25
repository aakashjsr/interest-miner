import React, { Component } from "react";
import Chart from "react-apexcharts";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import RestAPI from 'services/api';

import { handleServerErrors } from "utils/errorHandler";
class StreamChart extends React.Component {


  state = {
    options: {
      xaxis: {}
    },
    series: [],
  }


  componentDidMount() {
    this.setState({ isLoding: true }, () => {
      RestAPI.streamChart().then(response => {
        let data = Object.values(response.data);

        let dataArray = data.map(val => val);
        let graphdata = data[0].map(val => {
          return { name: val.keyword__name, data: [val.weight, 0] }
        });
        let categoriesList = Object.keys(response.data);
        this.setState({
          isLoding: false,
          options: {
            xaxis: {
              categories: [...categoriesList]
            }
          },
          series: [...graphdata]
        })
      }).catch(error => {
        this.setState({ isLoding: false })
        handleServerErrors(error, toast.error)
      })
    })
  }


  render() {
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="area" height={500}
        />
      </div>
    );
  }
}

export default StreamChart;
