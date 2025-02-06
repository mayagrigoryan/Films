import axios from 'axios'
import { GenresType } from '../types'

const apiKey = "f36f23edf6e10fd2ddcf939916b1f67a"

const instance = axios.create({
    baseURL : 'https://api.themoviedb.org/3/'
})

type GenresResponseType = {
    genres: Array<GenresType>
}

export const FilmsAPI = {
    getGenres(){
        return instance.get<GenresResponseType>(`genre/movie/list?api_key=${apiKey}&language=en-US`)
    }
}