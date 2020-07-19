import React, { Component } from "react";
import { Chart } from "@antv/g2";
import { handleServerErrors } from "utils/errorHandler";
import RestAPI from "../../services/api";
import { toast } from "react-toastify";
import { getItem } from "utils/localStorage";

class BarChart extends Component {
  state = {};
  componentDidMount() {
    RestAPI.getScore(getItem("userId"))
      .then((response) => {
        console.log("jjjjjjj", response);
        let user_1_data = Object.keys(response.data.user_1_data);
        let user_2_data = Object.keys(response.data.user_2_data);
        let value1 = Object.values(response.data.user_1_data);
        let value2 = Object.values(response.data.user_2_data);
        //api data
        // const datas = [];
        // for (let i = 0; i < user_1_data.length; i++) {
        //   datas.push({
        //     country: user_1_data[i],
        //     type: "2016 年转基因种植面积",
        //     value: parseInt(value1[i]),
        //   });
        //   datas.push({
        //     country: user_2_data[i],
        //     type: "2016 年耕地总面积",
        //     value: parseInt(value2[i]),
        //   });
        // }
        // console.log("data", datas);
        //custom data
        const datas = [
          { country: "object", type: "2016 年转基因种植面积", value: 5 },
          { country: "object", type: "2016 年耕地总面积", value: 1 },
          { country: "hiv", type: "2016 年转基因种植面积", value: 5 },
          { country: "hiv", type: "2016 年耕地总面积", value: 1 },
          {
            country: "cross-sectional study",
            type: "2016 年转基因种植面积",
            value: 5,
          },
          {
            country: "cross-sectional study",
            type: "2016 年耕地总面积",
            value: 5,
          },
        ];
        console.log("data", datas);

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
        console.log(datas);
      })
      .catch((error) => {
        console.log(error);
        handleServerErrors(error, toast.error);
      });
  }

  render() {
    return <div id="searched-bar-chart" />;
  }
}
export default BarChart;
