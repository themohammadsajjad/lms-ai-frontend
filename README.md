# VertexLearn LMS-AI Frontend

VertexLearn is a responsive Learning Management System frontend built with React, TypeScript, and Vite.

The project demonstrates student, instructor, and administrator workflows for a modern AI-assisted learning platform.

## Features

### Student Workspace

- Role-based student dashboard
- Course catalog and search
- Course enrollment
- Learning progress tracking
- Video lesson player
- Lesson notes and bookmarks
- Assignment submission flow
- Quiz attempts and scoring
- Course-grounded AI Tutor demo
- AI study summaries
- Flashcards and mastery tracking
- Certificates and badges
- Learning streaks and achievements
- Notifications
- Course discussions and replies
- Persistent light and dark themes

### Instructor Workspace

- Teaching overview
- Course performance analytics
- Learner activity metrics
- Course publishing controls
- Assignment review queue
- Approve submissions
- Request changes
- Persistent instructor actions

### Admin Workspace

- Platform overview
- User management
- Course approval workflow
- Approve and reject course submissions
- Activate and suspend user accounts
- User search and role filtering
- Platform health status
- Recent administrative activity

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Lucide React
- CSS
- LocalStorage

## Frontend Architecture

The application uses a role-based frontend structure with:

- reusable layout components
- protected routes
- mock course and assessment data
- service modules for frontend state
- localStorage persistence
- responsive layouts
- accessibility-focused interaction states

Main source folders:

```text
src/
├── components/
│   ├── common/
│   ├── courses/
│   ├── ai/
│   └── layout/
├── data/
├── hooks/
├── pages/
├── services/
├── types/
└── utils/