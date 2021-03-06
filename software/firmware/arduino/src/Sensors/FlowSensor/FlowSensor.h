/*
  SFM3000wedo.cpp - Library for reading values from flowmeter Sensirion SFM3000wedo
  https://www.sensirion.com/en/flow-sensors/mass-flow-meters-for-high-precise-measurement-of-gases/low-pressure-drop-mass-flow-meter/
  Created by WeDo, Zuerich 20170616
  
  Released into the public domain.
  
  
  Pay attention to Scaling!!
  int offset = 32000; // Offset for the sensor
  float scale = 140.0; // Scale factor for Air and N2 is 140.0, O2 is 142.8
  Flow = (readvalue - offset) / scale
  
*/

#ifndef FlowSensor_h
#define FlowSensor_h

#if !defined(SENSOR_DEAD_OR_NEEDS_RESET_ERROR)
#define SENSOR_DEAD_OR_NEEDS_RESET_ERROR 1
#endif

#if !defined(NOISY_READING_ERROR)
#define NOISY_READING_ERROR 2
#endif

#if ARDUINO >= 100
  #include "Arduino.h"
#else
  #include "WProgram.h"
  #include "pins_arduino.h"
  #include "WConstants.h"
#endif

#include "../../Defs/errors.h"


class FlowSensor {
  public:
	  FlowSensor(int i2cAddress, uint32_t offset, float scale);
    void init();
    float read(int *errorType);
    
  private:
	  int _i2cAddress;
    uint32_t _offset;
    float _scale;
	  uint8_t crc8(const uint8_t data, uint8_t crc);
};
 
#endif
