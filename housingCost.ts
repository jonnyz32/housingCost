
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
const rentalAppreciation = parseInt(process.env.rentalAppreciation);
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
console.log("rentalAppreciation:", rentalAppreciation);
console.log("rentalCost:", rentalCost);
console.log("downpayment:", downpayment);
console.log("SandPAppreciation:", SandPAppreciation);
console.log("yearlyPropertyTax:", yearlyPropertyTax);
console.log("monthlyMaintenance:", monthlyMaintenance);



// const monthlyPayment = yearlyPropertyTax/12 + monthlyMaintenance + 
// calculateMonthlyMortgagePayment( initialCost - downpayment, mortageRate, loanTerm) //lculateMonthlyMortgagePayment(ini) //



export function calculateMonthlyMortgagePayment(principal: number, annualInterestRate: number, loanTermYears: number, yearlyPropertyTax:number, monthlyMaintenance:number): number {
  const monthlyInterestRate = annualInterestRate / 12;
  const totalPayments = loanTermYears * 12;

  const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments);
  const denominator = Math.pow(1 + monthlyInterestRate, totalPayments) - 1;
  const monthlyPayment = principal * (numerator / denominator);

  return parseInt((monthlyPayment + yearlyPropertyTax/ 12 + monthlyMaintenance).toFixed(0));
}

function getTotalCostOfPaymentsMade(monthlyPayment: number, yearsToSell:number,  
  loanTerm:number, monthlyPaymentAppreciation: number, isRentalPayment: boolean): number {
  let costOfPayments;
  if (yearsToSell < loanTerm || isRentalPayment) {
    costOfPayments = getTotalRentPaid(monthlyPayment, yearsToSell, monthlyPaymentAppreciation)
  } else {
    costOfPayments = getTotalRentPaid(monthlyPayment, loanTerm, monthlyPaymentAppreciation)
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



// Living in the primary residence
export function getProfitLiveIn(initialCost, appreciationRate, yearsToSell, downpayment, monthlyPayment, mortageRate, loanTerm, print = true, partialRentalIncome = 0) {

    const profit =  initialCost * (1 + appreciationRate) ** yearsToSell -
        downpayment - getTotalCostOfPaymentsMade(monthlyPayment, yearsToSell,loanTerm, 0, false) -
        calculateRemainingPrincipal(initialCost - downpayment, mortageRate, loanTerm, yearsToSell)
    const {totalRentalIncome, totalRentalTax } = getTotalRentalIncome(partialRentalIncome, yearsToSell, 0)

        if (print){
            // const stockProfit = getSandPprofit(downpayment, monthlyPayment, rentalCost, rentalIncome, yearsToSell, SandPAppreciation)

            console.log(yearsToSell + " year profit live in:", profit);
            // console.log("renting profit:", stockProfit - rentalCost * 12 * yearsToSell  )
            // console.log("housing saves : ", rentalCost * 12 * yearsToSell + profit - stockProfit); 

        }
    return (profit + totalRentalIncome + totalRentalTax).toFixed(0);
}

interface IRental {
  totalRentalIncome: number;
  totalRentalTax: number;
}

function getTotalRentalIncome(initialMonthlyRentalIncome, yearsToSell, rentalAppreciation):IRental{
  let totalRentalIncome = 0;
  let totalRentalTax = 0;
  for (let i = 0; i < yearsToSell ; i++) {
    const rentalIncomeForYear = 12 * initialMonthlyRentalIncome * (1 + rentalAppreciation) ** i 
    const taxForYear = rentalIncomeForYear * 0.32
    totalRentalIncome += rentalIncomeForYear
    totalRentalTax += taxForYear
  }
  return {totalRentalIncome, totalRentalTax};
}

function getTotalRentPaid(rentalCost, yearsToSell, rentalAppreciation):number{
  const rental =  getTotalRentalIncome(rentalCost, yearsToSell, rentalAppreciation)
  const rentPaid = rental.totalRentalIncome;
  return rentPaid;
}


// Living somewhere else and renting out your property
export function getProfitRentOut(initialCost, appreciationRate, yearsToSell, downpayment, monthlyPayment, mortageRate, loanTerm, rentalIncome, rentalCost, rentalAppreciation) {

    const initialProfit = initialCost * (1 + appreciationRate) ** yearsToSell -
    downpayment - getTotalCostOfPaymentsMade(monthlyPayment, yearsToSell,loanTerm, 0, false ) -
    calculateRemainingPrincipal(initialCost - downpayment, mortageRate, loanTerm, yearsToSell)
    const {totalRentalIncome, totalRentalTax } = getTotalRentalIncome(rentalIncome, yearsToSell, rentalAppreciation)
    const capitalGains = initialCost * (1 + appreciationRate) ** yearsToSell - initialCost
    const profitUnder500k = Math.min(500000, capitalGains)
    const profitOver500k = Math.max(0, capitalGains - 500000)
    const capitalGainsTax =  profitUnder500k * .5 * .32 + profitOver500k * 0.67 * 0.5
    const rentPaid = getTotalRentPaid(rentalCost, yearsToSell, rentalAppreciation)

    const totalProfit = initialProfit + totalRentalIncome - totalRentalTax - capitalGainsTax - rentPaid ;
    // console.log(yearsToSell + " year profit rent out:", totalProfit);
    // const stockProfit = getSandPprofit(downpayment, monthlyPayment, rentalCost, rentalIncome, yearsToSell, SandPAppreciation)
    // console.log("renting profit:", stockProfit - rentalCost * 12 * yearsToSell  )
    // console.log("housing saves : ", rentalCost * 12 * yearsToSell + totalProfit - stockProfit); 
    return totalProfit.toFixed(0);

}

function getProfitRent(initialInvestment, rentalCost, yearsToSell, SandPAppreciation, monthlyPayment){
  const stockProfit = getSandPprofit(initialInvestment, yearsToSell, SandPAppreciation, monthlyPayment)
  const totalRentalCost = 12 * yearsToSell * rentalCost
  return (stockProfit - totalRentalCost).toFixed(0)

}

function getSandPprofit(initialInvestment, yearsToSell, SandPAppreciation, monthlyPayment){
    const futureValue = futureValueOfAnnuityWithInitialInvestment(initialInvestment,monthlyPayment, SandPAppreciation, yearsToSell * 12 ) 
    const taxFreeContributions = Math.min(37560 * yearsToSell, monthlyPayment * 12 * yearsToSell);
    const taxableContributions = monthlyPayment * 12 * yearsToSell - taxFreeContributions;
    const percentTaxable = taxableContributions / (taxFreeContributions + taxableContributions)
    const capitalGains = futureValue - initialInvestment - monthlyPayment * 12 * yearsToSell
    const taxableProfit = percentTaxable * capitalGains
    const taxabletUnder500k = Math.min(500000, taxableProfit)
    const taxableOver500k = Math.max(0, taxableProfit - 500000)
    const capitalGainsTax = taxabletUnder500k * .32 + taxableOver500k*.5
    const profit = capitalGains - capitalGainsTax;
    return profit;
}

function futureValueOfAnnuityWithInitialInvestment(
  initialInvestment: number,
  payment: number,
  interestRate: number,
  periods: number
): number {
  // Convert annual interest rate to monthly interest rate
  const monthlyInterestRate = interestRate / 12;

  // Calculate future value of regular payments
  const futureValueOfPayments = payment * ((Math.pow(1 + monthlyInterestRate, periods) - 1) / monthlyInterestRate);

  // Calculate future value of initial investment
  const futureValueOfInitialInvestment = initialInvestment * Math.pow(1 + monthlyInterestRate, periods);

  // Total future value including initial investment
  const futureValue = futureValueOfInitialInvestment + futureValueOfPayments;

  return futureValue;
}


export function getROI(monthlyMortgagePayment: number, monthlyRentalPayment, yearsToSell:number,  
  loanTerm:number, downpayment: number, profit: number, monthlyPaymentAppreciation: number, monthlySandPInvestment: number = 0){
    const totalCostOfMortgagePayments = getTotalCostOfPaymentsMade(monthlyMortgagePayment, yearsToSell, loanTerm, 0, false)
    const totalCostOfRentalPayments = getTotalCostOfPaymentsMade(monthlyRentalPayment, yearsToSell, loanTerm, monthlyPaymentAppreciation, true)
    const totalCostOfSandPInvestments = 12 * yearsToSell * monthlySandPInvestment
    const totalMoneySpent =  totalCostOfMortgagePayments + totalCostOfRentalPayments + downpayment + totalCostOfSandPInvestments
    return ((profit / totalMoneySpent) * 100).toFixed(0) + "%";

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
  let roi = "ROI"
  roi += " ".repeat(6 - roi.length)
  text = text + roi
  header += text
}
console.log(header)
console.log("-".repeat(10 * (loanTerms.length + 1)))
let cashFlow = "Cash Flow "
for (const loanTerm of loanTerms){
  const monthlyPayment = calculateMonthlyMortgagePayment( initialCost - downpayment, mortageRate, loanTerm, yearlyPropertyTax, monthlyMaintenance )
  let text = (rentalIncome - monthlyPayment - rentalCost).toFixed(0).toString()
  let textWidth = text.length;
  text = text + " ".repeat(16 - textWidth)
  cashFlow += text
}
console.log(cashFlow)
for (let i = 1; i <= 31; i+=5){
  const loanTerms = [1, 5, 10, 15, 25, 30]
  let line = i + " years"
  const lineLength = line.length
  line += " ".repeat((10 - lineLength)) 
  for (const loanTerm of loanTerms){
    const monthlyPayment = calculateMonthlyMortgagePayment( initialCost - downpayment, mortageRate, loanTerm, yearlyPropertyTax, monthlyMaintenance)
    const profit = getProfitRentOut(initialCost, appreciationRate, i, downpayment, monthlyPayment, mortageRate, loanTerm, rentalIncome, rentalCost, rentalAppreciation)
    const roi = getROI(monthlyPayment, rentalCost, i, loanTerm, downpayment, parseInt(profit), rentalAppreciation)
    const profitLength = profit.length
    line += profit + " ".repeat((10 - profitLength)) 
    line += roi + " ".repeat(6 - roi.length)

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
  let roi = "ROI"
  roi += " ".repeat(6 - roi.length)
  text = text + roi
  header += text
}
console.log(header)
console.log("-".repeat(10 * (loanTerms.length + 1)))
cashFlow = "Cash Flow "
for (const loanTerm of loanTerms){
  const monthlyPayment = calculateMonthlyMortgagePayment( initialCost - downpayment, mortageRate, loanTerm, yearlyPropertyTax, monthlyMaintenance)
  let text = (0 - monthlyPayment).toFixed(0).toString()
  let textWidth = text.length;
  text = text + " ".repeat(16 - textWidth)
  cashFlow += text
}
console.log(cashFlow)
for (let i = 1; i <= 31; i+=5){
  const loanTerms = [1, 5, 10, 15, 25, 30]
  let line = i + " years"
  const lineLength = line.length
  line += " ".repeat((10 - lineLength)) 
  for (const loanTerm of loanTerms){
    const monthlyPayment = calculateMonthlyMortgagePayment( initialCost - downpayment, mortageRate, loanTerm, yearlyPropertyTax, monthlyMaintenance)
    const profit = getProfitLiveIn(initialCost, appreciationRate, i, downpayment, monthlyPayment, mortageRate, loanTerm, false)
    const roi = getROI(monthlyPayment, 0, i, loanTerm, downpayment, parseInt(profit), rentalAppreciation)
    const profitLength = profit.length
    line += profit + " ".repeat((10 - profitLength)) 
    line += roi + " ".repeat(6 - roi.length)
  }
  console.log(line)
}
  

console.log("Profit rent")
header = " ".repeat(10);
for (const loan of loanTerms){
  let text = loan + " year"
  let textWidth = text.length
  text = text + " ".repeat(10 - textWidth)
  let roi = "ROI"
  roi += " ".repeat(6 - roi.length)
  text = text + roi
  header += text
}
console.log(header)
console.log("-".repeat(10 * (loanTerms.length + 1)))
cashFlow = "Cash Flow "
for (const loanTerm of loanTerms){
  const monthlyPayment = calculateMonthlyMortgagePayment( initialCost - downpayment, mortageRate, loanTerm, yearlyPropertyTax, monthlyMaintenance)
  let text = (0 - monthlyPayment).toFixed(0).toString()
  let textWidth = text.length;
  text = text + " ".repeat(16 - textWidth)
  cashFlow += text
}
console.log(cashFlow)
for (let i = 1; i <= 31; i+=5){
  const loanTerms = [1, 5, 10, 15, 25, 30]
  let line = i + " years"
  const lineLength = line.length
  line += " ".repeat((10 - lineLength)) 
  for (const loanTerm of loanTerms){
    const monthlyPayment = calculateMonthlyMortgagePayment( initialCost - downpayment, mortageRate, loanTerm, yearlyPropertyTax, monthlyMaintenance)
    const monthlyInvestment = monthlyPayment - rentalCost
    const profit = getProfitRent(downpayment, rentalCost, i, SandPAppreciation, monthlyInvestment)
    const roi = getROI(0, rentalCost, i, loanTerm, downpayment, parseInt(profit), rentalAppreciation, monthlyInvestment)
    const profitLength = profit.length
    line += profit + " ".repeat((10 - profitLength)) 
    line += roi + " ".repeat(6 - roi.length)
  }
  console.log(line)
}
  