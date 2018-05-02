import React, { Component } from "react";
import { Map, MarkerGroup, LineGroup } from "react-d3-map";
import "../../style/MapView.scss";

class MapView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  buildLineGroup(data) {
    return data.map((line, idx) => {
      <LineGroup key={idx} data={line} meshClass={"trip-line"} />;
    });
  }
  render() {
    const { trip } = this.props;
    debugger;
    console.log("trip", trip);

    // const coords = trip.coords.map((coord, index) => {
    //   const array = [];
    //   array.push(coord.lng);
    //   array.push(coord.lat);
    //   return array;
    // });
    let coords = [];

    for (let j = 0; j < 2; j++) {
      for (
        let i = 0;
        i < trip[j].coords.length;
        i += ~~(trip[j].coords.length / 10)
      ) {
        const tmp = trip[j].coords[i];
        coords.push([tmp.lng, tmp.lat]);
      }
    }

    console.log("coords", coords);

    const data = {
      type: "Feature",
      properties: {
        text: "this is a LineString!!!"
      },
      option: {
        color: "blue"
      },
      geometry: {
        type: "LineString",
        coordinates: coords[0]
      }
    };

    const data2 = {
      type: "Feature",
      properties: {
        text: "this is a LineString!!!"
      },
      option: {
        color: "blue"
      },
      geometry: {
        type: "LineString",
        coordinates: coords[1]
      }
    };

    const width = 700;
    const height = 700;
    const scale = 1 << 20;
    const scaleExtent = [1, 1 << 20];
    const center = coords[0];

    // set your popupContent
    const popupContent = function(d) {
      return d.properties.text;
    };

    var onLineMouseOut = function(dom, d, i) {
      console.log("out");
    };
    var onLineMouseOver = function(dom, d, i) {
      console.log("over");
    };
    var onLineClick = function(dom, d, i) {
      console.log("click");
    };
    var onLineCloseClick = function(id) {
      console.log("close click");
    };

    return (
      <div>
        <h1>ssss</h1>
        <Map
          width={width}
          height={height}
          scale={scale}
          scaleExtent={scaleExtent}
          center={center}
        >
          <LineGroup
            key={"line-test"}
            data={data}
            popupContent={popupContent}
            onClick={onLineClick}
            onCloseClick={onLineCloseClick}
            onMouseOver={onLineMouseOver}
            onMouseOut={onLineMouseOut}
            meshClass={"trip-line"}
          />
        </Map>
      </div>
    );
  }
}

export default MapView;
