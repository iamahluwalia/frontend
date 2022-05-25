import React, {useState} from 'react';
import './Showpdf.css'
import PDFViewer from 'pdf-viewer-reactjs'
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import { connect } from 'react-redux';
import CustomNavigation from './Navigation';
import Swal from 'sweetalert2'


function MyApp(props) {
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState("");

  const ratingChanged = (rat) => {
    setRating(rat);
  }

  const handleDownload = () => {
    axios.post(`https://iamahluwalia.herokuapp.com/download`, {
      _id: props.sel._id
    });
  }

  const sendRating = () => {
    console.log(props.sel)
    axios.post(`https://iamahluwalia.herokuapp.com/rate`, {
      rating: rating,
      email: email,
      _id: props.sel._id
    }).then((res) => {
        if(res.status === 200) {
          return Swal.fire({
            title: 'Done!',
            text: 'Rating Updated Successfully',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
        }
    })
  }
  
    return (
      <div>
        <button className="btn btn-primary" style={{backgroundColor: 'red'}} onClick={() => props.unsetFile()} >Close</button>
        <a className="btn btn-primary" style={{backgroundColor: 'green'}} onClick={() => handleDownload()} download={"pdf-title"} href={`data:application/pdf;base64,${props.sel.base64_file}`} title='Download pdf document'>
          Download
        </a>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
        <ReactStars
      count={5}
      edit={false}
      isHalf={true}
      size={24}
      activeColor="#ffd700"
      value={props.sel.avgrating}
        />
        </div>
        <span>{`${props.sel.downloads} downloads`}</span>
        <div style={{borderWidth: 5, borderColor: 'black'}} >
        <PDFViewer
            document={{url: `${props.sel.base64_file}` }}
            // document={{ url: "https://arxiv.org/pdf/quant-ph/0410100.pdf" }}
            navigation={CustomNavigation}
            scale={1.5}
            scaleStep={0.5}
            maxScale={5}
            minScale={0.5}
        />
        </div>
        <br />
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
        <ReactStars
      count={5}
      onChange={ratingChanged}
      isHalf={true}
      size={24}
      activeColor="#ffd700"
      value={rating}
        />
        </div>
        <br />
        <span>E-mail:</span>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <br />
        <button className="btn btn-primary" onClick={sendRating} >Submit</button>
      </div>
    );
  }

  const mapStateToProps = (state) => {
    return {
      sel: state.selected
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      unsetFile: () => {dispatch({type: "UNSET_FILE"})}
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(MyApp)
  // export default MyApp