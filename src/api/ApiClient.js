
class ApiClient {
    constructor(key, baseUrl, end) {
        this.baseUrl = 'https://api.themoviedb.org/3';
        
    }
    getFullUrl(url) {
        return `${this.baseUrl}${url}${this.end}`;
    }

    getMovie(id){
        return this.get(`/movie/${id}`);
    }

    getGenreList(){
        return this.get(`/genre/movie/list`);
    }

    getTvShow(id){
        return this.get(`/tv/${id}`);
    }

    getTvShowSeason(id, seasonNum){
        return this.get(`/tv/${id}/season/${seasonNum}`);
    }

    getTvShowEpisodes(id, seasonNum, episodeNum){
        return this.get(`/tv/${id}/season/${seasonNum}/episode/${episodeNum}`);
    }

    getTrendingMovies(){
        return this.get(`/trending/movie/week`);
    }
    
    getTrendingTvShows(){
        return this.get(`/trending/tv/week`);
    }
    getDiscoverMovies(){
        return this.get(`/discover/movie`);
    }




    async get(url) {
        const fullUrl = this.getFullUrl(url);
        return await fetch(fullUrl)
        .then(response => response.json())
        .then(data => data.results)
        .catch(e => e.message)
    }
    
    async post(url, data) {
        const fullUrl = this.getFullUrl(url);
        return await fetch(fullUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json());
    }
    
    async put(url, data) {
        const fullUrl = this.getFullUrl(url);
        return await fetch(fullUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json());
    }
    
    async delete(url) {
        const fullUrl = this.getFullUrl(url);
        return await fetch(fullUrl, {
        method: 'DELETE'
        })
        .then(response => response.json());
    }
}
export default ApiClient;