'use client';

import React, { useEffect, useState } from 'react';
import Ping from './Ping';
import { client } from '@/sanity/lib/client';
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write-client';

const View = ({ id }: { id: string }) => {
  const [totalViews, setTotalViews] = useState<number | null>(null);

  useEffect(() => {
    const fetchAndIncrementViews = async () => {
      try {
        // Fetch the current view count
        const { views } = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, { id });

        if (views !== undefined) {
          setTotalViews(views);

          // Increment views in the database
          await writeClient
            .patch(id)
            .set({ views: views + 1 })
            .commit();

          // Update state after successful increment
          setTotalViews(views + 1);
        }
      } catch (error) {
        console.error('Error fetching or updating views:', error);
      }
    };

    fetchAndIncrementViews();
  }, [id]);

  if (totalViews === null) {
    // Loading state
    return null;
  }

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">Views: {totalViews ?? 'Loading...'}</span>
      </p>
    </div>
  );
};

export default View;
