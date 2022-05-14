import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./Dropdowns.css"
import Search from "./Search";
import axios from 'axios'
import {connect} from 'react-redux'

const Dropdowns = (props) => {
  let [search_query, set_search_query] = React.useState({
    branch: "",
    endsem: null,
    query: "",
  })

  function Search() {
    console.log(search_query)
    if(search_query.branch === "" && search_query.endsem === null && search_query.query === "") {
      return
    }
      axios.post("http://localhost:6969/search", search_query).then(async (res) => {
        await props.setQuery(res.data)
      })
  }

  function Upload() {
    props.setUpload(true);
  }
 

  const options1 = ["CS", "ECE", "MECH", "PIE", "IT", "EE"];
  const options2 = ["Midsem", "Endsem"];
  const Branch = "Branch";
  const Sem = "Sem";
  return (
      <div className="dropdown-container">
        <div className="dropdown-comp">
          <Dropdown controlClassName="drop"
            options={options1}
            onChange={(e) => set_search_query({...search_query, branch: e.value})}
            value={Branch}
            placeholder="Select an option"
            // controlClassName="dropdown"
            placeholderClassName="dropdown-text"
            arrowClassName="dropdown-arrow"
            // menuClassName="dropdown-menu" 
          />
        </div>
        <div className="dropdown-comp">
          <Dropdown controlClassName="drop"
            options={options2}
            onChange={(e) => set_search_query({...search_query, endsem: (e.value === "Endsem" ? true : false)})}
            value={Sem}
            placeholder="Select an option"
            placeholderClassName="dropdown-text"
            arrowClassName="dropdown-arrow"
            // menuClassName="dropdown-menu"
          />
        </div>
        <div className="dropdown-comp">
        <input type="search" id="form1" className="form-control" onChange={(e) => {set_search_query({...search_query, query: e.target.value})}} />
        </div>
          <button onClick={() => Search()} type="button" className="btn btn-primary" style={{
            marginLeft: 5
          }}>
            <span>Search</span>
          </button>
          <button onClick={() => Upload()} type="button" className="btn btn-secondary" style={{
            marginLeft: 5
          }}>
            <span>Upload</span>
          </button>
      </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setQuery: (q) => {dispatch({type: "SET_RESULTS", data: q})},
    setUpload: (q) => {dispatch({type: "SET_UPLOAD", data: q})}
  }
}

export default connect(undefined, mapDispatchToProps)(Dropdowns);
