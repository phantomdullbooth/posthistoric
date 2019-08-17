// =========================================================
//                       DEPENDENCIES
// =========================================================
const bcrypt = require('bcrypt');

// =========================================================
//                           USERS
// =========================================================

const userArray = [
  {
    username: "ahlisa",
    password: bcrypt.hashSync(process.env.pass1, bcrypt.genSaltSync(10)),
  },

  {
    username: "aegean",
    password: bcrypt.hashSync(process.env.pass2, bcrypt.genSaltSync(10))
  },

  {
    username: "addison",
    password: bcrypt.hashSync(process.env.pass3, bcrypt.genSaltSync(10))
  }
]

// =========================================================
//                       HANDY FUNCTIONS
// =========================================================
// generateDates(length)
// Generates a bunch of dates starting from the 1st.
// EXAMPLE: generateDates(20) => an array of date objects from August 1st to August 20th (or whatever month it currently is)
// =====================
const generateDates = (length) => {
  let dateArray = [];
  for (let i = 1; i < length+1; i++){
    let currentDate = new Date();
    currentDate.setDate(i);
    dateArray.push(currentDate);
  }
  return dateArray
};

// =============
// DATE ARRAY
// Used to give dates for every line in lineArray
// (e.g. lineArray[0] was "submitted" on August 1st, etc.)
// ============
const dateArray = generateDates(20);

// =========================================================
//                        LINE/STORY ARRAY
// =========================================================
const lineArray = [
{ text: "Once upon a time...",
  author: "ahlisa",
  date: dateArray[0] },

{ text: "In a far-off kingdom...",
  author: "ahlisa",
  date: dateArray[2] },

{ text: "Lived a fair maiden...",
  author: "ahlisa",
  date: dateArray[4] },

{ text: "...a sad young lad...",
  author: "ahlisa",
  date: dateArray[6] },

{ text: "...and a childless a baker...",
  author: "ahlisa",
  date: dateArray[8] },

{ text: "...with his wife.",
  author: "ahlisa",
  date: dateArray[10] },

{ text: "I wish my cow would give us some milk! (More than anything...)",
  author: "ahlisa",
  date: dateArray[15] },

{ text: "I wish...",
  author: "aegean",
  date: dateArray[1] },

{ text: "More than anything...",
  author: "aegean",
  date: dateArray[3] },

{ text: "More than life...",
  author: "aegean",
  date: dateArray[5] },

{ text: "More than jewels... (I wish)",
  author: "aegean",
  date: dateArray[7] },

{ text: "The king is giving a festival!",
  author: "aegean",
  date: dateArray[12] },

{ text: "I wish to go to the festival! (More than riches) And the ball!",
  author: "aegean",
  date: dateArray[14] },

{ text: "(More than life) I wish...",
  author: "addison",
  date: dateArray[9] },

{ text: "(More than anything) More than the moon... (I wish)",
  author: "addison",
  date: dateArray[11] },

{ text: "More than life (I wish)",
  author: "addison",
  date: dateArray[13] },

{ text: "I wish we had a child! (Squeeze pal, squeeze pal...) I want a child!",
  author: "addison",
  date: dateArray[16] }
]

// ==========================
// SORTING THE ARRAY BY DATE
// ==========================
lineArray.sort((a, b) => {
  if (a.date < b.date){return -1}
  if (a.date > b.date){return 1}
  else{return 0}
});

// ==========================================================
// FOR A FUN TIME, COMMENT THIS OUT AND ENJOY INTO THE WOODS
// console.log(lineArray);
// ==========================================================


// =========================================================
//                        MODULE.EXPORTS
// =========================================================
module.exports = {
  storyArray: lineArray,
  userArray: userArray
}
