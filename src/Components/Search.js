import React from "react";


const Search = () => {
  let [search_query, set_search_query] = React.useState({
    branch: "",
    endsem: null,
    query: "",
  })

  return (
    <div className="input-group">
      <div className="form-outline">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input type="search" id="form1" className="form-control" onChange={(e) => {set_search_query()}} />
          <button type="button" className="btn btn-primary" style={{
            marginLeft: 5
          }}>
            <span>Search</span>
          </button>
        </div>

        <label className="form-label" for="form1"></label>
      </div>
    </div>
  );
};

export default Search;
