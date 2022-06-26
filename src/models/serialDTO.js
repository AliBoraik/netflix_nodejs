class serialDTO {
  constructor() {
    this.id = undefined;
    this.poster = undefined;
    this.title = undefined;
    this.numEpisodes = undefined;
    this.ageRation = undefined;
    this.userRating = undefined;
    this.description = undefined;
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
  setNumEpisodes(numEpisodes){
    this.numEpisodes = numEpisodes
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
  setGenrers(genrers){
    this.genrers = genrers
    return this
  }
}

module.exports = serialDTO;
