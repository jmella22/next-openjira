import React, { FC, PropsWithChildren, useReducer } from "react";
import { uiReducer, UIContext } from "./";

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: "UI_OPEN_SIDEBAR" });
  };

  const closeSideMenu = () => {
    dispatch({ type: "UI_CLOSE_SIDEBAR" });
  };

  const setIsAddingEntry = (addEntry: boolean) => {
    dispatch({ type: "UI_ADD_ENTRY", payload: addEntry });
  };

  const startDragging = () => {
    dispatch({ type: "UI_START_DRAGGING" });
  };

  const endDragging = () => {
    dispatch({ type: "UI_END_DRAGGING" });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
