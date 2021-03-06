import React from 'react';

import ParameterInput from '../Alarms/AlarmsInput.jsx'
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import '../Vitals/css/vitals.css';

export default class Alarms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alarms: this.props.alarms
    }
    this.setParameterStateValue = this.setParameterStateValue.bind(this);
    this.saveAlarms = this.saveAlarms.bind(this);
  }

  createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Close after 3000ms', 3000);
          break;
        default:
          break;
      }
    };
  };

  saveAlarms() {
    this.props.setAlarms(this.state.alarms)
  }

  setParameterStateValue(parameterName, value) {
    let alarms = {...this.state.alarms};
    if (parameterName == "Low Minute Ventilation Alarm") {
      alarms["Minute ventilation"].min = value
    }
    else if (parameterName == "High Minute Ventilation Alarm") {
      alarms["Minute ventilation"].max = value
    }
    else if (parameterName == "Low Pressure Alarm") {
      alarms["pressure"].min = value
    }
    else if (parameterName == "High Pressure Alarm") {
      alarms["pressure"].max = value
    }
    this.setState({alarms})
  }

  render() {
    return (
      <div>
        <Box component="span" m={1}>
          <Container>
            <Grid 
              container
              alignItems="stretch"
              justify="space-between"
              spacing={3}
              direction="column"
            >
              <br></br><br></br><br></br>

              <ParameterInput
                parameterName="Low Minute Ventilation Alarm"
                startingValue={this.props.alarms["Minute ventilation"].min}
                setParameter={this.setParameterStateValue}
                step={2}
                min={this.props.alarms["Minute ventilation"].min}
                max={this.props.alarms["Minute ventilation"].max}
                unit={"L"}
              /> <br></br>
              <ParameterInput
                parameterName="High Minute Ventilation Alarm"
                startingValue={this.props.alarms["Minute ventilation"].max}
                setParameter={this.setParameterStateValue}
                step={2}
                min={this.props.alarms["Minute ventilation"].min}
                max={this.props.alarms["Minute ventilation"].max}
                unit={"L"}
              /> <br></br>
              <ParameterInput
                parameterName="Low Pressure Alarm"
                startingValue={this.props.alarms.pressure.min}
                setParameter={this.setParameterStateValue}
                step={2}
                min={this.props.alarms.pressure.min}
                max={this.props.alarms.pressure.max}
                unit={"cm H2O"}
              /> <br></br>
              <ParameterInput
                parameterName="High Pressure Alarm"
                startingValue={this.props.alarms.pressure.max}
                setParameter={this.setParameterStateValue}
                step={2} 
                min={this.props.alarms.pressure.min} 
                max={this.props.alarms.pressure.max} 
                unit={"cm H2O"} 
              /> 
              <br></br>
                <Grid item text-align="center" xl={6} md={6} sm={12} xs={12}>
                  <Button 
                    onClick={this.saveAlarms}
                    className="setParametersButton"
                    variant="contained"
                    align="center"
                    color="primary"
                    style={{backgroundColor: "#9BD8D3"}}>
                      Save Changes
                  </Button>
                </Grid>
              </Grid>
            <NotificationContainer />
          </Container>
        </Box>
      </div>
    );
  }
}
