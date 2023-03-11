
public class Solution {

    public int shipWithinDays(int[] weights, int maxNumberOfDays) {
        int lowerBoundaryCapacity = 0;
        int upperBoundaryCapacity = 0;
        for (int weight : weights) {
            lowerBoundaryCapacity = Math.max(lowerBoundaryCapacity, weight);
            upperBoundaryCapacity += weight;
        }

        int minCapacity = upperBoundaryCapacity;

        while (lowerBoundaryCapacity <= upperBoundaryCapacity) {
            int capacity = lowerBoundaryCapacity + (upperBoundaryCapacity - lowerBoundaryCapacity) / 2;
            boolean capacityIsSufficient = checkCapacity(capacity, maxNumberOfDays, weights);

            if (capacityIsSufficient) {
                minCapacity = capacity;
                upperBoundaryCapacity = capacity - 1;
            } else {
                lowerBoundaryCapacity = capacity + 1;
            }
        }
        return minCapacity;
    }

    private boolean checkCapacity(int capacity, int maxNumberOfDays, int[] weights) {
        int currentWeight = 0;
        int countDays = 1;

        for (int weight : weights) {
            currentWeight += weight;

            if (currentWeight > capacity) {
                currentWeight = weight;
                if (++countDays > maxNumberOfDays) {
                    return false;
                }
            }
        }
        return countDays <= maxNumberOfDays;
    }
}
