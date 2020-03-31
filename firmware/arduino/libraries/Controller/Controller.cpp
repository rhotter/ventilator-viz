#include "Controller.h"
#include "Arduino.h"

Controller::Controller() {
  : oxygenValveStepper(OXYGEN_VALVE_MOTOR_INTERFACE_TYPE,
                       OXYGEN_VALVE_PIN0,
                       OXYGEN_VALVE_PIN1,
                       OXYGEN_VALVE_PIN2,
                       OXYGEN_VALVE_PIN2,
                       OXYGEN_VALVE_LIMIT_SWITCH_PIN,
                       OXYGEN_VALVE_MAX_STEPPER_SPEED,
                       OXYGEN_VALVE_STEPPER_ACCELERATION,
                       OXYGEN_VALVE_ENABLE1_PIN,
                       OXYGEN_VALVE_ENABLE2_PIN),
    alarm(ALARM_PIN),
    airIntakeServo(AIR_INTAKE_PIN, AIR_INTAKE_ZERO_POINT),
    blowerPID(kP, kD);
  _lastOxygenControlTime = 0;
  _lastAirControlTime = 0;
}

int Controller::init() {
  int error = oxygenValveStepper.moveOxygenStepperToZeroPosition();
  return error;
}

void Controller::stopArduinoAlarm() {
  alarm.stopAlarm();
}

void Controller::ringAlarmForever() {
  alarm.keepAlarmRunningForever();
}

void Controller::inhalationControl(Data *data, Parameters *parameters, State *state) {
  // modify steps on stepper motor to get desired flow rate (which then gives concentration)
  if (isTimeToControlOxygen()) {
    oxygenControl(&data, &parameters, &state);
    _lastOxygenControlTime = millis();
  }
  if (isTimeToControlAir()) {
   airControl(&parameters);
   _lastAirControlTime = millis();
  }
  float setPressure = (float) parameters.currentPeakInspiratoryPressure; //TODO: Check units with below
  float actualPressure = data.getMainPressureAverageForPID();
  _blowerPID.control(setPressure, actualPressure);
  _blowerPID.control(data);
}

void Controller::exhalationControl(Data *data, Parameters *parameters, State *state) {
  if (isTimeToControlOxygen()) {
    oxygenControl(&data, &parameters, &state);
    _lastOxygenControlTime = millis();
  }
  if (isTimeToControlAir()) {
   airControl(&parameters);
   _lastAirControlTime = millis();
  }
  float setPressure = (float) parameters.currentPEEP; //TODO: Check units with below. Also, should be an int or float?
  float actualPressure = data.getMainPressureAverageForPID();
  _blowerPID.control(setPressure, actualPressure);
  // modify steps on stepper motor to get desired flow rate (which then gives concentration)
}

void Controller::oxygenControl(Data *data, Parameters *parameters, State *state){
  if (state.isStartingNewBreath) {
    float flow = data.flowIntegral / (parameters.currentExpiratoryTime + parameters.currentInspiratoryTime); // TODO: should be of last breath not current breath
    flow *= parameters.currentFiO2 * 1000;

    oxygenValveStepper.stepOxygenFlow(flow, 90); //90 is psi of O2 implement real reading later
          //the other part is the average flow over a breath in l/s
  }
  oxygenValveStepper.runOneStep();
}

void Controller::airControl(Parameters *parameters) {
  airIntakeServo.setOpening(100 - parameters.currentFiO2);
}

int Controller::isTimeToControlOxygen() {
  return isTimeToRead(_lastOxygenControlTime, TIME_BETWEEN_OXYGEN_CONTROLS);
}

int Controller::isTimeToControlAir() {
  return isTimeToRead(_lastAirControlTime, TIME_BETWEEN_AIR_CONTROLS);
}

int Controller::isTimeToRead(unsigned long lastReadTime, int timeBetweenReadings) {
  unsigned long currentTime = millis();
  unsigned long timeDifference = curentTime - _lastFlowReadTime;
  if (timeDifference >= _timeBetweenReadings) {
    return 1;
  }
  else {
    return 0;
  }
}