# ric-edge-zigbee

 - [Flashing CC2531 USB stick](https://www.zigbee2mqtt.io/getting_started/flashing_the_cc2531.html)

## env

| name                      | default                                   | description
| ------------------------- | ----------------------------------------- | --------------------------------- 
| `RIC_EDGE_URL`            | `ws://localhost:17080/zigbee`             | WebSocket URL of RIC Edge core controller
| `ZIGBEE_SERIAL_PATH`      | `/dev/ttyACM0`                            | System path of CC2531 USB stick

## run

```sh
# build
> nvm use v8.16
> npm install --only=production

# start
> npm start

# if access error
> sudo adduser $(whoami) dialout
> sudo chmod a+rw /dev/ttyACM0

```
