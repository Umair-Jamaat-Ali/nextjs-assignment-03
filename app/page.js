'use client';
import { useState } from 'react';


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

  const onFollowerHandler = async () => {
    // let response = await fetch(`https://api.github.com/users/${userName}/followers`);
    let response = await fetch(data.followers_url)
    response = await response.json();
    console.log("response", response);
    setFollowers(response);

  }

  // const onFollowerHandler = async () =>{
  //   let response = await axios.get (data.followers_url);
  //   console.log("response", response);
  //   setFollowers(response.data);
  // }

  return (
    <>
      <div className=''>
        <div className=''>
        <h1 className='text-2xl sm:text-4xl font-bold text-center pt-4 sm:pt-10'> My Git-Hub API </h1>
          <div className='py-10 px-[300px] '>
            <label htmlFor="userName" className='p-10 text-lg font-semibold'> Enter Your Git-Hub User Name: </label>
            <input type="text" onChange={(e) => setUserName(e.target.value)} placeholder='Enter User Name'
              className='w-[300px] rounded-lg h-9 hover:border-2 hover:border-emerald-700 p-2 hover:text-emerald-700' />
              <br/>
            <button onClick={onLoadHandler} className='w-[100px] h-[30px] bg-emerald-700 rounded-lg ml-[300px] mt-8 
      hover:bg-white hover:border-2 hover:border-emerald-700 hover:scale-125 '>Load API</button>
          </div>
          <div >
            {data &&
              <>
              {/* <figcaption className='flex bg-white mx-[140px] h-[80px] items-center pl-20 '> */}
              <figcaption className='flex bg-white mx-auto sm:mx-[140px] h-[80px] items-center pl-2 sm:pl-20'>
              <div className='px-5 '>
                <span ><img src={data.avatar_url} className='rounded-full border-2 border-white' width={100} alt="" /></span>
                </div>
                <div>
                <span className=' text-lg '>User: <span className='text-green-700 font-semibold  uppercase'>{data.login }</span> </span>
                <br/>
                <span className='pr-3'> Bio:  {data.bio} </span>
                <span className='px-3'> Followers:  {data.followers}</span>
                <button className=' w-[130px] h-[40px] mb-3 bg-emerald-700 rounded-lg ml-10 
      hover:bg-white hover:border-2 hover:border-emerald-700 hover:scale-125' onClick={onFollowerHandler}>Get followers</button>
                </div>
                </figcaption>
              </>
            }
          </div>
          {followers.length >= 1 && (
            <>
            <h1 className='text-2xl font-bold text-center pt-10'>Followers</h1>
            
  <table className=''>
              <thead>
                <tr className='my-3'>
                  <th className=''>ID</th>
                  <th className=''>Avatar</th>
                  <th className=''>Name</th>
                  <th className=''>Type</th>
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
          
            </>
          )}
        </div>
        </div>
      
    </>
  )
}
