// Logic Practice

// 1. Positive or Negative
// Create a program that checks if a number stored in a variable is positive or negative. 
// Log "The number is positive" if it's greater than zero, otherwise log "The number is negative."
// const positiveOrNegative = 1;
// const isPositive = positiveOrNegative > 0;
// const isNegative = positiveOrNegative < 0;
// const isZero = positiveOrNegative === 0;
// if (isPositive) {
//   console.log('positive');
// } else if (isNegative) {
//   console.log('negative');
// } else if (isZero) {
//   console.log("thought you'd be tricky eh?! Well no, it's zero.")
// }

// const requiredDrivingAge = 16;
// const annoyingTeenagerAge = 16;
// const duckAndCover = annoyingTeenagerAge >= 16;
// const safeForNow = annoyingTeenagerAge < 16;
// if (safeForNow) {
//   console.log("NO!! IF I'VE TOLD YOU ONCE, I'VE TOLD YOU A THOUSAND TIMES!! NOT UNTIL YOU'RE 16!!!!");
// } else if(duckAndCover) {
//   console.log('🫢😱😫😭')
// }

// 3. School Grade Levels
// Create a program that categorizes school levels based on a student's grade stored in a variable.
// Use the following categories: "Elementary" for grades 1-5, "Middle" for grades 6-8, and "High" for grades 9-12. 
// Log the school level.
// let gradeLevel = 1;
// const isElementary = gradeLevel <=5 && gradeLevel >= 1
// const isMiddle = gradeLevel <=8 && gradeLevel >= 6
// const isHigh = gradeLevel <=12 && gradeLevel >= 9
// if (isElementary) {
//   console.log('Elementary');
// } else if (isMiddle) {
//   console.log('Middle');
// } else if (isHigh) {
//   console.log('High');
// } else {
//   console.log('You are not in school');
//   console.log("Or... You're being homeschooled. In which case, you're probably smarter than me.");
// }

// 4. Basic Discount System
// A shop offers a discount for purchases over $50. 
// Write a program where the total purchase amount is stored in a variable. 
// If the amount is over $50, calculate the discount and log it. Otherwise, log "No discount available."
// const totalPurchaseAmount = 51;
// const discountThreshold = 50;
// const discountRate = 0.1;
// const isOverDiscountThreshold = totalPurchaseAmount > discountThreshold;
// if (isOverDiscountThreshold) {
//   console.log(`You saved $${totalPurchaseAmount * discountRate}`);
// }

// FIZZBUZZ

// Run through all the numbers from 1-100
// Log the number and "FizzBuzz" if the number is divisible by 3 and 5
// Log the number and "Fizz" if the number is divisible by 3
// Log the number and "Buzz" if the number is divisible by 5
// Log the number if none of the above conditions are true
const maxNumber = prompt("Enter a fizzbuzzy number: ");
for (let i = 1; i <= maxNumber; i++) {

  const ONLY_FIZZBUZZ = i%3 === 0 && i%5 === 0

  const FIZZBUZZ = ONLY_FIZZBUZZ ? 'FizzBuzz' : ''
  
  const ONLY_FIZZ = i%3 === 0 && i%5 !== 0

  const FIZZ = ONLY_FIZZ ? 'Fizz' : ''

  const ONLY_BUZZ = i%5 === 0 && i%3 !== 0

  const BUZZ = ONLY_BUZZ ? 'Buzz' : ''

  const finalString = `${i} ${FIZZBUZZ}${FIZZ}${BUZZ}`

  // append a new paragraph element to the body containing the final string
  const newParagraph = document.createElement('p');
  newParagraph.textContent = finalString;
  document.body.appendChild(newParagraph);
}
