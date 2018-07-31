class Album{
    constructor(name, year){
        this.name = name;
        this.year = year;
        this.tracklist = [];
    }

    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }

    getYear(){
        return this.year;
    }

    setYear(year){
        this.year = year;
    }

    getTracks(){
        return this.tracklist;
    }

    setTracks(tracklist){
        this.tracklist = tracklist;
    }

    addTrack(track){
        this.tracklist.push(track);
    }
}
module.exports = {Album};