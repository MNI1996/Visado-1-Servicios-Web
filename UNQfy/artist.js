
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


// TODO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = Artist;
