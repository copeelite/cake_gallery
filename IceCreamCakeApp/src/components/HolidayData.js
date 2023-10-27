const fakeHoliday = [
  { id: 3, name: "Christmas" },
  { id: 2, name: "Thanksgiving" },
  { id: 4, name: "Valentine's Day" },
  { id: 5, name: "St. Patrick's Day" },
  { id: 6, name: "Easter" },
  { id: 7, name: "Mother's Day" },
  { id: 8, name: "Graduation" },
  { id: 9, name: "Father's Day" },
  { id: 10, name: "Patriotic" },
  { id: 11, name: "Back to School" },
  { id: 1, name: "Halloween" },
];

const fixedHolidays = {
  "Valentine's Day": (year) => new Date(year, 1, 14), // February 14th
  "St. Patrick's Day": (year) => new Date(year, 2, 17), // March 17th
  Patriotic: (year) => new Date(year, 6, 4), // July 4th
  Halloween: (year) => new Date(year, 9, 31), // October 31st
  Thanksgiving: (year) => {
    // 4th Thursday in November
    const fourthThursday = new Date(year, 10, 1);
    fourthThursday.setDate(1 + ((11 + 7 - fourthThursday.getDay()) % 7) + 21);
    return fourthThursday;
  },
  Christmas: (year) => new Date(year, 11, 25), // December 25th
  "Back to School": (year) => new Date(year, 8, 5), // September 5th
  Graduation: (year) => new Date(year, 4, 15), // just an example date, typically in May or June
};
const easterDate = (year) => {
  // Using the Computus algorithm to calculate Easter
  const f = year % 19;
  const g = Math.floor(year / 100);
  const h =
    (g - Math.floor(g / 4) - Math.floor((8 * g + 13) / 25) + 19 * f + 15) % 30;
  const i =
    h -
    Math.floor(h / 28) *
      (1 -
        Math.floor(h / 28) *
          Math.floor(29 / (h + 1)) *
          Math.floor((21 - f) / 11));
  const j = (year + Math.floor(year / 4) + i + 2 - g + Math.floor(g / 4)) % 7;
  const month = 3 + Math.floor((i - j + 40) / 44);
  const day = i - j + 28 - 31 * Math.floor(month / 4);
  return new Date(year, month - 1, day);
};

const mothersDay = (year) => {
  // 2nd Sunday of May
  const secondSunday = new Date(year, 4, 1);
  secondSunday.setDate(1 + ((14 + 7 - secondSunday.getDay()) % 7));
  return secondSunday;
};

const fathersDay = (year) => {
  // 3rd Sunday of June
  const thirdSunday = new Date(year, 5, 1);
  thirdSunday.setDate(1 + ((20 + 7 - thirdSunday.getDay()) % 7));
  return thirdSunday;
};

const currentDateTime = new Date();
const currentYear = currentDateTime.getFullYear();

// Calculate holiday dates for the current and next year
const getHolidayDates = (year) => {
  return fakeHoliday.map((holiday) => {
    if (fixedHolidays[holiday.name]) {
      return { ...holiday, date: fixedHolidays[holiday.name](year) };
    } else if (holiday.name === "Easter") {
      return { ...holiday, date: easterDate(year) };
    } else if (holiday.name === "Mother's Day") {
      return { ...holiday, date: mothersDay(year) };
    } else if (holiday.name === "Father's Day") {
      return { ...holiday, date: fathersDay(year) };
    } else {
      return { ...holiday, date: null }; // Assign null to holidays without a date
    }
  });
};

// Get holidays for the current and next year
const holidaysThisYear = getHolidayDates(currentYear);
const holidaysNextYear = getHolidayDates(currentYear + 1);

// Combine and filter the holidays
const allHolidays = [...holidaysThisYear, ...holidaysNextYear];
const oneYearFromNow = new Date(currentDateTime);
oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

const upcomingHolidays = allHolidays
  .filter((holiday) => holiday.date && holiday.date >= currentDateTime && holiday.date < oneYearFromNow)
  .sort((a, b) => a.date - b.date);

// Result: upcomingHolidays contains holidays from now to the next 12 months, sorted by date



export default upcomingHolidays;
