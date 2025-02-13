import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { changePage, getFilms } from "../store/slices/filmsSlice";
import { useSearchParams } from "react-router-dom";
import './index.css';
import FilmCard from "../components/FilmCard/FilmCard";
import { Language } from "../types";

const translations: Record<Language, {
  previous: string;
  next: string;
  pageInfo: string;
}> = {
  'en-US': {
    previous: 'Previous',
    next: 'Next',
    pageInfo: 'Page {page} of {total_pages}',
  },
  'ru-RU': {
    previous: 'Предыдущая',
    next: 'Следующая',
    pageInfo: 'Страница {page} из {total_pages}',
  },
};

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.globalData);
  const { results, page, total_pages } = useAppSelector((state) => state.filmsData);

  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const genreFromUrl = searchParams.get('genre');
  const languageFromUrl = (searchParams.get('language') as Language) || language;

  const loadFilms = (page: number, language: Language, genreId?: string) => {
    setIsLoading(true);
    const obj: { page: number; language: Language; genreId?: string } = { page, language };
    if (genreId) obj.genreId = genreId;
    dispatch(getFilms(obj)).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadFilms(pageFromUrl, languageFromUrl, genreFromUrl ?? undefined);
  }, [pageFromUrl, languageFromUrl, genreFromUrl]);

  const handleNextPage = () => {
    if (page < total_pages) {
      dispatch(changePage(page + 1));
      setSearchParams({ page: String(page + 1), language, genre: genreFromUrl || '' });
      loadFilms(page + 1, language as Language, genreFromUrl ?? undefined);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      dispatch(changePage(page - 1));
      setSearchParams({ page: String(page - 1), language, genre: genreFromUrl || '' });
      loadFilms(page - 1, language as Language, genreFromUrl ?? undefined);
    }
  };

  const pageInfo = translations[language as Language].pageInfo
    .replace('{page}', String(page))
    .replace('{total_pages}', String(total_pages));

  return (
    <div className="home">
      <div className="films-block">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          results.map((film) => {
            return <FilmCard key={film.id} film={film} />;
          })
        )}
      </div>
      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="pagination-btn"
        >
          {translations[language as Language]?.previous || 'Previous'}
        </button>
        <span>{pageInfo}</span>
        <button
          onClick={handleNextPage}
          disabled={page === total_pages}
          className="pagination-btn"
        >
          {translations[language as Language]?.next || 'Next'}
        </button>
      </div>
    </div>
  );
}

export default Home;
