
class Notificacion{
    constructor()

    verificarElArtistId(artistId){
        const rp = require('request-promise');
        const base_url = 'http://'+'172.20.0.21'+':'+'5000'+'/api/artists/findById='+ artistId;
        rp.get(base_url)
        .then(response => {return true})
        .catch(err => {return false});
    }

    
}

module.exports = {Notificacion};