
// const initialCost = 350000
// const appreciationRate = .03
// const mortageRate = .05
// const yearsToSell = 5
// const rentalIncome = 2036
// const downpayment = 125000
// const monthlyPayment = 2043
// const loanTerm = 25;
// const rentalCost = 1500

const initialCost = parseInt(process.env.initialCost);
const appreciationRate = parseFloat(process.env.appreciationRate);
const mortageRate =  parseFloat(process.env.mortageRate);
// const yearsToSell = 5
const rentalIncome = parseInt(process.env.rentalIncome);
const downpayment = parseInt(process.env.downpayment);
// const loanTerm = 1;
const rentalCost = parseInt(process.env.rentalCost);
const SandPAppreciation = parseFloat(process.env.SandPAppreciation);
const yearlyPropertyTax = parseInt(process.env.yearlyPropertyTax);
const monthlyMaintenance = parseInt(process.env.monthlyMaintenance);
console.log("initial:", initialCost);
console.log("appreciationRate:", appreciationRate);
console.log("mortageRate:", mortageRate);
console.log("rentalIncome:", rentalIncome);
console.log("downpayment:", downpayment);
console.log("SandPAppreciation:", SandPAppreciation);
console.log("yearlyPropertyTax:", yearlyPropertyTax);
console.log("monthlyMaintenance:", monthlyMaintenance);



// const monthlyPayment = yearlyPropertyTax/12 + monthlyMaintenance + 
// calculateMonthlyMortgagePayment( initialCost - downpayment, mortageRate, loanTerm) //lculateMonthlyMortgagePayment(ini) //



function calculateMonthlyMortgagePayment(principal: number, annualInterestRate: number, loanTermYears: number): number {
  const monthlyInterestRate = annualInterestRate / 12;
  const totalPayments = loanTermYears * 12;

  const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments);
  const denominator = Math.pow(1 + monthlyInterestRate, totalPayments) - 1;
  const monthlyPayment = principal * (numerator / denominator);

  return parseInt((monthlyPayment + yearlyPropertyTax/ 12 + monthlyMaintenance).toFixed(0));
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
    return profit.toFixed(0);;
}

function getProfitRentOut(initialCost, appreciationRate, yearsToSell, downpayment, monthlyPayment, mortageRate, loanTerm, rentalIncome) {

    const initialProfit = initialCost * (1 + appreciationRate) ** yearsToSell -
    downpayment - getTotalCostOfPaymentsMade(monthlyPayment, yearsToSell,loanTerm, rentalIncome ) -
    calculateRemainingPrincipal(initialCost - downpayment, mortageRate, loanTerm, yearsToSell)
    const totalRentalIncome = rentalIncome * 12 * yearsToSell
    const rentalIncomeTax = 12 * rentalIncome * .32 * yearsToSell
    const capitalGains = initialCost * (1 + appreciationRate) ** yearsToSell - initialCost
    const profitUnder500k = Math.min(500000, capitalGains)
    const profitOver500k = Math.max(0, capitalGains - 500000)
    const capitalGainsTax =  profitUnder500k * .5 * .32 + profitOver500k * 0.67 * 0.5
    const rentPaid = rentalCost * 12 * yearsToSell;

    const totalProfit = initialProfit + totalRentalIncome - rentalIncomeTax - capitalGainsTax - rentPaid ;
    // console.log(yearsToSell + " year profit rent out:", totalProfit);
    const stockProfit = getSandPprofit(downpayment, monthlyPayment, rentalCost, rentalIncome, yearsToSell, SandPAppreciation)
    // console.log("renting profit:", stockProfit - rentalCost * 12 * yearsToSell  )
    // console.log("housing saves : ", rentalCost * 12 * yearsToSell + totalProfit - stockProfit); 
    return totalProfit.toFixed(0);

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

const cellWidth = 10
const loanTerms = [1, 5, 10, 15, 25, 30]

console.log("RENT OUT \n\n")
console.log("Profit by ammortization time")
let header = " ".repeat(10);
for (const loan of loanTerms){
  let text = loan + " year"
  let textWidth = text.length
  text = text + " ".repeat(10 - textWidth)
  header += text
}
console.log(header)
console.log("-".repeat(10 * (loanTerms.length + 1)))
let cashFlow = "Cash Flow "
for (const loanTerm of loanTerms){
  const monthlyPayment = calculateMonthlyMortgagePayment( initialCost - downpayment, mortageRate, loanTerm)
  let text = (rentalIncome - monthlyPayment).toFixed(0).toString()
  let textWidth = text.length;
  text = text + " ".repeat(10 - textWidth)
  cashFlow += text
}
console.log(cashFlow)
for (let i = 1; i <= 31; i+=5){
  const loanTerms = [1, 5, 10, 15, 25, 30]
  let line = i + " years"
  const lineLength = line.length
  line += " ".repeat((10 - lineLength)) 
  for (const loanTerm of loanTerms){
    const profit = getProfitRentOut(initialCost, appreciationRate, i, downpayment, calculateMonthlyMortgagePayment( initialCost - downpayment, mortageRate, loanTerm), mortageRate, loanTerm, rentalIncome)
    const profitLength = profit.length
    line += profit + " ".repeat((10 - profitLength)) 
  }
  console.log(line)
}

console.log("\n\n LIVE IN \n\n")

console.log("Profit by ammortization time")
header = " ".repeat(10);
for (const loan of loanTerms){
  let text = loan + " year"
  let textWidth = text.length
  text = text + " ".repeat(10 - textWidth)
  header += text
}
console.log(header)
console.log("-".repeat(10 * (loanTerms.length + 1)))
cashFlow = "Cash Flow "
for (const loanTerm of loanTerms){
  const monthlyPayment = calculateMonthlyMortgagePayment( initialCost - downpayment, mortageRate, loanTerm)
  let text = (0 - monthlyPayment).toFixed(0).toString()
  let textWidth = text.length;
  text = text + " ".repeat(10 - textWidth)
  cashFlow += text
}
console.log(cashFlow)
for (let i = 1; i <= 31; i+=5){
  const loanTerms = [1, 5, 10, 15, 25, 30]
  let line = i + " years"
  const lineLength = line.length
  line += " ".repeat((10 - lineLength)) 
  for (const loanTerm of loanTerms){
    const profit = getProfitLiveIn(initialCost, appreciationRate, i, downpayment, calculateMonthlyMortgagePayment( initialCost - downpayment, mortageRate, loanTerm), mortageRate, loanTerm, false)
    const profitLength = profit.length
    line += profit + " ".repeat((10 - profitLength)) 
  }
  console.log(line)
}
  