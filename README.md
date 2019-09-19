# ric-edge-zigbee

 - [Flashing CC2531 USB stick](https://www.zigbee2mqtt.io/getting_started/flashing_the_cc2531.html)

## env

| name                      | description                                                | default                
| ------------------------- | ---------------------------------------------------------- | --------------------------------- 
| RIC_EDGE_URL              | WebSocket URL of RIC Edge core controller                  | ws://localhost:17080/zigbee                              
| ZIGBEE_SERIAL_PATH        | System path of CC2531 USB stick                            | /dev/ttyACM0


## run

```sh
# build
> nvm use v8.16
> npm install

# start
> npm start

# start with repl
> npm run repl
```
