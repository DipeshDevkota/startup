import React from 'react';
import SearchForm from '../../components/SearchForm';
import StartUpCard, { StartupTypeCard } from '@/components/StartUpCard';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { getServerSession } from 'next-auth/next'; // Import getServerSession
import { authOptions } from '@/auth'; // Import your authOptions

const Home = async ({ searchParams }: { searchParams: { query?: string } }) => {
    const query = searchParams.query || null; // Safely retrieve the query
    console.log('Search query:', query);

    // Session retrieval
    const session = await getServerSession(authOptions);
    console.log('Session:', session?.id);

    const params = { search: query }; // Query params for Sanity fetch

    // Fetch posts
    const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

    return (
        <>
            <section className="pink_container">
                <h1 className="heading">Pitch your startup,<br />Connect With Entrepreneurs</h1>

                <p className="sub-heading !max-w-3xl">
                    Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
                </p>

                <SearchForm query={query} />
            </section>

            <section className="section_container">
                <p className="text-30-semibold">
                    {query ? `Search results for "${query}"` : `All Startups`}
                </p>

                <ul className="mt-7 card_grid">
                    {posts?.length > 0 ? (
                        posts.map((post: StartupTypeCard) => (
                            <StartUpCard key={post?._id} post={post} />
                        ))
                    ) : (
                        <p className="no-results">No startups found</p>
                    )}
                </ul>
            </section>

            <SanityLive />
        </>
    );
};

export default Home;