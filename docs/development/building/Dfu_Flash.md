# Building DFU_Flash

Pre-requisites: python3, python3-intelhex

### Make and Flash via dfu-util:

For Betaflight 4.5 and later use the command syntax:

```
make CONFIG=TARGETNAME dfu_flash
```

Where `TARGETNAME` is a specified valid flight-controller target.

Example:

```
make CONFIG=MATEKF405AIO dfu_flash
```
