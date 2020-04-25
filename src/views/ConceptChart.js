
import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import ConceptMap from "../components/ConceptMap"
import PieChart from "../components/Chart/PieChart"
import BarChart from "../components/Chart/BarChart"
import ConceptMapContainer from "../components/ConceptMap/"



import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

class ConceptPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1"
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="bg-gradient-default1 shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light1 ls-1 mb-1">
                        {/* Overview */}
                      </h6>
                      <h2 className="text-white1 mb-0">Concept Map Chart</h2>
                    </div>

                  </Row>
                </CardHeader>
                <CardBody>

                  <ConceptMapContainer />

                </CardBody>
              </Card>
            </Col>

          </Row>
        </Container>
      </>
    );
  }
}

export default ConceptPage;
