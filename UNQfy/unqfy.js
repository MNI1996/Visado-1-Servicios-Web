/*eslint-disable semi, semi, semi, no-shadow-global, semi, no-shadow-global, no-shadow-global, no-undef, no-undef, no-undef, no-undef, no-undef, semi, semi, unknown-require, no-unused-params, no-unused-params, no-unused-params, no-unused-params*/
const picklejs = require('picklejs');
const artist = require('./artist');
const album = require('./album');
const track = require('./track');
const playList = require('./playList');


class Artist {
    constructor(aName, aCountry) {
        this.name = aName;
        this.country = aCountry;
        this.albums = [];
        this.id = "";
    }

    setId(id){this.id = id}

    getId(){return this.id}

    getName() {
        return this.name;
    }

    getCountry() {
        return this.country;
    }

    collectAllTracks() {
        let res = [];
        let it = 0;
        while (it < this.albums.length) {
            res.push(this.albums[it].getTracks());
            it++;
        }
        return res;
    }
    getAlbums() {
        return this.albums
    }

    addAlbum(aAlbum) {
        this.albums.push(aAlbum);
    }
}

class Album {
    constructor(aName, aYear) {
        this.name = aName;
        this.year = aYear;
        this.trackList = [];
    }

    getName() {
        return this.name;
    }
    getyear() {
        return this.year;
    }

    addTrack(aTrack) {
        this.trackList.push(aTrack);
    }

    getTracks() {
        return this.trackList;
    }
}


class Track {
    constructor(name, duration, genres) {
        this.name = name;
        this.duration = duration;
        this.genres = genres;
    }
    getName() {
        return this.name;
    }
    getDuration() {
        return this.duration;
    }
    getGenres() {
        return this.genres;
    }
    isIncludeForThisGenres(aListOfGenres) {
        let it = 0;
        while (it < this.genres.length) {
            if (aListOfGenres.includes(this.genres[it])) {
                return true;
            }
            it++;
        }
        return false;
    }

}

class PlayList {
    constructor(aName, aDuration, aTrackList) {
        this.name = aName;
        this.duration = aDuration;
        this.trackList = aTrackList;
    }

    getName() {
        return this.name;
    }

    setName(aName) {
        this.name = aName;
    }

    duration() {
        return this.duration;
    }

    addTrack(aTrack) {
        this.trackList.push(aTrack);
    }

    hasTrack(aTrack) {
        return this.trackList.includes(aTrack);
    }
}


class UNQfy {
    constructor() {
        this.artists = [];
        this.albums = [];
        this.tracks = [];
        this.playList = [];
        this.popularity = 0;
        this.title = "";
    }

    setTitle(aName){
        this.title = aName;
    }

    getTitle(){
        return this.title;
    }

    setPopularity(aPopularity){
        this.popularity = aPopularity;
    }

    getPopularity(){
        return this.popularity;
    }

    listTracks() {
        return this.tracks;
    }

    getTracksMatchingGenres(genres) {
        let res = [];
        let it = 0;
        while (it < this.tracks.length) {
            if (this.tracks[it].isIncludeForThisGenres(genres)) {
                res.push(this.tracks[it]);
            }
            it++;
        }
        return res;
    }


    getTracksMatchingArtist(artistName) {
        let res;
        let it = 0;
        while (it < this.artists.length) {
            if (this.artists[it].getName() === artistName) {
                res = this.artists[it];
            }
            it++;
        }
        const ts = (res.collectAllTracks());
        return [].concat.apply([], ts);
    }

    addArtist(params) {
        let aArtist = new Artist(params.name, params.country);
        this.artists.push(aArtist);
    }

    addAlbum(artistName, params) {
        let newAlbum = new Album(params.name, params.year);
        let it = 0;
        while (it < this.artists.length) {
            if (this.artists[it].getName() === artistName) {
                this.artists[it].addAlbum(newAlbum);
            }
            it++;
        }
        this.albums.push(newAlbum);
    }

    addTrack(albumName, params) {
        let it = 0;
        let aTrack = new Track(params.name, params.duration, params.genres);
        while (it < this.albums.length) {
            if (this.albums[it].getName() === albumName) {
                this.albums[it].addTrack(aTrack);
            }
            it++;
        }
        this.tracks.push(aTrack);
    }

    getArtistByName(name) {
        let it = 0;
        while (it < this.artists.length) {
            if (this.artists[it].name === name) {
                return this.artists[it];
            }
            it++;
        }
    }

    getAlbumByName(name) {
        let it = 0;
        while (it < this.albums.length) {
            if (name === this.albums[it].getName()) {
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
        let aPlayList = new PlayList(name, maxDuration - durationAprox, res)
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

    save(filename = 'backup.json') {
        new picklejs.FileSerializer().serialize(filename, this);
    }

    static load(filename = 'backup.json') {
        const fs = new picklejs.FileSerializer();
        const classes = [UNQfy, Artist, Track, Album];
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
            //respose.items.forEach(a => console.log(new Album(a.name, a.release_date)));
            respose.items.forEach(a => artist.albums.push(new Album(a.name, a.release_date)));
            this.save('backup.json');
        }
        ).catch(error => console.log(error));
    }

    getATrackId(trackname){
        const rp = require('request-promise');

        const BASE_URL = 'http://api.musixmatch.com/ws/1.1';
        var options = {
            uri: BASE_URL + '/artist.search',
            qs: {
                apikey: 'c7739e9f257c007f477785b9a135fd0b',
                q_artist: 'Queen',
                },
            json: true // Automatically parses the JSON string in the response
        };
        rp.get(
            options
            ).then((response) => {
            var header = response.message.header;
            var body = response.message.body;

            console.log(body.artist_list[0].artist.artist_id)

            if (header.status_code !== 200){
            console.log('algo salio mal', response);
            return
            }
            var artistNames = body.artist_list.map((artist => artist.artist.artist_name));
            console.log(`Se econtraron ${artistNames.length} artistas`);
            console.log(artistNames);
            
            }).catch((error) => {
            console.log('algo salio mal', error);
            });
    }

    generateURLTrack(artistName){
        const rp = require('request-promise');
        const options = 'https://www.googleapis.com/youtube/v3/search?q='+ artistName +' &key=AIzaSyAbEP3nZoVtZtj4KWM5Bn2HSrIX0XTnVN0&part=id';
        rp.get(options).then((response) => {
            const body = JSON.parse(response).items;
            for(var index in body){
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
            json: true,
        };
        rp.get(options).then((respose) => {console.log(respose);}
        ).catch(error => console.log(error));
    }    

    getAnUndefineArtist(artistname) {
        const rp = require('request-promise');
        const options = {
            url: 'https://api.spotify.com/v1/search?q=' + artistname.name + '&type=artist',
            headers: { Authorization: 'Bearer ' + 'BQAPWBcHj5KG33L-Qo5vjRPq9HYNpzUWuarUCpFr3v1mQAwmMusKJT5F14NPIN0OFnpt0DhuIIk7kTWJjN9BEjrOBiKeCbnbwWXfifecfUiuvoRO9HShdD-nqqB5cDPivZzgvgqpLP3jTjv9dv4Mx-t0saHEgODfNay7CNETQGDxJjpFRA' },
            json: true,
        };
        rp.get(options).then((respose) => {
            artistname.id = (respose.artists.items[0].id); 
            console.log(artistname);
        }).catch(error => console.log(error));
    }
}

// TODO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
    UNQfy, Artist, Track, Album
};

