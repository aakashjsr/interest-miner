import React, { Component } from "react";
import { Chart } from "@antv/g2";
import { handleServerErrors } from "utils/errorHandler";
import RestAPI from "../../services/api";
import { toast } from "react-toastify";
import { getItem } from "utils/localStorage";
import swal from "@sweetalert/with-react";

class BarChart extends Component {
  state = {
    score: "",
  };
  componentDidMount() {
    RestAPI.getScore(getItem("userId"))
      .then((response) => {
        console.log(response);
        this.setState({
          score: response.data.score,
        });
        let user_1_data = Object.keys(response.data.user_1_data);
        let user_2_data = Object.keys(response.data.user_2_data);
        let value1 = Object.values(response.data.user_1_data);
        let value2 = Object.values(response.data.user_2_data);
        const datas = [];
        for (let i = 0; i < user_1_data.length; i++) {
          datas.push({
            country: user_1_data[i],
            type: "User 1 Data",
            value: parseInt(value1[i]),
          });
          datas.push({
            country: user_2_data[i],
            type: "User 2 Data",
            value: parseInt(value2[i]),
          });
        }
        const chart = new Chart({
          container: "searched-bar-chart",
          autoFit: true,
          height: 300,
          padding: [10, 0, 0, 120],
        });
        chart.data(datas);
        chart.scale("value", {
          alias: "Value",
        });

        chart.axis("value", false);
        chart.coordinate().transpose();
        chart.facet("mirror", {
          fields: ["type"],
          transpose: true,
          showTitle: false,
          eachView: (view, facet) => {
            const facetIndex = facet.columnIndex;
            if (facetIndex === 0) {
              view.axis("country", {
                position: "top",
                label: {
                  style: {
                    fill: "#aaaaaa",
                    fontSize: 12,
                  },
                },
                tickLine: {
                  alignTick: false,
                  length: 0,
                },
                line: null,
              });
            } else {
              view.axis("country", false);
            }
            const color = facetIndex === 0 ? "#1890ff" : "#2fc25b";
            view
              .interval()
              .position("country*value")
              .color(color)
              .size(20)
              .label("value", (val) => {
                let offset = facetIndex === 1 ? -4 : 4;
                let shadowBlur = 2;
                let textAlign = facetIndex === 1 ? "end" : "start";
                let fill = "white";
                if (val < 15) {
                  offset = facetIndex === 1 ? 4 : -4;
                  textAlign = facetIndex === 1 ? "start" : "end";
                  fill = "#666666";
                  shadowBlur = 0;
                }
                return {
                  offset,
                  style: {
                    fill,
                    stroke: null,
                    shadowBlur,
                    shadowColor: "rgba(0, 0, 0, .45)",
                    textAlign,
                  },
                };
              });
          },
        });
        chart.interaction("element-highlight");
        chart.render();
      })
      .catch((error) => {
        handleServerErrors(error, toast.error);
      });
  }
  modalDetail = () => {
    swal(
      <div>
        <h1>How to calculate similarity?</h1>
        <img src={require("../../assets/img/similaritychart.png")} />
      </div>
    );
  };

  render() {
    return (
      <>
        <h3
          onClick={this.modalDetail}
          style={{ textAlign: "center", cursor: "pointer" }}
        >
          Score : {this.state.score}
        </h3>
        <div id="searched-bar-chart" />
      </>
    );
  }
}
export default BarChart;
