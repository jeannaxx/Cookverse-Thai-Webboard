# Cookverse WebBoard

เว็บสำหรับผู้สอนและแอดมินของเกม Cookverse Thai (React + Vite) — ดูผลการเล่น คะแนน Rubric, Action Log, คำแนะนำจากป้าแสง และจัดการเมนู/ผู้ใช้

## เริ่มใช้งาน

```bash
npm install
npm run dev      # เปิด http://localhost:5173
npm run build    # ได้โฟลเดอร์ dist/ สำหรับ Deploy
```

เข้าสู่ระบบด้วยอีเมลอะไรก็ได้ (โหมดทดลอง) · อีเมลที่มีคำว่า `admin` จะเห็นเมนูผู้ใช้และสิทธิ์ และแก้น้ำหนัก Rubric ได้

## โครงสร้าง

```text
src/
  App.jsx               เส้นทางหน้าเว็บ
  auth.jsx              เข้าสู่ระบบแบบจำลอง (แทนด้วย Supabase Auth ทีหลัง)
  data/mock.js          ข้อมูลตัวอย่างทั้งหมด (แทนด้วย Supabase ทีหลัง)
  components/           Layout (เมนูข้าง) · RubricBars · SessionTable · Logo
  pages/                Login · Overview · Sessions · SessionDetail · Menus
  styles.css            สีและขนาดทั้งหมดอยู่ใน :root ด้านบนไฟล์
```

## ยังไม่ได้ทำ

- ต่อ Supabase (Auth + ตาราง players / sessions / action_logs / results / menus / users)
- ปุ่ม "เพิ่มเมนู" "เชิญผู้ใช้" และ "บันทึก" ความเห็นผู้สอน ยังไม่ส่งข้อมูลขึ้นระบบ

## Deploy (GitHub Pages)

push ขึ้น `main` แล้ว GitHub Actions จะ build และขึ้นเว็บให้อัตโนมัติ (`.github/workflows/deploy.yml`)
ดูเว็บได้ที่ https://jeannaxx.github.io/Cookverse-Webboard/

## เกม Unity

ตัวเกมอยู่อีก repo: [jeannaxx/Cookverse-Thai](https://github.com/jeannaxx/Cookverse-Thai) · เอกสารรูปแบบข้อมูล session / action log ที่เกมส่งมาอยู่ใน `Docs/` ของ repo นั้น
หลังบ้านใช้ Supabase (ตาราง + Auth) งานที่ต้องใช้ key ลับ เช่น เชิญผู้ใช้ หรือเรียก Gemini จะอยู่ใน Supabase Edge Functions

## กติกาความปลอดภัย

- `GEMINI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY` เก็บใน Secrets ของ Supabase Edge Functions เท่านั้น ห้ามอยู่ในหน้าเว็บ
- ห้ามใส่ key ในโค้ด ในเกม Unity ในแชท หรือ commit (`.env` ถูก ignore ไว้แล้ว)
- เกมต้องเล่นจบได้เสมอแม้หลังบ้านหรือ AI ล่ม (ส่งไม่สำเร็จ → เก็บในเครื่องแล้วส่งซ้ำ)
