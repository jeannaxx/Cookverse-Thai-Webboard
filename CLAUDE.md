# Cookverse Thai WebBoard

เว็บสำหรับผู้สอนและแอดมินของเกม VR Cookverse Thai (สอนทำอาหารไทยกับป้าแสง) ดูผลการเล่น คะแนน Rubric, Action Log และจัดการเมนู/ผู้ใช้
ตัวเกม Unity อยู่อีก repo: `jeannaxx/Cookverse-Thai` — ห้ามแก้จาก repo นี้

## Stack

- React 18 + Vite 5 + React Router 6, JavaScript (`.jsx`) ไม่ใช้ TypeScript
- CSS ธรรมดาใน `src/styles.css` (สีและขนาดอยู่ใน `:root`) ไม่ใช้ Tailwind
- Hosting: GitHub Pages (`.github/workflows/deploy.yml`) — build อัตโนมัติเมื่อ push เข้า `main`
- หลังบ้าน (ยังไม่ได้ต่อ): Supabase (PostgreSQL + Auth) และ Supabase Edge Functions สำหรับ `/api/sessions`, `/api/ai/*` (Gemini)
- ไม่ใช้ Netlify (แผนฟรีจำกัดเครดิต)

## คำสั่ง

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # ต้องผ่านก่อน commit ทุกครั้ง
```

## โครงสร้าง

- `src/pages/` หน้าเว็บ · `src/components/` ส่วนประกอบ
- `src/data/mock.js` ข้อมูลตัวอย่างทั้งหมด (จะแทนด้วย Supabase)
- `src/auth.jsx` login แบบจำลอง: อีเมลที่มีคำว่า `admin` = แอดมิน, อื่นๆ = ผู้สอน, มีโหมดผู้เยี่ยมชม
- base path มาจาก `BASE_PATH` ตอน build (`vite.config.js`) และ `BrowserRouter basename={import.meta.env.BASE_URL}` — ห้ามเขียน path `/Cookverse-Thai-Webboard/` ตายตัวในโค้ด

## Branch และการทำงาน (2 คน)

```
dev-jenny ─┐
           ├─ Pull Request → develop ─ Pull Request → main → deploy อัตโนมัติ
dev-aom ───┘
```

- ทำงานใน branch ของตัวเองเท่านั้น (`dev-jenny` หรือ `dev-aom`) ห้าม commit/push ตรงเข้า `develop` หรือ `main`
- ก่อนเริ่มงาน ดึง `develop` เข้า branch ตัวเองก่อน
- ห้าม force push และห้ามลบ branch `main` / `develop`

## กติกา commit และ Pull Request

- **ห้ามใส่ชื่อหรือโลโก้ Claude ในงานที่ commit** — ไม่ใส่ `Co-Authored-By: Claude ...` ในข้อความ commit และไม่ใส่ "Generated with Claude Code" หรือลิงก์ session ใน Pull Request
- ข้อความ commit เป็นภาษาอังกฤษสั้นๆ บอกว่าเปลี่ยนอะไร
- commit หรือ push เมื่อผู้ใช้สั่งเท่านั้น

## ความปลอดภัย

- ห้ามใส่ key ลับในโค้ดหรือ commit (`GEMINI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) — เก็บใน Secrets ของ Supabase Edge Functions เท่านั้น
- หน้าเว็บใช้ได้แค่ `VITE_SUPABASE_URL` และ `VITE_SUPABASE_ANON_KEY` (ใน `.env.local` / GitHub Secrets) และทุกตารางต้องเปิด RLS
- repo เป็น public — ห้ามใส่ข้อมูลนักเรียนจริงใน `mock.js`

## เนื้อหา

- UI เป็นภาษาไทย
- เมนูที่เปิดใช้ในเกมตอนนี้มีแค่ ผัดกะเพราไก่ (`mission_krapow_chicken_01`) เมนูอื่นเป็น "ฉบับร่าง" รอยืนยันสูตรกับอาจารย์
- เส้นผ่านคะแนนคือ `PASS_LINE = 70` ใน `mock.js`
