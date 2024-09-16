import React, { useState } from 'react'

let nextId = 0;

let initialArtists = [
    { id: 0, name: 'Marta Colvin Andrade' },
    { id: 1, name: 'Lamidi Olonade Fakeye'},
    { id: 2, name: 'Louise Nevelson'},
  ];

export default function ArrState(){
    const[name, setName] = useState('');
    const[artists, setArtists] = useState(initialArtists);

    const AddItemHandle = () => {
        if(!name || name.length == 0) return;
        setArtists([
            ...artists,
            { id: nextId++, name: name }
          ]);
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
          <ul>
            {artists && artists.length > 0 && artists.map(artist => (
              <li key={artist.id}>
                {artist.name}
                <button onClick={() => RemoveItemHandle(artist.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </>
      );
}
