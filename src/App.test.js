import { calculateRewardPoints, groupRewardsByMonth, processMonthlyRewards, processTotalRewards } from "./utils/dataProcessor";


describe('Data Processor Functions', () => {
  // Test cases for calculateRewardPoints
  describe('calculateRewardPoints', () => {
    test('calculates reward points for purchases over $50 but below $100', () => {
      const result = calculateRewardPoints(75); // (75 - 50) = 25
      expect(result).toBe(25);
    });

    test('calculates reward points for purchases over $100', () => {
      const result = calculateRewardPoints(120); // (120 - 100) * 2 + 50 = 90
      expect(result).toBe(90);
    });

    test('returns 0 reward points for purchases below $50', () => {
      const result = calculateRewardPoints(40);
      expect(result).toBe(0);
    });

    test('handles fractional purchases correctly', () => {
      const result = calculateRewardPoints(100.2); // (0.2 * 2) + 50 = 50
      expect(result).toBe(50);
    });

    test('handles edge cases for $50 and $100 purchases', () => {
      expect(calculateRewardPoints(50)).toBe(0); // Exactly $50, no rewards
      expect(calculateRewardPoints(100)).toBe(50); // Exactly $100, 50 points
    });
  });

  // Test cases for groupRewardsByMonth
  describe("processMonthlyRewards", () => {
    const transactions = [
      { customerId: "123", customerName: "John Doe", amountSpent: 120, transactionDate: "2024-11-15" }, // 90 points
      { customerId: "123", customerName: "John Doe", amountSpent: 60, transactionDate: "2024-11-20" },  // 10 points
      { customerId: "456", customerName: "Jane Smith", amountSpent: 75, transactionDate: "2024-11-10" }, // 25 points
      { customerId: "789", customerName: "Alice Johnson", amountSpent: 200, transactionDate: "2023-09-10" }, // 250 points
    ];
  
    test("processes and filters latest 3 months of transactions", () => {
      const result = processMonthlyRewards(transactions);
      const expected = [
        { customerId: "123", name: "John Doe", month: "Nov", year: 2024, rewardPoints: 100 },
        { customerId: "456", name: "Jane Smith", month: "Nov", year: 2024, rewardPoints: 25 },
      ];
      expect(result).toEqual(expected);
    });
  
    test("handles edge case when transactions span exactly 3 months", () => {
      const threeMonthTransactions = [
        { customerId: "123", customerName: "John Doe", amountSpent: 120, transactionDate: "2024-12-10" }, // 90 points
        { customerId: "456", customerName: "Jane Smith", amountSpent: 60, transactionDate: "2024-10-10" }, // 10 points
      ];
      const result = processMonthlyRewards(threeMonthTransactions);
      const expected = [
        { customerId: "123", name: "John Doe", month: "Dec", year: 2024, rewardPoints: 90 },
        { customerId: "456", name: "Jane Smith", month: "Oct", year: 2024, rewardPoints: 10 },
      ];
      expect(result).toEqual(expected);
    });
  
    test("returns empty array for transactions older than 3 months", () => {
      const oldTransactions = [
        { customerId: "123", customerName: "John Doe", amountSpent: 120, transactionDate: "2023-06-15" }, // older than 3 months
      ];
      const result = processMonthlyRewards(oldTransactions);
      expect(result).toEqual([]);
    });
  });
  
  describe("groupRewardsByMonth", () => {
    test("groups transactions by month and aggregates rewards", () => {
      const processedRewards = [
        { customerId: "123", name: "John Doe", month: "Dec", year: "2023", rewardPoints: 100 },
        { customerId: "456", name: "Jane Smith", month: "Nov", year: "2023", rewardPoints: 25 },
      ];
  
      const result = groupRewardsByMonth(processedRewards);
      const expected = {
        "Dec-2023": [
          { customerId: "123", name: "John Doe", month: "Dec", year: "2023", rewardPoints: 100 },
        ],
        "Nov-2023": [
          { customerId: "456", name: "Jane Smith", month: "Nov", year: "2023", rewardPoints: 25 },
        ],
      };
  
      expect(result).toEqual(expected);
    });
  });
  

  // Test cases for processTotalRewards
  describe('processTotalRewards', () => {
    const transactions = [
      { customerId: '123', customerName: 'John Doe', amountSpent: 120, date: '2023-12-15' }, // 90 points
      { customerId: '123', customerName: 'John Doe', amountSpent: 60, date: '2023-12-20' },  // 10 points
      { customerId: '456', customerName: 'Jane Smith', amountSpent: 75, date: '2023-11-10' }, // 25 points
    ];

    test('calculates total rewards for each customer', () => {
      const result = processTotalRewards(transactions);
      expect(result).toEqual([
        { customerName: 'John Doe', totalPoints: 100 },
        { customerName: 'Jane Smith', totalPoints: 25 },
      ]);
    });

    test('handles edge cases with no transactions', () => {
      const result = processTotalRewards([]);
      expect(result).toEqual([]);
    });
  });
});
