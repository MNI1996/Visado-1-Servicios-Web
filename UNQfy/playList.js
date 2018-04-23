
class PlayList{
    constructor(){
        this.name = "";
        this.duration = 0;
        this.trackList = [];
    }
    
    getName(){
        return this.name;
    }
    
    setName(aName){
        this.name = aName;
    }
    
    duration(){
        return this.duration;
    }
    
    hasTrack(aTrack){
       return this.trackList.includes(aTrack);
    }
}

// TODO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  PlayList, 
};
