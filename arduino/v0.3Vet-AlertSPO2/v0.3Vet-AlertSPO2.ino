#include <ArduinoJson.h>
#include <Wire.h> // I2C library, required for MLX90614
#include "MAX30100_PulseOximeter.h"

int beep;

PulseOximeter pox;

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
  root["pulso"] = meanDiff(pox.apv);
  root["beep"] = beep;
  root["idMonitor"] = 1;
  char buffer[root.measureLength() * 2];
  root.printTo(buffer, sizeof(buffer));
  Serial.println(buffer);
  beep = 0;
  delay (20);
}

long meanDiff(int M)
{
  #define LM_SIZE 12
  static int LM[LM_SIZE];      // LastMeasurements
  static byte index = 0;
  static long sum = 0;
  static byte count = 0;
  long avg = 0;

  // keep sum updated to improve speed.
  sum -= LM[index];
  LM[index] = M;
  sum += LM[index];
  index++;
  index = index % LM_SIZE;
  if (count < LM_SIZE) count++;

  avg = sum / count;
  return avg - M;
}
