import {
  tutorKnowledge,
  type TutorMode,
  type TutorSource,
} from '../data/aiTutorData';

export interface TutorMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: TutorSource[];
  createdAt: string;
}

const CHAT_KEY = 'lms_ai_tutor_chat';

function getStorageKey(courseId: string) {
  return `${CHAT_KEY}:${courseId}`;
}

function createAnswer(
  courseId: string,
  question: string,
  mode: TutorMode,
) {
  const knowledge = tutorKnowledge.find(
    (item) => item.courseId === courseId,
  );

  if (!knowledge) {
    return {
      content:
        'I do not have enough course material available for this topic yet.',
      sources: [],
    };
  }

  const normalizedQuestion = question.toLowerCase();

  let coreAnswer =
    'This concept is covered in the course material. Focus on the definition, why it is used, and how it applies in practice.';

  if (
    normalizedQuestion.includes('supervised') &&
    courseId === 'machine-learning'
  ) {
    coreAnswer =
      'Supervised learning trains a model using labeled examples. Each training example contains input data together with the expected output, allowing the model to learn the relationship between them.';
  } else if (
    normalizedQuestion.includes('regression') &&
    courseId === 'machine-learning'
  ) {
    coreAnswer =
      'Regression is a supervised learning approach used when the target is a continuous numerical value. A regression model learns patterns between input features and the value we want to predict.';
  } else if (
    normalizedQuestion.includes('component') &&
    courseId === 'react-foundations'
  ) {
    coreAnswer =
      'A React component is a reusable piece of user interface. Components let you split a page into smaller independent parts that can receive data through props and render their own UI.';
  } else if (
    normalizedQuestion.includes('props') &&
    courseId === 'react-foundations'
  ) {
    coreAnswer =
      'Props are values passed from a parent component to a child component. They allow the same component to display different data without duplicating the component logic.';
  } else if (
    normalizedQuestion.includes('state') &&
    courseId === 'react-foundations'
  ) {
    coreAnswer =
      'State stores information that can change while a component is being used. When state changes, React updates the affected user interface.';
  } else if (
    normalizedQuestion.includes('pandas') &&
    courseId === 'python-data-science'
  ) {
    coreAnswer =
      'pandas is a Python library for working with structured data. Its DataFrame structure is commonly used to load, inspect, clean, transform and analyze tabular datasets.';
  } else if (
    normalizedQuestion.includes('numpy') &&
    courseId === 'python-data-science'
  ) {
    coreAnswer =
      'NumPy provides efficient multidimensional arrays and numerical operations. It is useful for mathematical computation and forms the foundation of many Python data-science tools.';
  }

  let content = coreAnswer;

  if (mode === 'beginner') {
    content = `In simple terms: ${coreAnswer} Think of it as a foundation concept—understand the basic idea first, then try a small example.`;
  }

  if (mode === 'advanced') {
    content = `${coreAnswer} At an advanced level, also consider the underlying design choices, edge cases, performance implications and how the concept interacts with the rest of the system.`;
  }

  return {
    content,
    sources: knowledge.sources.slice(0, 2),
  };
}

export const aiTutorService = {
  getMessages(courseId: string): TutorMessage[] {
    const stored = localStorage.getItem(getStorageKey(courseId));

    if (!stored) {
      return [];
    }

    try {
      return JSON.parse(stored) as TutorMessage[];
    } catch {
      return [];
    }
  },

  ask(
    courseId: string,
    question: string,
    mode: TutorMode,
  ): TutorMessage[] {
    const current = this.getMessages(courseId);

    const userMessage: TutorMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: question,
      createdAt: new Date().toISOString(),
    };

    const answer = createAnswer(courseId, question, mode);

    const assistantMessage: TutorMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: answer.content,
      sources: answer.sources,
      createdAt: new Date().toISOString(),
    };

    const updated = [
      ...current,
      userMessage,
      assistantMessage,
    ];

    localStorage.setItem(
      getStorageKey(courseId),
      JSON.stringify(updated),
    );

    return updated;
  },

  clear(courseId: string): void {
    localStorage.removeItem(getStorageKey(courseId));
  },
};