// Description: This file contains functions to manage dates.

export const getDayNumber = (date) => {
  const startOfYear = new Date(2025, 0, 1);
  // Calculate the difference in milliseconds and convert to days
  const dayNumber = Math.floor((date - startOfYear) / (1000 * 60 * 60 * 24)) + 1;

  return dayNumber;
};

  //Function for calculating how much time left

export const timeLeft = (expirationTime, addedTime) => {
  const today = new Date();
  const todayNumber = getDayNumber(today);
  const timeElapsed = todayNumber - addedTime;
  const timeLeft = expirationTime - timeElapsed;
  return timeLeft;
}

