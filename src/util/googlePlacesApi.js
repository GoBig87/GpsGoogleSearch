import axios from 'axios';
import DatabaseClient from "./databaseClient";


var lon = 1
var lat = 1

class GooglePlacesApi{
    constructor(apiKey) {
        this.apiKey = apiKey
        this.dbcl = ""
    }
    dataBaseNameBuilder(pointsArray, radius, keywords, type=""){
        const maxLat = pointsArray[pointsArray.length - 1][1]
        const maxLon = pointsArray[pointsArray.length - 1][0]
        const minLat = pointsArray[0][1]
        const minLon = pointsArray[0][0]
        const _keywords = keywords.replace(/ /g, "+")
        let _type = ""
        if(type != ""){
            _type = `_${type}`
        }
        return `${_keywords}${_type}_${maxLat}_${minLat}_${maxLon}_${minLon}_${radius}`
    }
    urlBuilder(point, radius, keywords, type=""){
        const _keywords = `&keyword=${keywords.replace(/ /g, "+")}`;
        let _type = "";
        if(type != ""){
            _type = `&type=${type}`
        }
        const _lat = point[lat];
        const _lon = point[lon];
        return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${_lat},${_lon}&radius=${radius}${_type}${_keywords}&key=${this.apiKey}`
    }
    urlNextPageBuilder(token){
        return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${token}&key=${this.apiKey}`
    }
    async getPlaces(point, radius, keywords, type=""){
        const url = this.urlBuilder(point, radius, keywords, type);
        const data = await axios.get(url);
        return data
    }
    async getNextPage(token){
        const url = this.urlNextPageBuilder(token)
        const data = await axios.get(url);
        return data
    }
    checkErrors(data){
        if("status" in data){
            if(data["status"] != "OK"){
                return data["status"]
            }
            return "OK"
        }
        return "Unkown Error"
    }
    addToDatabase(result){
        //TODO LINK DATABASE
    }
    verifyData(data){
        if("result" in data){
            const results = data["results"]
            for(const result of results){
                if("place_id" in result){
                    var success, err = this.dbcl.putToDatabase(result)
                }
            }
        }
        if("next_page_token" in data){
            return data["next_page_token"]
        }
        return ""
    }
    gatherDataFromArray(pointsArray, radius, keywords, type=""){
        let nextPageToken = "temp"
        let error = "OK"
        for(const point of pointsArray) {
            let data = this.getPlaces(point, radius, keywords, type)
            error = this.checkErrors(data)
            if(error != "OK"){return error}
            do {
                nextPageToken = this.verifyData(data)
                if(nextPageToken != ""){
                    data = this.getNextPage()
                    error = this.checkErrors(data)
                    if(error != "OK"){return error}
                    nextPageToken = this.verifyData(data)
                }
            }while(nextPageToken != "")
        }
    }
    startSearch(pointsArray, radius, keywords, type=""){
        const dbName = this.dataBaseNameBuilder(pointsArray, radius, keywords, type)
        this.dbcl = DatabaseClient(dbName)
        this.gatherDataFromArray(pointsArray, radius, keywords, type)
    }
}

export default GooglePlacesApi