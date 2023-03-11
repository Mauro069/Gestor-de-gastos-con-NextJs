export const getStateOfExpenses = (percentage: number) => {
  if (percentage >= 0 && percentage < 21) return "😁";
  else if (percentage > 21 && percentage < 41) return "😃";
  else if (percentage >= 41 && percentage < 61) return "🙂";
  else if (percentage >= 61 && percentage < 81) return "😐";
  else if (percentage >= 81 && percentage < 100) return "😑";
  else if (percentage >= 100) return "😶";
};

export const colorsAndMessages = {
  ["😁"]: "#20FF1C",
  ["😃"]: "#B6FF1C",
  ["🙂"]: "#FFDB1C",
  ["😐"]: "#FF961C",
  ["😑"]: "#FF521C",
  ["😶"]: "#FF1C1C",
};
