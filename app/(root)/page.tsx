import React from 'react'
import SearchForm from '../../components/SearchForm'
import StartUpCard, { StartupTypeCard } from '@/components/StartUpCard';
import { client } from '@/sanity/lib/client';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';
const  Home = async ({searchParams}:{searchParams: Promise<{query?:string}>}) => {

  const query = (await searchParams).query;
  console.log(query)
   
  const posts = await client.fetch(STARTUPS_QUERY);

  return (
    <>

    <section className='pink_container'>
  <h1 className='heading'>Pitch your startup,<br/>Connect With Entrepreneurs</h1>

  <p className='sub-heading !max-w-3xl'>
    Submit Ideas,Vote on Pitches, and Get Noticed in Virtual Competitions.
  </p>


  <SearchForm query= {query}/>


  </section>

  <section className='section_container'>
    <p className='text-30-semibold'>


      {query ? `Search results for "${query}"`:`All Startups`}
    </p>

    <ul className='mt-7 card_grid'>
      {posts?.length > 0 ?
      (
        posts.map((post : StartupTypeCard)=>(
          <StartUpCard key={post?._id} post={post}/>
        ))
      ):(

        <p className='no-results'>No startups found</p>
      )}

    </ul>

  </section>
    </>
  )
}

export default Home
