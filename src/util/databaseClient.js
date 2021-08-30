import PouchDB from 'pouchdb';


class DatabaseClient{
    constructor(dbName){
        //dBName is keywords_maxLat_maxLong_minLat_min_long
        this.db = new PouchDB('dbName');
    }
    putToDatabase(data){
        const placeId = data["place_id"]
        try {
            this.db.get(placeId)
        } catch(err){
            return false, err
        }
        try{
            data["_id"] = placeId
            this.db.put(data)
        }catch(err){
            return false, err
        }
        return true, null
    }
}

export default DatabaseClient