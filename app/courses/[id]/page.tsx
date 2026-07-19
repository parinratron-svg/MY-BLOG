import Link from 'next/link';

interface CourseDetail {
 nameEn: string;
 nameTh: string;
 credits: number;
 instructor: string;
 description: string;
 image: string;
}

const courseData: Record<string, CourseDetail> = {
 '0214321': {
   nameEn: 'Web Application Design and Development Course',
   nameTh: 'ชุดวิชาการออกแบบและพัฒนาเว็บแอปพลิเคชัน',
   credits: 3,
   instructor: 'อ.คณิดา',
   description: 'วิชานี้เน้นการศึกษาหลักการออกแบบและพัฒนาเว็บแอปพลิเคชันโดยใช้เทคโนโลยีสมัยใหม่ เช่น React, Next.js, และ TypeScript นักศึกษาจะได้เรียนรู้การสร้าง UI/UX ที่ดี การจัดการ state, routing, และการเชื่อมต่อกับฐานข้อมูล พร้อมฝึกปฏิบัติจริงในการสร้างโปรเจคเว็บแอปพลิเคชัน',
   image: '/img/po02.png',
 },
 '0214235': {
   nameEn: 'Digital technology for entrepreneurship',
   nameTh: 'เทคโนโลยีดิจิทัลสำหรับการประกอบการ',
   credits: 3,
   instructor: 'อ.อรยา',
   description: `จุดมุ่งหมายของรายวิชา (Course Goals)
1. มีความรู้พื้นฐานเกี่ยวกับการใช้งานเครื่องมือด้านดิจิทัล
2. สามารถนำเสนอสารสนเทศจากการสืบค้น
3. สามารถประยุกต์การใช้โปรแกรมเพื่อจัดการเอกสาร การคำนวณ การจัดทำอินโฟกราฟิก และสื่อสังคมออนไลน์เพื่อการประกอบการ
4. ตระหนักถึงความสำคัญของการใช้เทคโนโลยีดิจิทัลอย่างมีคุณธรรม จริยธรรม`,
   image: '/img/po1.png',
 },
 '0214201': {
   nameEn: 'Opinion surveys and data processing.',
   nameTh: 'การสำรวจความคิดเห็นและการประมวลผลข้อมูล',
   credits: 3,
   instructor: 'อ.สุดา',
   description: `จุดมุ่งหมายของรายวิชา (Course Goals)
1. อธิบายแนวคิด หลักการ ประเภทข้อมูล แหล่งข้อมูล และขั้นตอนการดำเนินการสำรวจความคิดเห็นได้อย่างถูกต้อง
2. ออกแบบและดำเนินการสำรวจความคิดเห็นได้สอดคล้องกับวัตถุประสงค์และความต้องการใช้งาน โดยสามารถกำหนดประเด็นศึกษา กลุ่มเป้าหมาย และสร้างเครื่องมือเก็บรวบรวมข้อมูลได้อย่างเหมาะสม
3. ใช้เครื่องมือดิจิทัลในการสร้างแบบสำรวจ จัดการข้อมูล ประมวลผล วิเคราะห์แปลความหมาย และนำเสนอผลการสำรวจความคิดเห็นเพื่อนำไปใช้ประกอบการตัดสินใจได้
4. ดำเนินการสำรวจความคิดเห็นและใช้ข้อมูลอย่างมีคุณธรรม จริยธรรม และคำนึงถึงความรับผิดชอบต่อผู้ให้ข้อมูลและสังคม`,
   image: '/img/po03.png',
 },
};

export default async function CourseDetail(
 { params }: { params: Promise<{ id: string }> }
) {
 const { id } = await params;
 const course = courseData[id];

 if (!course) {
   return (
     <main className="min-h-screen bg-linear-to-b from-red-50 to-white p-6 md:p-12">
       <div className="max-w-4xl mx-auto text-center">
         <h1 className="text-3xl font-bold text-red-500 mb-4">ไม่พบรายวิชา {id}</h1>
         <Link
           href="/courses"
           className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
         >
           ← กลับไปยังรายวิชา
         </Link>
       </div>
     </main>
   );
 }

 return (
   <main className="min-h-screen bg-linear-to-b from-blue-50 to-white p-6 md:p-12">
     <div className="max-w-4xl mx-auto">
       {/* Back Button */}
       <Link
         href="/courses"
         className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-6 transition-colors"
       >
         ← กลับไปยังรายวิชา
       </Link>

       {/* Header Section */}
       <div className="bg-linear-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white mb-8">
         <p className="text-blue-100 text-sm font-semibold mb-2">รหัสวิชา</p>
         <h1 className="text-4xl font-bold mb-2">{id}</h1>
         <h2 className="text-2xl font-semibold text-blue-100 mb-4">{course.nameTh}</h2>
         <p className="text-blue-100 italic">{course.nameEn}</p>
       </div>

       {/* Main Content */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Left Column - Image and Quick Info */}
         <div className="lg:col-span-1">
           {/* Image */}
           <img 
             src={course.image}
             alt={course.nameTh}
             className="w-full h-64 object-cover rounded-xl shadow-md mb-6"
           />

           {/* Quick Info Card */}
           <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
             <div className="border-b pb-4">
               <p className="text-gray-600 text-sm font-semibold mb-1">หน่วยกิต</p>
               <p className="text-2xl font-bold text-blue-600">{course.credits}</p>
             </div>
             <div>
               <p className="text-gray-600 text-sm font-semibold mb-2">ผู้สอน</p>
               <p className="text-lg font-semibold text-gray-800">{course.instructor}</p>
             </div>
           </div>
         </div>

         {/* Right Column - Description */}
         <div className="lg:col-span-2">
           <div className="bg-white rounded-xl shadow-md p-8">
             <h3 className="text-2xl font-bold text-blue-900 mb-4">คำอธิบายรายวิชา</h3>
             <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
               {course.description}
             </div>

             {/* Additional Info */}
             <div className="mt-8 grid grid-cols-2 gap-4">
               <div className="bg-blue-50 rounded-lg p-4">
                 <p className="text-gray-600 text-sm font-semibold mb-1"></p>
                 <p className="text-gray-800 font-semibold"></p>
               </div>
               <div className="bg-blue-50 rounded-lg p-4">
                 <p className="text-gray-600 text-sm font-semibold mb-1"></p>
                 <p className="text-gray-800 font-semibold"></p>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </main>
 );
}