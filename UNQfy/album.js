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


// TODO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  Album
};
