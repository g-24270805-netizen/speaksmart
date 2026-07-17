# SPM EssayMark AI

Full-stack Next.js application for Malaysian English teachers to assess SPM English Paper 2 writing. Results are labelled **AI-assisted provisional mark – teacher verification required** and must not be treated as official SPM marks.

## Features
- Teacher dashboard for Part 1 Email, Part 2 Guided Writing, and Part 3 Story/Review/Report.
- Editable content points, accepted interpretations, no-award conditions and compulsory sentence checks.
- Two-stage marking: task fulfilment evidence first, then holistic Content, Communicative Achievement, Organisation and Language scores.
- OpenAI Responses API server-side only via `OPENAI_API_KEY`.
- SQLite + Prisma models for teachers, templates, content parameters, students, submissions, AI marking, teacher moderation and benchmark essays.
- TXT, text-based PDF and DOCX upload extraction for teacher verification.
- Calibration benchmark page, moderation controls, print/PDF placeholder and CSV export.

## Setup
1. `npm install`
2. `cp .env.example .env.local`
3. Set `OPENAI_API_KEY` in `.env.local` and `DATABASE_URL="file:./dev.db"`.
4. `npx prisma generate`
5. `npx prisma db push`
6. `npm run seed`
7. `npm run dev`

## Testing
- `npm run lint`
- `npm test`
- `npm run build`

## Notes
If `OPENAI_API_KEY` is absent, the app uses a conservative heuristic fallback and forces teacher review. Handwriting recognition is experimental and must never be marked before teacher transcription verification.
