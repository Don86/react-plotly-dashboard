export default function parseStockData(myInput) {
    /* processes AlphaVantage data into a format for viz by plotly
    Convert object of objects into array of object(s) of arrays. 
    Output format like:
    {
     "x": <array of x values>
     "y": <array of y values>
     "mode": "line"
    }*/
    let newArray = {"x":[], "y":[]}
    for (var key in myInput) {
        if (myInput.hasOwnProperty(key)) {
            //const newRow = Object.assign({"date": key}, {"value": myInput[key]["4. close"]})
            newArray["x"].push(new Date(key))
            newArray["y"].push(myInput[key]["4. close"])
        }
    }
  
    return newArray
  }