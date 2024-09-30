import React, { useState } from "react";
import Todos from "./todo";

export const MemoTest = () => {
    const [count, setCount] = useState(0);
    const [todos, setTodos] = useState(["todo 1", "todo 2"]);
  
    const increment = () => {
      setCount((c) => c + 1);
    };

    // var a, b;
    // [a, b] = [1, 2]
    // console.log(a, b); //1 2    a

    // const [a, b, ...c] = [1, 2, 3, 4, 5]
    // console.log(a, b, c) ; //1, 2, [3, 4, 5]

    // const {a, b, c} = {a: 1, b: 2, c: () => 3}
    // console.log(a, b, c)// 1, 2, () => 3
  
    // const {a, b, ...c} = {a: 1, b: 2, c: () => 3, d: 4}
    // console.log(a, b, c)// 1, 2, {d: 4, c: f} với f = () => 3    

    // const res = [1, 2, 3, 4,] ;//res.response();
    // const [a, b, c] = res
    // console.log(a, b, c);//1 2 3     

    // Swapping
    // var a = 1;
    // var b = 2;
    // [a, b] = [b, a]
    // console.log(a, b) ;//2, 1    

    // Ignoring values
    // const res = () => [1, 2, 3]
    // const [a, ,b] = res()
    // console.log(a, b) ;//1,3

    // Assignment to new variables
    // const res = {blog: 'anonystick.com', type: 'javascript'}
    // const {blog: nameBlog, type: newType} = res;
    // console.log(nameBlog, newType);//anonystick.com, javascript

    // Nested object and array destructuring
    // const blogs = {
    //   anonystick: [
    //     {
    //       pageFacebook: 'Tip javascript Viet Nam',
    //       likes: 4789,
    //       daily: 1323
    //     }
    //   ]
    // }
    
    // const {
    //   anonystick: [
    //     {
    //       pageFacebook: namePage,
    //       likes: numLikes,
    //       daily: numDaily
    //     }
    //   ]
    // } = blogs;
    
    // console.log(namePage, numLikes, numDaily );//Tip javascript Viet Nam, 4789, 1323    

    return (
      <>        
        <h1>memo</h1>
        <Todos todos={todos} />
        <hr />
        <div>
          Count: {count}
          <button onClick={increment}>+</button>
        </div>
      </>
    );
}
