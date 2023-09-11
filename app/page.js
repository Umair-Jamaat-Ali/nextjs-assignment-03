'use client';
import {useState} from 'react';
export default function Home() {

  const []
  const [data , setData] = useState ([]);
 
  const onLoadHandler = async () => {
    let response = await fetch ("https://api.github.com/users/naveed-rana/followers");
    response = await response.json();
    setData(response);
  }
  return (
   <>
    <label> Enter User Name</label>
    <input type="text" onChange={()=>} placeholder='Enter User Name' /> 
    <button onClick={onLoadHandler}>Load API</button>

    <ul>
      {data.map((item , i) => {
       return (
       <li key="i">
        {item.id}
        <br/>
        {item.login}
        <br/>
        {item.followers_url}
        <br/>
       <img src={item.avatar_url} style={{width: "50px"}} alt="" /> 
        </li>
        
       )
      })}
    </ul>
   </>
  )
}
