#include "BlowerFanServo.h"

BlowerFanServo::BlowerFanServo(int pin) {
  _blowerFan.attach(pin);
}

void BlowerFanServo::begin() {
  // Initialize the esc by giving 50% power wait for it to power up then 0% power and wait for beep then do an inaugural vroom for half a second
  // https://www.arduino.cc/en/Reference/ServoWrite
  // TODO: should we wait here?
  _blowerFan.write(900)
  delay(700);
  _blowerFan.write(15;
  delay(3000);
  _blowerFan.write(900);
  delay(500);
  _blowerFan.write(15);
}

void BlowerFanServo::turnOff() {
  _blowerFan.write(15);
  _blowerFan.write(15);
}

void BlowerFanServo::writeBlowerPower(double blowerPower) {
  _blowerFan.write(map(blowerPower, 0, 256, 15, 180));
}