const picklejs = require('picklejs');

class User{
    constructor(name, email){
        this.name = name;
        this.email = email;
        this.siguiendoA = [];
    }

    setName(name){
        this.name = name;
    }

    setEmail(email){
        this.email = email;
    }  

    setSiguiendo(artistas){
        this.siguiendoA = artistas;
    }

    getUserName(){
        return this.name;
    }

    getEMail(){
        return this.email; 
    }

    getSiguiendoA(){
        return this.siguiendoA;
    }

    addArtista(artistId){
        this.siguiendoA.push(artistId);
    }

    removeArtist(artistId){
        this.siguiendoA.filter(id => !(id === artistId));
    }
}
module.exports= {User};