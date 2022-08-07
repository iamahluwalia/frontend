import React, {useState} from 'react';
import './Showpdf.css'
import PDFViewer from 'pdf-viewer-reactjs'
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import { connect } from 'react-redux';
import CustomNavigation from './Navigation';
import Swal from 'sweetalert2'

var reg = new RegExp('[a-zA-Z]+@nitkkr\.ac\.in')

function MyApp(props) {
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState("");
  const [isCorrrect, setIsCorrect] = useState(true);
  const ratingChanged = (rat) => {
    setRating(rat);
  }

  const handleDownload = () => {
    axios.post(`https://iamahluwalia.herokuapp.com/download`, {
      _id: props.sel._id
    });
  }

  const sendRating = () => {
    if(!isCorrrect) {
      return Swal.fire({
        title: 'Error!',
        text: 'Enter Correct Email id',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
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

  const verifyEmail = (s) => {
    console.log(s)
    if(!reg.test(s)) {
      setIsCorrect(false);
    } else {
      setIsCorrect(true);
    }
    setEmail(s);
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
        <input value={email} onChange={(e) => verifyEmail(e.target.value)} />
        {!isCorrrect && <p style={{color: "red"}} >Enter correct email</p>}
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