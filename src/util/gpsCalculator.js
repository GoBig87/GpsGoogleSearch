

var lon = 0
var lat = 1

class GpsCalculator{
    constructor() {
        this.pointsLatArray = []
        this.pointsLonArray = []
        this.boundedPoints = []
        this.maxLatPoint = -9999
        this.minLatPoint = 99999
        this.maxLonPoint = -9999
        this.minLonPoint = 9999
        this.searchRadius = 0
        this.searchIncrement = 0
    }

    setSearchIncrement(radius){
        this.searchRadius = radius
        var searchIncrementMeters = Math.sqrt(2) * radius
        var metersPerGpsUnit = 111000
        this.searchIncrement = searchIncrementMeters/metersPerGpsUnit
        return this.searchIncrement
    }

    buildSearchBounds(polygonArray){
        for(const point of polygonArray){
            if(point[lat] > this.maxLatPoint){
                this.maxLatPoint = point[lat]
            }if(point[lat] < this.minLatPoint){
                this.minLatPoint = point[lat]
            }if(point[lon] > this.maxLonPoint){
                this.maxLonPoint = point[lat]
            }if(point[lon] < this.minLonPoint){
                this.minLonPoint = point[lon]
            }
        }
    }
    buildSearchArray(radius, polygonArray){
        var sides = polygonArray.size - 1
        this.searchIncrement = this.setSearchIncrement(radius)
        this.buildSearchBounds(polygonArray)
        var tempLat = this.minLatPoint
        var tempLon = this.minLonPoint
        do{
            tempLat = tempLat + this.searchIncrement
            this.pointsLatArray.put(tempLat)
        }while (tempLat < this.maxLatPoint);
        do{
            tempLon = tempLon + this.searchIncrement
            this.pointsLonArray.put(tempLon)
        }while (tempLon < this.maxLonPoint);
        for(const latPoint of this.pointsLatArray){
            for(const lonPoint of this.pointsLonArray){
                //Check if points are inside the polygon
                if(this.isInside(polygonArray, sides, [lonPoint, latPoint])){
                    this.boundedPoints.put([lonPoint, latPoint])
                }
            }
        }
    }

    // code below is used to find if a point is inside a polygon
    onSegment(coord1, coord2, coord3) {
        if(coord2[lon] <= Math.max(coord2[lon], coord3[lon]) &&
            coord2[lon] >= Math.min(coord1[lon], coord3[lat]) &&
            coord2[lat] <= Math.max(coord1[lat], coord3[lat]) &&
            coord2[lat] >= Math.min(coord1[lat], coord3[lat])){
            return true;
        }
        return false;
    }
    orientation(coord1, coord2, coord3) {
        var lon = 0
        var lat = 1
        let val = (coord2[lat] - coord1[lat]) * (coord3[lon] - coord2[lon]) - (coord2[lon] - coord1[lon]) * (coord3[lat] - coord2[lat]);

        if (val == 0) {
            return 0; // colinear
        }
        return (val > 0) ? 1 : 2; // clock or counterclock wise
    }
    doIntersect(coord11, coord12, coord21, coord22){
        let orientation1 = this.orientation(coord11, coord12, coord21);
        let orientation2 = this.orientation(coord11, coord12, coord22);
        let orientation3 = this.orientation(coord21, coord22, coord11);
        let orientation4 = this.orientation(coord21, coord22, coord12);
        if(orientation1 != orientation2 && orientation3 != orientation4) {
            return true;
        }
        if(orientation1 == 0 && this.onSegment(coord11, coord21, coord12)) {
            return true;
        }
        if(orientation2 == 0 && this.onSegment(coord11, coord22, coord12))
        {
            return true;
        }
        if(orientation3 == 0 && this.onSegment(coord21, coord11, coord22)){
            return true;
        }
        if(orientation4 == 0 && this.onSegment(coord21, coord12, coord22)){
            return true;
        }
        return false;
    }
    isInside(polygon, sides, point) {
        if (sides < 3) {
            return false;
        }
        let extreme = [10000000, point[lat]];
        let count = 0, i = 0;
        do {
            let next = (i + 1) % sides;
            if (this.doIntersect(polygon[i], polygon[next], point, extreme)) {
                if (this.orientation(polygon[i], point, polygon[next]) == 0) {
                    return this.onSegment(polygon[i], point, polygon[next]);
                }
                count++;
            }
            i = next;
        }while (i != 0);
        return (count % 2 == 1);
    }
}

export default GpsCalculator