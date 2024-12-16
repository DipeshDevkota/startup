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
   const id = (await params).id;
   const post = await client.fetch(STARTUP_BY_ID_QUERY,  {id} );
   console.log({ id });
   
   if (!post) return notFound();

   const parsedContent = md.render(post?.pitch || '');
    
   return (
     <>
       <section className="pink_container !min-h-[230px]">
       <p className="tag">{new Date(post?._createdAt).toISOString()}</p>

           <h1 className="heading">{post.title}</h1>
           <p className="sub-heading !max-w-5xl">{post.description}</p>
       </section>
<section className="">
   {post.image && (
     <Image
       src={post.image} 
       alt="thumbnail"
       width={1200}  
       height={800}  
       className="w-full h-auto rounded-xl"
     />
   )}

   <div className="space-y-5 mt-10 max-w-4xl mx-auto">
     <div className="flex-between gap-5">
       {post?.author?.image && (
         <Link
           href={`/user/${post.author?._id}`}
           className="flex gap-2 items-center mb-3"
         >
{post?.author?.image ? (
  <Image
    src={post?.author?.image}
    alt="avatar"
    width={64}
    height={64}
    className="rounded-full drop-shadow-lg"
  />
) : (
  <div className="rounded-full bg-gray-200 w-16 h-16"></div> // Fallback avatar
)}


           <div>
            <p className='text-20-medium'>{post.author.name}</p>
            <p className='text-20-medium'>@{post.author.username}</p>

           </div>
         </Link>
         
       )}

       <p className='category-tag'>{post.category}</p>
     </div>



     <h3 className='text-30-bold'>Pitch Details</h3>
     {parsedContent ? (
      <article
           className='prose max-w-4xl font-work-sans break-all'
           dangerouslySetInnerHTML={{ __html : parsedContent}}
      />
     ):(
      <p className='no-result'>
        No details provided!
      </p>
     )}
   </div>

   <hr className='divider'/>
   <Suspense fallback={<Skeleton className='view_skeleton'/>}>
    <View id={id}/>
   </Suspense>

</section>



     </>
   );
};

export default page;