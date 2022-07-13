import { Entry } from "../../interfaces";
import { EntriesState } from "./";

type EntriesActionType =
  | { type: "ENTRY_ADD"; payload: Entry }
  | { type: "ENTRY_UPDATE_STATE"; payload: Entry }
  | { type: "ENTRY_REFRESH_DATA"; payload: Entry[] };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "ENTRY_ADD":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };

    case "ENTRY_UPDATE_STATE": {
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        }),
      };
    }

    case "ENTRY_REFRESH_DATA":
      return {
        ...state,
        entries: [...action.payload],
      };

    default:
      return state;
  }
};
