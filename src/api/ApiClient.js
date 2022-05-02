
class ApiClient {

    constructor(key, baseUrl, end) {
        this.baseUrl = 'https://api.themoviedb.org/3';
        this.end = `?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    }
    //appends the base url, api key, language, and request to the url
    getFullUrl(url) {
        return `${this.baseUrl}${url}${this.end}`;
    }
    //gets the movie details
    getMovie(id){
        return this.get(`/movie/${id}`);
    }
    //gets the genre list of movies
    getGenreList(){
        return this.get(`/genre/movie/list`);
    }
    //gets the tv show details
    getTvShow(id){
        return this.get(`/tv/${id}`);
    }
    //gets the tv shows seasons
    getTvShowSeason(id, seasonNum){
        return this.get(`/tv/${id}/season/${seasonNum}`);
    }
    //gets the tv shows epidodes of a season
    getTvShowEpisodes(id, seasonNum, episodeNum){
        return this.get(`/tv/${id}/season/${seasonNum}/episode/${episodeNum}`);
    }
    //gets trending movies
    getTrendingMovies(){
        return this.get(`/trending/movie/week`);
    }
    //gets trending tv shows
    getTrendingTvShows(){
        return this.get(`/trending/tv/week`);
    }
    //gets the discover movies
    getDiscoverMovies(){
        return this.get(`/discover/movie`);
    }
    //makes get request to certain url using the movie db api
    async get(url) {
        const fullUrl = this.getFullUrl(url);
        return await fetch(fullUrl)
        .then(response => response.json())
        .then(data => data.results)
        .catch(e => e.message)
    }
    
    
}
export default ApiClient;