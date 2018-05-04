import React, { Component } from "react";
import MapView from "./common/MapView";
import SelectFieldGroup from "./common/SelectFieldGroup";
import PieChart from "./common/PieChart";
import { Pie } from "react-chartjs-2";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: {},
      tripsArr: [],
      curTripName: "all",
      tripOptions: {},
      allStatistic: {}
    };
  }

  componentWillMount() {
    let tripFiles = require.context("../data/tmp2", false, /\.json$/);

    // if (ENV === "DEV") {
    //   tripFiles = require.context("../data/tmp2", false, /\.json$/);
    // } else if (ENV === "PROD") {
    //   tripFiles = require.context("../data/tmp2", false, /\.json$/);
    // }

    const data = [];
    const dataMap = {};
    let exampleTrip;
    const tripOptions = {};

    const allStatistic = {
      speed_0_10: 0,
      speed_10_20: 0,
      speed_20_30: 0,
      speed_30_40: 0,
      speed_40_50: 0,
      speed_50_60: 0,
      speed_60: 0
    };

    for (let tripFileName of tripFiles.keys()) {
      const tripFile = tripFiles(tripFileName);

      tripFileName = tripFileName.split(".")[1].split("/")[1];

      data.push(Object.assign({ tripFileName }, tripFile));

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

      dataMap[tripFileName] = Object.assign(
        { start_point, end_point, statistic },
        tripFile
      );

      exampleTrip = dataMap[tripFileName];
      tripOptions[tripFileName] = tripFileName;

      for (let range in statistic) {
        allStatistic[range] += statistic[range];
      }
    }

    const statisticArray = [];

    this.setState({
      trips: dataMap,
      tripsArr: data,
      tripOptions,
      allStatistic
    });
  }

  onLineClick(tripName) {
    this.setState({ curTripName: tripName });
  }

  onSelectChange(selected, key) {
    if (selected) {
      this.setState({ curTripName: selected.value });
    } else {
      this.setState({ curTripName: "all" });
    }
  }

  render() {
    const {
      trips,
      tripsArr,
      curTripName,
      tripOptions,
      allStatistic
    } = this.state;

    let curTrip = {};
    if (curTripName !== "all") {
      curTrip = trips[curTripName];
    } else {
      curTrip = {
        statistic: allStatistic
      };
    }

    let mapArr, scale;
    if (curTripName === "all") {
      mapArr = tripsArr;
      scale = 262144;
    } else {
      mapArr = [];
      mapArr.push(Object.assign({ tripFileName: curTripName }, curTrip));
      scale = 65536;
    }

    return (
      <div className="app-base">
        <div className="container">
          <h1>Trips Data</h1>
          <div className="row">
            <div className="col-md-4">
              <div className="statistic-title">
                <h3>Trips Statistic</h3>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    this.setState({
                      curTripName: "all"
                    });
                  }}
                >
                  Show All Trips
                </button>
              </div>
              <SelectFieldGroup
                label="Trip Selector"
                name="curTripName"
                value={curTripName}
                options={tripOptions}
                placeholder="Choose Trip"
                onChange={value => this.onSelectChange(value, "curTripName")}
              />
              <div className="pie-chart-base">
                <h4>Distribution of Speeds</h4>
                <PieChart trip={curTrip} />
              </div>
            </div>
            <div className="col-md-8">
              <MapView
                trips={mapArr}
                onLineClick={tripName => {
                  this.onLineClick(tripName);
                }}
                scale={scale}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
