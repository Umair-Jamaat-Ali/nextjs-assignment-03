'use client';
import { useState } from 'react';
import axios from "axios";

export default function Home() {

  const [userName, setUserName] = useState(null);
  const [data, setData] = useState("");
  const [followers, setFollowers] = useState([]);

  const onLoadHandler = async () => {
    setFollowers([]);
    let response = await fetch(`https://api.github.com/users/${userName}`);
    response = await response.json();
    setData(response);
  }

  // const onFollowerHandler = async () => {
  //   let response = await fetch(data.followers_url);
  //   // response = await response.json();
  //   console.log("response", response.data);
  //   setFollowers(response.data);

  // }

  const onFollowerHandler = async () =>{
    let response = await axios.get (data.followers_url);
    console.log("response", response);
    setFollowers(response.data);
  }

  return (
    <>
      <label> Enter User Name</label>
      <input type="text" onChange={(e) => setUserName(e.target.value)} placeholder='Enter User Name' />
      <button onClick={onLoadHandler}>Load API</button>

      {data &&
        <>
          <h1>Github user</h1>
          <img src={data.avatar_url} width={100} alt="" />
          <span>bio: {data.bio} - {data.followers}</span>
          <button onClick={onFollowerHandler}>Get followers</button>
        </>
      }

      {followers.length >= 1 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {followers.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>
                  <img src={element.avatar_url} className='w-[50px] ' alt="" />
                </td>
                <td>{element.login}</td>
                <td>{element.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
