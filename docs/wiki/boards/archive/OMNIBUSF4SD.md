# OMNIBUSF4SD

## Description

This is a variant of the other [OmnibusF4](/docs/wiki/boards/archive/OMNIBUSF4) boards with a slightly different configuration.

This target applies to many variants, including 20x20 boards without an SD reader.

## Note about I2c

In Betaflight's config file, UART3 Tx and Rx are set to B10 and B11 respectively in the config file.

However, on some boards, the i2c SCL and SDA pads are connected in parallel to pads for TX3 and RX3. Obviously only one of the two functions can work at the same time.

If you want to run a mag or other i2c device on a board like this, wire SCL to the TX3/SCL pad, and SDA to the RX3/SDA pad, and reconfigure Betaflight as follows:

```
resource SERIAL_TX 3 none
resource I2C_SCL 1 B10

resource SERIAL_RX 3 none
resource I2C_SDA 1 B11
```

To revert to normal

```
resource I2C_SCL 1 none
resource serial_tx 3 B10

resource I2C_SDA 1 none
resource serial_rx 3 B11
```

It may be necessary to attach a 2.2k pull-up resistor from 3.3V to each of the SDA and SCL lines, but this is not always needed.

For more information see https://docs.px4.io/v1.12/en/flight_controller/omnibus_f4_sd.html
