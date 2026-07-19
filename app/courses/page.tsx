import Link from 'next/link';

interface Course {
 id: string;
 nameEn: string;
 nameTh: string;
 credits: number;
 instructor: string;
 image: string;
}

const courses: Course[] = [
 {
   id: '0214321',
   nameEn: 'Web Application Design and Development Course',
   nameTh: 'ชุดวิชาการออกแบบและพัฒนาเว็บแอปพลิเคชัน',
   credits: 3,
   instructor: 'อ.คณิดา ',
   image: '/img/course1.svg',
 },
 {
   id: '0214235',
   nameEn: 'Digital technology for entrepreneurship',
   nameTh: 'เทคโนโลยีดิจิทัลสำหรับการประกอบการ',
   credits: 3,
   instructor: 'อ.อรยา',
   image: '/img/po01.png',
 },
 {
   id: '0214201',
   nameEn: 'Opinion surveys and data processing.',
   nameTh: 'การสำรวจความคิดเห็นและการประมวลผล',
   credits: 3,
   instructor: 'อ.สุดา',
   image: '/img/course3.svg',
 },
];

export default function Courses() {
 return (
   <main className="min-h-screen bg-linear-to-b from-blue-50 to-white p-6 md:p-12">
     <div className="max-w-6xl mx-auto">
       <h1 className="text-4xl font-bold text-blue-900 mb-3">รายวิชาของฉัน</h1>
       <p className="text-gray-600 mb-8">รวมรายวิชาที่สอนและพัฒนา</p>
       
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {courses.map((c: Course) => (
           <Link key={c.id} href={`/courses/${c.id}`}>
             <div className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300">
               {/* Image */}
               <div className="w-full h-48 bg-linear-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                 <div className="text-center text-white">
                   <p className="text-sm font-semibold">รหัสวิชา</p>
                   <p className="text-3xl font-bold">{c.id}</p>
                 </div>
               </div>
               
               {/* Content */}
               <div className="p-5">
                 <h2 className="font-bold text-lg text-blue-900 mb-2 line-clamp-2">{c.nameTh}</h2>
                 <p className="text-sm text-gray-600 mb-3 line-clamp-1">{c.nameEn}</p>
                 
                 <div className="flex justify-between items-center text-sm text-gray-700 border-t pt-3">
                   <span className="font-semibold">{c.credits} หน่วยกิต</span>
                   <span className="text-blue-600 font-medium">→</span>
                 </div>
               </div>
             </div>
           </Link>
         ))}
       </div>
     </div>
   </main>
 );
}