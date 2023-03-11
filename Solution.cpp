
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
    
public:
    int shipWithinDays(const vector<int>& weights, int maxNumberOfDays) const {
        int lowerBoundaryCapacity = 0;
        int upperBoundaryCapacity = 0;
        for (int weight : weights) {
            lowerBoundaryCapacity = max(lowerBoundaryCapacity, weight);
            upperBoundaryCapacity += weight;
        }

        int minCapacity = upperBoundaryCapacity;

        while (lowerBoundaryCapacity <= upperBoundaryCapacity) {
            int capacity = lowerBoundaryCapacity + (upperBoundaryCapacity - lowerBoundaryCapacity) / 2;
            bool capacityIsSufficient = checkCapacity(capacity, maxNumberOfDays, weights);

            if (capacityIsSufficient) {
                minCapacity = capacity;
                upperBoundaryCapacity = capacity - 1;
            } else {
                lowerBoundaryCapacity = capacity + 1;
            }
        }
        return minCapacity;
    }

private:
    bool checkCapacity(int capacity, int maxNumberOfDays, const vector<int>& weights) const {
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
};
