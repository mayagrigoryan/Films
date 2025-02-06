import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FilmsAPI } from "../../api/api";
import { GenresType } from "../../types/index";

type GenresStateType = {
    genres : Array<GenresType>
}

export const getGenres = createAsyncThunk<GenresType[], void>(
    'getGenres',
    async () => {
        const res = await FilmsAPI.getGenres()

        return res.data.genres
    }
)

const initialState : GenresStateType ={
    genres : []
}

const genresSlice = createSlice({
    name : 'genresSlice',
    initialState,
    reducers : {

    },
    extraReducers : (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload
        })
    }
})

export default genresSlice.reducer