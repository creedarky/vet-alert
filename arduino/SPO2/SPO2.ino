#include <ArduinoJson.h>
#include <Wire.h> // I2C library, required for MLX90614
#include "MAX30100_PulseOximeter.h"

int beep;

#define REPORTING_PERIOD_MS     1000

// PulseOximeter is the higher level interface to the sensor
// it offers:
//  * beat detection reporting
//  * heart rate calculation
//  * SpO2 (oxidation level) calculation
PulseOximeter pox;

uint32_t tsLastReport = 0;

// Callback (registered below) fired when a pulse is detected
void onBeatDetected()
{
  beep = 1;
}

void setup() 
{
  Serial.begin(115200);             // we agree to talk fast!
  pox.begin();
  pox.setOnBeatDetectedCallback(onBeatDetected);
}

void loop() 
{
  pox.update();
  StaticJsonBuffer<1000> jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["tipo"] = "estado";
  root["x"] = millis();
  root["latidos"] = pox.getHeartRate();
  root["spo2"] = pox.getSpO2();
  root["pulso"] = pox.fpv;
  root["beep"] = beep;
  root["idMonitor"] = 1;
  char buffer[root.measureLength() * 2];
  root.printTo(buffer, sizeof(buffer));
  Serial.println(buffer);
  beep = 0;
  delay (50);
}
