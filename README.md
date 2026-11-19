# 📅 Meeting Management System

![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![MUI](https://img.shields.io/badge/MUI-9-007FFF?logo=mui&logoColor=white)

A full-stack web application for managing the meetings of a tech company's development groups
(**QA Team**, **R&D Team**, **DevOps Team**) across three meeting rooms (**Blue**, **Green**, **Orange**).

Built as the third assignment of the Full Stack Development course (John Bryce) —
**MongoDB | TypeScript | Node.js | React**.

---

## ✨ Features

- Browse the meetings of each development group, ordered by start time.
- Schedule a new meeting: group, room, start/end date-time and description.
- Edit or delete an existing meeting.
- Future / past indication on every meeting card.
- Hebrew, right-to-left UI with a responsive layout.
- Client-side (JavaScript-only) validation **and** server-side validation of every business rule.

## 🧱 Tech stack

| Layer    | Technologies                                                                    |
|----------|---------------------------------------------------------------------------------|
| Database | MongoDB, Mongoose (virtual populate for the group → meetings relation)          |
| Backend  | Node.js, Express 5, TypeScript, class-based Controller → Service → Model layers |
| Frontend | React 19, TypeScript, Vite, MUI, React Router (lazy-loaded routes), Axios       |
| Tooling  | `ts-node-dev`, Postman collection, MongoDB Extended JSON export                 |

## ✅ Business rules (enforced on the server)

- A meeting must belong to an existing development group.
- The room must be one of `Blue Room`, `Green Room`, `Orange Room`.
- The end time must be **later** than the start time.
- A **new** meeting cannot start in the past.
- Description: 2–300 characters.
- Unknown ids return `404`; validation failures return `422` with a clear message.

## 🚀 Quick start

**Prerequisites:** Node.js 22+, a running MongoDB instance.

### 1. Backend

```bash
cd Backend
cp .env.example .env     # then adjust values if needed
npm install
npm run seed             # optional: loads sample groups and upcoming meetings
npm start                # API on http://localhost:4000
```

### 2. Frontend

```bash
cd Frontend
cp .env.example .env
npm install
npm start                # opens http://localhost:5173
```

### Environment variables

| File            | Variable                     | Example                                          |
|-----------------|------------------------------|--------------------------------------------------|
| `Backend/.env`  | `PORT`                       | `4000`                                           |
| `Backend/.env`  | `MONGODB_CONNECTION_STRING`  | `mongodb://localhost:27017/meeting-management`   |
| `Backend/.env`  | `CLIENT_URLS`                | `http://localhost:5173,http://127.0.0.1:5173`    |
| `Frontend/.env` | `VITE_API_BASE_URL`          | `http://localhost:4000/api`                      |

## 🔌 REST API

Base URL: `http://localhost:4000/api`

| Method | Route                                 | Description                            | Success |
|--------|---------------------------------------|----------------------------------------|---------|
| GET    | `/dev-groups`                         | All development groups                 | 200     |
| GET    | `/meetings/dev-group/:devGroupId`     | Meetings of one group (by start time)  | 200     |
| GET    | `/meetings/:id`                       | A single meeting                       | 200     |
| POST   | `/meetings`                           | Create a meeting                       | 201     |
| PUT    | `/meetings/:id`                       | Update a meeting                       | 200     |
| DELETE | `/meetings/:id`                       | Delete a meeting                       | 204     |

Example request body (`POST /meetings`):

```json
{
    "devGroupId": "<development group id>",
    "startDateTime": "2027-01-10T10:00:00.000Z",
    "endDateTime": "2027-01-10T11:00:00.000Z",
    "description": "Sprint planning meeting",
    "room": "Blue Room"
}
```

### Postman

Import `Backend/postman-collection.json`. The collection uses three variables:
`baseUrl` (pre-filled), and `devGroupId` / `meetingId`, which you fill with real ids
(take them from `GET /dev-groups` and `GET /meetings/dev-group/:devGroupId`).
Leaving them empty makes the URL collapse onto a different route and produces misleading errors.

## 🗄️ Database

`Database/` contains a MongoDB Extended JSON export (`dev-groups.json`, `meetings.json`).
Import with:

```bash
mongoimport --uri="mongodb://localhost:27017/meeting-management" --collection=devGroups --file=Database/dev-groups.json --jsonArray
mongoimport --uri="mongodb://localhost:27017/meeting-management" --collection=meetings  --file=Database/meetings.json   --jsonArray
```

The exported meetings are sample data with fixed dates; for fresh upcoming meetings run `npm run seed` in `Backend/` instead.
See `Database/README.md` for details.

## 🗂️ Project structure

```
.
├── Backend/
│   └── src/
│       ├── controllers/   HTTP layer — thin, delegates to services
│       ├── services/      business logic and database access
│       ├── models/        Mongoose schemas, enums, ClientError
│       ├── middleware/    404 handler and catch-all error handler
│       ├── seed/          sample data script
│       └── utils/         AppConfig class (single source of configuration)
├── Frontend/
│   └── src/
│       ├── pages/         home, about, meetings, add/edit meeting, 404
│       ├── components/    layout/header, meeting card, meeting form
│       ├── services/      API calls, validation and all business logic
│       ├── models/        TypeScript types mirroring the API
│       ├── routes/        dedicated routing file (lazy loading)
│       └── utils/         AppConfig class, date helpers
└── Database/              Extended JSON export + import instructions
```

## 🧭 Design decisions

- **Layered backend** — Controller → Service → Model, every piece of server code lives in a class.
- **Validation in the model layer** — controllers never decide whether input is valid.
- **No `any`** — errors are handled as `unknown` with type narrowing.
- **Centralised configuration** — one `AppConfig` class per app; secrets live in `.env`.
- **All styling in CSS files** — no inline `style` / `sx`; semantic `header`, `main` and a single `h1` on every page.
- **CORS** allows both `localhost` and `127.0.0.1` origins, which browsers treat as different.

## 👤 Author

**Samuel Sion** — Full Stack Development student.
