/**
 * Mock quiz data. Edit this file to add or change quizzes.
 * Each quiz needs: id, title, duration (minutes), questions.
 * Each question needs: text, options (array), correct (exact option text), marks.
 */
const quizzes = [
  {
    id: 1,
    title: 'General Knowledge',
    duration: 2,
    questions: [
      { text: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correct: '4', marks: 1 },
      { text: 'Capital of France?', options: ['London', 'Berlin', 'Paris', 'Madrid'], correct: 'Paris', marks: 1 },
      { text: 'Largest planet?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], correct: 'Jupiter', marks: 1 },
    ],
  },
  {
    id: 2,
    title: 'Quick Quiz',
    duration: 1,
    questions: [
      { text: '1 + 1 = ?', options: ['1', '2', '3'], correct: '2', marks: 1 },
      { text: 'Red + Blue = ?', options: ['Green', 'Yellow', 'Purple'], correct: 'Purple', marks: 1 },
    ],
  },
  {
    id: 3,
    title: 'Science Basics',
    duration: 2,
    questions: [
      { text: 'How many planets in our solar system?', options: ['7', '8', '9', '10'], correct: '8', marks: 1 },
      { text: 'Chemical symbol for water?', options: ['H2O', 'CO2', 'O2', 'NaCl'], correct: 'H2O', marks: 1 },
      { text: 'Speed of light (approx)?', options: ['300,000 km/s', '150,000 km/s', '500,000 km/s'], correct: '300,000 km/s', marks: 1 },
    ],
  },
];
