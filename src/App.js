import React, { Component } from 'react';
import './App.css';

import Plot from 'react-plotly.js';
import TopBar from "./components/TopBar"
//import PanelTop from "./components/PanelTop"
//import PanelBottom from "./components/PanelBottom"
import calcBarChart from "./components/calcBarChart"
import parseStockData from "./components/parseStockData"

class App extends Component {
  constructor() {
    super()
    this.state = {
      barInitialValue:10000,
      barAnnualContribution:100,
      barInterestRate:1,
      barNumYears:10,
      barData:[],
      ticker:"VTSAX",
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
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const {name, value} = event.target
    if (name === "barInitialValue" || name === "barAnnualContribution" || name === "barInterestRate" || event.target.name === "barNumYears") {
      this.setState({[name]: event.target.value})
      const barObj = calcBarChart(this.state.barInitialValue,
        this.state.barAnnualContribution,
        this.state.barInterestRate,
        this.state.barNumYears)
      this.setState({barData: barObj})
      console.log("barData=", barObj)
    }
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

    return (
      <div>
        <TopBar />
        <div className="container">
          <div className="panel top">
            <div><label className="label">Initial Value</label>
            <input className="input" 
              type="text" 
              value={this.state.barInitialValue} 
              name="barInitialValue" 
              onChange={this.handleChange}
              placeholder="0" /></div>
      
            <div><label className="label">Annual contribution</label>
            <input className="input" 
              type="text" 
              name="barAnnualContribution" 
              value={this.state.barAnnualContribution}
              onChange={this.handleChange}
              placeholder="0" /></div>

            <div><label className="label">Interest Rate (%)</label>
            <input className="input" 
              type="text" 
              name="barInterestRate" 
              value={this.state.barInterestRate} 
              onChange={this.handleChange}
              placeholder="0" /></div>

            <div><label className="label">No. of years</label>
            <input className="input" 
              type="text" 
              name="barNumYears" 
              value={this.state.barNumYears} 
              onChange={this.handleChange}
              placeholder="0" /></div>
          </div>
          <Plot className="chart bar" data={this.state.barData} layout={this.state.plotLayout}/>
        </div>


        <div className="container">
          <div className="panel bottom"><select 
                className="custom-select" 
                name="ticker" 
                //value="VTSAX"
              >
          <option value="VTSAX">VTSAX</option>
          <option value="SPY">SPY</option>
          <option value="GOOG">GOOG</option>
          </select></div>
          <Plot className="chart line" data={DummyData} layout={this.state.plotLayout}/>
        </div>
      </div>
    );
  }
}

export default App;