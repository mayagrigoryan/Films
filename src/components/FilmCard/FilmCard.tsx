import { NavLink } from 'react-router-dom'
import { FilmsType } from '../../types'
import './FilmCard.css'

export const imgUrl = 'https://image.tmdb.org/t/p/w500/'

type FilmCardPropsType = {
    film: FilmsType
}
function FilmCard({ film }: FilmCardPropsType) {
    return (
        <NavLink to={`/film/${film.id}`} className='film-card'>
            <img src={imgUrl + film.poster_path} alt="" />
            <div className='film-card-info'>
                <h3>{film.title}</h3>
                <p>{film.overview}</p>
                <div className="rating">{(film.vote_average).toFixed(1)}</div>
            </div>
        </NavLink>
    )
}

export default FilmCard