import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

const PaperContainer = (props) => {
    const [sent, setSent] = useState(false);
    const [file, setFile] = useState({
        name: "",
        owner: "",
        branch: "",
        endsem: true,
        code: "",
        date: "",
        avgrating: 0,
        ratings: [],
        downloads: 0,
        base64_file: "",
    })
    const [otp, setotp] = useState("");

    const fileToBase64 = (file, cb) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        cb(null, reader.result)
      }
      reader.onerror = function (error) {
        cb(error, null)
      }
  }

    async function fileSet(e) {
        // console.log(e.target.files[0])
        fileToBase64(e.target.files[0], async (err, res) => {
          if(err) alert(err)
          await setFile({...file, base64_file: res});
        })
    }

    function setTags(tags) {
      let str = tags.toLowerCase();
      let arr = str.split(" ");
      setFile({...file, ratings: arr});
    }

    function sendOTP() {
        axios.post('http://localhost:6969/saveotp', {email: file.owner}).then((res) => console.log(res)).then(() => setSent(true))
    }

    function verifyOTP() {
        axios.post('http://localhost:6969/verifyotp', {email: file.owner, otp: otp}).then((res) => {
          if(res.status === 200) {
            //upload
            axios.post('http://localhost:6969/upload', file).then((res) => {
            console.log(res)
          }).then(() => {
              props.setUpload(false)
          })
          }
          if(res.status === 403) {
            alert("Wrong OTP!!!!")
          }
        })
    }

  return (
  <>
    <div className='ui container'>
        <input type="file" name="file" onChange={(e) => fileSet(e)} />
        <input type="search" placeholder='Enter email' id="form1" className="form-control" onChange={(e) => setFile({...file, owner: e.target.value})} />
        <input type="search" placeholder='Enter name' id="form1" className="form-control" onChange={(e) => setFile({...file, name: e.target.value})} />
        <input type="search" placeholder='Enter branch' id="form1" className="form-control" onChange={(e) => setFile({...file, branch: e.target.value})} />
        <input type="search" placeholder='Enter tags' id="form1" className="form-control" onChange={(e) => setTags(e.target.value)} />
        <input type="search" placeholder='Enter code' id="form1" className="form-control" onChange={(e) => setFile({...file, code: e.target.value})} />
        <input type="date" placeholder='Enter date' id="form1" className="form-control" onChange={(e) => setFile({...file, date: e.target.value})} />
        <label>
        <input type="radio" checked={file.endsem} classsName="form-control" id="form1" value={true} onChange={(e) => setFile({...file, endsem: true})} />
        Endsem
        </label>
        <label>
        <input type="radio" checked={!file.endsem} classsName="form-control" id="form1" value={false} onChange={(e) => setFile({...file, endsem: false})} />        
        Midsem
        </label>
        <button type="button" className="btn btn-primary" onClick={() => sendOTP()} style={{
            marginLeft: 5
          }}>
            <span>Send OTP</span>
          </button>
          {sent && 
              <>
            <input type="search" placeholder='Enter OTP' id="form1" className="form-control" onChange={(e) => setotp(e.target.value)} />
          <button type="button" className="btn btn-secondary" onClick={() => verifyOTP()} style={{
            marginLeft: 5
          }}>
            <span>Veriy OTP</span>
          </button>
          </>
          }
    </div>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
    return {
      setUpload: (q) => {dispatch({type: "SET_UPLOAD", data: q})}
    }
  }

export default connect(undefined, mapDispatchToProps)(PaperContainer)