#include <ArduinoJson.h>

void setup()
{
  Serial.begin(9600);

}

void loop()
{
  int randomtest = random(-10000,10000);
  double number = (double)randomtest/10000;
  StaticJsonBuffer<500> jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["tipo"] = "ecg";
  root["valor"] = number;
  root["idMonitor"] = 1;

  char buffer[root.measureLength() * 2];
  root.printTo(buffer, sizeof(buffer));
  Serial.println(buffer);
  delay(100);
}
