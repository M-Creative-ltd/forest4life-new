import "../styles.css";
import { reader } from "../reader";

export default async function posts(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;

  const post = await reader.collections.blogs.read(slug);

  if (!post) {
    return <div>Post not found!</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      {/* TODO: Render structured blog content from post.content when ready */}
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await reader.collections.blogs.list();

  return slugs.map(slug => ({
    slug,
  }));
}
