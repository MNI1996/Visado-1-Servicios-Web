class Playlist{
    constructor(){
        this.name = '';
        this.duraation = 0;
        this.tracklist = [];
    }

    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }

    getDuration(){
        return this.duraation;
    }
    setDuration(duration){
        this.duraation = duration;
    }
    getTracklist(){
        return this.tracklist;
    }
    setTracklist(tracklist){
        this.tracklist = tracklist;
    }
}
module.exports = {Playlist};