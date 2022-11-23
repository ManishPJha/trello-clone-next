import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { checkEnvironment } from "@/utils/checkEnvironment";
import { API } from "@/utils/API";
import { AppState } from "@/src/store";
import { ObjectId } from "mongodb";

import { CardTypes } from "../types/IBoardTypes";

type cardsType = {
  loading: boolean;
  error: string;
  cards: Array<CardTypes>;
  card: {
    cardId: string;
    name: string;
  };
};

const initState = {
  loading: false,
  error: null,
  cards: [],
  card: {
    cardId: "",
    name: "",
  },
};

const baseURL = checkEnvironment();

export const addCard = createAsyncThunk(
  "card/add",
  async (
    obj: {
      id: string;
      columnId: ObjectId;
      boardId?: ObjectId;
      name?: string;
    },
    { getState }
  ) => {
    const cardsState = getState() as { cards: cardsType };

    const { cards } = cardsState.cards;

    let index = 0;

    const filteredCards = cards.filter(
      (card) => card.innerColumnData._id === obj.columnId
    )[0];

    if (filteredCards && cards.length > 0) {
      index = cards[cards.length - 1].index! + 1;
    }

    const data = {
      columnId: obj.columnId,
      boardId: obj.boardId,
      cardName: obj.name,
      index: index,
    };

    await API.post(baseURL.concat("/api/column/card/" + obj.id), data);
  }
);

// export const fetchCards = createAsyncThunk(
//   "card/get",
//   async (obj, { getState }) => {
//     const cards = await API.get(baseURL.concat("/api/column/card"));

//     return cards.data.data;
//   }
// );

export const fetchCardsWithBoardId = createAsyncThunk(
  "card/get",
  async (obj: { id: string }, { getState }) => {
    const cards = await API.get(
      baseURL.concat("/api/column/card/board/" + obj.id)
    );

    console.log("redux", cards);

    return cards.data.data;
  }
);

export const updateCardSequence = createAsyncThunk(
  "card/put",
  async (
    obj: {
      cardId: string;
      destCardId: string;
      sourceCard: {
        columnId: string;
        index: number;
      };
      destinationCard: {
        columnId: string;
        index: number;
      };
    },
    { getState }
  ) => {
    const data = {
      destCardId: obj.destCardId,
      sourceCard: obj.sourceCard,
      destinationCard: obj.destinationCard,
    };

    const isUpdatedSequences = await API.put(
      baseURL.concat("/api/column/card/" + obj.cardId),
      data
    );

    return isUpdatedSequences.data.data;
  }
);

const cards_Slice = createSlice({
  name: "cards",
  initialState: initState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    resetState: () => initState,
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload) {
        const { loading, error, cards, card } = action.payload.cards;
        return {
          ...state,
          loading: loading,
          error: error,
          card: card,
          cards: cards,
        };
      }
    },
    [addCard.pending.toString()]: (state, action) => {
      state.loading = true;
    },
    [addCard.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.card = action.payload;
    },
    [addCard.rejected.toString()]: (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    },
    // [fetchCards.pending.toString()]: (state, action) => {
    //   state.loading = true;
    // },
    // [fetchCards.fulfilled.toString()]: (state, action) => {
    //   state.loading = false;
    //   state.cards = action.payload;
    // },
    // [fetchCards.rejected.toString()]: (state, action) => {
    //   state.loading = true;
    //   state.error = action.error.message;
    // },
    [fetchCardsWithBoardId.pending.toString()]: (state, action) => {
      state.loading = true;
    },
    [fetchCardsWithBoardId.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.cards = action.payload;
    },
    [fetchCardsWithBoardId.rejected.toString()]: (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    },
  },
});

export const cardsSelector = (state: AppState) => state.cards;
export const cardSelector = (state: AppState) => state.cards.card;

export const { clearErrors, resetState } = cards_Slice.actions;

export default cards_Slice;
