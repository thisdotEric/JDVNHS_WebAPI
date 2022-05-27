export interface EvaluationQuestion {
  code: string;
  introduction: string[];
  enabling: string[];
  demonstrative: string[];
}

export const questionBank: EvaluationQuestion[] = [
  {
    code: 'M7NS-Ia-1',
    introduction: [
      `Is A a subset of B, where A = {1, 3, 4} and B = {1, 4, 3, 2}?`,
      `Let A be all multiples of 4 and B be all multiples of 2

      Is A a subset of B? And is B a subset of A?
      `,
      `What is the importance of sets in daily life?`,
    ],
    enabling: [
      `Let B = [1, 3, 5, 7, 9}. List all the possible subsets of B.`,
      `Name two subsets of the set of whole numbers.`,
      `True or False. The empty set is a subset of every set, including the empty set itself.`,
    ],
    demonstrative: [
      `Give 3 examples of well-defined sets in real life situations.`,
      `Consider the sets:
      A= {1, 3, 5,}                                           
      B= {2,4,6, }
      C= {0,1,2,3,4,……}
      D= the odd numbers less than 7                                            E= the whole numbers less than 7
      Answer the following;
      a. Name the elements of set A
      b Name the elements of set C
      c. Is set D a subset of set C? Why?
      d. Is set C a subset of set D? Why?
      e. Which of the sets are subsets of set C?
      `,
      `Identify the elements, subsets and cardinality of the given set.
      1. L = {letters of English alphabet up to h}
      2. V = {all the vowels of English alphabet}
      3. A = {all even numbers less than 10}
      4. B = {all odd numbers less than 10}
      `,
    ],
  },
  {
    code: 'M7NS-Ia-2',
    introduction: [''],
    enabling: [
      `Given: 
    A = {0, 1, 2, 3, 4} 
    B = {0, 2, 4, 6, 8} 
    C = {1, 3, 5, 7, 9}
    Find the union and intersection of each pair of sets. (A&B, A&C, B&C)
    Use the Venn Diagram.
    `,
    ],
    demonstrative: [
      `Set A : Students who likes ENGLISH subject. 
      Set B : Students who likes MATH subject
                  Answer the following questions:
                  1. Who among the students preferred English? Give the set.
                  2. Who among the students preferred Math? Give the set.
                  3. Who among them preferred both English and Math?
                  4. What do you mean by UNION? INTERSECTION?
    `,
      `Ana and Jay are talking about their favorite subjects. Ana likes Science, Math and English. Jay likes Science, Math and MAPEH.
      1. If we combine all their favorite subjects, what are they? 
      2. Is there a subject that they both like? What is this?
      3. Do you have your favorite subjects too?
    `,
      `A: Eagles, Bats, Penguins
    B: Fish, Eels, Platypus, Penguins
    How will you describe the given diagram? 
    How many sets are there? What are their elements?
    Is there a common element/animal in both sets?
    `,
    ],
  },
  {
    code: 'M7NS-Ib-1',
    introduction: [
      `Draw the Venn diagram of the given sets, and then identify the universal set and the subsets.
    T = {all teachers of your 
          school}
    S = {all teachers of your 
          grade level}
    `,
      ` Draw the Venn diagram of the given sets, and then identify the universal set and the subsets.
    1. A = set of letters
        B = set of consonants
    2. U={1,2,3,4,5,6,7,8,9,10}
        A = {2,4,6,8,10}
        B = {1,2,3,4,5}
    `,
      `With the universe as the universal set, in 1 minute write as many subsets as you can.`,
    ],
    enabling: [
      'How will you relate universal sets and subsets to your life?',
      `Draw the Venn diagram of the given sets.
    1. L = {letters of English 
              alphabet up to h}
       V = {all the vowels of 
              English alphabet}
    2. C = {4 scenic spots in 
              Cavite}
        P = {Pico de Loro, 
              Corregidor}  
    3. C = {Cavite Cities}
        T = {Mendez, Tagaytay  
              City, Indang}
         
    `,
      `Let U = {2,3,4,5,6,7,8,A,B,C,J,K,Q},
H = {J,Q,K}, 
L = {A,B,C},
F = {5,J}, and
N = {A,2,3,4}.
Illustrate the universal set and its subsets using the Venn diagram.
`,
    ],
    demonstrative: [
      `Show by Venn diagram the union and intersection of the following pairs of sets.
    1. X = {Regions of Luzon}
        Y = {Cavite, NCR}
    2. S = {singers among Eat Bulaga hosts}
        A = {actors among Eat Bulaga hosts}
    3. C = {Cities of Cavite}
        T = {Mendez, Tagaytay, City, Indang}
        D = {Biñan}
    `,
      `If A = {2, 3, 4, 5, 6, 7} and B = {3, 5, 7, 9, 11, 13}, then find (i) A – B and (ii) B – A.`,
    ],
  },
  {
    code: 'M7NS-Ib-2',
    introduction: [
      `What set operations did you use to draw the given sets using the Venn Diagram?
    `,
      `Give the difference between union and intersection of sets.`,
      `Draw the following sets on the board using Venn Diagram.
      U = {1,2,3,4,5,6,7}
      A = {2,4,6,7}
      B= {1,2,4,5,7}
      `,
      `A class of 28 students were asked whether they watch ABS-CBN TV shows or GMA – 7 TV shows or shows of both channels. 18 of these students watch ABS-CBN shows and 20 watch GMA – 7 shows.
      a. How many watch ABS-CBN shows only?
      b. How many watch GMA-7 shows only?
      c. How many watch shows on both TV channels?
      `,
    ],
    enabling: [
      ` How many students liked pineapples, but not bananas or mangoes?
b. How many students liked 
    mangoes, but not 
    bananas or pineapples?
c. How many students liked 
    all of the following three 
    fruits: pineapples,   
    bananas, and mangoes?
d. How many students liked 
    pineapples and mangoes, 
    but not bananas?
`,
      `Use Venn Diagram to answer the given problem.
Routine physical examinations of 400 Grade 7 students revealed that 40 had dental problems, 45 had vision problems, 55 had hearing problems, 15 had dental and vision problems, 15 had dental and hearing problems, 20 had vision and hearing problems, and 10 had dental, vision, and hearing problems. How many of the students had none of the three kinds of problems?
`,
      `Eight girls decided to go to Trece Martirez City to shop for shoes. Four of the girls want the shoes at WalterMart for their cheap price, 3 girls like to buy pretty shoes in SM mall, 2 of the girls like to check for the shoes in SM Mall and Walter Mart.
a. How many girls will go to 
    Walter Mart only?
b. How many girls will go to
    SM mall only?
`,
    ],
    demonstrative: [
      `A survey asked 200 Grade 7 students whether they like the meals in 
    McDonald’s or Jollibee . 75 students like McDonalds and Jollibee. 55 like Jollibee only. 30 like other fast food chain. 
    a. Draw a Venn Diagram that displays these results.
    b. How many students like Jollibee meals?
    c. How many students like McDonald  meals only?
  `,
      `Use Venn Diagram to answer the given problem.
  A group of 62 students were surveyed, and it was found that each of the students surveyed liked at least one of the following three fruits: pineapples, bananas, and mangoes.
  
  34 liked pineapples.
  30 liked bananas.
  33 liked mangoes.
  11 liked pineapples and bananas.
  15 liked bananas and mangoes.
  17 liked pineapples and mangoes.
  19 liked exactly two of the following fruits: pineapples, bananas, and mangoes
  `,
    ],
  },
  {
    code: 'M7NS-Ic-1',
    introduction: [
      `Determine whether each statement is true or false. 
    ______1. 5 = |-5|
    ______2. 16 > |-16|
    ______3. |-10| < |-11 + 1|
    ______4. -|-2| < 0
    ______5. |5| ≤ -|-8|
    `,
      ` Is |-9 | ≤ |9|?`,
      `Determine whether each statement is true or false. Justify your answer.
      ______1. 3 = |-3|
      ______2. 8 > |-8|
      ______3. - |-2| < 0
      ______4. |5| ≤ - |-8|
      ______5. |9| ≥ -|9|
      `,
      `If |x| = 7, what are the possible values of x?
  `,
    ],
    enabling: [
      `Give the absolute value of the following:
    1. |16|
    2. |-67|
    3. - |5|
    4. - |-20|
    5. |46 – 25|
    `,
      `Can you cite some other examples where you can apply the lesson absolute value?
`,
    ],
    demonstrative: [
      `Use a number line to find the absolute value of +3, -3, +7, +5,+9,4,-4,-1.`,
      `Fill in the blanks with >, <, or = to make the statements true.
      1. |-6| ___ |6|
      2. -45 ___ - |-56|
      3. |18 – 12| ____ |-10|
      4. - |24 – 30| ___ -|30 – 24|
      5. 2 + |-4| ____ 10
      `,
    ],
  },
  {
    code: 'M7NS-Ic-d-1',
    introduction: [
      `Use the rules for adding integers to find the sum.
    1. 12 + (-4)
    2. -105 + 67
    3. -14 + (-17)
    4.  45 + 37
    5. 64 + (-38)
    `,
      `Find the difference of the following:
    1. 63 – (-58)
    2. -58 – 0
    3. -36 – 105
    4. 76 – 76
    5. -84 – 84
    `,
      `Fill in the missing integer.
    1. 9 ( ___) = 36
    2. ( ___) (-7) = -28
    3. 12 ( ___) = -48
    4. -5 (-15) = ___
    5. 34 (-2) = ___
    `,
    ],
    enabling: [
      `Find the difference.
    1. 71 – 48
    2. - 37 – (-72)
    3. 49 – (-49)
    4. 100 – (-58)
    5. -3 – (-5) –(-7)
    `,
      `Fill in the blank to make a true statement.
    1. When you multiply two numbers with the same sign, the answer is _______.
    2. When you multiply two numbers with _____ sign, the answer is negative.
    3. When you multiply any number by zero, the answer is _____.
    4. An even number of negative factors will produce a product that is _______.
    5. An odd number of negative factors will produce a product that is ________.
    `,
      `Write a numerical expression that models the problem and evaluate
    1. What is twice the product of -8 and -16?
    2. The product of what number and -7 is 56?
    `,
      `Solve the following problems.
    1. Subtract 87 from ( -23)
    2.How much is 100 diminished by 45?
    3. How much is (-50) decreased by 46?
    4. EJ bought P96.00 worth of vegetables in GMA Market. How much was her change if she gave a 200 – peso bill? 
    `,
      `Solve the following problems.
    1. Subtract 87 from ( -23)
    2.How much is 100 diminished by 45?
    3. How much is (-50) decreased by 46?
    4. EJ bought P96.00 worth of vegetables in GMA Market. How much was her change if she gave a 200 – peso bill?
    `,
    ],
    demonstrative: [
      `Solve the following problems.
    1. What is 10 more than -2?
    2. The temperature rose from 0°C by 8°C but later dropped by 10°C. What is the resulting temperature?
    3. Angela deposited P800 in the bank in the first day of the month and P600 the following day. How much money does Angela have?
    4. Carrot Man gained P10 on the first day, lost P5 on the second day and gained P20 on the third day. How much profit does Carrot Man have during his three days of selling?
    5. A football team lost 5 yards in one play and gained 8 yards in the next play. What was the total yardage in the two plays?
    
    `,
      `A pair of pants went on sale for P450.00. How much did Angel save on the purchase of 2 pairs if the regular price was P625.00?`,
      `Write a numerical expression that models the problem and evaluate
    1. The temperature drops 2°F each hour. What is the total change in temperature after 12 hours?
    2. Sylvia burns 6 calories per minute when she runs on Splash Island. How many calories does she burn when she runs for 15 minutes?
    3. James drives his car 20 miles round trip to work every day. How many total miles does he drive to and from work in 5 days?
    `,
    ],
  },
  {
    code: `M7NS-Id-2`,
    introduction: [
      `What property does the expression justify: 0+(3)=-3`,
      `What property does the expression justify: 2(3-5)=2(3)-2(5)`,
      `What property does the expression justify: (-6)+(-7)=(-7)+(-6)`,
    ],
    enabling: [
      `Supply missing terms using the given property : 
    Commutative Property
    5+(-8)=(-8)+___
    `,
      `Supply missing terms using the given property : 
    Distributive Property
    (-4)x(2+4)=
    (-4)x__+(-4)x__
    `,
      `Supply missing terms using the given property : 
    Associative Property
    (8+3)+7=__+(3+7)
    `,
      `Supply missing terms using the given property : 
    Identity Property
    (-10)=(-10)+__
    `,
      `Supply missing terms using the given property : 
    Inverse Property
    2+__=0
    `,
    ],
    demonstrative: [
      `Rewrite the expression using the given property
    1.12a-5a:Distributive
    2.(7a)b:Associative
    3.8+5:Commutative
    4.-4(1):Identity
    5.25+(-25):Inverse
    6.([-2]+[-1])+3:Associative
    7.(2x5)x7:Distributive
    8.5x(8+5):Distributive
    9.-9(9):Closure
    `,
      `Fill in the blanks and determine what properties were used to solve the equations. 
    1. 5 x ( ______ + 2) = 0 
    2. -4 + 4 = _____ 
    3. -6 + 0 = _____ 
    4. (-14 +14) + 7 = ______ 
    5. 7 x ( _____ + 7) = 49 
    `,
    ],
  },
  {
    code: `M7NS-Ie-1`,
    introduction: [
      `Convert the following decimals to fractions. 
    1. 0.35 =      4. 0.15… = 
    2. 4.216 =    5. 0.24 = 
    3. 2.2 = 	
    `,
      `How will you convert decimal to fraction? `,
    ],
    enabling: [
      `If 58 out of 100 students in a class of Tagaytay City Science National High School are boys, then write a decimal for the part of the class that consists of boys. 
    `,
      `If 5 out of 50 players who received gold medals in Palarong Pambansa were girls, then write the decimal for the part of the players who are girls. 
    `,
      `Liza was advice to buy 2.33 kgs of rice at Pure Gold Jr. Tagaytay. Write the fraction form of the kilos of rice she needs to buy.`,
    ],
    demonstrative: [
      `Julia Andrei Aala is a pride of Tagaytay City Science National High School in the field of Softball.As part of her training, she runs 1.8 kilometers in a day.What is the fraction of 1.8 kilometers?`,
      `Jenny and Jeson went to movie house at SM Dasmariñas. The teller told them that they still need to wait 1.40 minutes. How long is 1.40 minutes in fraction?`,
      `Berna bought Bibingka at the Mahogany Market Tagaytay. A slice of Bibingka weighs 0.125 grams if she ate a slice of it , what is the fraction of Bibingka she had eaten?`,
    ],
  },
  {
    code: 'M7NS-Ie-2',
    introduction: [
      `Directions: Locate and arrange the rational numbers on the number line.
    1. 0.3 3.3 -3 0.03 -3.3…
    2. -6 45,  27,  √64,  -2.5 350%    
    `,
      `How will you subtract rational numbers? `,
      `How will you add rational numbers?`,
    ],
    enabling: [
      `Directions: Locate and arrange the rational numbers on the number line. 
    1. 82 11.99 0 9.78 481 % 
    2. √64 √9 2.8 445 36% 
    3. -2.4, √1, 4 38 5.8 % − 93
    4. −√49 -2.64 6 89 45% −√16 
    5. 456% 0 −1.20 1.25 5.84
    `,
    ],
    demonstrative: [
      `Directions: Locate and arrange the rational numbers on the number line.
    1. -5 510 , -7.1 , 0.9 √25 -264 %
    2. −2.85 - 6.66 565% 8.33 2.44 
    3. 7.4, - 4 16 −√36, 445 % 0.62
    
    `,
    ],
  },
  {
    code: 'M7NS-If-1',
    introduction: [
      `Kevin’s weight is 90.2 lbs. After three months of going to Sunny Fitness Gym, he gained 4.4 lbs. What is his total weight now?`,
      `Add or subtract the following:
      1. 3.5+2.2=
      2. 4.09+3.03=
      3. 95.45−83.15=
      4. 17.22+(−3.05)=
      5. 12.3+0.8+(−0.05)=
      `,
      `Perform the indicated operation.
      1. 10.85+3.13=
      2. 9.2+3.52=
      3. 27.33+(−2.7)=
      4. 70.85−23.08=
      5. 51.12−(−72.8)=
      
      `,
      `Multiply/Divide the following:
      1. 22.22×2=
      2. 53.4×3.1=
      3. 17×2.5=
      4. 29.8÷4=
      5. 112.2÷1.1=
      `,
    ],
    enabling: [''],
    demonstrative: [''],
  },
  {
    code: `M7NS-If-1`,
    introduction: [
      `Add or subtract the following:
    1. 3.5+2.2=
    2. 4.09+3.03=
    3. 95.45−83.15=
    `,
      `Perform the indicated operation.
    1. 10.85+3.13=
    2. 9.2+3.52=
    `,
    ],
    enabling: [
      `Add or subtract the following:
    1. 17.22+(−3.05)=
    2. 12.3+0.8+(−0.05)=
    3. 27.33+(−2.7)=
    4. 70.85−23.08=
    5. 51.12−(−72.8)=

    `,
    ],
    demonstrative: [''],
  },
  {
    code: 'M7NS-Ig-1',
    introduction: [
      'How will you determine if a principal root is a rational or irrational number?',
      `How will you describe the principal root of a positive number? negative number?`,
    ],
    enabling: [''],
    demonstrative: [''],
  },
  {
    code: 'M7NS-Ig-2',
    introduction: [
      `Determine between what two integers the square root of a number lies.
    1. √2
    2. √15
    3. √40
    `,
      `Determine between what two integers the square root of a number is. Select the answer in the box.
        Box: 1,2,3,4,5,6,7,8,9,10,11,12
        1.√11
        2.√28
        3.√30
        4.√166
        5.√110`,
      `Find the two integers between which the given square root lies.
      1.√5√5
      2.√11√11
      3.√23√23
      4.√91√91
      5.√62√62
      `,
    ],
    enabling: [
      `How do you determine between what two integers the square root of a number lies?
    `,
      `Between which two consecutive integers does the square root of the following lies?
    1.√8	
    2.√101		
    3.√75
    4. √45
    5. √140
    `,
    ],
    demonstrative: [
      `The principal roots are given below. Find the two integers in which each irrational number lies.
    (a)√7√7		
    (b)√10√10		
    (c) √32√32
    `,
      `Given each irrational number, find the two integers in which it lies. Encircle the correct answer.
    1.√13√13
    *3 and 4   *4 and 5  *5 and 6	
    2.√21√21
    *3 and 4  *4 and 5 *5 and 6	
    3.√37√37
    *4 and 5  *5 and 6  *6 and 7	
    4.√60√60
    *6 and 7  *7 and 8 *8 and 9	
    5.√110√100
    *8 and 9  *9 and 10	
    *10 and 11	
    
    `,
    ],
  },
  {
    code: 'M7NS-Ig-3',
    introduction: [``],
    enabling: [
      'How to get the square of a perfect square?',
      `How to get the root of the following numbers which is not perfect?
      `,
      `Pick the two nearest square root of a given whole number.
      2,3,4,5,6,7
      1. √11    
      2. √26	  
      3. √55
      `,
    ],
    demonstrative: [
      `Estimate √12√12 to the nearest hundredth.
    -What are the two consecutive integers in which √12√12 lies?
    -What are the principal roots of the two integers?
    -What is the middle value between the two integers? Take the square of it.
    -Compute for the squares of numbers between the first integer and the middle value.   
    -√12√12 is closer to what number?
`,
      `Estimate each square root to the nearest hundredth and plot on a number line.

1. √21√21 	
Hint: √21√21  is between 4 and 5

2. √55√55  	
Hint:  is between 7 and 8

3. √90√90	    
Hint: √90√90	is between 9 and 10
`,
      `A standard Grade 7 classroom measures 7m by 9m. Its diagonal is √130√130.  Estimate the value of √130√130 to the nearest tenth.
    `,
    ],
  },
  {
    code: 'M7NS-Ig-4',
    introduction: [
      `Plot the following points on a number line.
    1. √15
    2. √3
    3. √11
    `,
      `Estimate each square root to the nearest hundredth and plot each on a number line.
    1.√5√5
    2.√38√38
    3.√15√15
    4.√24√24
    5.√72√72
    `,
      `Estimate each square root to the nearest tenth and plot on a number line.
    1. √21√21 	
    Hint: √21√21  is between 4 and 5
    
    2. √55√55  	
    Hint:  is between 7 and 8
    
    3. √90√90	    
    Hint: √90√90	is between 9 and 10
    `,
    ],
    enabling: [''],
    demonstrative: [
      `Estimate √7 to the nearest hundredth.
      -What are the two consecutive integers in which √7 lies?
      -What are the principal roots of the two integers?
      -What is the middle value between the two integers? Take the square of it.
      -Compute for the squares of numbers between the first integer and the middle value. 
      -√7 is closer to what number?
      -Estimate √7 according to the result.      
    `,
      `The length of a rope used in a school game is √548√548 meters. Find its length up to the nearest tenth.`,
    ],
  },
  {
    code: 'M7NS-Ih-1',
    introduction: [''],
    enabling: [
      `Graph each set of numbers on a number line.
    1) The natural numbers between 4 and 10.
    2) The even integers greater than 12 but less than 30.
    3) The whole numbers less than 10.
    4) The rational numbers greater than 5 but less than 7.
    `,
      `How do we identify a subset of a number in a given problem solving?`,
      `How do we graph a set of numbers on a number line?`,
      `How is a rational number different from an irrational number? 
      How do natural numbers differ from whole numbers?
      `,
    ],
    demonstrative: [
      `Identify what subset of real numbers is being described in the following number.
    1. the number of your siblings
    2. the change when you pay P20.00 bill buying 2 notebook worth P10.00 each
    3. water bill
    4. 2 slices of pizza out of 5 slices
    5. weight loss after zumba
    `,
      `Determine whether each of the following statements is true or false. Justify your answer. 
    1) 4 ≤ 12
    2) -7 ≥ 0
    3) -5 ≤ 0 ≤ 1
    4) x is always a positive integer if x ˂ 100
    5) If p is a negative integer then 0 ˃ p`,
      `Plot the points corresponding to the elements of the given set. Then, rearrange the elements in decreasing order. 
  a. {6, -4, 0, √9, -9} 
  b. {-2, -1/5, 4, -7, 6} 
  c. {-10, 0, -3, 7.2, 3} 
  d. {-3.3, -1, 4 2/5, 1/3, √15} 
  e. {2,0, √8, −3, 3/6 }
  `,
      `Write I if the elements are arranged in increasing order and D if in decreasing order. 
  a. {-7, -3, -9/11, √9, 18/5} 
  b. {-6, -4.7, -𝝅, -√8, 0.8} 
  c. {√25, 1.7, -5/2, -8, -√100} 
  d. {17/2, 3, 18/11, 0, −√9, -18/5} 
  e. {-52, -25, 𝝅, 3.3, √16}`,
    ],
  },
  {
    code: 'M7NS-Ii-1',
    introduction: [``],
    enabling: [
      `a. How do we write a number that is greater than 1 in scientific notation? 
    b. How do we write a number greater than 0 but less than 1 in scientific notation? 
    c. For what kinds of numbers is scientific notation a useful notation?
    
    `,
      `How about the diameter of a red blood cell? 
    It is about 0.000007 mm. 
    How can it be written in scientific notation? 
    `,
    ],
    demonstrative: [
      `Think, Pair ,Share
    a. Are you comfortable in writing very large/small numbers? Why or why not? 
    b. Which way do you prefer to write the largest/smallest numbers, in whole number/decimal form or scientific notation? 
    c. What is a more convenient way of expressing very large and very small numbers? 
    d. How do you express very large or very small numbers in scientific notation? 
    `,
    ],
  },
  {
    code: 'M7NS-Ii-2',
    introduction: [
      `Determine what set of numbers will represent the following situations: 
    1. Finding out how many cows there are in a barn 
    2. Corresponds to no more apples inside the basket 
    3. Describing the temperature in the North Pole 
    4. Representing the amount of money each member gets when P200 prize is divided among 3 members 
    5. Finding the ratio of the circumference to the diameter of a circle, denoted by “π” (read as “pi”) 
    `,
      `Write 3 example and an applicable situation for each subset of the set of real numbers 

    Rational Numbers
    Irrational Numbers
    Integers
    Whole Numbers
    Irrational Numbers
    `,
      `Give a real-life example of the following: 
    Natural numbers
     (example: counting the number of homework problems) 
    
    Whole numbers 
    (example: counting the number of dates you will get with a movie star – zero) 
    
    Integers 
    (example: temperature – can be negative) 
    
    Rational numbers 
    (example: the cost of an item at the store in dollars) 
    
     Absolute value 
    (example: the distance from home to school)
    `,
    ],
    enabling: [
      `Use a real number to represent each real life situation. Number 1 is done for you.
    1. A population growth of 1279 - 1279 (answer)
    2. An oil drilling platform extends 325 feet below sea level.
    3. Water boils at 1000C
    4. A child digs a hole 3 feet deep in beach sand.
    5. There is a wind chill factor of minus 100F.
    6. A hiker climbs a mountain that is 2023 feet high.
    `,
      `Determine what set of numbers will represent the following situations: 

    1.Temperature below zero
    2.Floors above ground level
    3. Number of Siblings
    4. Monthly allowance
    5. Average height of GMATHS students in cm.
    `,
      `1. What are the subsets of real numbers?
    2. What is the difference between an irrational number and a rational number?
    3. Can you cite situations in our daily life which involves real Numbers?
    `,
    ],
    demonstrative: [
      `Determine what set of numbers will represent the following situations:
    1. Spending and earning money.
    2. The distance from GMATHS to GMA Market.
    3. Rising and falling temperatures
    4. Ages of students.
    5. Number of Family members.
    6. Stock market gains and losses
    7. General average of G7 Students.
    8. Vowels in English Alphabet
    9. Number of Month starts with letter X.
    10. Gaining or losing yards in a football game
    `,
      `a. Do you agree with Pythagoras that all things are numbers? 
    b. Can we represent real-life situations which involve real numbers? 
    c. Do we encounter situations in our everyday life which involves real numbers? If yes, cite/ give examples.
    `,
    ],
  },
  {
    code: 'M7NS-Ij-1',
    introduction: [
      `Perform the indicated operations.
    1. 9 + (-3) =
    2. -85 - (-80) = 
    3. (24) (17) (-2) = 
    4. (-7) (-9) (-10) =
    5. -40 ÷(-8) =
    `,
      `Perform the indicated operations.
    1. 1.2 + 3.9 =
    2. 11.18 – 8.75 =
    3. 2.19 • 8.123 • 0.1 =
    4. 989.49 ÷ 25.25 =
    5. 128.345 ÷ 1.37 =
    `,
      `Answer the following.
    1. Is it easy for you to solve fractions using the four operations?
    2. Consider the fraction ¾ and 7/9, which number is larger?
    3. What are the steps in solving problems involving fractions? 
    `,
    ],
    enabling: [
      `Human bones are 3/10 living tissues, 9/20 minerals, and the rest water. What fraction of the human bone is water?`,
      `While at the grocery store, Mrs. Martin noticed that there were two different sized bottles of hot sauce, one was 16.9 ounces and the other 32.55 ounces. What is the difference in weight of the two bottles of hot sauce?`,
      `The mass of a jar of sugar is 1.9 kg. What is the total mass of 13 jars of sugar?
    `,
      `If a 10-foot piece of electrical tape has five pieces that are each 1.25 feet cut from it, what is the new length of the tape?`,
      `Anna owes Php 1000 at her favorite clothing boutique, so the balance in her account is -PhP1000. If she goes shopping and triples the amount she owes, what will be the present balance in her account?`,
    ],
    demonstrative: [
      `The change in the price of stock in Liwayway Corporation for Wednesday was reported as  -PhP150 per share. If you own 5 shares in the corporation, what integer represents the total change in value of your shares of stock?`,
      `If the annual rainfall for a town near Santa Fe was 12.3 inches in 1960, 13.2 inches in 1961, and 11.5 in 1962, what was the total rainfall for the three years?`,
      `Your brother traveled 17 miles in 2.25 hours to come home for school break. What is the average speed that he was traveling?`,
      `If you ran 5.3 miles on Monday, 3.9 miles on Wednesday, and 4.7 miles on Friday, how many miles did you run, total, for the three days?
    `,
    ],
  },
];
