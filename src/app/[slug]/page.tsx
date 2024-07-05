import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getPost(slug: string) {
  const res = await fetch(
    "https://wordpress-1294600-4703747.cloudwaysapps.com/wp-json/wp/v2/posts?slug=" +
      slug
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
 
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    // read route params
    const slug = params.slug
   
    // fetch data
    const res = await fetch(
        "https://wordpress-1294600-4703747.cloudwaysapps.com/wp-json/wp/v2/posts?slug=" +
          slug
      );   
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }
    
      const postData =await res.json();
    //   console.log(postData)
      const post = postData[0]
   
   
    return {
      title:post.title.rendered,
      openGraph: {
        images: ['/some-specific-page-image.jpg',],
      },
    }
  }

export default async function page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const postData = await getPost(slug);
  const post = postData[0];

  return (
    <div className="container mx-auto px-32">
      <h1 className="text-3xl font-bold mb-4">{post.title.rendered}</h1>

      <img src={post.x_featured_media_original} alt={post.title.rendered} />

      <div className="mx-4 post-content">
        <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </div>
    </div>
  );
}
