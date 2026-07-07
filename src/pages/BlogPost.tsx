import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { POSTS } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!slug) return;
      try {
        const res = await fetch("/api/blogs/" + slug);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (mounted) {
          setPost(data);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (mounted) {
          const fallbackPost = POSTS.find(p => p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug.toLowerCase());
          setPost(fallbackPost ? { ...fallbackPost, content: fallbackPost.excerpt, publish_date: fallbackPost.date } : null);
          setLoading(false);
        }
      }
    })();
    return () => { mounted = false; };
  }, [slug]);

  if (loading) return <div className="pt-32 pb-24 text-center font-display uppercase tracking-widest text-brand-green-forest/40">Loading Publication...</div>;

  if (!post) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <p className="mb-6">We couldn't find a blog post matching '{slug}'.</p>
        <Link to="/blog"><Button variant="outline" className="rounded-none uppercase tracking-widest text-[10px] font-bold">Back to Blog</Button></Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link to="/blog" className="inline-flex items-center text-xs uppercase tracking-widest font-bold text-brand-green-deep/50 hover:text-brand-green-forest mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
        </Link>

        <h1 className="text-4xl font-display font-medium mb-4">{post.title}</h1>
        <p className="text-sm text-brand-green-deep/70 mb-8 border-b pb-6 border-brand-green-forest/10 uppercase tracking-widest font-bold text-[10px]">{post.author} · {post.publish_date ? new Date(post.publish_date).toLocaleDateString() : post.date} · {post.category}</p>
        
        {post.featured_image && <img src={post.featured_image} alt={post.title} className="w-full mb-10" />}
        
        <p className="text-brand-green-deep/80 leading-relaxed mb-10 whitespace-pre-wrap">{post.content}</p>
        
        <div className="flex gap-4 pt-8 border-t border-brand-green-forest/10">
          <Link to="/blog"><Button className="bg-brand-green-forest text-white rounded-none uppercase tracking-widest text-[10px] font-bold">More Publications</Button></Link>
        </div>
      </section>
    </div>
  );
}
