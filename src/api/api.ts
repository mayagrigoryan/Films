import axios from 'axios'
import { GenresType, FilmsType } from '../types'

type GET_FILMS_TYPE = {
    total_pages: number,
    total_results: number,
    page: number,
    results: Array<FilmsType>
}

const instance = axios.create({
    baseURL : 'https://api.themoviedb.org/3/'
})

type GenresResponseType = {
    genres: Array<GenresType>
}

export const FilmsAPI = {
    getGenres(language : string){
        return instance.get<GenresResponseType>(`genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&language=${language}`)
    },
    getFilms(pageCount: number, language: string, genreId?: number) {
        const url = `discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=${language}&page=${pageCount}`;

        const finalUrl = genreId ? `${url}&with_genres=${genreId}` : url;

        return instance.get<GET_FILMS_TYPE>(finalUrl);
    },
    getOneFilm(id : any, language : string){
        return instance.get(`/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=${language}`)
    },
    searchFilms(query: string, language: string) {
        const url = `search/movie?api_key=${import.meta.env.VITE_API_KEY}&language=${language}&query=${query}`;
        return instance.get<GET_FILMS_TYPE>(url);
    }
}