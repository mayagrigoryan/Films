import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FilmsAPI } from "../../api/api";
import { FetchFilmsType, FetchFilmType, FilmsType } from "../../types";

interface FilmsStateType {
    total_pages: number;
    total_results: number;
    page: number;
    results: FilmsType[];
    search_results: FilmsType[]
}

interface FilmsStateType1 extends FilmsStateType {
    film: FilmsType | null;
}

export const getFilms = createAsyncThunk<FilmsStateType, FetchFilmsType>(
    "films/getFilms",
    async ({ page, language, genreId }: FetchFilmsType) => {
      const parsedGenreId = genreId ? parseInt(genreId.toString(), 10) : undefined;
  
      const res = await FilmsAPI.getFilms(page, language, parsedGenreId);
      
      return {
        page,
        results: res.data.results,
        total_pages: res.data.total_pages,
        total_results: res.data.total_results,
        search_results: [],
      };
    }
);
  
export const getOneFilm = createAsyncThunk<FilmsType, FetchFilmType>(
    "films/getOneFilm",
    async ({ id, language }: FetchFilmType) => {
        const res = await FilmsAPI.getOneFilm(id, language);
        return res.data;
    }
);

const initialState: FilmsStateType1 = {
    page: 1,
    total_results: 0,
    total_pages: 0,
    results: [],
    search_results: [],
    film: null,
};

const filmsSlice = createSlice({
    name: "films",
    initialState,
    reducers: {
        changePage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setSearchResults(state, action: PayloadAction<FilmsType[]>) {
            state.search_results = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFilms.fulfilled, (state, action: PayloadAction<FilmsStateType>) => {
            state.results = action.payload.results;
            state.total_pages = action.payload.total_pages;
            state.total_results = action.payload.total_results;
        });
        builder.addCase(getOneFilm.fulfilled, (state, action: PayloadAction<FilmsType>) => {
            state.film = action.payload;
        });
    },
});

export const { changePage, setSearchResults } = filmsSlice.actions;
export default filmsSlice.reducer;
