import React, { useState, useContext, useEffect, useReducer } from "react";

import { reducer } from "./reducer";

const API_ENDPOINT = `https://hn.algolia.com/api/v1/search?`;

const initialState = {
  loading: true,
  hits: [],
  page: 0,
  query: "React",
  nbPages: 0,
};

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const [error, setError] = useState(false)
  // const [loading, setLoading] = useState(true)
  // const fetchStories = async (url) => {
  //   dispatch({ type: "SET_LOADING" });
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();

  //     console.log(data);
  //     dispatch({ type: "SET_HITS", payload: data });
  //     // console.log(data.loading, data.hits, data.nbpages)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleSearch = (query) => {
  //   dispatch({ type: "HANDLE_SEARCH", payload: query });
  //   // console.log(dispatch({ type: "HANDLE_SEARCH", payload: query }));
  //   return query
  // };

  // const removeArticle = (id) => {
  //   dispatch({type: 'REMOVE_ARTICLE', payload: id})
  // }

  // console.log(state);
  // useEffect(() => {

  //   fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
  //   console.log(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
  // }, [state.query, state.page]);

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
