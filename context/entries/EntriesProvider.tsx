import React, { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { useSnackbar } from "notistack";
import { Entry } from "../../interfaces";
import { entriesReducer, EntriesContext } from "./";
import { entriesApi } from "../../apis";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITAL_STATE);

  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    // const newEntry: Entry = {
    //   // _id: uuidv4(),
    //   // description,
    //   // createdAt: Date.now(),
    //   // status: "pending",
    // };
    const { data } = await entriesApi.post<Entry>("/entries", { description });

    dispatch({ type: "ENTRY_ADD", payload: data });
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackbar = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });
      dispatch({ type: "ENTRY_UPDATE_STATE", payload: data });
      if (showSnackbar) {
        enqueueSnackbar("Actualización realizada exitosamente", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEntry = async ({ _id }: Entry, showSnackbar = false) => {
    try {
      const { data } = await entriesApi.delete<Entry>(`/entries/${_id}`);
      dispatch({ type: "ENTRY_DELETE", payload: data });
      if (showSnackbar) {
        enqueueSnackbar("Entrada eliminada exitosamente", {
          variant: "error",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({ type: "ENTRY_REFRESH_DATA", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{ ...state, addNewEntry, updateEntry, deleteEntry }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
