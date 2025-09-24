# Rate Calculator

Betaflight supports different rates models. A rate model is the mathematics used to transform the stick position to a turn rate in deg/s. Three parameters, RCRate, Rate, and Expo, determine the curve of the rate model.

Typically the maths makes the sticks less sensitive in the center and more sensitive further out.

The pilot can adjust their Rates to suit their flying style. Typically:

- racers prefer a more linear curve with a maximum turn rate of around 550-650 deg/s
- freestyle typically uses a combination of a soft center region with high maximum turn rates (850-1200 deg/s)
- cinematic flying will be smoother with a flatter center region.

It takes time to get accustomed to a change in rates. Don't rush.

Betaflight supports Actual, Quick, Betaflight, Raceflight and Kiss models.

[Metamarc's rate converter](https://rates.metamarc.com) is probably the best converter and visualiser, supporting all the Rates models currently available in Betaflight.

## Actual Rates

"Actual" rates, by @ctzsnooze, were introduced in 4.2 and became Betaflight's default in 4.3. The older "Betaflight" rates model is still supported, with . In Actual rates, the center sensitivity and maximum rate can be directly entered in deg/s. The expo setting shifts the kink point of the curve, without affecting center or max rates. Each parameter is completely independent of the other.

To compare Actual with Betaflight rates, there are charting solutions by:

- [metamarc.com](https://rates.metamarc.com) - probably the best
- [ctzsnooze on Desmos](https://www.desmos.com/calculator/r5pkxlxhtb) (has all the maths, difficult to use)
- [kmitchel ](https://kmitchel.github.io/) (seems to be broken).

For more information about Actual rates, see:

- [4.2 Tuning notes](/docs/wiki/tuning/4-2-Tuning-Notes#new-rates-modes)
- [Github PR 9495](https://github.com/betaflight/betaflight/pull/9495)
- [Github PR 9506](https://github.com/betaflight/betaflight/pull/9506)

## Quick Rates

Quick rates, by @illusionfpv, allows the user to set center sensitivity as an independent value, and the Expo and Rate values interact with each other to determine the nature of the expo curve and the maximum turn rate.

To convert between Betaflight and Quick Rates:

- [illusionfpv.github.io](https://illusionfpv.github.io/)

## Betaflight, Kiss and Raceflight

The maximum rate and center sensitivity of Betaflight, Kiss and Raceflight rates models are altered by changing any of the three values in the model.

To view how these rates systems differ between each other, and to visualise the resulting center sensitivity and max rate, try one of these visualisers:

- [metamarc.com](https://rates.metamarc.com) (ok, mentioned again, but it is the best)
- RotorPirates [RaceFlight/Betaflight/KISS rate viewer](https://apocolipse.github.io/RotorPirates/) (converter is not working)
- [erikspen's betaflight curve and rate viewer](https://erikspen.github.io/betaflightratestuner)

## FlightOne

- [FlightOne to Betaflight, numerical rate converter](https://flightone.com/rates/)

## Rates listings

- [microraptor's gist page](https://gist.github.com/microraptor/52f01490f1c7aa86d91e8710556f123b) lists the rates type and the values used by some pilots and for specific applications in summer 2021.
