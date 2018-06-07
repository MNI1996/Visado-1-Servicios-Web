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
    }

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
        /* let aArtist = new Artist("","");
         aArtist.name = params.name;
         aArtist.country = params.country;*/
        let aArtist = new Artist(params.name, params.country);
        this.artists.push(aArtist);
    }

    addAlbum(artistName, params) {
        /*let newAlbum = new Album("", 0);
        newAlbum.name = params.name;
        newAlbum.year = params.year;*/
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
        /*let aTrack = new Track();
        aTrack.name = params.name;
        aTrack.duration = params.duration;
        aTrack.genres = params.genres;*/
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
            if (this.artists[it].getName() === name) {
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
        // TODO: Agregar a la lista todas las clases que necesitan ser instanciadas
        const classes = [UNQfy, Artist, Track, Album];
        fs.registerClasses(...classes);
        return fs.load(filename);
    }

    p(artistName) {
        const rp = require('request-promise');
        const options = {
            url: 'https://api.spotify.com/v1/search?q=' + artistName + '&type=artist',
            headers: { Authorization: 'Bearer ' + 'BQBjI6WDMZTLteyCoAs2SnRTXg-PcHULtLX7K5uYWv2wfv5QLvsyiTvV4P0XVvkKHOloeN-MaWIWbDMxoIjRCOMiuX2vbygtkiu5n5FJhRm_fxYOUGkGWirQK6OcvSLiDUc2kcHTYubKtXgj8bOTWdjln5MnHwlT9zptpkjvwDK-qytnug' },
            json: true,
        };
        rp.get(options).then((respose) => {
            console.log('en el then');
            console.log(respose);
            console.log(respose.artists.items.forEach(element => {
                console.log(element);

            }
            )



            );
        }
        ).catch(error => console.log('en el catch',error) );
    }
}

// TODO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
    UNQfy, Artist, Track, Album
};

