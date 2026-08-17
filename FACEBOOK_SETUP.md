# Facebook Auto Post Setup Guide

## ขั้นตอนการตั้งค่า

### 1. สร้าง Facebook App
- ไปที่ https://developers.facebook.com
- กด **Create App** → เลือก **Business** type
- ตั้งชื่อ App เช่น "AW Dev Auto Post"

### 2. เพิ่ม Facebook Pages Product
- ไปที่ **Products → Add Product**
- เลือก **Facebook Pages** → Set Up

### 3. ขอสิทธิ์
- ไปที่ **App Review → Permissions and Features**
- ขอสิทธิ์:
  - `pages_manage_posts` — โพสต์ได้
  - `pages_read_engagement` — อ่านโพสต์ได้
  - `pages_show_list` — ดู Page ได้

### 4. สร้าง Page Access Token
- ไปที่ **Graph API Explorer** (https://developers.facebook.com/tools/explorer/)
- เลือก App ของคุณ
- กด **Generate User Token** เลือกสิทธิ์ `pages_manage_posts`, `pages_read_engagement`
- เรียก API: `GET /me/accounts` → ได้ Page Access Token + Page ID

### 5. สร้างไฟล์ .env.local
สร้างไฟล์ `.env.local` ในโฟลเดอร์โปรเจค (ข้างนอก src) แล้วใส่:

```
FB_PAGE_ACCESS_TOKEN=EAAG...your_token...
FB_PAGE_ID=1234567890
```

### 6. Deploy
- ถ้า deploy บน Vercel: ไปที่ Settings → Environment Variables → เพิ่มค่าทั้งสองตัว
- Redeploy แล้วเข้าหน้า /autopost เพื่อใช้งาน

## หน้าที่ใช้งาน
- `/autopost` — Dashboard หลัก
- `/api/facebook-post` — API สำหรับโพสต์
- `/api/facebook-post/blog` — API สำหรับโพสต์บทความบล็อก
