/* eslint-disable no-unused-vars */
import React from "react";
import mapboxgl from "mapbox-gl";
import ruMapMarkers from "../../resources/ru-map-data.json";

export class DataEntryMap extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  /**
   * TODO: Delete after GraphQL connection complete
   */
  static retrieveMarkers() {
    return ruMapMarkers.features
      .filter(feature => feature.geometry.type === "Point")
      .map(marker => marker.geometry.coordinates);
  }

  populateWithMarkers() {
    DataEntryMap.retrieveMarkers().forEach(marker => {
      new mapboxgl.Marker()
        .setLngLat(marker)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            "<h3>Recorded Weight</h3><p>" +
              (150 + Math.floor(Math.random() * 50)) +
              "</p>"
          )
        )
        .addTo(this.map);
    });
  }

  /**
   * TODO: Delete after GraphQL connection complete
   */
  static retrievePaths() {
    return [
      [
        [-74.45239305496216, 40.514467992299224],
        [-74.45876598358154, 40.51208624872574],
        [-74.44992542266844, 40.50825244269745],
        [-74.44754362106323, 40.505527860088264],
        [-74.45254325866699, 40.50600099914141],
        [-74.44769382476807, 40.50335790374529],
        [-74.45271492004395, 40.50412473844355],
        [-74.4550108909607, 40.503798426877516],
        [-74.45689916610718, 40.50329264081298],
        [-74.45541858673096, 40.50066575507445],
        [-74.45084810256958, 40.50242790096527]
      ]
    ];
  }

  renderLineSegmenets(event) {
    event.target.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: DataEntryMap.retrievePaths()[0]
          }
        }
      },
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "#ee9ca7",
        "line-width": 3
      }
    });
  }

  renderMap() {
    // eslint-disable-next-line no-undef
    if (!process.env.REACT_APP_MAPBOX_API_KEY) {
      console.error(
        "Please place your Mapbox API key in the environment variable: REACT_APP_MAPBOX_API_KEY"
      );
      console.log(
        "Create a new key at https://account.mapbox.com/access-tokens/"
      );
      return;
    }
    // eslint-disable-next-line no-undef
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
    this.map = new mapboxgl.Map({
      container: this.containerRef.current,
      style: "mapbox://styles/mapbox/streets-v10",
      center: { lat: 40.506982, lng: -74.452378 },
      zoom: 14.0
    });
    this.populateWithMarkers();
    this.map.on("load", this.renderLineSegmenets);
  }

  componentDidMount() {
    this.renderMap();
  }

  render() {
    return <div ref={this.containerRef} style={stylesheet.mapContainer}></div>;
  }
}

const stylesheet = {
  mapContainer: {
    width: 570,
    height: 350
  },
  marker: {
    backgroundImage: "url('../../resources/location-marker-circle.png')",
    backgroundSize: "cover",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    cursor: "pointer"
  }
};
