import React from 'react';
import Messager from '../../handlers/Messager';

import d3Config from '../LineChart/scripts/d3Config.js'
import './css/App.css';

import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Vitals from '../Vitals/Vitals';
import Alarms from '../Alarms/Alarms';
import AlarmsHandler from '../Alarms/AlarmsHandler';
import SimpleBottomNavigation from '../SimpleBottomNavigation/SimpleBottomNavigation';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.numPoints = d3Config.numDataPoints;
    this.isMount = false;
    this.modes = ["Standby", "Pressure Control", "Pressure Support"];
    this.state = {
      data: {
        tidalVolume: 5,
        pressure: 5, 
        batteryPercentage:"75%"
      },
      parameters: {
        mode: "Pressure Control", // one of Pressure Control, Pressure Support, Standby
        fiO2: 80, // Control + Support (%)
        peep: 20, // Control + Support (cm H2O)
        inspiratoryPressure: 20, // Control + Support (cm H2O)
        sensitivity: 80, // Support (L/min)
        respiratoryRate: 0, // Control (breaths per minute)
        inspiratoryTime: 0, // Control (%)
        flowCyclingOff: 0, //Support (%)
        apneaTime: 20, // Support (0.1, 0.2, .. will always be a tenth of a second.)
        riseTime: 0, // ??? (0.1, 0.2, .. will always be a tenth of a second.) default: 0.1
      },
      alarms: {
        minuteVentilation: {
          min: 6,
          max: 10
        },
        pressure: {
          lowExpiratoryPressure: 0, // low expiratory pressure
          highInspiratoryPressure: 35 // high inspiratory pressure
        }
      },
      currentlyAlarming: [],
      setup: true
    }
    this.messager = new Messager(5000);

    this.messager.tidalVolumeListener(this.updateData.bind(this));
    this.messager.batteryPercentageListener(this.updateData.bind(this));

    this.setParameters = this.setParameters.bind(this);
    this.setAlarms = this.setAlarms.bind(this);
    this.setCurrentlyAlarming = this.setCurrentlyAlarming.bind(this);
    this.doneSetup = this.doneSetup.bind(this);

    this.sendToArduino = this.sendToArduino.bind(this);
  }

  setParameters(parameters){
    this.state.parameters = parameters;
    this.setState(this.state);
  }

  sendToArduino(){
    let toSend = {};
  
    // Ship all parameters.
    toSend.mode = this.modes.indexOf(parameters.mode);
    toSend.fiO2 = this.state.parameters.fiO2;
    toSend.peep = this.state.parameters.peep;
    toSend.inspiratoryPressure = this.state.parameters.inspiratoryPressure;
    toSend.sensitivity = this.state.parameters.sensitivity;
    toSend.respiratoryRate = this.state.parameters.respiratoryRate;
    toSend.inspiratoryTime = this.state.parameters.inspiratoryTime;
    toSend.flowCyclingOff = this.state.parameters.flowCyclingOff;
    toSend.apneaTime = this.state.parameters.apneaTime;
    toSend.riseTime = this.state.parameters.riseTime;

    // Alarms.
    toSend.highInspiratoryPressureAlarm = this.state.alarms.pressure.highInspiratoryPressure;
    toSend.lowExpiratoryPressureAlarm = this.state.alarms.pressure.lowExpiratoryPressure;
    
    this.messager.sendParametersToBackend(toSend);
  }

  componentDidMount(){
    this.isMount = true;
  }

  setAlarms(alarms) {
    this.setState({alarms});
  }

  setCurrentlyAlarming(currentlyAlarming) {
    this.setState({currentlyAlarming});
  }

  updateData(type, value) {
    console.log('hellooo', type, value);
    if (type === 'tidal volume'){
      this.state.data.tidalVolume = value;
    }
    if(type === 'batteryPercentage'){
      this.state.data.batteryPercentage = value.toString() + "%";
    }

    if (this.isMount) {
      this.setState(this.state);
    }
  }

  doneSetup(){
    this.state.setup = false;
    this.setState(this.state);
  }

  render() {
    return (
      <div>
      <Router>
        <SimpleBottomNavigation setup={false} />
        <AlarmsHandler
            alarms={this.state.alarms}
            allData={this.state.data}
            allParameters={this.state.parameters}
            setCurrentlyAlarming={this.setCurrentlyAlarming}
        />
        <Switch>
        <Route path="/diagnostics">
          <Vitals sendToArduino={this.sendToArduino} allData={this.state.data} allParameters={this.state.parameters} currentlyAlarming={this.state.currentlyAlarming} />
        </Route>
        <Route path="/alarms">
          <Alarms
            alarms={this.state.alarms}
            setAlarms={this.setAlarms}
          />
        </Route>
        </Switch>
        <Redirect from="" to="/diagnostics" />
        <Redirect from="/" to="/diagnostics" />
      </Router>
        <div className="battery">
          <div className="battery-level" style={{height : this.state.data.batteryPercentage}}></div>
        </div>
      </div>
    );
  }
}
