
/**
 * @param {number[]} weights
 * @param {number} maxNumberOfDays
 * @return {number}
 */
var shipWithinDays = function (weights, maxNumberOfDays) {
    let lowerBoundaryCapacity = 0;
    let upperBoundaryCapacity = 0;
    for (let weight of weights) {
        lowerBoundaryCapacity = Math.max(lowerBoundaryCapacity, weight);
        upperBoundaryCapacity += weight;
    }

    let minCapacity = upperBoundaryCapacity;

    while (lowerBoundaryCapacity <= upperBoundaryCapacity) {
        let capacity = lowerBoundaryCapacity + Math.floor((upperBoundaryCapacity - lowerBoundaryCapacity) / 2);
        let capacityIsSufficient = checkCapacity(capacity, maxNumberOfDays, weights);

        if (capacityIsSufficient) {
            minCapacity = capacity;
            upperBoundaryCapacity = capacity - 1;
        } else {
            lowerBoundaryCapacity = capacity + 1;
        }
    }
    return minCapacity;
};

/**
 * @param {number} capacity
 * @param {number} maxNumberOfDays
 * @param {number[]} weights
 * @return {boolean}
 */
function checkCapacity(capacity, maxNumberOfDays, weights) {
    let currentWeight = 0;
    let countDays = 1;

    for (let weight of weights) {
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
