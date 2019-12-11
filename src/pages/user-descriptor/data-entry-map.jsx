/* eslint-disable no-unused-vars */
import React from "react";
import mapboxgl from "mapbox-gl";
import { gql } from "apollo-boost";
import "./user-descriptor.css";
import { ApolloContext } from "../../apollo-context-provider";

export class DataEntryMap extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      loading: false,
      data: []
    };
    this.renderLineSegmenets = this.renderLineSegmenets.bind(this);
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
            coordinates: this.state.data
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
    this.map.on("load", this.renderLineSegmenets);
  }

  componentDidMount() {
    this.setState({ ...this.state, loading: true });
    this.context.client.query({ query: LG_DATA_LENGTH }).then(({ data }) => {
      console.log(`Map data length: ${data.getLengthOfDescriptor}`);
      this.context.client
        .query({
          query: LG_DATA,
          variables: { count: data.getLengthOfDescriptor }
        })
        .then(({ data }) => {
          this.setState({
            ...this.state,
            loading: false,
            data: data.getPaginatedDescriptors
              .filter(val => {
                return val.longitude < 90 && val.latitude < 90;
              })
              .map(val => {
                return {
                  latitude: val.latitude,
                  longitude: val.longitude,
                  value: val.value
                };
              })
          });
          console.log(this.state.data);
          const locations = this.state.data;
          this.renderMap();
          locations.forEach(marker => {
            new mapboxgl.Marker()
              .setLngLat({ lat: marker.latitude, lng: marker.longitude })
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setHTML(
                  "<h3>Recorded Weight</h3><p>" + marker.value + "</p>"
                )
              )
              .addTo(this.map);
            this.map.setCenter({
              lat: this.state.data.length > 0 ? this.state.data[0].latitude : 0,
              lng: this.state.data.length > 0 ? this.state.data[0].longitude : 0
            });
          });
        });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <h3>Loading...</h3>
          <div className="loader"></div>
        </div>
      );
    }
    return <div ref={this.containerRef} style={stylesheet.mapContainer}></div>;
  }
}

DataEntryMap.contextType = ApolloContext;

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

const LG_DATA = gql`
  query getDescriptors($count: Int!) {
    getPaginatedDescriptors(unit: "lb", start: 0, count: $count) {
      value
      longitude
      latitude
    }
  }
`;

const LG_DATA_LENGTH = gql`
  {
    getLengthOfDescriptor(unit: "lb")
  }
`;
