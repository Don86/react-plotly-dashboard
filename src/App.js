import React, { Component } from 'react';
import './App.css';

import Plot from 'react-plotly.js';
import TopBar from "./components/TopBar"
//import PanelTop from "./components/PanelTop"
import PanelBottom from "./components/PanelBottom"
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

function parseStockData(myInput) {
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

function computeBarData() {
  console.log("proc computeBarData")
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      barInitialValue:0,
      barAnnualContribution:0,
      barInterestRate:0,
      barNumYears:0,
      plotData:{}, 
      plotLayout:{
        width:500, 
        height:400, 
        margin: {
          l: 70,
          r: 20,
          b: 40,
          t: 5,
          pad: 5
        }}
      }
  }

  handleTopPanelChange() {
    this.setState(return {barInitialValue:})
  }


  componentDidMount() {
    const ticker = "VTSAX"
    const api_key = "EEKL6B77HNZE6EB4"
    fetch("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol="+ticker+"&apikey="+api_key)
    .then(response => response.json())
    .then(data => parseStockData(data["Monthly Time Series"]))
    //.then(data => console.log(data))
    .then(data =>{this.setState({plotData:data})})
  }

  render() {
    const DummyData = [{
      "x":["2018-04-15", "2018-04-16", "2018-04-17", "2018-04-18", "2018-04-19"],
      "y":[123, 181, 102, 190, 199],
      "mode":"line"
    }]

    const DummyBarData = [{
      "x":["2018-04-15", "2018-04-16", "2018-04-17", "2018-04-18", "2018-04-19"],
      "y":[123, 181, 102, 190, 199],
      "type":"bar"
    }]

    const plotArray = [this.state.plotData]

    return (
      <div>
      <TopBar />
      <div class="container">
        <div className="panel top">
          <h3>Initial Value</h3>
          <input className="input" 
          type="InitialValue" 
          name="InitialValue" 
          onChange={this.handleTopPanelChange}
          placeholder="0" />
          <h3>Annual contribution</h3>
          <input className="input" 
          type="AnnualContribution" 
          name="AnnualContribution" 
          placeholder="0" />
          <h3>Interest Rate (%)</h3>
          <input className="input" type="InterestRate" name="InterestRate" placeholder="0" />
          <h3>No. of years</h3>
          <input className="input" type="InterestRate" name="InterestRate" placeholder="0" />
        </div>
        <Plot className="chart bar" data={DummyBarData} layout={this.state.plotLayout}/>
      </div>
      <div class="container">
        <PanelBottom className="panel bottom"/>
        <Plot className="chart line" data={DummyData} layout={this.state.plotLayout}/>
      </div>
      </div>
    );
  }
}

export default App;
