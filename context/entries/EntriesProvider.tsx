import React, { FC, PropsWithChildren, useReducer } from "react";
import { Entry } from "../../interfaces";
import { entriesReducer, EntriesContext } from "./";

import { v4 as uuidv4 } from "uuid";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description:
        "Pendiente: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita dolor totam sed, quae quis facilis quas officia facere voluptatibus, corrupti debitis. Optio itaque distinctio esse quo ea sunt officia rerum!",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        "En-Progreso: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita dolor totam sed, quae quis facilis quas officia facere voluptatibus, corrupti debitis. Optio itaque distinctio esse quo ea sunt officia rerum!",
      status: "in-progres",
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description:
        "Terminada: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita dolor totam sed, quae quis facilis quas officia facere voluptatibus, corrupti debitis. Optio itaque distinctio esse quo ea sunt officia rerum!",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: "pending",
    };

    dispatch({ type: "ENTRY_ADD", payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: "ENTRY_UPDATE_STATE", payload: entry });
  };

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
