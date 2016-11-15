#include <ArduinoJson.h>

void setup() 
{
  Serial.begin(115200);             // we agree to talk fast!
  randomSeed(analogRead(1));
}

void loop() 
{
  StaticJsonBuffer<1000> jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["tipo"] = "estado";
  root["x"] = millis();
  root["temperatura"] = 39.5 + random(-2,3);
  root["latidos"] = 90 + random(-20,21);
  root["tempAmbiente"] = 23 + random(-5,6);
  root["movimiento"] = random (0,2);
  root["pulso"] = random(200,500);
  root["idMonitor"] = 2;
  char buffer[root.measureLength() * 2];
  root.printTo(buffer, sizeof(buffer));
  Serial.println(buffer);
 
  delay (20);
}
