import React,{useEffect,useState} from 'react'

const UseEffectHook1 = () => {
    const [count,setCount]=useState(0);
    useEffect(()=>{console.log("hello guys")});
  return (
    <><div>useEffectHook</div>
    <button onClick={()=>{setCount(count+1)}}>click me</button>
    </>
  )
}

export default UseEffectHook1