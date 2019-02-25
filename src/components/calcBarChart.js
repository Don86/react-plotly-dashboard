export default function calcBarChart(
    barInitialValue,
    barAnnualContribution,
    barInterestRate,
    barNumYears
  ) {
    // Get array of values over time
    let barArray = [+barInitialValue]
    for (let i = 1; i < barNumYears;i++) {
        let newVal = (barArray[barArray.length-1]+barAnnualContribution)*(1+(barInterestRate/100))
        barArray.push(newVal)
    }
  
    // modify for plotly bar chart
    let barObject = {"x":[], "y":[], "type":"bar"}
    for (let i = 0; i < barNumYears;i++) {
      barObject["x"].push(i)
      barObject["y"].push(barArray[i])
    }
    return [barObject]
  }