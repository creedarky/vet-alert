#include <ArduinoJson.h>
#include <Wire.h> // I2C library, required for MLX90614
#include <Adafruit_MLX90614.h>

Adafruit_MLX90614 mlx = Adafruit_MLX90614();
int pulsePin = 0;                 // Pulse Sensor purple wire connected to analog pin 0
int tiltpin = 53;
int outPin = 13;
int lectura;
int anterior = LOW;
int movimiento;
int beep;

long time = 0;
long debounce = 50;

// Volatile Variables, used in the interrupt service routine!
volatile int BPM;                   // int that holds raw Analog in 0. updated every 2mS
volatile int Signal;                // holds the incoming raw data
volatile int IBI = 600;             // int that holds the time interval between beats! Must be seeded! 
volatile boolean Pulse = false;     // "True" when User's live heartbeat is detected. "False" when not a "live beat". 
volatile boolean QS = false;        // becomes true when Arduoino finds a beat.

void setup() 
{
  pinMode(tiltpin, INPUT_PULLUP);
  pinMode(outPin, OUTPUT);
  Serial.begin(115200);             // we agree to talk fast!
  interruptSetup();                 // sets up to read Pulse Sensor signal every 2mS
  mlx.begin();
}

void loop() 
{
  beep = 0;
  lectura = digitalRead(tiltpin);
  
  if (lectura != anterior)
  {
    time = millis();
  }
  if ((millis()-time)> debounce)
  {
    digitalWrite(outPin,lectura);
    movimiento = lectura;
  }
  anterior = lectura;

  if (QS == true)
  {
    beep = 1;
    QS = false;
  }
  
  StaticJsonBuffer<1000> jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["tipo"] = "estado";
  root["x"] = millis();
  root["temperatura"] = mlx.readObjectTempC();
  root["latidos"] = BPM;
  root["tempAmbiente"] = mlx.readAmbientTempC();
  root["movimiento"] = movimiento;
  root["pulso"] = analogRead(0);
  root["beep"] = beep;
  root["idMonitor"] = 1;
  char buffer[root.measureLength() * 2];
  root.printTo(buffer, sizeof(buffer));
  Serial.println(buffer);
 
  delay (20);
}
