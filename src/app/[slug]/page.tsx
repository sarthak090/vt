 

async function getPost(slug:string) {
    const res = await fetch(
      "https://wordpress-1294600-4703747.cloudwaysapps.com/wp-json/wp/v2/posts?slug="+slug
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
  
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }

export default async function page({
    params:  {slug}}:{params:{slug:string}}
) {
    const postData = await getPost(slug)
    const post = postData[0]
 

  return (
    <div className="container mx-auto px-32">

        <h1 className="text-3xl font-bold mb-4">{post.title.rendered}</h1>

        <img 
        
        src={post.x_featured_media_original}
        alt={post.title.rendered}

        />

        <div className="mx-4 post-content">
            <p dangerouslySetInnerHTML={{__html:post.content.rendered}}/>
        </div>

    </div>
  )
}
