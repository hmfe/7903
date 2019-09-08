import React, { useState } from "react";
import SearchHistory from "./SearchHistory/SearchHistory";
import SearchBar from "./SearchBar/SearchBar";

const DashBoard = () => {
  const initialState = {
    searchHistory: []
  };

  const [state, setState] = useState(initialState);

  const handleSubmit = val => {
    if (val.length > 0) {
      let newState = { ...state };
      newState.searchHistory.push({ item: val, date: new Date() });
      setState(newState);
    }
  };

  const handleClearHistory = () => {
    let newState = { ...state };
    newState.searchHistory = [];
    setState(newState);
  };

  const handleDelete = index => {
    let newState = { ...state };
    newState.searchHistory.splice(index, 1);
    setState(newState);
  };

  const { searchHistory } = state;
  return (
    <div>
      <SearchBar handleSubmit={handleSubmit}></SearchBar>
      <SearchHistory
        searchHistory={searchHistory}
        clearHistory={handleClearHistory}
        handleDelete={handleDelete}
      ></SearchHistory>
    </div>
  );
};

export default DashBoard;
