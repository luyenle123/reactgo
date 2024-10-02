import { useEffect, useRef } from "react";
import useFetch from "./useFetch";

export default function CHookApp(){
  const [data, isLoading, error] = useFetch("https://jsonplaceholder.typicode.com/todos123");
  
  const count = useRef(0);

  console.log('>> CHookApp : ' + (count.current + 1));

  useEffect(() => {
    count.current = count.current + 1;
  });  

  if(isLoading){
    return(
    <>
        <p>Loading...</p>
    </>);
  }

  if(error){
    return(
    <>
        {error}
    </>);
  }

  return (
    <>
      {data &&
        data.map((item) => {
          return <p key={item.id}>{item.title}</p>;
        })}
    </>
  );
};