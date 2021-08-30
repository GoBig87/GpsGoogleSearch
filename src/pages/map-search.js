import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import DrawControl from 'react-mapbox-gl-draw';
import UserLocation from "../assets/images/UserLocation.svg";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "./map-search.css";

import SearchBar from "../components/searchBar";
import SearchOptionMenu from "../components/searchOptions";


const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiaW5ib2R5NSIsImEiOiJja2hzM2x2aGgwcGxoMndtYzJjanpzcWdpIn0.ZtYmfrqQ6MksSghUfvCq9Q',
});


class MapSearch extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            lng: -117.2363,
            lat: 32.7764,
            zoom: 6,
            userLon: -117.2363,
            userLat: 32.7764,
            searchTerm: "",
            startSearch: this.startSearch
        }
        this.polygonArray = []
    }
    setUserLocation = (position) => {
        this.setState({
            userLat: position.coords.latitude,
            userLon: position.coords.longitude,
            lng: position.coords.longitude,
            lat: position.coords.latitude
        })
    };
    centerOnLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(this.setUserLocation)
        } else {
            console.log("Not Available");
        }
    };
    updateArea = ({ features }) => {
        for(const feature of features){
            var coordinates = feature.geometry.coordinates
            this.polygonArray.push(coordinates)
        }
    };
    startSearch = (searchTerm) => {
        this.state.searchTerm = searchTerm
        if(this.polygonArray.length == 0){
            //throw alert
        }else if(searchTerm == ""){
            //throw alert
        }else{

        }

    }
    render() {
        return(
            <div>
                <Map
                    style="mapbox://styles/mapbox/streets-v11" // eslint-disable-line
                    containerStyle={styles.mapDiv}
                        center={[this.state.lng, this.state.lat]}
                        zoom={[this.state.zoom]}
                >
                    <DrawControl
                        displayControlsDefault={true}
                        position={"bottom-right"}
                        controls={{
                            polygon: true,
                            trash: true,
                            point: false,
                            line_string: false,
                            combine_features: false,
                            uncombine_features: false
                        }}
                        onDrawCreate={this.updateArea}
                        onDrawDelete={this.updateArea}
                        onDrawUpdate={this.updateArea} />
                </Map>
                    <SearchBar
                        searchTerm={this.state.searchTerm}
                        startSearch={this.state.startSearch}/>
                    {/*<SearchOptionMenu/>*/}
            </div>
        );
    }
}

export default MapSearch;


let styles = {
    mapDiv: {
        position: 'fixed',
        backgroundColor: 'black',
        top: 0,
        left: 0,
        objectFit: 'cover',
        height: '100vh',
        width: '100vw'
    },
}