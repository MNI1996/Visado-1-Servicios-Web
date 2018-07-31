class Artist{
    constructor(name, country){
        this.name = name;
        this.country = country;
        this.albums = [];
    }

    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }

    getCountry(){
        return this.country;
    }

    setCountry(country){
        this.country = country;
    }

    getAlbums(){
        return this.albums;
    }

    setAlbums(albums){
        this.albums = albums;
    }

    addAlbum(album){
        this.albums.push(album);
    }

    collectAllTracks(){
        let res = [];
        let it = 0;
        while(it < this.albums.length){
            res.push(this.albums[it].getTracks());
            it;
        }
        return res;
    }
}
module.exports = {Artist};