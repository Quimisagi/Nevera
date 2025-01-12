// Description: This file contains functions to manage dates.

export const getDayNumber = () => {
  const today = new Date(); 
  const startOfYear = new Date(2025, 0, 1);

  // Calculate the difference in milliseconds and convert to days
  const dayNumber = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24)) + 1;

  return dayNumber;
};
