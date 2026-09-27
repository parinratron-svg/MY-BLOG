# my-blog (Web Application Design and Development)

https://github.com/user-attachments/assets/35b0ac1b-cb18-415a-bc91-6268932bf3ef

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and deployed on **Vercel** with **Neon Serverless PostgreSQL**.

---

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📋 Workshop — Team Deployment Readiness (Week 12)

### 1. Deployment Readiness Checklist ของทีม (5 ข้อ)

1. **การตรวจสอบ Environment Variables ครบถ้วน (Configuration Check)**
   - ตรวจสอบว่าตัวแปรลับทั้งหมด โดยเฉพาะ `DATABASE_URL` (แบบ pooled ของ Neon) และ `DIRECT_URL` ถูกตั้งค่าครบทั้ง 3 Scope (`Production`, `Preview`, `Development`) บน Vercel ก่อนการ Deploy ทุกครั้ง

2. **การทดสอบบน Preview Deployment ก่อนเสมอ (Staging / Preview Testing)**
   - ทุกครั้งที่มีการพัฒนาฟีเจอร์ใหม่ ต้องเปิด Pull Request (PR) และเข้าทดสอบฟังก์ชันทั้งหมด (การสมัครสมาชิก, การล็อกอิน, CRUD บทความ) บน Preview Link ให้ผ่าน 100% ก่อนกด Merge เข้าสู่ `main`

3. **การตรวจสอบความปลอดภัยของ Database Schema (Migration Safety)**
   - หากมีการแก้ไขไฟล์ `schema.prisma` ต้องทดสอบ Migration และยืนยันว่าจะไม่ส่งผลกระทบหรือทำให้ข้อมูลเดิมบน Production สูญหาย

4. **ข้อตกลงและกระบวนการอนุมัติก่อน Merge (Code Review & Team Sync)**
   - ต้องได้รับการรีวิวและ Approve จากเพื่อนในทีมอย่างน้อย 1 คนก่อน และต้องแจ้งสมาชิกในทีมก่อนกด Merge เข้า `main` เสมอ เพื่อให้ทุกคนรับรู้สถานะการ Deploy ใหม่

5. **สิทธิ์การ Rollback และการเฝ้าระวังข้อผิดพลาด (Incident Response & Monitoring)**
   - สมาชิกทุกคนในทีมต้องรู้วิธีการทำ Instant Rollback (`Promote to Production`) บน Vercel เมื่อเกิดเหตุฉุกเฉิน และต้องเฝ้าดูแท็บ Runtime Logs อย่างน้อย 5-10 นาทีหลังการ Deploy ขึ้น Production

---

### 2. การตั้งค่า Custom Domain
- **สถานะ:** ใช้งานโดเมนหลักของ Vercel (`.vercel.app`) ซึ่งรองรับ HTTPS และเชื่อมต่อระบบ CI/CD อย่างสมบูรณ์

---

### 3. สรุปความพร้อมของ my-blog สำหรับเป็นฐานของ Final Project

โปรเจกต์ `my-blog` มีความพร้อมสูงในการใช้เป็นฐานเริ่มต้นสำหรับ Final Project (Week 13-15) เนื่องจากระบบ CI/CD บน Vercel ทำงานร่วมกับ GitHub และฐานข้อมูล Neon Cloud Database ได้อย่างสมบูรณ์ รองรับการสร้าง Preview Deployment แบบอัตโนมัติในทุก PR และทีมได้ผ่านการฝึกฝนการอ่าน Runtime Logs เพื่อวินิจฉัยปัญหา รวมถึงการทำ Instant Rollback ในสภาพแวดล้อมจริงเรียบร้อยแล้ว

**จุดที่ยังต้องระมัดระวัง:** 
คือการจัดการ Schema Migration ในช่วงที่มีการแก้ไขโค้ดพร้อมกันหลายคน และการบริหารจัดการ Connection Limit ของฐานข้อมูล ซึ่งทีมจะใช้ Connection Pooling และปฏิบัติตาม Deployment Readiness Checklist อย่างเคร่งครัดเพื่อป้องกันไม่ให้ระบบ Production เกิดข้อผิดพลาด