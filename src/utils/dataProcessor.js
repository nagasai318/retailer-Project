import log from "../utils/logger"


// Function to calculate reward points dynamically with decimal handling
export const calculateRewardPoints = (amount) => {
  let points = 0;
  if (amount == null || isNaN(amount)) {
    log.warn('Invalid amount provided:', amount);
    return 0;
}
if (amount < 0) {
    log.warn('Negative value encountered:', amount);
    return 0;
}
  // 1 point for every dollar spent over $50, up to $100
  if (amount > 50) points += Math.floor(amount - 50);
  // Additional 1 point for every dollar spent over $100
  if (amount > 100) points += Math.floor(amount - 100);
  log.info(`Reward points calculated for amount ${amount}: ${points}`);
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
  if(!Array.isArray(rewards)) {
    log.error('Invalid rewards data provided:', rewards);
    return {};
  }
  return rewards.reduce((acc, reward) => {
    const key = `${reward.month}-${reward.year}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(reward);
    return acc;
  }, {});
};

// Function to process transactions and group them by month
export const processMonthlyRewards = (transactions) => {
  if(!Array.isArray(transactions)) {
    log.error('Invalid transactions data provided:', transactions);
    return [];
  }
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
    if (amountSpent == null || isNaN(amountSpent)) {
      log.warn('Invalid amount spent provided:', amountSpent);
      return;
    }
    if (amountSpent < 0) {
      log.warn('Negative value encountered:', amountSpent);
      return;
    }
    if(!customerId || !customerName || !transactionDate) {
      log.warn('Missing required fields:', transaction);
      return;
    }
    const date = new Date(transactionDate);
    if (date < threeMonthsAgo) 
      {log.info('Skipping transaction older than 3 months:', transaction);
        return; // Skip transactions older than 3 months
      }
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
    log.info(`Updated reward points for ${key}:`, rewardsMap[key]);

  });

  return Object.values(rewardsMap); // Convert the map to an array
};


 // Function to calculate total reward points for each customer
 export const processTotalRewards = (transactions) => {
  if(!Array.isArray(transactions)) {
    log.error('Invalid transactions data provided:', transactions);
    return [];
  }
  const totalRewards = {};

  transactions.forEach((transaction) => {
    if (!transaction || isNaN(transaction.amountSpent) || !transaction.customerName || transaction === null || transaction === undefined) {
      log.warn('Skipping invalid transaction:', transaction);
      return;
    }
    if (transaction.amountSpent < 0) {
      log.warn('Negative amount encountered, skipping transaction:', transaction);
      return;
    }
    const rewardPoints = calculateRewardPoints(transaction.amountSpent);
    if (!totalRewards[transaction.customerName]) {
      totalRewards[transaction.customerName] = 0;
    }

    totalRewards[transaction.customerName] += rewardPoints;
    log.info(`Updated total reward points for ${transaction.customerName}: ${totalRewards[transaction.customerName]}`);

  });

  return Object.entries(totalRewards).map(([customerName, totalPoints]) => ({
    customerName,
    totalPoints,
  }));
};
