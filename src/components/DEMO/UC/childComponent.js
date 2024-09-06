import React, { useEffect, useState } from 'react'

export default function ChildComponent({getData}){

    const[comments, setComments] = useState([]);

    useEffect(() => {
        console.log('Child component - useEffect');
        getData('comments')
        .then((res) => res.json())
        .then((res) => {
            const comments = res.data;
            setComments(comments);
        })
    }, [getData]);

  return (
    <div>
        <p>Child Component</p>
        <p>{JSON.stringify(comments)}</p>
    </div>
    
  )
}
