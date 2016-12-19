#include <ArduinoJson.h>
#include <Wire.h> // I2C library, required for MLX90614
#include <i2cmaster.h>

int tiltpin = 7;
int lectura;
int anterior = LOW;
int movimiento;
int beep;

long time = 0;
long debounce = 50;

void setup()
{
  pinMode(tiltpin, INPUT_PULLUP);
  Serial.begin(115200);             // we agree to talk fast!

  i2c_init(); //Initialise the i2c bus
  PORTC = (1 << PORTC4) | (1 << PORTC5);//enable pullups
}

void loop()
{
  lectura = digitalRead(tiltpin);

  if (lectura != anterior)
  {
    time = millis();
  }
  if ((millis() - time) > debounce)
  {
    movimiento = lectura;
  }
  anterior = lectura;
  StaticJsonBuffer<1000> jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["tipo"] = "estado";
  root["x"] = millis();
  root["temperatura"] = tempObjeto();
  root["tempAmbiente"] = tempAmbiente();
  root["movimiento"] = movimiento;
  root["idMonitor"] = 1;
  char buffer[root.measureLength() * 2];
  root.printTo(buffer, sizeof(buffer));
  Serial.println(buffer);
  beep = 0;
  delay (1000);
}

float tempObjeto()
{
  int dev = 0x5B << 1;
  int data_low = 0;
  int data_high = 0;
  int pec = 0;

  i2c_start_wait(dev + I2C_WRITE);
  i2c_write(0x07);

  // read
  i2c_rep_start(dev + I2C_READ);
  data_low = i2c_readAck(); //Read 1 byte and then send ack
  data_high = i2c_readAck(); //Read 1 byte and then send ack
  pec = i2c_readNak();
  i2c_stop();

  //This converts high and low bytes together and processes temperature, MSB is a error bit and is ignored for temps
  double tempFactor = 0.02; // 0.02 degrees per LSB (measurement resolution of the MLX90614)
  double tempData = 0x0000; // zero out the data

  // This masks off the error bit of the high byte, then moves it left 8 bits and adds the low byte.
  tempData = (double)(((data_high & 0x007F) << 8) + data_low);
  tempData = (tempData * tempFactor) - 0.01;

  float objeto = tempData - 273.15;
  return objeto;
}

float tempAmbiente()
{
  int dev = 0x5B << 1;
  int data_low = 0;
  int data_high = 0;
  int pec = 0;

  i2c_start_wait(dev + I2C_WRITE);
  i2c_write(0x06);

  // read
  i2c_rep_start(dev + I2C_READ);
  data_low = i2c_readAck(); //Read 1 byte and then send ack
  data_high = i2c_readAck(); //Read 1 byte and then send ack
  pec = i2c_readNak();
  i2c_stop();

  //This converts high and low bytes together and processes temperature, MSB is a error bit and is ignored for temps
  double tempFactor = 0.02; // 0.02 degrees per LSB (measurement resolution of the MLX90614)
  double tempData = 0x0000; // zero out the data

  // This masks off the error bit of the high byte, then moves it left 8 bits and adds the low byte.
  tempData = (double)(((data_high & 0x007F) << 8) + data_low);
  tempData = (tempData * tempFactor) - 0.01;

  float ambiente = tempData - 273.15;
  return ambiente;
}
