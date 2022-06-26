class filmDto {
    constructor() {
        this.id = undefined;
        this.poster = undefined;
        this.title = undefined;
        this.duration = undefined;
        this.ageRation = undefined;
        this.userRating = undefined;
        this.description = undefined;
        this.videoLink = undefined;
        this.preview = undefined;
        this.genrers = undefined
    }
    setId(id){
        this.Id = id
        return this
    }
    setPoster(poster){
        this.poster = poster
        return this
    }
    setTitle(title){
        this.title = title
        return this
    }
    setDuration(duration){
        this.duration = duration
        return this
    }
    setUserRating(userRating){
        this.userRating = userRating
        return this
    }
    setAgeRation(ageRation){
        this.ageRation = ageRation
        return this
    }
    setDescriptions(description){
        this.description = description
        return this
    }
    setVideoLink(videoLink){
        this.videoLink = videoLink
        return this
    }
    setReview(preview){
        this.preview = preview
        return this
    }
    setGenrers(genrers){
        this.genrers = genrers
        return this
    }
}

module.exports = filmDto;
