import React, { Suspense } from 'react'
// import { Search } from '../components/Search/search'

const Search = React.lazy(() => import('../components/Search/search.js'));

export default function SearchPage(){
  return (
    <>
      <Suspense>
          <Search/>
      </Suspense>
    </>
  )
}
