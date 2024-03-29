import React from 'react'
import { connect } from 'react-redux'
import ReactStars from "react-rating-stars-component";

function App(props) {
    return (
        <div>
        { props.results.length ? 
            <div style={{backgroundColor: 'white', padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 20, width: "100%"}} >
            {
            props.results.map((e) => {
                let tag = '';
                e.tags.map((s) => {
                    tag += '#'+s+' ';
                }) 
                
                return (
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',border: 'solid', borderWidth: 2, borderColor: 'gray', margin: 5, background: 'white', borderRadius: 10, padding: 5}} >
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 5}}
                         >
                        <h1 style={{margin: 1}} >{e.name}</h1>
                        <h3 style={{margin: 1}} >{e.branch}</h3>
                        <h5 style={{margin: 1}} >{tag}</h5>
                        {/* <h5 style={{margin: 1}} >{e.date}</h5> */}
                        <ReactStars count={5} isHalf={true} size={24} activeColor="#ffd700" value={e.avgrating} edit={false} />
                    </div>
                    <button className="btn btn-primary" onClick={() => props.setFile(e)} >Open</button>
                    </div>
                )
            })
            }
            </div>
            :
            // <span>No Results Found!</span>
            <></>
        }
        </div>
    )
}

const mapStateToProps = (state) =>  {
    return {
        results: state.search_results
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      setFile: (q) => {dispatch({type: "SET_FILE", data: q})}
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(App)