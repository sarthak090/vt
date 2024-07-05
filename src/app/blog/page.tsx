import Link from "next/link";

async function getData() {
  const res = await fetch(
    "https://wordpress-1294600-4703747.cloudwaysapps.com/wp-json/wp/v2/posts"
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function page() {
  const data = await getData();


  return (
    <div className="container mx-auto px-32 my-8">
      <div className="grid grid-cols-1 gap-8">
        {data.map((post: any) => (
             <Link href={`/`+post.slug}>
          <div className="flex gap-4">
            <div>
              <img
                src={post.x_featured_media_original}
                alt={post.title.rendered}
                className="max-w-[500px]"
              />
            </div>
            <div>
            <h4 className="mb-4 text-xl" >
               <span dangerouslySetInnerHTML={{__html:post.title.rendered}}></span> 
                </h4>
                <p dangerouslySetInnerHTML={{__html:post.excerpt.rendered}}/>
            </div>

          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
