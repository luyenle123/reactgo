function Item({name, isPacked}){

    let itemContent = name;
    if(isPacked){
        itemContent = name + ' ✔'
    }
    
    return(
        <li className="item">
            {itemContent}
        </li>
    );

    // return(
    //     <li className="item">
    //         {name} {isPacked && ' ✔'}
    //     </li>
    // );

    // return(
    //     <li className="item">
    //         {isPacked ? (
    //             <del>
    //                 {name + ' ✔'}
    //             </del>
    //         ) :(name)}
    //     </li>
    // );

    // return(
    //     <li className="item">
    //         {isPacked ? name + ' ✔' : name}
    //     </li>
    // );

    // if(isPacked){
    //     return null;
    //     //return <li className="item">{name} ✔</li>
    // }

    // return <li className="item">{name}</li>
  }

export function PackingList(){
    return(
        <section>
            <h1>Packing List</h1>
            <ul>
                <Item
                    isPacked = {true}
                    name = "Space suit"
                />
                <Item
                    isPacked = {false}
                    name = "Helmet with a golden leaf"
                />
                <Item
                    isPacked = {true}
                    name = "Photo of GO"
                />                
            </ul>
        </section>
    );
}