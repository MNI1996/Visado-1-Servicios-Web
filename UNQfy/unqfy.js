/*eslint-disable semi, semi, semi, no-shadow-global, semi, no-shadow-global, no-shadow-global, no-undef, no-undef, no-undef, no-undef, no-undef, semi, semi, unknown-require, no-unused-params, no-unused-params, no-unused-params, no-unused-params*/
const picklejs = require('picklejs');

class Artist{
    constructor(aName, aCountry){
        this.name = aName;
        this.country = aCountry;
        this.albums = [];
    }
    
    getName(){
        return this.name;
    }
    
    getCountry(){
        return this.country;
    }

    collectAllTracks(){
        let res = [];
        let it = 0;
        while (it < this.albums.length){
            res.push(this.albums[it].getTracks());
            it++;
        }
        return res;
    }
    
    addAlbum(aAlbum){
        this.albums.push(aAlbum);
    }
}


class Album{
    constructor(aName, aYear){
        this.name = aName;
        this.year = aYear;
        this.trackList = [];
    }
    
    getName(){
        return this.name;
    }
    getyear(){
        return this.year;
    }
    
    addTrack(aTrack){
        this.trackList.push(aTrack);
    }
    
    getTracks(){
        return this.trackList;
    }
}


class Track{
    constructor(){
        this.name = "";
        this.duration = 0;
        this.genres = [];
    }
    getName(){
        return this.name;
    }
    getDuration(){
        return this.duration; 
    }
    getGenres(){
        return this.genres;
    }
    isIncludeForThisGenres(aListOfGenres){
        let it = 0;
        while(it < this.genres.length){
            if(aListOfGenres.includes(this.genres[it])){
                return true;
            }
            it++;
        }
        return false;
    }
    
}

class PlayList{
    constructor(){
        this.name = "";
        this.duration = 0;
        this.trackList = [];
    }
    
    getName(){
        return this.name;
    }
    
    duration(){
        return this.duration;
    }
    
    hasTrack(aTrack){
       return this.trackList.includes(aTrack);
    }
}
class UNQfy {
    constructor(){
        this.artists = [];
        this.albums = [];
        this.tracks = [];
        this.playList = [];
    }

  getTracksMatchingGenres(genres) {
    let res = [];
    let it = 0;
    while(it < this.tracks.length){
        if(this.tracks[it].isIncludeForThisGenres(genres)){
            res.push(this.tracks[it]);
        }
        it++;
    }
    return res;
  }


  getTracksMatchingArtist(artistName) {
   let res;
   let it =0;
   let aName = artistName.getName()
   while(it < this.artists.length){
       if(this.artists[it].getName() === aName){
           res = this.artists[it];
       }
       it++;
    }
    return [].concat.apply([], res.collectAllTracks());
  }

  addArtist(params) {
    let aArtist = new Artist("","");
    aArtist.name = params.name;
    aArtist.country = params.country;
    this.artists.push(aArtist);
  }

  addAlbum(artistName, params) {
    let newAlbum = new Album("", 0);
    newAlbum.name = params.name;
    newAlbum.year = params.year;    
    let it = 0;
    while(it < this.artists.length){
        if(this.artists[it].getName() === artistName){
            this.artists[it].addAlbum(newAlbum);
        }
        it++;
    }
    this.albums.push(newAlbum);
   }

  addTrack(albumName, params) {
    let it = 0;
    let aTrack = new Track();
    aTrack.name = params.name;
    aTrack.duration = params.duration;
    aTrack.genres = params.genres;
    while(it < this.albums.length){
        if(this.albums[it].getName() === albumName){
            this.albums[it].addTrack(aTrack);
        }
        it++;
    }
    this.tracks.push(aTrack);
  }

  getArtistByName(name) {
    let it = 0;
    while(it < this.artists.length){
        if (this.artists[it].getName() === name){
            return this.artists[it];
        }
        it ++;
    }
  }

  getAlbumByName(name) {
    let it = 0;
    while(it < this.albums.length){
        if(name === this.albums[it].getName()){
            return this.albums[it];
        }
        it++;
    }
  }

  getTrackByName(name) {
    let it = 0;
    while(it < this.tracks.length){
        if(this.tracks[it].getName() === name){
            return this.tracks[it];
        }
        it++;
    }
  }

  getPlaylistByName(name) {
    let res;
    let it = 0;
    while(it < this.playList.length){
        if (this.playList[it].getName() === name){
            res = this.playList[it];
        }
        it++;
    }
    return res;
  }

  addPlaylist(name, genresToInclude, maxDuration) {
    let aPlayList = new PlayList();
    aPlayList.name = name;
    aPlayList.duration = maxDuration;
    aPlayList.trackList = this.getTracksMatchingGenres(genresToInclude);
    this.playList.push(aPlayList);
  }

  save(filename = 'unqfy.json') {
    new picklejs.FileSerializer().serialize(filename, this);
  }

  static load(filename = 'unqfy.json') {
    const fs = new picklejs.FileSerializer();
    // TODO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy];
    fs.registerClasses(...classes);
    return fs.load(filename);
  }
}

// TODO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
};

