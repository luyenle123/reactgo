import React, { useState } from 'react'

let initialArtists = [
    { id: 0, name: 'Marta Colvin Andrade' },
    { id: 1, name: 'Lamidi Olonade Fakeye'},
    { id: 2, name: 'Louise Nevelson'},
  ];

export default function ArrState(){
    const[name, setName] = useState('');
    const[artists, setArtists] = useState(initialArtists);

    const AddItemHandle = () => {
        if(!name || name.length === 0) return;

        let newId = getNextId();

        setArtists([
            ...artists,
            { id: newId, name: name }
          ]);
          setName('');
    }

    const getNextId = () => {
      let nextId = 0;
      if(artists.length === 0)
        return nextId;

      for(var i=0;i<artists.length;i++){
        var id = artists[i].id;
        if(id>nextId)
        {
          nextId = id;
        }
      }

      return nextId+=1;
    }

    const InsertItemHandle = () => {
      if(!name || name.length === 0) return;

      const insertAt = 1;
      let newId = getNextId();

      const nextArtists = [
        // Items before the insertion point:
        ...artists.slice(0, insertAt),
        // New item:
        { id: newId++, name: name },
        // Items after the insertion point:
        ...artists.slice(insertAt)
      ];
      setArtists(nextArtists);      

      // setArtists([
      //     ...artists,
      //     { id: newId, name: name }
      //   ]);
        setName('');
  }    

    const RemoveItemHandle = (id) => {
        var artistAfterRemove = artists.filter(a => a.id !== id);
        setArtists(artistAfterRemove);
    }    

    return (
        <>
          <h1>Inspiring sculptors:</h1>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button onClick={() => AddItemHandle()}>Add</button>
          <button onClick={() => InsertItemHandle()}>Insert</button>
          <ul>
            {artists && artists.length > 0 && artists.map(artist => (
              <li key={artist.id}>
                {artist.id} - {artist.name}
                <button onClick={() => RemoveItemHandle(artist.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </>
      );
}
