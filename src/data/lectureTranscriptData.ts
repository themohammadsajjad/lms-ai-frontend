export interface LectureTranscript {
  lessonId: string;
  transcript: string;
  keyPoints: string[];
}

export const lectureTranscripts:
  LectureTranscript[] = [
  {
    lessonId: 'react-intro',
    transcript:
      'React is a JavaScript library for building user interfaces. Applications are composed from reusable components. Each component can describe a small part of the interface and components can be combined to create larger application screens. React updates the user interface when application data changes.',
    keyPoints: [
      'React is used to build interactive user interfaces.',
      'React applications are composed from reusable components.',
      'Components can be combined to build larger application screens.',
      'React updates the interface when application data changes.',
    ],
  },
  {
    lessonId:
      'react-components',
    transcript:
      'A React component is a reusable unit of user interface. Components help developers divide an application into smaller independent pieces. A component can receive data from its parent and render interface elements based on that data. Reusing components reduces duplicated code and helps keep applications easier to maintain.',
    keyPoints: [
      'Components divide a React application into smaller reusable pieces.',
      'A component can receive data from its parent.',
      'Components render interface elements based on their inputs.',
      'Reusable components reduce duplicated code and improve maintainability.',
    ],
  },
  {
    lessonId: 'react-props',
    transcript:
      'Props are values passed from a parent React component to a child component. They allow components to receive information while remaining reusable. Props should be treated as read-only by the receiving component. Different prop values allow the same component to display different content without changing its internal implementation.',
    keyPoints: [
      'Props pass data from parent components to child components.',
      'Props help keep components reusable.',
      'A receiving component should treat props as read-only.',
      'Different prop values let one component display different content.',
    ],
  },
  {
    lessonId: 'react-state',
    transcript:
      'State stores information that can change while a user interacts with a React application. State updates can cause a component to render again with new data. Event handlers such as click or input handlers often trigger state changes. Functional React components commonly manage local state using the useState hook.',
    keyPoints: [
      'State stores data that can change during interaction.',
      'Updating state can trigger a component re-render.',
      'User events often cause state updates.',
      'Functional components commonly manage local state with useState.',
    ],
  },
  {
    lessonId: 'python-intro',
    transcript:
      'Python is widely used for data analysis because it has simple syntax and a large ecosystem of libraries. Variables, functions, lists and dictionaries are common building blocks in data workflows. Python can be used to load, transform and analyze datasets before presenting useful results.',
    keyPoints: [
      'Python is widely used for data analysis.',
      'Its simple syntax makes data workflows easier to build.',
      'Variables, functions, lists and dictionaries are core Python building blocks.',
      'Python can load, transform and analyze datasets.',
    ],
  },
  {
    lessonId: 'numpy-basics',
    transcript:
      'NumPy is a Python library designed for efficient numerical computing. Its main data structure is the multidimensional array. NumPy arrays support fast mathematical operations across many values at once. This vectorized approach is often more efficient than processing individual values with ordinary Python loops.',
    keyPoints: [
      'NumPy focuses on efficient numerical computing.',
      'Its main structure is the multidimensional array.',
      'Arrays support mathematical operations across many values.',
      'Vectorized operations can be more efficient than ordinary Python loops.',
    ],
  },
  {
    lessonId: 'pandas-intro',
    transcript:
      'pandas is a Python library for working with structured and tabular data. A DataFrame stores information in rows and columns. pandas provides tools for selecting, filtering, cleaning and transforming datasets. Data inspection and handling missing values are common steps before performing analysis.',
    keyPoints: [
      'pandas is used for structured and tabular data.',
      'A DataFrame organizes data into rows and columns.',
      'pandas supports filtering, cleaning and transformation.',
      'Inspecting data and handling missing values are important preparation steps.',
    ],
  },
  {
    lessonId: 'ml-intro',
    transcript:
      'Machine learning allows computer systems to learn patterns from data instead of relying only on manually written rules. In supervised learning, a model learns from examples that include expected outputs or labels. After training, the model can use the patterns it learned to make predictions on new data.',
    keyPoints: [
      'Machine learning discovers patterns from data.',
      'Supervised learning uses labeled training examples.',
      'Training helps a model learn relationships in the data.',
      'A trained model can make predictions on new inputs.',
    ],
  },
  {
    lessonId: 'ml-regression',
    transcript:
      'Regression is a supervised machine learning technique used to predict continuous numerical values. A regression model learns a relationship between input features and a target value from training data. Model predictions can be compared with actual values using evaluation measures such as mean absolute error or mean squared error.',
    keyPoints: [
      'Regression is a supervised learning technique.',
      'Regression predicts continuous numerical values.',
      'Models learn relationships between features and a target.',
      'Metrics such as MAE and MSE can evaluate regression performance.',
    ],
  },
];

export function getLectureTranscript(
  lessonId: string,
) {
  return lectureTranscripts.find(
    (lecture) =>
      lecture.lessonId ===
      lessonId,
  );
}