import React from "react";
import "./styles/SearchHistory.css";
import moment from "moment";

const SearchHistory = props => {
  const { searchHistory, clearHistory, handleDelete } = props;

  return (
    <section className="search-history">
      <div className="search-history-header">
        <h5>Search history</h5>
        <h6 className="text-muted" onClick={clearHistory}>
          clear history
        </h6>
      </div>
      {searchHistory.length === 0
        ? null
        : searchHistory.map((curr, index) => (
            <div key={index} className="search-history-item">
              <p>{curr.item}</p>
              <div>
                <time className="text-muted">
                  {moment(curr.date).format("MMMM Do YYYY, h:mm:ss a")}
                </time>
                <time className="text-muted">
                  {moment(curr.date).format(" MMM Do YY ")}
                </time>

                <button
                  className="custom-button"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
    </section>
  );
};

export default SearchHistory;
