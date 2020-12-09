const fs = require('fs');

const TARGET_SUM = 2020;

function getSortedExpenses(data) { 
    return data.toString()
        .split(/\r?\n/)
        .map(Number)
        .sort((a,b) => a - b);
}

function findExpensesWithSum(allExpenses, targetSum) {
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
    const expenses = findExpensesWithSum(allExpenses, TARGET_SUM);
    const product = expenses[0] * expenses[1];
    console.log(expenses, product);
});