import React, { Component } from "react";
import MapView from "./MapView";
import SelectFieldGroup from "./common/SelectFieldGroup";
import { Pie } from "react-chartjs-2";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: {},
      tripsArr: [],
      curTrip: "",
      pieData: {}
    };
  }

  componentWillMount() {
    const tripFiles = require.context("../data/tmp", false, /\.json$/);

    const data = [];
    const dataMap = {};
    let exampleTrip;

    for (let tripFileName of tripFiles.keys()) {
      const tripFile = tripFiles(tripFileName);
      data.push(tripFile);

      const start_point = Object.assign({}, tripFile.coords[0]);
      const end_point = Object.assign(
        {},
        tripFile.coords[tripFile.coords.length - 1]
      );

      const statistic = {
        speed_0_10: 0,
        speed_10_20: 0,
        speed_20_30: 0,
        speed_30_40: 0,
        speed_40_50: 0,
        speed_50_60: 0,
        speed_60: 0
      };

      for (let coord of tripFile.coords) {
        if (coord.speed < 10) {
          statistic.speed_0_10++;
        } else if (coord.speed >= 10 && coord.speed < 20) {
          statistic.speed_10_20++;
        } else if (coord.speed >= 20 && coord.speed < 30) {
          statistic.speed_20_30++;
        } else if (coord.speed >= 30 && coord.speed < 40) {
          statistic.speed_30_40++;
        } else if (coord.speed >= 40 && coord.speed < 50) {
          statistic.speed_40_50++;
        } else if (coord.speed >= 50 && coord.speed < 60) {
          statistic.speed_50_60++;
        } else if (coord.speed >= 60) {
          statistic.speed_60++;
        }
      }

      console.log("statistic", statistic);

      tripFileName = tripFileName.split(".")[1].split("/")[1];

      dataMap[tripFileName] = Object.assign(
        { start_point, end_point, statistic },
        tripFile
      );

      exampleTrip = dataMap[tripFileName];
    }
    console.log("dataMap", dataMap);

    const statisticArray = [];

    const pieData = {
      labels: ["Red", "Green", "Yellow"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    };

    this.setState({
      trips: dataMap,
      pieData: pieData,
      tripsArr: data
    });
  }

  render() {
    // const tripFiles = require.context("../data/tmp", false, /\.json$/);

    // const data = [];
    // const dataMap = {};
    // let exampleTrip;

    // for (let tripFileName of tripFiles.keys()) {
    //   const tripFile = tripFiles(tripFileName);
    //   data.push(tripFile);

    //   const start_point = Object.assign({}, tripFile.coords[0]);
    //   const end_point = Object.assign(
    //     {},
    //     tripFile.coords[tripFile.coords.length - 1]
    //   );

    //   const statistic = {
    //     speed_0_10: 0,
    //     speed_10_20: 0,
    //     speed_20_30: 0,
    //     speed_30_40: 0,
    //     speed_40_50: 0,
    //     speed_50_60: 0,
    //     speed_60: 0
    //   };

    //   for (let coord of tripFile.coords) {
    //     if (coord.speed < 10) {
    //       statistic.speed_0_10++;
    //     } else if (coord.speed >= 10 && coord.speed < 20) {
    //       statistic.speed_10_20++;
    //     } else if (coord.speed >= 20 && coord.speed < 30) {
    //       statistic.speed_20_30++;
    //     } else if (coord.speed >= 30 && coord.speed < 40) {
    //       statistic.speed_30_40++;
    //     } else if (coord.speed >= 40 && coord.speed < 50) {
    //       statistic.speed_40_50++;
    //     } else if (coord.speed >= 50 && coord.speed < 60) {
    //       statistic.speed_50_60++;
    //     } else if (coord.speed >= 60) {
    //       statistic.speed_60++;
    //     }
    //   }

    //   console.log("statistic", statistic);

    //   tripFileName = tripFileName.split(".")[1].split("/")[1];

    //   dataMap[tripFileName] = Object.assign(
    //     { start_point, end_point, statistic },
    //     tripFile
    //   );

    //   exampleTrip = dataMap[tripFileName];
    // }
    // console.log("dataMap", dataMap);

    // const statisticArray = [];

    // const pieData = {
    //   labels: ["Red", "Green", "Yellow"],
    //   datasets: [
    //     {
    //       data: [300, 50, 100],
    //       backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    //       hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    //     }
    //   ]
    // };

    const { trips, pieData, tripsArr } = this.state;
    console.log("trips", trips);

    return (
      <div className="container">
        <h1>Hello World</h1>
        <div className="row">
          <div className="col-md-4">
            <Pie
              data={pieData}
              width={300}
              height={300}
              options={{
                maintainAspectRatio: true
              }}
            />
          </div>
          <div className="col-md-8">
            <MapView trips={tripsArr} />
          </div>
        </div>
      </div>
    );
  }
}
