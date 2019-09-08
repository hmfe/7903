import React, { useState, useEffect, useRef } from "react";
import "./styles/SearchBar.css";
import axios from "axios";

let items = [];

const SearchBar = props => {
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(data => {
        items = [];
        data.data.map(curr => items.push(curr.name));
      })
      .catch(err => {
        console.log(err);
      });
  });

  const initialState = {
    suggestions: [],
    userInput: "",
    currentFocus: -1
  };

  const liInput = useRef(null);

  const [state, setState] = useState(initialState);
  const handleChange = e => {
    let newState = { ...state };
    let value = e.target.value;
    newState[e.target.id] = value;
    newState.suggestions = [];
    if (value.length > 0) {
      const regEx = new RegExp(`^${value}`, "i");
      newState.suggestions = items
        .sort()
        .filter(item => regEx.test(item))
        .slice(0, 5);
    }
    newState.currentFocus = -1;
    setState(newState);
  };

  const renderSuggestions = value => {
    const { suggestions } = state;
    return suggestions.length === 0 ? null : (
      <ul id="suggested-item" className="suggested-items" ref={liInput}>
        {suggestions.map(suggestion => (
          <li
            key={suggestion}
            onClick={() => handleSelectSuggestion(suggestion)}
          >
            <strong>{suggestion.substring(0, value.length)}</strong>
            {suggestion.substring(value.length)}
          </li>
        ))}
      </ul>
    );
  };

  const handleSelectSuggestion = value => {
    let newState = { ...state };
    newState["suggestions"] = [];
    newState["userInput"] = value;
    setState(newState);
  };

  const doSubmit = e => {
    e.preventDefault();

    props.handleSubmit(userInput);
    let newState = { ...state };
    newState.userInput = "";
    setState(newState);
  };

  let { userInput, currentFocus } = state;

  const handleKeyPress = e => {
    const removeActive = x => {
      /*remove the "active" class from all autocomplete items:*/
      for (let i = 0; i < x.current.children.length; i++) {
        x.current.children[i].classList.remove("suggested-item-active");
      }
    };

    const addActive = (x, currentFocus) => {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);

      /*add class "autocomplete-active":*/
      x.current.children[currentFocus].classList.add("suggested-item-active");
    };

    if (liInput.current) {
      liInput.current.classList.remove("suggested-item-hidden");
      if (e.keyCode === 40) {
        currentFocus++;
        if (currentFocus >= liInput.current.children.length) currentFocus = 0;
        addActive(liInput, currentFocus);
      }
      if (e.keyCode === 38) {
        currentFocus--;
        if (currentFocus < 0) {
          currentFocus = liInput.current.children.length - 1;
        }
        addActive(liInput, currentFocus);
      }
      if (e.keyCode === 13) {
        // e.preventDefault();
        liInput.current.classList.add("suggested-item-hidden");
        if (currentFocus > -1) {
          if (liInput.current) liInput.current.children[currentFocus].click();
        }
      }

      if (e.keyCode === 27) {
        liInput.current.classList.add("suggested-item-hidden");
      }
    }
  };

  return (
    <form autoComplete="off" onSubmit={doSubmit} className="search-form">
      <div className="search-bar" onKeyDown={e => handleKeyPress(e)}>
        <input
          type="text"
          onChange={handleChange}
          id="userInput"
          value={userInput}
          aria-label="search countries"
          aria-required="true"
          placeholder="Search countries..."
        />
        {renderSuggestions(userInput)}
      </div>

      <div>
        <button type="submit" className="submit-button">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
