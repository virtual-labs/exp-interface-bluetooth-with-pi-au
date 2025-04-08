## Procedure

### Hardware Setup

- Connect the VCC of the HC-05 Bluetooth sensor to the VBUS pin of the Raspberry Pi Pico.
- Connect the TXD pin of the HC-05 Bluetooth sensor to the GP0 pin of the Raspberry Pi Pico.
- Connect the RXD pin of the HC-05 Bluetooth sensor to the GP1 pin of the Raspberry Pi Pico.
- Connect the GND pin of the HC-05 Bluetooth sensor to the GND pin of the Raspberry Pi Pico.
- Connect the positive terminal of the LED to a resistor.
- Connect the other terminal of the resistor to the GP19 pin of the Raspberry Pi Pico.
- Connect the negative terminal of the LED to the GND pin of the Raspberry Pi Pico.
- Click the Bluetooth icon on the smartphone to turn on Bluetooth.
- Turn on Bluetooth by clicking the switch shown on the smartphone screen.
- Select the Raspberry Pi from the list of available devices.
- After completing the circuit and pairing the Bluetooth, the user can turn the LED on and off by clicking the button provided on the smartphone.



### Software Setup

- Download the **Serial Bluetooth Terminal** app from the Google Play Store. When you open the app, you will see buttons labeled **M1**, **M2**, **M3**, and so on. Set **M1** as the "LED ON" button and **M2** as the "LED OFF" button.

![Serial Bluetooth Terminal App](./images/exp8_2.png)

- Program the Pico board for Bluetooth communication using the file `main.py`.
- First, open the `main.py` file in the Thonny IDE. Press **Ctrl + Shift + S** to save the file to the Pico board. Ensure that the Pico is connected to your laptop before saving.
- A popup window will appear. Select the **Raspberry Pi Pico**, name the file `main.py`, and save it. This ensures the program runs automatically when the Pico is powered on.
- Now pair the app with your Bluetooth module. Ensure the code is uploaded successfully to the Pico. When the board is turned on, the Bluetooth module's LED should blink slowly.

![Bluetooth Pairing](./images/exp8_3.png)

- Press the **Connection** button in the top-right corner of the app. A new window titled **Devices** will appear.
- Select your Bluetooth device. It may appear as "BLE", "HC-05", or "HC-06", depending on your module.
- Once connected, press the **LED ON** or **LED OFF** buttons. You will see the data `"1"` or `"0"` displayed in the terminal section of the app.

![Bluetooth Terminal Data](./images/exp8_4.png)

- You will also notice the LED turning ON and OFF when the respective buttons are pressed.

### Python Code

```python
# main.py

from machine import Pin, UART

uart = UART(0, 9600)
LedGPIO = 16
led = Pin(LedGPIO, Pin.OUT)

while True:
    if uart.any():
        command = uart.readline()
        # print(command)  # Uncomment this line to see the received data
        if command == b'\xd0':
            led.high()
            print("ON")
        elif command == b'\xd5':
            led.low()
            print("OFF")
