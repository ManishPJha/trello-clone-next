import { API } from "@/utils/API";
import { checkEnvironment } from "@/utils/checkEnvironment";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "@/src/store";

export type BoardTypes = {
  boardId: string;
  boardName: string;
  backgroundImage: string;
};

export type BoardSliceType = {
  loading: boolean;
  error: any;
  board: BoardTypes;
  boards: Array<any>;
};

const initState = {
  loading: false,
  error: null,
  board: {
    boardId: "",
    boardName: "",
    backgroundImage: "",
  },
  boards: [],
};

const baseURL = checkEnvironment();

export const createBoard = createAsyncThunk(
  "board/post",
  async (obj: { id: string; name: string }, { dispatch }) => {
    const createBoardApi = await API.post(
      baseURL.concat("/api/board/" + obj.id),
      {
        ...obj,
        image:
          "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
      }
    );
    return obj;
  }
);

export const fetchBoards = createAsyncThunk(
  "board/getAll",
  async (obj, { getState }) => {
    const boards = await API.get(baseURL.concat("/api/board"));

    return boards.data.data;
  }
);

export const fetchBoardWithSlugId = createAsyncThunk(
  "board/getOne",
  async (obj: { id: string }, { getState }) => {
    const board = await API.get(baseURL.concat("/api/board/" + obj.id));

    return board.data.data;
  }
);

const boardSlice = createSlice({
  name: "board",
  initialState: initState,
  reducers: {
    clearErrors: (state, action) => {
      state.error = null;
    },
    resetStates: () => initState,
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload) {
        const { loading, error, board, boards } = action.payload.board;
        return {
          ...state,
          loading: loading,
          error: error,
          board: board,
          boards: boards,
        };
      }
    },
    [createBoard.pending.toString()]: (state, action) => {
      state.loading = true;
    },
    [createBoard.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.board = action.payload;
    },
    [createBoard.rejected.toString()]: (state, action) => {
      state.loading = false;
    },
    [fetchBoards.pending.toString()]: (state, action) => {
      state.loading = true;
    },
    [fetchBoards.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.boards = action.payload;
    },
    [fetchBoards.rejected.toString()]: (state, action) => {
      state.loading = false;
    },
    [fetchBoardWithSlugId.pending.toString()]: (state, action) => {
      state.loading = true;
    },
    [fetchBoardWithSlugId.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.board = action.payload;
    },
    [fetchBoardWithSlugId.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const boardsSelector = (state: AppState) => state.board.boards;
export const boardSelector = (state: AppState) => state.board.board;

export const { clearErrors, resetStates } = boardSlice.actions;

export default boardSlice;
