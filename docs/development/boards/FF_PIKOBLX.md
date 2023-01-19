### Note for Serial RX configuration (v3.3.0 and later)

FF*PIKOBLX target explicitly sets `serialrx_inverted` to `ON` as target default value to accommodate Furious FPV's non-standard non-inverting SBUS receiver. This setting \_inverts* the protocol standard of _inverted_ signal and bring it to _non-inverting_ state.

Caveats with this arrangements

- For standard SBUS receivers, `serialrx_inverted` must be set to `OFF`.

- For all other serial RX, `serialrx_inverted` must also be set to `OFF` explicitly, as this setting does persist even when `serialrx_provider` is changed. This phenomenon started with v3.3.0, when old setting of `sbus_inversion` was changed to protocol independent `serialrx_inverted`. The former only affected SBUS and not other protocols.
