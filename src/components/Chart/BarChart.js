    
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
          categories: ['Computer', 'Math', 'Physics', 'English', 'Chemistry']
        }
      },
      series: [
        {
          name: "Keyword",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };
  }


  componentDidMount(){
    this.setState({ isLoding: true },()=>{
      user.barChart().then(response => {
      console.log('BAR CHART',response.data)
        this.setState({ 
          isLoding: false,
          // options: {...this.state.options.xaxis.categories,response.data}
          data : response.data
        })
    }).catch(error => {
        this.setState({ isLoding: false })
        handleServerErrors(error, toast.error)
        })
    })
}

  render() {
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
            <Chart
              options={this.state.options}
              series={this.state.series}
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
    