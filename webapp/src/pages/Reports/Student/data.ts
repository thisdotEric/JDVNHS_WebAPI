import type { PersonalizedRemediation } from './StudentReport';

export const data: PersonalizedRemediation[] = [
  {
    learning_competency:
      'Describes well-defined sets, subsets, universal sets, and the null set and cardinality of sets.',
    learning_materials: [
      'NFE Accreditation and Equivalency Learning Material. Sets, Sets and Sets. 2001. pp. 5-18',
      'NFE Accreditation and Equivalency Learning Material. Sets, Sets and Sets. 2001. pp. 20-25',
    ],
    evaluationQuestions: [
      {
        question_type: 'introductory',
        question: {
          questions: [
            `Use Venn Diagram to answer the given problem.
A group of 62 students were surveyed, and it was found that each of the students surveyed liked at least one of the following three fruits: pineapples, bananas, and mangoes.
            
            34 liked pineapples.
            30 liked bananas.
            33 liked mangoes.
            11 liked pineapples and bananas.
            15 liked bananas and mangoes.
            17 liked pineapples and mangoes.
            19 liked exactly two of the following fruits: pineapples, bananas, and mangoes`,
            `Identify the elements, subsets and cardinality of the given set.
            1. L = {letters of English alphabet up to h}
            2. V = {all the vowels of English alphabet}
            3. A = {all even numbers less than 10}
            4. B = {all odd numbers less than 10}
            `,
            'Give 3 examples of well-defined sets in real life situations.',
            'Let B = [1, 3, 5, 7, 9}. List all the possible subsets of B.',
            `Identify the elements, subsets and cardinality of the given set.
            1. L = {letters of English alphabet up to h}
            2. V = {all the vowels of English alphabet}
            3. A = {all even numbers less than 10}
            4. B = {all odd numbers less than 10}
            `,
            `Set A : Students who likes ENGLISH subject. 
Set B : Students who likes MATH subject
            Answer the following questions:
            1. Who among the students preferred English? Give the set.
            2. Who among the students preferred Math? Give the set.
            3. Who among them preferred both English and Math?
            4. What do you mean by UNION? INTERSECTION?
            `,
            `A: Eagles, Bats, Penguins
B: Fish, Eels, Platypus, Penguins
    1. How will you describe the given diagram? 
    2. How many sets are there? What are their elements?
    3. Is there a common element/animal in both sets?
    `,
          ],
        },
      },
      {
        question_type: 'enabling',
        question: {
          questions: ['What is your name in enabling?'],
        },
      },
      {
        question_type: 'demonstrative',
        question: {
          questions: ['What is your name in demonstrative?'],
        },
      },
    ],
  },
];
