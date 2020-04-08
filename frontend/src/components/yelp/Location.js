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
            <table>
                <tbody>
                    <tr>
                        <td>latitude</td>
                        <td>{this.props.coords.latitude}</td>
                    </tr>
                    <tr>
                        <td>longitude</td>
                        <td>{this.props.coords.longitude}</td>
                    </tr>
                    <tr>
                        <td>updated</td>
                        <td>{this.updateLocation(this.props.coords.longitude, this.props.coords.latitude)}</td>
                    </tr>
                </tbody>
            </table>
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