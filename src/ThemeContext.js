import { createContext, useReducer } from "react";

const initialState = {
  darkMode: false
};

export const ThemeContext = createContext({
  state: initialState,
  dispatch: () => null
});


const themeReducer = (state, action) => {
  switch (action.type) {
    case "LIGHTMODE":
      return { ...state, darkMode: false };
    case "DARKMODE":
      return { ...state, darkMode: true };
    default:
      return state;
  }
};

export function ThemeProvider(props)
{
  const initState = {
    ...initialState, 
    darkMode: props.darkMode
  }

  const [state, dispatch] = useReducer(themeReducer, initState);
  return <ThemeContext.Provider value={{ state, dispatch }}>
    {props.children}
  </ThemeContext.Provider>;
}

