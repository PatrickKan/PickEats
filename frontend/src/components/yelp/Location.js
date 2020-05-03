import React from "react";
import { geolocated } from "react-geolocated";
import axios from "axios";
 
class LocationTracker extends React.Component {
    render() {
        return !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
            <div>{this.updateLocation(this.props.coords.longitude, this.props.coords.latitude)}</div>
        ) : (
            <div>Getting the location data&hellip; </div>
        );
    }

    // Update user location 
    updateLocation(longitude, latitude) {
        const token = localStorage.token;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        const body = {
            latitude: latitude,
            longitude: longitude
        }

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }
        console.log(token);
        axios.patch('/api/user/profile/', body, config).then(function (response) { 
            console.log(response);
        });
    }
}
 
export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    }
})(LocationTracker);