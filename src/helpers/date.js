/**
 * Calculates age in years based on a birthdate string.
 *
 * @param {string} birthdateString - The birthdate in ISO format (YYYY-MM-DD).
 * @returns {number} The calculated age in years.
 */


export function calculateAge(birthdateString) {
  const birthDate = new Date(birthdateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDifference = today.getMonth() - birthDate.getMonth();

  // If birthday hasn't occurred yet this year, subtract 1
  if (
    monthDifference < 0 || 
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}