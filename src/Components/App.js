//import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Upload from './Upload';
import Search from './Search';
import PDF from "./PDF/Showpdf"
import Dropdowns from "./Dropdowns";
import {connect} from 'react-redux'
import List from "./List"

//import Dropdowns from './Dropdowns';1

//import all routes here

function App(props) {
  return (
    <div className="Main-App">
      <Header />
      <Dropdowns />
      {props.is_upload && <Upload />}
      {props.sel ? <PDF/> : <List />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    sel: state.is_any_file_selected,
    is_upload: state.is_upload,
  }
}

export default connect(mapStateToProps, undefined)(App);
// export default App

// {
//   name,
//   owner,
//   branch,
//   type,
//   code,
//   date,
//   avgrating,
//   ratings,
//   downloads,
//   base64_file,
// }