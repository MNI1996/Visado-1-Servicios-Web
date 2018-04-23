
class Track{
    constructor(name, duration, genres){
        this.name = name;
        this.duration = duration;
        this.genres = genres;
    }
    getName(){
        return this.name;
    }
    getDuration(){
        return this.duration; 
    }
    getGenres(){
        return this.genres;
    }
    isIncludeForThisGenres(aListOfGenres){
        let it = 0;
        while(it < this.genres.length){
            if(aListOfGenres.includes(this.genres[it])){
                return true;
            }
            it++;
        }
        return false;
    }
    
}

// TODO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  Track, 
};
