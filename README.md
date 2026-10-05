# VertexLearn LMS-AI Frontend

VertexLearn is a responsive AI-assisted Learning Management System frontend built with React, TypeScript, and Vite.

The project demonstrates end-to-end student, instructor, and administrator workflows based on the LMS-AI product requirements.

> This repository contains the frontend implementation only. Backend APIs, real JWT authentication, database persistence, object storage, email delivery, and production RAG services are represented through frontend demo flows and localStorage-backed mock services.

## Features

### Student Workspace

- Role-based student dashboard
- Enrolled course overview
- Course progress tracking
- Learning streak display
- Course catalog with:
  - search
  - category filters
  - difficulty filters
  - rating filters
- Course enrollment flow
- Course details and curriculum
- Video learning player
- Resume from last playback position
- Playback speed controls
- Timestamped lesson notes
- Timestamped bookmarks
- Lesson completion tracking
- Assignment submission with file selection
- Quiz engine supporting:
  - MCQ
  - multi-select
  - short answer
  - objective auto-grading
- Adaptive quiz difficulty
- Topic mastery tracking
- Personalized course/topic recommendations
- AI Tutor demo grounded in course content
- Beginner, intermediate, and advanced explanation modes
- Source references in AI responses
- Personalized study plans from quiz history
- Selected lecture transcript summaries
- Module-based flashcards
- Flashcard mastery tracking
- Dynamic certificates at 100% learning completion
- Downloadable PDF certificates
- Unique certificate credential IDs
- Achievement badges
- In-app notifications
- Instructor announcement notifications
- Course discussions and replies
- Persistent light and dark themes
- Basic English/Hindi i18n scaffolding

### Instructor Workspace

- Instructor dashboard
- Course creation and editing
- Course fields including:
  - title
  - description
  - category
  - thumbnail
  - pricing tier
- Draft course management
- Submit courses for admin approval
- Re-submit rejected courses
- Published course status
- Upload learning materials:
  - video
  - PDF
  - slides
- Map materials to modules and lectures
- Assignment authoring
- Rubric and deadline configuration
- Manual quiz builder
- AI-generated quiz review workflow
- Quiz approval flow
- Instructor announcements
- Course analytics including:
  - lecture drop-off
  - average quiz score
  - time-on-task

### Admin Workspace

- Admin dashboard
- User management
- View users
- Suspend users
- Delete users
- Assign roles
- Revoke roles
- Course approval queue
- Approve submitted courses
- Reject submitted courses
- Approved courses become available in the public student catalog
- Platform analytics:
  - daily active users
  - enrollments
  - completion rate
  - revenue
- Forum moderation
- Remove reported content
- Dismiss reports
- Reopen moderation reports

## AI Learning Features

The frontend demonstrates the LMS-AI experience using mock course knowledge and local browser persistence.

Implemented AI-oriented flows include:

- course-grounded tutor responses
- source citations
- explanation difficulty adjustment
- lecture transcript summarization
- personalized study plans
- AI-generated quiz review
- per-topic mastery
- adaptive quizzes
- module flashcards
- recommendation logic based on assessment performance

A real production implementation would connect these interfaces to backend AI/RAG services, embeddings, a vector store, and an LLM provider.

## Accessibility

The application includes an accessibility-focused frontend pass with:

- keyboard navigation
- visible focus indicators
- skip-to-main-content support
- ARIA labels and states
- accessible form validation messages
- semantic navigation landmarks
- reduced-motion preference support
- keyboard-accessible settings and controls

## Internationalization

Basic i18n scaffolding is included.

Current demo support:

- English
- Hindi
- persisted language preference
- document language updates through the HTML `lang` attribute

This is intentionally scaffolding rather than a complete multilingual translation of the entire interface.

## Theme Support

VertexLearn supports:

- Light mode
- Dark mode
- Persistent theme preference using localStorage

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Lucide React
- pdf-lib
- CSS
- localStorage
- oxlint

## Frontend Architecture

The project uses a role-based frontend structure with:

- protected routes
- reusable UI/layout components
- role-specific workspaces
- mock data modules
- localStorage-backed service modules
- responsive layouts
- accessible interaction states
- lazy-loaded PDF generation

Main source structure:

```text
src/
├── components/
│   ├── common/
│   ├── instructor/
│   └── layout/
├── data/
├── pages/
├── services/
├── types/
├── App.tsx
├── main.tsx
└── index.css