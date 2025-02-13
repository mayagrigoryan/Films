import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getOneFilm } from '../../store/slices/filmsSlice'
import './Film.css'

function Film() {
    const dispatch = useAppDispatch()
    const { language } = useAppSelector((state) => state.globalData)
    const { id } = useParams()
    const navigate = useNavigate()

    const { film } = useAppSelector((state) => state.filmsData)

    useEffect(() => {
        if (id) {
            dispatch(getOneFilm({ id, language }))
        }
    }, [id, language, dispatch])
    const backdropImageUrl = film?.backdrop_path
        ? `https://image.tmdb.org/t/p/w1280${film.backdrop_path}`
        : '';

    const backgroundStyle = backdropImageUrl
        ? { backgroundImage: `url(${backdropImageUrl})` }
        : { backgroundColor: '#A8A8A8' };

    return (
        <div
            className="film-container"
            style={{
                ...backgroundStyle,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%',
                width: '100%',
                padding: '20px',
                color: 'white',
                transition: 'background-image 1s ease-in-out',
                backgroundAttachment: 'fixed',
            }}
        >
            <div
                className="gradient-overlay"
                style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7))',
                    zIndex: -1,
                }}
            />
            {film ? (
                <div className="flex-wrap">
                    <div>
                        <h1 className="film-title">{film.title}</h1>
                        {film.poster_path ? (
                            <img
                            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                            alt={film.title}
                            className="film-img"
                        />
                        ) : null}
                        
                    </div>
                    <div className="film-info">
                        <p><strong>Release Date:</strong> {film.release_date}</p>
                        <p><strong>Status:</strong> {film.status}</p>
                        <p><strong>Tagline:</strong> {film.tagline}</p>
                        <p><strong>Overview:</strong> {film.overview}</p>
                        <p><strong>Genres:</strong> {film.genres?.map(genre => genre.name).join(', ')}</p>
                        <p><strong>Runtime:</strong> {film.runtime} minutes</p>
                        <p><strong>Budget:</strong> ${film.budget.toLocaleString()}</p>
                        <p><strong>Revenue:</strong> ${film.revenue.toLocaleString()}</p>
                        <p><strong>IMDB ID:</strong> <a href={`https://www.imdb.com/title/${film.imdb_id}`} target="_blank" rel="noopener noreferrer" className="film-link">{film.imdb_id}</a></p>
                        <p><strong>Vote Average:</strong> {film.vote_average}</p>
                        <p><strong>Vote Count:</strong> {film.vote_count}</p>
                        <p><strong>Original Language:</strong> {film.original_language}</p>
                        <p><strong>Homepage:</strong> <a href={film.homepage} target="_blank" rel="noopener noreferrer" className="film-link">Visit Homepage</a></p>
                        <p><strong>Spoken Languages:</strong> {film.spoken_languages?.map(language => language.name).join(', ')}</p>
                        <p><strong>Production Countries:</strong> {film.production_countries?.map(country => country.name).join(', ')}</p>
                        <p><strong>Production Companies:</strong> {film.production_companies?.map(company => company.name).join(', ')}</p>
                        <button
                            onClick={() => navigate(-1)}
                            className="go-back-btn"
                            style={{
                                margin: '15px 0',
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                color: 'white',
                                border: 'none',
                                padding: '3px 20px',
                                cursor: 'pointer',
                                borderRadius: '5px',
                            }}
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            ) : (
                <div>Film not found</div>
            )}
        </div>
    )
}

export default Film
