# 1) Install deps
npm i

# 2) Run dev server
npm run dev

Dev server: http://localhost:5173

Node ≥ 18 recommended

# Tech stack

React + TypeScript
Vite
React Router v6
react-hook-form (forms & validation)
Tailwind CSS (styling)
react-international-phone (phone input on registration)
Lightweight SVG icon system (config → <Icon />)

# User flow implemented
## 1) Registration (multi-step wizard)

**Step 1 — Phone:** phone field with country code preview, validation; consent checkbox
On submit, phone meta (iso2, dial) + normalized number are saved to localStorage.
Step is advanced and current step is persisted.

**Step 2 — Role:** choose customer / carrier
Choice is saved to localStorage, step advances to OTP.

**Step 3 — OTP:**
- **Test code: `000000`** ← use this to pass verification
- 6-digit code UI with visible blinking cursor, paste support, auto-verify when all digits entered.
- Error state with red borders; on error, focus returns to last cell.
- Resend timer (60s), button enabled after countdown.
- On success → auto-advance to Questionary.

**Step 4 — Questionary:**
Reusable <Input /> component.
Validations:
  Email — format check
  Password — min 8, letters + digits
  ИИН/БИН — exactly 12 digits (numbers only)
  Submit disabled until required fields valid.

On submit:
All profile data saved as one object to localStorage under register.profile.

Redirect to /profile.

Registration progress is restored from localStorage after reloads (resumes where you left off).

## 2) Profile

Layout: fixed Topbar, Sidebar, content area.
Topbar avatar click opens a right slide-over panel with profile form.
Profile edit panel:
Fields: last name, first name, middle name, phone, email.

