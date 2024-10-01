import { useState, createContext, useContext } from "react";

const UserContext = createContext();

export default function Component1() {
  const [user, setUser] = useState({name: "Jesse Hall"});

  const changeUser = () => {
    setUser("GO GO");
  }

  return (
    <UserContext.Provider value={user}>
      <h1>{`Hello ${user}!`}</h1>
      <button onClick={changeUser}>change user</button>
      <Component2 />
    </UserContext.Provider>
  );
}

function Component2() {
  return (
    <>
      <h1>Component 2</h1>
      <Component3 />
    </>
  );
}

function Component3() {
    const changeUser = () => {
        
    }
      
  return (
    <>
      <h1>Component 3</h1>

      <button onClick={changeUser}>change user</button>

      <Component4 />
    </>
  );
}

function Component4() {
  return (
    <>
      <h1>Component 4</h1>
      <Component5 />
    </>
  );
}

function Component5() {
  const user = useContext(UserContext);

  return (
    <>
      <h1>Component 5</h1>
      <h2>{`Hello ${user.name} again!`}</h2>
    </>
  );
}