import { useEffect, useState } from "react";
import './Header.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getGenres } from "../../store/slices/genresSlice";
import BTN from "../UI/BTN";
import { changeLanguage } from "../../store/slices/globalSlice";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { getFilms, changePage, setSearchResults } from "../../store/slices/filmsSlice";
import { FilmsAPI } from "../../api/api";

const Header = () => {
    const dispatch = useAppDispatch();
    const { genres } = useAppSelector((state) => state.genresData);
    const { language } = useAppSelector((state) => state.globalData);
    const { search_results } = useAppSelector((state) => state.filmsData);
    const navigate = useNavigate();
    const location = useLocation();

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        dispatch(getGenres(language));
    }, [language, dispatch]);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = e.target.value;

        const params = new URLSearchParams(location.search);
        const currentPage = params.get('page') || '1';
        const currentPageNumber = parseInt(currentPage, 10);

        dispatch(changeLanguage(newLanguage));
        dispatch(changePage(currentPageNumber));

        navigate(`/?page=${currentPage}&language=${newLanguage}`);

        dispatch(getFilms({ page: parseInt(currentPage, 10), language: newLanguage }));
    };

    const handleLogoClick = () => {
        dispatch(changePage(1));

        dispatch(getFilms({ page: 1, language }));

        navigate(`/?page=1&language=${language}`);
    };

    const handleGenreClick = (genreId: number) => {
        dispatch(changePage(1));
        navigate(`/?page=1&genre=${genreId}&language=${language}`);

        dispatch(getFilms({ page: 1, language, genreId }));
    };

    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 2) {
            try {
                const response = await FilmsAPI.searchFilms(query, language);
                dispatch(setSearchResults(response.data.results));
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        } else {
            dispatch(setSearchResults([]));
            dispatch(getFilms({ page: 1, language }));
        }
    };

    const handleFilmClick = () => {
        dispatch(setSearchResults([]));
    };

    return (
        <header>
            <div className="logo" onClick={handleLogoClick}>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/015/082/037/small_2x/movie-clapper-board-png.png" alt="Logo" />
            </div>
            <nav>
                {genres.map((genre) => (
                    <BTN key={genre.id} genre={genre} onClick={handleGenreClick} />
                ))}
            </nav>
            <div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search films..."
                />
                <select value={language} onChange={handleLanguageChange}>
                    <option value="en-US">EN</option>
                    <option value="ru-RU">RU</option>
                </select>
            </div>
            {searchQuery && search_results.length > 0 && (
                <div className="search-results">
                    <ul className="search-list">
                        {search_results.map((film) => (
                            <NavLink to={`/film/${film.id}`} key={film.id} onClick={handleFilmClick}>
                                <li className="search-item">
                                    <h3>{film.title}</h3>
                                    <p>{film.release_date}</p>
                                    {film.poster_path ? (
                                        <img src={`https://image.tmdb.org/t/p/w200${film.poster_path}`} alt={film.title} />
                                    ) : null}
                                </li>
                            </NavLink>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
