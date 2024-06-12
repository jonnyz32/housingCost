
// const initialCost = 350000
// const appreciationRate = .03
// const mortageRate = .05
// const yearsToSell = 5
// const rentalIncome = 2036
// const downpayment = 125000
// const monthlyPayment = 2043
// const loanTerm = 25;
// const rentalCost = 1500

const initialCost = 519000
const appreciationRate = .03
const mortageRate = .05
// const yearsToSell = 5
const rentalIncome = 2380
const downpayment = 150000
// const loanTerm = 1;
const rentalCost = 1500
const SandPAppreciation = 0.07
const yearlyPropertyTax = 2918
const monthlyMaintenance = 0

// const monthlyPayment = yearlyPropertyTax/12 + monthlyMaintenance + 
// calculateMonthlyMortgagePayment( initialCost - downpayment, mortageRate, loanTerm) //lculateMonthlyMortgagePayment(ini) //



function calculateMonthlyMortgagePayment(principal: number, annualInterestRate: number, loanTermYears: number): number {
  const monthlyInterestRate = annualInterestRate / 12;
  const totalPayments = loanTermYears * 12;

  const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments);
  const denominator = Math.pow(1 + monthlyInterestRate, totalPayments) - 1;
  const monthlyPayment = principal * (numerator / denominator);

  return monthlyPayment;
}

function getTotalCostOfPaymentsMade(monthlyPayment: number, yearsToSell:number,  
  loanTerm:number, rentalIncome = 0): number {
  let costOfPayments;
  if (yearsToSell < loanTerm){
    costOfPayments = monthlyPayment * 12 * yearsToSell;
  } else {
    costOfPayments = monthlyPayment * 12 * loanTerm;
  }
  // console.log("Total cost of payments: " + costOfPayments)
  return costOfPayments;
}

function calculateRemainingPrincipal(
    principal: number,
    annualInterestRate: number,
    loanTermYears: number,
    yearsToSell: number
  ): number {
    const monthlyInterestRate = annualInterestRate / 12;
    const totalPayments = loanTermYears * 12;
    const paymentsMade = Math.min(loanTermYears * 12, yearsToSell * 12); 
  
    const remainingPrincipal = principal * (
      (Math.pow(1 + monthlyInterestRate, totalPayments) - Math.pow(1 + monthlyInterestRate, paymentsMade)) /
      (Math.pow(1 + monthlyInterestRate, totalPayments) - 1)
    );
  
    return remainingPrincipal;
  }




function getProfitLiveIn(initialCost, appreciationRate, yearsToSell, downpayment, monthlyPayment, mortageRate, loanTerm, print = true) {

    const profit =  initialCost * (1 + appreciationRate) ** yearsToSell -
        downpayment - getTotalCostOfPaymentsMade(monthlyPayment, yearsToSell,loanTerm ) -
        calculateRemainingPrincipal(initialCost - downpayment, mortageRate, loanTerm, yearsToSell)
        if (print){
            const stockProfit = getSandPprofit(downpayment, monthlyPayment, rentalCost, rentalIncome, yearsToSell, SandPAppreciation)

            console.log(yearsToSell + " year profit live in:", profit);
            // console.log("renting profit:", stockProfit - rentalCost * 12 * yearsToSell  )
            // console.log("housing saves : ", rentalCost * 12 * yearsToSell + profit - stockProfit); 

        }
    return profit;
}

function getProfitRentOut(initialCost, appreciationRate, yearsToSell, downpayment, monthlyPayment, mortageRate, loanTerm, rentalIncome) {

    const initialProfit = initialCost * (1 + appreciationRate) ** yearsToSell -
    downpayment - getTotalCostOfPaymentsMade(monthlyPayment, yearsToSell,loanTerm, rentalIncome ) -
    calculateRemainingPrincipal(initialCost - downpayment, mortageRate, loanTerm, yearsToSell)
    const totalRentalIncome = rentalIncome * 12 * yearsToSell
    const rentalIncomeTax = 12 * rentalIncome * .32 * yearsToSell
    const capitalGainsTax = (initialCost * (1 + appreciationRate) ** yearsToSell - initialCost) * .67 * .32
    const rentPaid = rentalCost * 12 * yearsToSell;

    const totalProfit = initialProfit + totalRentalIncome - rentalIncomeTax - capitalGainsTax - rentPaid ;
    // console.log(yearsToSell + " year profit rent out:", totalProfit);
    const stockProfit = getSandPprofit(downpayment, monthlyPayment, rentalCost, rentalIncome, yearsToSell, SandPAppreciation)
    // console.log("renting profit:", stockProfit - rentalCost * 12 * yearsToSell  )
    // console.log("housing saves : ", rentalCost * 12 * yearsToSell + totalProfit - stockProfit); 
    return totalProfit;

}

function getSandPprofit(downpayment, monthlyPayment, rentalCost, rentalIncome, yearsToSell, SandPAppreciation){
    const profit = downpayment * (1 + SandPAppreciation) ** yearsToSell - downpayment;
    return profit;
}



// const oneyearProfit = getProfitLiveIn(initialCost, appreciationRate, 1, downpayment, monthlyPayment, mortageRate, loanTerm)
// const fiveyearProfit = getProfitLiveIn(initialCost, appreciationRate, yearsToSell, downpayment, monthlyPayment, mortageRate, loanTerm)
// const tenyearProfit = getProfitLiveIn(initialCost, appreciationRate, 10, downpayment, monthlyPayment, mortageRate, loanTerm)
// const twentyyearProfit = getProfitLiveIn(initialCost, appreciationRate, 20, downpayment, monthlyPayment, mortageRate, loanTerm)
// const thirtyyyearProfit = getProfitLiveIn(initialCost, appreciationRate, 30, downpayment, monthlyPayment, mortageRate, loanTerm)


// const oneyearProfitRO = getProfitRentOut(initialCost, appreciationRate, 1, downpayment, monthlyPayment, mortageRate, loanTerm, 2036)
// const fiveyearProfitRO = getProfitRentOut(initialCost, appreciationRate, yearsToSell, downpayment, monthlyPayment, mortageRate, loanTerm, 2036)
// const tenyearProfitRO = getProfitRentOut(initialCost, appreciationRate, 10, downpayment, monthlyPayment, mortageRate, loanTerm, 2036)
// const twentyyearProfitRO = getProfitRentOut(initialCost, appreciationRate, 20, downpayment, monthlyPayment, mortageRate, loanTerm, 2036)
// const thirtyyearProfitRO = getProfitRentOut(initialCost, appreciationRate, 30, downpayment, monthlyPayment, mortageRate, loanTerm, 2036)

console.log("Profit by ammortization time")
console.log("1 year | 10 year  | 25 year | 30 year")
console.log("----------------------------------------")
for (let i = 1; i <= 31; i+=5){
  const profit1 =  getProfitRentOut(initialCost, appreciationRate, i, downpayment, calculateMonthlyMortgagePayment( initialCost - downpayment, mortageRate, 1), mortageRate, 1, 2036)
  const profit10 = getProfitRentOut(initialCost, appreciationRate, i, downpayment, calculateMonthlyMortgagePayment( initialCost - downpayment, mortageRate, 10), mortageRate, 10, 2036)
  const profit25 = getProfitRentOut(initialCost, appreciationRate, i, downpayment, calculateMonthlyMortgagePayment( initialCost - downpayment, mortageRate, 25), mortageRate, 25, 2036)
  const profit30 = getProfitRentOut(initialCost, appreciationRate, i, downpayment, calculateMonthlyMortgagePayment( initialCost - downpayment, mortageRate, 30), mortageRate, 30, 2036)
  console.log(i + "years|" + profit1 + " | " + profit10 + " | " + profit25 + " | " + profit30)
}