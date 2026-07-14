import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ id: string }>; // 1. แก้ตรงนี้เพิ่ม Promise
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params; // 2. เพิ่ม await ตรงนี้
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();
  
  return {
    title: post.title || 'ไม่มีชื่อบทความ',
    description: post.body ? post.body.slice(0, 160) : 'ไม่มีคำอธิบาย',
  };
}

interface Post {
  id: number;
  title: string;
  body: string;
}

export default async function PostDetail({ params }: Props) {
  const { id } = await params; // 2. เพิ่ม await ตรงนี้
  
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return (
      <main className="p-12">
        <h1 className="text-red-500">ไม่พบบทความ #{id}</h1>
      </main>
    );
  }

  const post: Post = await res.json();

  return (
    <main className="p-12 max-w-2xl mx-auto">
      <p className="text-gray-400 text-sm mb-2">บทความ #{post.id}</p>
      <h1 className="text-3xl font-bold text-blue-900 mb-4">{post.title}</h1>
      <p className="text-gray-700 leading-relaxed">{post.body}</p>
    </main>
  );
}