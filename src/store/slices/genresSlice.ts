import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FilmsAPI } from "../../api/api";
import { GenresType } from "../../types/index";

type GenresStateType = {
    genres: Array<GenresType>
}

export const getGenres = createAsyncThunk<Array<GenresType>, string>(
    'getGenres',
    async (language) => {
        const res = await FilmsAPI.getGenres(language)

        return res.data.genres
    }
)

const initialState: GenresStateType = {
    genres: []
}

const genresSlice = createSlice({
    name: 'genresSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action: PayloadAction<Array<GenresType>>) => {
            state.genres = action.payload
        })
    }
})

export default genresSlice.reducer