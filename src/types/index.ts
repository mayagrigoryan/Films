export type GenresType = {
    id: number,
    name: string,
}

export type SpokenLang = {
    iso_639_1: string,
    name: string
}

interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface FilmsType {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    status: string;
    tagline: string;
    genres: GenresType[];
    runtime: number;
    budget: number;
    revenue: number;
    original_title: string;
    imdb_id: string;
    homepage: string;
    spoken_languages: SpokenLang[];
    production_countries: ProductionCountry[];
    production_companies: ProductionCompany[];
}

export type FetchFilmsType = {
    page: number;
    language: string;
    genreId?: string | number;
};

export type FetchFilmType = {
    id: any;
    language: string;
};

export type Language = 'en-US' | 'ru-RU';