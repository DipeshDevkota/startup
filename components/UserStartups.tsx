"use client"; // Mark as a Client Component
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import StartUpCard, { StartupTypeCard } from "./StartUpCard";

const UserStartups = ({ id }: { id: string }) => {
  const [startups, setStartups] = useState<StartupTypeCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStartups = async () => {
      const data = await client.fetch(STARTUP_BY_AUTHOR_QUERY, { id });
      setStartups(data);
      setLoading(false);
    };

    fetchStartups();
  }, [id]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : startups.length > 0 ? (
        startups.map((startup) => (
          <StartUpCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
};

export default UserStartups;
