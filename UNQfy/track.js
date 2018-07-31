class Track{
    constructor(name, duration, genres){
        this.name = name;
        this.duration = duration;
        this.genres = genres;
    }

    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }

    getDuration(){
        return this.duration;
    }

    setDuration(duration){
        this.duration = duration;
    }

    getGenres(){
        return this.genres;
    }

    setGenres(genres){
        this.genres = genres;
    }

    isIncludeInGenres(lsGenres){
        let it = 0;
        while(it < this.genres.length){
            if(lsGenres.includes(this.genres[it])){
                return true;
            }
            it++;
        }
        return false;
    }
}
module.exports = {Track};