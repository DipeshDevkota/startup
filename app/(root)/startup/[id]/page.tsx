// import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { Link, View } from 'lucide-react';
import { notFound } from 'next/navigation';
import Image from 'next/image'; // Ensure Image is imported
 
import markdownit from "markdown-it"
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
const md= markdownit()
export const experimental_ppr = true;
const page = async ({ params }: { params: { id: string } }) => {
  const id = params?.id; // Ensure `params` exists
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  console.log("Posts is:",post)
  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || 'No pitch content provided!');
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{new Date(post?._createdAt).toISOString()}</p>
        <h1 className="heading">{post.title || 'No Title'}</h1>
        <p className="sub-heading !max-w-5xl">
          {post.description || 'No description provided.'}
        </p>
      </section>
      <section>
        {post.image && (
          <Image
            src={post.image}
            alt="thumbnail"
            width={1200}
            height={800}
            className="w-[80vw] h-[80vh] ml-48 mt-20 rounded-xl"
          />
        )}
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            {post?.author?.image ? (
              <Image
                src={post?.author?.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
            ) : (
              <div className="rounded-full bg-gray-200 w-16 h-16"></div>
            )}
            <div>
              <p className="text-20-medium">{post.author?.name || 'Anonymous'}</p>
              <p className="text-20-medium">@{post.author?.username || 'unknown'}</p>
            </div>
          </div>
          <p className="category-tag">{post.category || 'Uncategorized'}</p>
          <h3 className="text-30-bold">Pitch Details</h3>
          <article
            className="prose max-w-4xl font-work-sans break-all"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
        </div>
        <hr className="divider" />
        <Suspense fallback={<Skeleton className="view_skeleton bg-neutral-400" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};


export default page;