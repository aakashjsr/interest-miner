    
import React, { Component } from "react";
import Chart from "react-apexcharts";
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import user from 'services/api';

import { handleServerErrors } from "utils/errorHandler";

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        // {
        //   name: "Keyword",
        //   data: [1,2,3]
        // }
      ],
      tweetoptions: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: []
        }
      },
      tweetseries: [ ]
    };
  }


  componentDidMount(){
    this.setState({ isLoding: true },()=>{
      user.barChart().then(response => {
      let categorieList = Object.keys(response.data.papers);
      let value = Object.values(response.data.papers);
      let tweetscategorieList = Object.keys(response.data.tweets);
      let tweetsvalue = Object.values(response.data.tweets);
        this.setState({ 
          isLoding: false,
          // options: {...this.state.options.xaxis.categories,response.data}
          data : response.data,
          options: { ...this.state.options, ...this.state.options.xaxis, ...this.state.options.xaxis.categories=categorieList },
          series: [{name: "Keyword", data: [...value]}],
          tweetseries:[{name: "Keyword", data: [...tweetsvalue]}],
          tweetoptions:{ ...this.state.tweetoptions, ...this.state.tweetoptions.xaxis, ...this.state.tweetoptions.xaxis.categories=tweetscategorieList },

        })
    }).catch(error => {
        this.setState({ isLoding: false })
        handleServerErrors(error, toast.error)
        })
    })
}

  render() {
    console.log(this.state)
    return (
      < >
        { this.state.isLoding ? 
                  (  
                    <div className="text-center" style={{padding:'20px'}}>
                        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
                   </div>
                   )
                   :
                   
          <div className="mixed-chart" style={{paddingLeft: '20%'}}>
            <h1>Paper Data</h1>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="600"
            />
            <hr/>
            <h1>Tweet Data</h1>
            <Chart
              options={this.state.tweetoptions}
              series={this.state.tweetseries}
              type="bar"
              width="600"
            />
          </div> 
        }
        
      </>
    );
  }
}

export default BarChart;
    