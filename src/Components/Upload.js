import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { useAlert } from 'react-alert'

const PaperContainer = (props) => {
  // _.*@([a-zA-Z]+(\.[a-zA-Z]+)+)
    const [sent, setSent] = useState(false);
    const [file, setFile] = useState({
        name: "",
        owner: "",
        branch: "",
        type: "",
        code: "",
        date: "",
        avgrating: 0,
        tags: [],
        downloads: 0,
        base64_file: "",
    })
    const [otp, setotp] = useState("");
    const alert = useAlert();

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
          if(err) alert.error(err)
          await setFile({...file, base64_file: res});
        })
    }

    function setTags(tags) {
      let str = tags.toLowerCase();
      let arr = str.split(",");
      setFile({...file, tags: arr});
    }

    function sendOTP() {
<<<<<<< HEAD
        axios.post('https://iamahluwalia.herokuapp.com//saveotp', {email: file.owner}).then((res) => console.log(res)).then(() => setSent(true))
=======
        axios.post('http://localhost:6969/saveotp', {email: file.owner}).then(() => {
          setSent(true);
          alert.success("OTP Sent!")
        })
>>>>>>> 294b59423c64ad947b0dcc77ddfe66499aeedbc3
    }

    function verifyOTP() {
        axios.post('https://iamahluwalia.herokuapp.com//verifyotp', {email: file.owner, otp: otp}).then((res) => {
          if(res.status === 200) {
            //upload
            axios.post('https://iamahluwalia.herokuapp.com//upload', file).then((res) => {
            console.log(res)
          }).then(() => {
              props.setUpload(false);
              alert.success("File Uploaded Successfully");
          })
          }
          if(res.status === 403) {
            alert.error("Wrong OTP!!!!")
          }
        })
    }

  return (
  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '60%', marginTop: '1%', backgroundColor: 'white', padding: '3%', borderRadius: 30}} >
        <input type="file" className='btn btn-primary'  name="file" onChange={(e) => fileSet(e)} />
        <br />
        <input type="search" placeholder='Enter email' id="form1" className="form-control" onChange={(e) => setFile({...file, owner: e.target.value})} />
        <br />
        <input type="search" placeholder='Enter name' id="form1" className="form-control" onChange={(e) => setFile({...file, name: e.target.value})} />
        <br />
        <input type="search" placeholder='Enter branch' id="form1" className="form-control" onChange={(e) => setFile({...file, branch: e.target.value})} />
        <br />
        <input type="search" placeholder='Enter tags' id="form1" className="form-control" onChange={(e) => setTags(e.target.value)} />
        <br />
        <input type="search" placeholder='Enter code' id="form1" className="form-control" onChange={(e) => setFile({...file, code: e.target.value})} />
        <br />
        <input type="date" placeholder='Enter date' id="form1" className="form-control" onChange={(e) => setFile({...file, date: e.target.value})} />
        <br />
        <div style={{display: 'flex', flexDirection: 'row'}} >
        <label  style={{marginRight: 5}} >
        <input type="radio" checked={file.type === "endsem"} classsName="form-control" id="form1" value={true} onChange={(e) => setFile({...file, type: "endsem"})} />
        Endsem
        </label>
        <label  style={{marginRight: 5}} >
        <input type="radio" checked={file.type === "midsem"} classsName="form-control" id="form1" value={false} onChange={(e) => setFile({...file, type: "midsem"})} />        
        Midsem
        </label>
        <label  style={{marginRight: 5}} >
        <input type="radio" checked={file.type === "notes"} classsName="form-control" id="form1" value={false} onChange={(e) => setFile({...file, type: "notes"})} />        
        Notes
        </label>
        <label  style={{marginRight: 5}} >
        <input type="radio" checked={file.type === "book recommendation"} classsName="form-control" id="form1" value={false} onChange={(e) => setFile({...file, type: "book recommendation"})} />        
        Book Recommendation
        </label>
        </div>
        <br />
        <button type="button" className="btn btn-primary" onClick={() => sendOTP()} style={{
            marginLeft: 5
          }}>
            <span>Send OTP</span>
          </button>
          {sent && 
              <>
              <br />
            <input type="search" placeholder='Enter OTP' id="form1" className="form-control" onChange={(e) => setotp(e.target.value)} />
          <br />
          <button type="button" className="btn btn-secondary" onClick={() => verifyOTP()} style={{
            marginLeft: 5
          }}>
            <span>Veriy OTP</span>
          </button>
          </>
          }
    </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
    return {
      setUpload: (q) => {dispatch({type: "SET_UPLOAD", data: q})}
    }
  }

export default connect(undefined, mapDispatchToProps)(PaperContainer)