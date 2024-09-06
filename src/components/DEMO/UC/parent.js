import React, { useCallback, useState } from 'react'
import ChildComponent from './childComponent';

const Parent = () => {
    const[users, setUsers] = useState([]);

    const getData = useCallback((type) => {
        return fetch(`https://reqres.in/api/${type}`);
    }, []);

    const handleClick = () => {
        getData('users')
            .then((res) => res.json())
            .then((res) => {
                const users = res.data;
                setUsers(users);
            })
    }

  return (
    <>
        <p>Data:</p>
        <button onClick={handleClick}>Get Users</button>
        <p>{JSON.stringify(users)}</p>

        <ChildComponent getData={getData}/>
    </>
  )
}



export {Parent}