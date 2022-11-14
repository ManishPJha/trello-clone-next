import { HYDRATE } from "next-redux-wrapper";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "@/src/store";
import { API } from "@/utils/API";
import { checkEnvironment } from "@/utils/checkEnvironment";
import type { BoardSliceType } from "@/src/slices/board";
import type { AuthSliceType } from "@/src/slices/auth";

export type ColumnSliceType = {
  loading: boolean;
  error: any;
  column: any;
  columns: Array<any>;
};

type sequenceType = {
  oldIndex: number;
  newIndex: number;
};

const initState = {
  loading: false,
  error: null,
  column: {
    columnId: "",
    sequence: "",
  },
  columns: [],
};

const baseURL = checkEnvironment();

export const fetchColumns = createAsyncThunk(
  "column/getAll",
  async (obj, { getState }) => {
    const columns = await API.get(baseURL.concat("/api/column"));
    return columns.data.data;
  }
);

export const fetchColumnsByBoardId = createAsyncThunk(
  "column/getAllByBoard",
  async (obj: { id: string }, { getState }) => {
    const columns = await API.get(
      baseURL.concat("/api/column/board/" + obj.id)
    );
    return columns.data.data;
  }
);

export const addColumn = createAsyncThunk(
  "column/post",
  async (obj: { id: string; name?: string }, { getState }) => {
    const { board } = getState() as { board: BoardSliceType };
    const { auth } = getState() as { auth: AuthSliceType };
    const { columns } = getState() as { columns: ColumnSliceType };

    const { boardId } = board.board;
    const { id } = auth.authUser;
    const _columns = columns.columns;

    let sequence = 1;

    if (_columns && _columns.length > 0) {
      sequence = _columns[_columns.length - 1].sequence + 1;
    }

    let formBody = {
      columnId: obj.id,
      boardId: boardId,
      userId: id,
      name: obj.name ? obj.name : "Add Column",
      sequence: sequence,
    };

    const addColumnReq = await API.post(
      baseURL.concat("/api/column/" + obj.id),
      formBody
    );

    if (addColumnReq) {
      console.log(`slice response --->`, addColumnReq);
    }
  }
);

export const updateColumn = createAsyncThunk(
  "column/put",
  async (obj: {
    id: string;
    destinationId?: string;
    name?: string;
    sequence?: sequenceType;
  }) => {
    const formBody = {
      name: obj.name,
      destinationId: obj.destinationId,
      sequence: obj.sequence,
    };
    // const updateColumnReq = await API.put(
    //   baseURL.concat("/api/column/" + obj.id),
    //   formBody
    // );

    const updateColumnReq = await API.put(
      baseURL.concat("/api/column/" + obj.id),
      formBody
    );

    if (updateColumnReq) {
      console.log(`Success response ====>`, updateColumnReq);
    }
  }
);

const columnSlice = createSlice({
  name: "columns",
  initialState: initState,
  reducers: {
    clearErrors: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    resetStates: () => initState,
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload) {
        const { loading, error, column, columns } = action.payload.columns;
        return {
          ...state,
          loading: loading,
          error: error,
          column: column,
          columns: columns,
        };
      }
    },
    [addColumn.pending.toString()]: (state, action) => {
      state.loading = true;
    },
    [addColumn.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.column = action.payload;
    },
    [addColumn.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [fetchColumns.pending.toString()]: (state, action) => {
      state.loading = true;
    },
    [fetchColumns.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.columns = action.payload;
    },
    [fetchColumns.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [updateColumn.pending.toString()]: (state, action) => {
      state.loading = true;
    },
    [updateColumn.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.column = action.payload;
    },
    [updateColumn.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [fetchColumnsByBoardId.pending.toString()]: (state, action) => {
      state.loading = true;
    },
    [fetchColumnsByBoardId.fulfilled.toString()]: (state, action) => {

      let result: any = action.payload;

      result.sort((prev: any, next: any) =>
        prev.sequence > next.sequence ? 1 : -1
      );

      console.log(`payload is----`, action.payload);

      console.log(`after`, result);

      state.loading = false;
      state.columns = result;
    },
    [fetchColumnsByBoardId.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const columnSelector = (state: AppState) => state.columns.column;
export const columnsSelector = (state: AppState) => state.columns.columns;

export const { clearErrors, resetStates } = columnSlice.actions;

export default columnSlice;
