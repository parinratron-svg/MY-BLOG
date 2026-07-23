import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'หน้าแรก',
};

interface Post {
  id: number;
  title: string;
  body: string;
}

async function getRecentPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3', { cache: 'no-store' });
  return res.json();
}

export default async function Home() {
  const posts: Post[] = await getRecentPosts();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      
      {/* 1. ส่วน Profile Card */}
      <section className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/50 flex flex-col md:flex-row items-center gap-8">
        <div className="w-40 h-40 rounded-full overflow-hidden shadow-xl ring-4 ring-white">
          <img src="/img/pun.png" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-blue-900">ปริญญาธรณ์ นาคิน</h1>
          <p className="text-xl text-blue-600 font-medium">ชื่อเล่น: [ชื่อเล่น] | รหัสนิสิต: 6720210043</p>
          <div className="mt-4 text-gray-700 space-y-1">
            {/* เพิ่ม: Social Links */}
          <div className="flex gap-4 mt-4">
             <a href="https://www.facebook.com" className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition">Facebook</a>
             <a href="https://github.com" className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition">GitHub</a>
          </div>
            <p>🎯 <strong>เป้าหมาย:</strong> เป็นนักพัฒนาซอฟต์แวร์ที่สร้างสรรค์สิ่งดีๆ</p>
            <p>💡 <strong>คติประจำใจ:</strong> [ทำวันนี้ให้ดีที่สุด]</p>
            <p>🎮 <strong>งานอดิเรก:</strong> เล่นเกม, อ่านมังงะ, เขียนโค้ด</p>
          </div>
        </div>
      </section>

      {/* 2. ส่วนวิดีโอแนะนำตัว */}
      <section>
        <h2 className="text-2xl font-bold text-blue-900 mb-6">🎬 วิดีโอแนะนำตัว</h2>
        <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200">
          <video className="w-full" autoPlay loop muted playsInline>
            <source src="/video/5.mp4" type="video/mp4" />
            เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
          </video>
        </div>
      </section>

      {/* 3. ส่วน Anime ที่ชอบ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {[
    { title: "Lycoris Recoil", img: "/img/1.png", desc: "เล่าถึงเมืองโตเกียวที่แสนสงบสุข ซึ่งเบื้องหลังถูกปกป้องโดยองค์กรลับ DA..." },
    { title: "There's No Freaking Way...", img: "/img/2.png", desc: "เล่าเรื่องของ เรนาโกะ อามาโอริ สาวเก็บตัวที่ตั้งใจจะเปลี่ยนแปลงตัวเอง..." },
    { title: "ACosmic Princess Kaguya!", img: "/img/3.png", desc: "ภาพยนตร์เล่าเรื่องราวของ ซาคาโยริ อิโรฮะ สาวมัธยมปลายที่ทำงานหนัก..." }
  ].map((anime, index) => (
    <div 
      key={index} 
      className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3"
    >
      {/* รูปภาพพร้อมเอฟเฟกต์ซูม */}
      <div className="overflow-hidden">
        <img 
          src={anime.img} 
          alt={anime.title} 
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110" 
        />
      </div>
      
      <div className="p-6">
        {/* Badge สวยๆ */}
        <span className="inline-block px-3 py-1 mb-3 text-[10px] font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
          My Favorite
        </span>
        
        <h3 className="text-lg font-extrabold text-blue-950 mb-2 leading-snug">
          {anime.title}
        </h3>
        
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-4">
          {anime.desc}
        </p>
      </div>

      {/* เส้นขีดตกแต่งด้านล่างที่จะแสดงเวลาเอาเมาส์วาง */}
      <div className="h-1.5 w-0 bg-blue-500 transition-all duration-500 group-hover:w-full"></div>
    </div>
  ))}
</div>

      {/* 4. ส่วนบทความล่าสุด */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">บทความล่าสุด</h2>
          <Link href="/posts" className="text-blue-600 font-semibold hover:underline">ดูทั้งหมด →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post: Post) => (
            <Link key={post.id} href={`/posts/${post.id}`}
              className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
             {/* ส่วนที่เพิ่มเข้ามาเพื่อให้ดูสวยงาม */}
        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">
          New Post
        </span>

        <h3 className="font-bold text-blue-800 mb-2 mt-2">{post.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
          {post.body.slice(0, 80)}...
        </p>
      </Link>
    ))}
  </div>
</section>
  </div>
  );
}