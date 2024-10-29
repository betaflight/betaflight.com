# Single Wire Soft Serial

### Disclaimer:

Software Serial is not recommended for RC control links and should not be used to connect serial receivers.

### Software Serial List of compatible pins

Not for public viewing yet.

List of compatible pins.

CLI commands to free up PWM 5 and PWM 6:

`resource MOTOR 5 NONE`

`resource MOTOR 6 NONE`

CLI commands to assign softserial:

`resource serial_tx 11 <pin>`

`resource serial_tx 12 <pin>`

NOTE:

- The OK means it is compatible, and does not warrant it will work when it is configured as a part of a complete system.

---

OMNIBUS(F3) (by @jflyper)

| Pin | Label     | S.Audio | Tramp | S.Port | Note                                            |
| --- | --------- | ------- | ----- | ------ | ----------------------------------------------- |
| A8  | LED strip | NG      | NG    | NG     |                                                 |
| B4  | PPM (\*1) | OK      | ?     | OK     | When PPM not in use                             |
| B6  | PWM8/SCL  | OK      | OK    | OK     | I2C must be de-configured? Need further testing.|
| B7  | PWM7/SDA  | OK      | ?     | ?      | Ditto                                           |

@olexs: B07 (PWM7/SDA) works with S.Audio on 3.2, no extra config needed (I2C resources aren't mapped per default).

---

OMNIBUSF4 (by @jflyper)

| Pin | Label | S.Audio | Tramp | S.Port | Note                      |
| --- | ----- | ------- | ----- | ------ | ------------------------- |
| A1  | PWM5  | OK      | ?     | OK     |                           |
| A8  | PWM6  | OK      | OK    | ?      | Tramp report by @llambkin |
| B14 | PPM   | OK      | ?     | ?      |                           |
| B15 | CH2   | OK      | ?     | ?      |                           |
| C8  | CH5   | OK      | ?     | ?      |                           |
| C9  | CH6   | OK      | ?     | ?      |                           |

---

OMNIBUSF4SD (by @jflyper, @antonig)

| Pin | Label | S.Audio       | Tramp      | S.Port        | Note                                                                                             |
| --- | ----- | ------------- | ---------- | ------------- | ------------------------------------------------------------------------------------------------ |
| A9  | TX1   | OK            | ?          | OK @stsa64    | @stsa64: Smartport does not work if running Tramp on A8 (PWM6) via softserial (timer conflict??) |
| A1  | PWM5  | OK @basdelfos | OK @stsa64 | OK @basdelfos |                                                                                                  |
| A8  | PWM6  | OK            | OK         | OK            |                                                                                                  |
| B14 | PPM   | ?             | ?          | ?             |                                                                                                  |
| B15 | CH2   | ?             | ?          | ?             |                                                                                                  |
| C8  | CH5   | ?             | ?          | ?             |                                                                                                  |
| C9  | CH6   | ?             | ?          | ?             |                                                                                                  |

---

SPRACINGF3 (by @jflyper)

| Pin | Label             | S.Audio | Tramp | S.Port | Notes                  |
| --- | ----------------- | ------- | ----- | ------ | ---------------------- |
| A0  | IO_1[3] PPM/CH1   | OK      | ?     | ?      | When PPM is not in use |
| A1  | IO_1[4] CH2       | OK      | ?     | ?      | When PPM is not in use |
| B4  | IO_1[5] CH5       | OK      | OK    | ?      |                        |
| B5  | IO_1[6] CH6       | OK      | ?     | ?      |                        |
| A8  | IO_1[7] LED strip | OK      | ?     | ?      |                        |
| B0  | IO_2[5] CH7       | OK      | ?     | ?      |                        |
| B1  | IO_2[6] CH8       | OK      | ?     | ?      |                        |
| B8  | M5                | NG      | ?     | NG     | TIM4 crash with M3&M4  |
| B9  | M6                | NG      | ?     | ?      | TIM4 crash with M3&M4  |
| A2  | M7                | OK      | OK    | ?      |                        |
| A3  | M8                | OK      | OK    | ?      |                        |

Note: Some reports CH1 and CH2 not working: (https://github.com/betaflight/betaflight/issues/2532#issuecomment-284669276)

---

SPRACINGF3EVO

| Pin | Label     | S.Audio | Tramp | S.Port | Notes     |
| --- | --------- | ------- | ----- | ------ | --------- |
| A8  | LED strip | NG      | NG    | ?      | @pafleraf |
| B1  | M8        | OK      | OK    | OK     | @pafleraf |

Note: Soft Serial for this target is disabled in bf 3.1.7. However, it works with bf 3.2.0 nightly as of today (2017-05-13)

---

REVOLT

| Pin | Label | S.Audio | Tramp | S.Port | Notes                                    |
| --- | ----- | ------- | ----- | ------ | ---------------------------------------- |
| B6  | LED   | ?       | ?     | NG     | @alenl2; Need further testing            |
| C1  | CRNT  | ?       | ?     | NG     | @alenl2; No timer?                       |
| A9  | TX1   | ?       | ?     | NG     | @alenl2; Timer conflict? (need checking) |
| A10 | RX1   | ?       | ?     | NG     | @alenl2; Timer conflict? (need checking) |
| B10 | TX3   | ?       | ?     | NG     | @alenl2; Timer conflict? (need checking) |
| B11 | RX3   | ?       | ?     | NG     | @alenl2; Timer conflict? (need checking) |
| C6  | TX6   | ?       | ?     | OK     | @alenl2                                  |
| C7  | RX6   | ?       | ?     | OK     | @alenl2                                  |

---

KISS (KISSFC)

| Pin | Label | S.Audio      | Tramp | S.Port                | Notes      |
| --- | ----- | ------------ | ----- | --------------------- | ---------- |
| A13 | PWM5  | OK (@alenl2) | ?     | NG @basdelfos/@alenl2 |            |
| A02 | PITCH | NG (@alenl2) | ?     | OK @basdelfos/@alenl2 |            |
| A15 | ROLL  | ?            | ?     | OK                    | @basdelfos |

---

BLUEJAYF4

| Pin | Label | S.Audio | Tramp | S.Port | Notes      |
| --- | ----- | ------- | ----- | ------ | ---------- |
| B00 | ?     | NG (v1) | ?     | NG     | staryk@rcg |
| B01 | ?     | NG (v1) | ?     | NG     | staryk@rcg |

---

IRCFUSIONF3

| Pin | Label | S.Audio | Tramp | S.Port | Notes                  |
| --- | ----- | ------- | ----- | ------ | ---------------------- |
| A00 | PPM   | ?       | ?     | OK     | When PPM is not in use |

---

BETAFLIGHTF3

| Pin | Label           | S.Audio | Tramp | S.Port | Notes  |
| --- | --------------- | ------- | ----- | ------ | ------ |
| B01 | Soft Serial TX1 | OK (v1) | ?     | ?      | @iwarp |
| A02 | Soft Serial TX2 | NG (v1) | ?     | ?      | @iwarp |
| B07 | PPM             | OK (v1) | ?     | ?      | @iwarp |

http://i.imgur.com/Mh41SmG.jpg

Note (2017-07-27) by @jflyper: BETAFLIGHTF3 had a timer assignment problem with pre-3.2 firmware. It is fixed with 3.2, and PB01 and A02 should work as software serial --- need to be verified
(29/10/17) by @iwarp B01 confirmed working on 3.2.1
