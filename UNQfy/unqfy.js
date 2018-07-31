
const picklejs = require('picklejs');
const Artist = require('./artist').Artist;
const Album = require('./album').Album;
const Track = require('./track').Track;
const playList = require('./playlist').Playlist;

class UNQfy {
  constructor(){
    this.title = '';
    this.popularity = 0;
    this.artists = [];
    this.albums = [];
    this.tracks = []; 
  }

  setTitle(title){
    this.title = title;
  }

  getTitle(){
    return this.title;
  }

  setPopularity(popularity){
    this.popularity = popularity;
  }

  getPopularity(){
    return this.popularity;
  }

  listTracks(){
    return this.tracks;
  }

  getTracksMatchingGenres(genres) {
    let res = [];
    let it = 0;
    while(it < this.tracks.length){
      if(this.tracks[it].isIncludeInGenres(genres)){
        res.push(this.tracks[it]);
      }
      it++;
    }
    return res;
  }

  getTracksMatchingArtist(artistName) {
    let res;
    let it;
    while(it < this.artists.length){
      if(this.artists[it].getName() === artistName){
        res = this.artists[it];
      }
      it++;
    }
    const ts = res.collectAllTracks();
    return [].concat.apply([], ts);
  }

  addArtist(params) {
    const artist = new Artist(params.name, params.country);
    this.artists.push(artist);
  }

  addAlbum(artistName, params) {
    const album = new Album(params.name, params.year);
    let it = 0;
    while(it < this.artists.length){
      if(this.artists[it].getName() === artistName){
        this.artists[it].addAlbum(album);
      }
      it++;
    }
    this.albums.push(album);
  }

  addTrack(albumName, params) {
    let it =0;
    const track = new Track(params.name, params.duration, params.genres);
    while(it < this.albums.length){
      if(this.albums[it].getName() === albumName){
        this.albums[it].addTrack(track);
      }
      it++;
    }
    this.tracks.push(track);
  }

  getArtistByName(name) {
    let it=0;
    while(it < this.artists.length){
      if(this.artists[it].getName() === name){
        return this.artists[it];
      }
      it++;
    }
  }

  getAlbumByName(name) {
    let it =0;
    while(it<this.albums.length){
      if(this.albums[it].getName() === name){
        return this.albums[it];
      }
      it++;
    }
    return [];
  }

  getTrackByName(name) {
    let it = 0;
    while (it < this.tracks.length) {
      if (this.tracks[it].getName() === name) {
        return this.tracks[it];
      }
      it++;
    }
    return [];
  }

  getPlaylistByName(name) {
    let it = 0;
    while (it < this.playList.length) {
      if (this.playList[it].getName() === name) {
        return this.playList[it];
      }
      it++;
    }
    return [];
  }

  addPlaylist(name, genresToInclude, maxDuration) {
    let res = [];//la lista de canciones que cumple con la duracion
    let tracksList = this.getTracksMatchingGenres(genresToInclude);//consigo todos los temas del genero
    let durationAprox = maxDuration;//me cacheo la duracion que deberia tener la playlist
    it = 0;
    while (it < tracksList.length) {//recorro todos los tracks del genero
      if (tracksList[it].getDuration() <= durationAprox) {
        res.push(tracksList[it]);
        durationAprox = durationAprox - tracksList[it].getDuration();
      }
      it++;
    }
    const aPlayList = new PlayList(name, maxDuration - durationAprox, res);
    this.playList.push(aPlayList);
  }

  removeArtist(artistName) {
    let res = []
    let it = 0;
    while (it <= this.artists.length) {
      if (!(this.artists[it] === artistName)) {
        res.push(this.artists[it]);
      }
      it = it + 1;
    }
    this.artists = res;
  }

  getAlbumsForArtist(artistName) {
    const a = this.getArtistByName(artistName);
    return a.getAlbums();
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

  populateAlbumsForArtist(artist){
    const rp = require('request-promise');
    const options = {
      url: 'https://api.spotify.com/v1/artists/'+ artist.id +'/albums',
      headers: { Authorization: 'Bearer ' + 'BQBA7aTvfVDOv3A0K260ukruqityV3kk7e50FWSTEsISH9lR_mg-sMd5bafeF0YVqu0o5cqnqNaQozBXlt03Y3HNx-QGuugUKtVec5rQlZN1F7o0evGtEm4VoXxwFtllP7kDu8d3OVvB6ftbvSprQVus1fnFcJZcgYKLHA9UHEFjx38HSg' },
      json: true,
    };
    rp.get(options).then((respose) => {
      respose.items.forEach(a => artist.albums.push(new Album(a.name, a.release_date)));
      this.save('backup.json');
    }).catch(error => console.log(error));
  }

  getATrackId(trackname){
    const rp = require('request-promise');
    const BASE_URL = 'http://api.musixmatch.com/ws/1.1';
    let options = {
      uri: BASE_URL + '/artist.search',
      qs: {
        apikey: 'c7739e9f257c007f477785b9a135fd0b',
        q_artist: 'Queen',
      },json: true};
    rp.get(options).then((response) => {
      const header = response.message.header;
      const body = response.message.body;
      console.log(body.artist_list[0].artist.artist_id)
      if (header.status_code !== 200){
        console.log('algo salio mal', response);
        return;
      }
      let artistNames = body.artist_list.map((artist => artist.artist.artist_name));
      console.log(`Se econtraron ${artistNames.length} artistas`);
      console.log(artistNames);
    }).catch((error) => {
      console.log('algo salio mal', error);});
  }

  generateURLTrack(artistName){
    const rp = require('request-promise');
    const options = 'https://www.googleapis.com/youtube/v3/search?q='+ artistName +' &key=AIzaSyAbEP3nZoVtZtj4KWM5Bn2HSrIX0XTnVN0&part=id';
    rp.get(options).then((response) => {
      const body = JSON.parse(response).items;
      for(let index in body){
        if(body[index].id.kind === 'youtube#video'){
          console.log('https://www.youtube.com/watch?v='+body[index].id.videoId);
        }
      }
    })
  }

  getATrackLyrics(track_id){
    const rp = require('request-promise');
    const options = {
      url: 'http://track.lyrics.get?track_id=' + track_id,
      headers: { Authorization: 'Bearer ' + '' },
      json: true};
    rp.get(options).then((respose) => {console.log(respose);}).catch(error => console.log(error));
  }    

  getAnUndefineArtist(artistname) {
    const rp = require('request-promise');
    const options = {
      url: 'https://api.spotify.com/v1/search?q=' + artistname.name + '&type=artist',
      headers: { Authorization: 'Bearer ' + 'BQAPWBcHj5KG33L-Qo5vjRPq9HYNpzUWuarUCpFr3v1mQAwmMusKJT5F14NPIN0OFnpt0DhuIIk7kTWJjN9BEjrOBiKeCbnbwWXfifecfUiuvoRO9HShdD-nqqB5cDPivZzgvgqpLP3jTjv9dv4Mx-t0saHEgODfNay7CNETQGDxJjpFRA' },
      json: true
    };
    rp.get(options).then((respose) => {
      artistname.id = (respose.artists.items[0].id); 
      console.log(artistname);
    }).catch(error => console.log(error));
  }

}

// TODO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
};

