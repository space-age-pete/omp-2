import React, { Component } from "react";
import "./MapSolo.css";
import axios from "axios";
import API from "../../utils/API";
import MDSpinner from "react-md-spinner";
import fighters from "../../utils/fighters.json";
import keys from "../../keys";

class MapSolo extends Component {
  state = {
    venues: [],
    fighters: fighters,
    refs: [],
    mics: [],
    prevCurrLatLng: {
      lat: null,
      lng: null
    },
    userCurrLatLng: { lat: 41.8781, lng: -87.6298 },
    geolocationErr: false,
    venuesAPIHit: true,
    fightersAPIHit: false,
    refsAPIHit: true,
    areTilesLoaded: false,
    mapLoaded: false
  };

  getLocationOptions = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 0
  };

  handleGetLocationSuccess = pos => {
    let {
      coords: { latitude: lat, longitude: lng }
    } = pos;
    let prevCurrLatLng = this.state.userCurrLatLng;
    let userCurrLatLng = { lat, lng };
    this.setState({
      prevCurrLatLng,
      userCurrLatLng
    });
    //this.getVenues(userCurrLatLng.lat, userCurrLatLng.lng);
  };

  handleGetLocationError = err => {
    console.log(err);
    this.setState({
      geolocationErr: true,
      userCurrLatLng: { lat: 41.8781, lng: -87.6298 }
    });
    //this.getVenues(41.8781, -87.6298);
  };

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      this.handleGetLocationSuccess,
      this.handleGetLocationError,
      this.getLocationOptions
    );
    window.initMap = this.initMap;

    this.getFighters();
    //this.getRefs();
  }

  componentWillMount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  loadScript = url => {
    console.log("loadScript hit");
    var index = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.appendChild(script);
    this.setState({ mapLoaded: true });
  };

  getFighters = () => {
    console.log("this.fighters: ", fighters);
    this.setState(
      {
        fighters: fighters,
        fightersAPIHit: true
      },
      this.triggerInitMap
    );
    this.triggerInitMap();
  };

  initMap = () => {
    console.log(this.state.userCurrLatLng);
    if (!this.state.userCurrLatLng.lat || !this.state.userCurrLatLng.lng) {
      return;
    }
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: {
        lat: this.state.userCurrLatLng.lat,
        lng: this.state.userCurrLatLng.lng
      },
      zoom: 14
    });

    // Add listener for tilesloaded and update our areTilesloaded state to remove spinner
    map.addListener("tilesloaded", () => {
      this.setState({ areTilesLoaded: true });
    });

    // Create An InfoWindow
    var infowindow = new window.google.maps.InfoWindow();

    // Display Dynamic Markers for Fighters
    this.state.fighters.map(function(fighters) {
      var contentString = `<div id="content"><div id="siteNotice"></div><img src="http://icons.iconarchive.com/icons/google/noto-emoji-activities/256/52746-boxing-glove-icon.png" class="fighterIcon" /><h2 id="firstHeading" class="firstHeading">${
        fighters.name
      }</h2><h6>Matches Won: ${fighters.matchesWon}</h6><h6>Matches Lost: ${
        fighters.matchesLost
      }</h6><div id="bodyContent"><img src=${
        fighters.img
      } class="fighterImg" /></br><p>${
        fighters.bio
      }</p></p>Need a ref to watch your fight? <b>Reach out now at :</b>${
        fighters.phone
      }</p></div></div>`;

      // Create A Marker
      var icon = {
        url: "https://66.media.tumblr.com/avatar_87b874867ea4_128.pnj", // url
        scaledSize: new window.google.maps.Size(50, 50), // scaled size
        origin: new window.google.maps.Point(0, 0), // origin
        anchor: new window.google.maps.Point(0, 0) // anchor
      };

      var markerFight = new window.google.maps.Marker({
        position: { lat: fighters.lat, lng: fighters.lng },
        map: map,
        title: fighters.name,
        icon: icon
      });

      // Click on A Marker!
      markerFight.addListener("click", function() {
        // Change the content
        infowindow.setContent(contentString);

        // Open An InfoWindow
        infowindow.open(map, markerFight);
      });
    });
  };

  triggerInitMap = () => {
    console.log("triggerInitMap hit", this.state);
    if (
      !this.state.mapLoaded &&
      (this.state.fightersAPIHit || this.state.fighters.length)
    ) {
      this.loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${
          keys.googleMaps.key
        }&callback=initMap`
      );
    }
  };

  render() {
    if (
      this.state.geolocationErr ||
      this.state.userCurrLatLng === this.state.prevCurrLatLng
    ) {
      console.log("not sure");
    }
    return (
      <div>
        <main>
          <div id="map" />
        </main>
        {!this.state.areTilesLoaded && !this.state.fighters.length && (
          <MDSpinner className="spinner" size={100} />
        )}
      </div>
    );
  }
}

export default MapSolo;
