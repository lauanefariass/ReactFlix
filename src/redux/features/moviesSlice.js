import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovies } from "../../apiCalls";

// Thunks para cada categoria
export const fetchMoviesByCategory = createAsyncThunk(
  "movies/fetchPopular",
  async () => await fetchMovies("popular")
);

export const fetchTopRatedMovies = createAsyncThunk(
  "movies/fetchTopRated",
  async () => await fetchMovies("top_rated")
);

export const fetchNowPlayingMovies = createAsyncThunk(
  "movies/fetchNowPlaying",
  async () => await fetchMovies("now_playing")
);

export const fetchUpcomingMovies = createAsyncThunk(
  "movies/fetchUpcoming",
  async () => await fetchMovies("upcoming")
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    popularMovies: [],
    topRatedMovies: [],
    nowPlayingMovies: [],
    upcomingMovies: [],
    status: {
      popular: "idle",
      topRated: "idle",
      nowPlaying: "idle",
      upcoming: "idle",
    },
    error: {
      popular: null,
      topRated: null,
      nowPlaying: null,
      upcoming: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Popular Movies
      .addCase(fetchMoviesByCategory.pending, (state) => {
        state.status.popular = "loading";
      })
      .addCase(fetchMoviesByCategory.fulfilled, (state, action) => {
        state.status.popular = "succeeded";
        state.popularMovies = action.payload || [];
      })
      .addCase(fetchMoviesByCategory.rejected, (state, action) => {
        state.status.popular = "failed";
        state.error.popular = action.error.message;
      })
      // Top Rated Movies
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.status.topRated = "loading";
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.status.topRated = "succeeded";
        state.topRatedMovies = action.payload || [];
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.status.topRated = "failed";
        state.error.topRated = action.error.message;
      })
      // Now Playing Movies
      .addCase(fetchNowPlayingMovies.pending, (state) => {
        state.status.nowPlaying = "loading";
      })
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
        state.status.nowPlaying = "succeeded";
        state.nowPlayingMovies = action.payload || [];
      })
      .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
        state.status.nowPlaying = "failed";
        state.error.nowPlaying = action.error.message;
      })
      // Upcoming Movies
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.status.upcoming = "loading";
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.status.upcoming = "succeeded";
        state.upcomingMovies = action.payload || [];
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.status.upcoming = "failed";
        state.error.upcoming = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
