const fs = require('fs');

const TARGET_SUM = 2020;

function getSortedExpenses(data) { 
    return data.toString()
        .split(/\r\n?/)
        .map(Number)
        .sort((a,b) => a - b);
}

/**
 * 
 * @param {Number[]} allExpenses 
 * @param {Number} targetSum 
 */
function findThreeExpensesWithSum(allExpenses, targetSum) {
    for(i = 0; i < allExpenses.length - 3; i++) {
        const lowestExpense = allExpenses[i];
        const remainingExpenses = allExpenses.slice(i+1);
        const remainingSum = targetSum - lowestExpense;
        const otherExpenses = findTwoExpensesWithSum(remainingExpenses, remainingSum);
        if (otherExpenses) {
            return [lowestExpense, ...otherExpenses];
        }
    }
}

function findTwoExpensesWithSum(allExpenses, targetSum) {
    let low = 0, high = allExpenses.length - 1;
    while (low < high) {
        const smallerExpense = allExpenses[low];
        const largerExpense = allExpenses[high];
        const sum = smallerExpense + largerExpense;
        if (sum === targetSum) {
            return [smallerExpense, largerExpense];
        } else if (sum < targetSum) {
            low++;
        } else if (sum > targetSum) {
            high--;
        }
    }
}

fs.readFile(__dirname + '/input.txt', function (err, data) {
    if (err) {
        throw err;
    }
    const allExpenses = getSortedExpenses(data);
    const expenses = findThreeExpensesWithSum(allExpenses, TARGET_SUM);
    if (expenses) {
        const product = expenses.reduce((totalProduct, nextExpense) => totalProduct * nextExpense);
        console.log(expenses, product);
    } else {
        console.log("No valid answer");
    }
});