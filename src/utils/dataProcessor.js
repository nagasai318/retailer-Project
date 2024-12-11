// Function to calculate reward points dynamically with decimal handling
export const calculateRewardPoints = (amount) => {
  let points = 0;
  // 1 point for every dollar spent over $50, up to $100
  if (amount > 50) points += Math.floor(amount - 50);
  // Additional 1 point for every dollar spent over $100
  if (amount > 100) points += Math.floor(amount - 100);
  return points;
};

// Helper function to format the date as "YYYY-MMM"
export const formatMonthYear = (date) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  return `${year}-${month}`;
};

// Group rewards by month and year
export const groupRewardsByMonth = (rewards) => {
  return rewards.reduce((acc, reward) => {
    const key = `${reward.month}-${reward.year}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(reward);
    return acc;
  }, {});
};

// Function to process transactions and group them by month
export const processMonthlyRewards = (transactions) => {
  const rewardsMap = {};


    // Get the current date and calculate the date three months ago
    const currentDate = new Date();
    const threeMonthsAgo = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 3,
      currentDate.getDate()
    );

  transactions.forEach((transaction) => {
    const { customerId, customerName, amountSpent, transactionDate } = transaction;

    const date = new Date(transactionDate);
    if (date < threeMonthsAgo) return; // Skip transactions older than 3 months
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "short" }); // e.g., "Jan", "Feb"
    const rewardPoints = calculateRewardPoints(amountSpent);

    const key = `${customerId}-${month}-${year}`; // Unique key for each customer per month

    if (!rewardsMap[key]) {
      // Initialize the entry for the customer in this month
      rewardsMap[key] = {
        customerId,
        name: customerName,
        month,
        year,
        rewardPoints: 0,
      };
    }

    // Add reward points to the existing total for this month
    rewardsMap[key].rewardPoints += rewardPoints;
  });

  return Object.values(rewardsMap); // Convert the map to an array
};


 // Function to calculate total reward points for each customer
 export const processTotalRewards = (transactions) => {
  const totalRewards = {};

  transactions.forEach((transaction) => {
    const rewardPoints = calculateRewardPoints(transaction.amountSpent);

    if (!totalRewards[transaction.customerName]) {
      totalRewards[transaction.customerName] = 0;
    }

    totalRewards[transaction.customerName] += rewardPoints;
  });

  return Object.entries(totalRewards).map(([customerName, totalPoints]) => ({
    customerName,
    totalPoints,
  }));
};
