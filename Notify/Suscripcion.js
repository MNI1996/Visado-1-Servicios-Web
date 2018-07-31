const picklejs = require('picklejs');
const user = require('./User');

class Suscripcion {
    constructor(){
        this.users = [];
    }

    responde(){
        console.log('RESPONDE ALGO'); 
        return 0;
    }
    
    getUsers(){
        return this.users;
    }

    getEmailsThatFollows(artistId){
        return this.users.filter(user => user.getSiguiendoA().includes(artistId));
    }
}
module.exports = {Suscripcion};