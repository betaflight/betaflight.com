# Pre-Flight Environment Tab

The Pre-Flight Environment tab provides real-time environmental data to help you make informed go/no-go decisions before flying your drone. It is available **without connecting a flight controller** — just open the Betaflight Configurator and click "Pre-Flight" in the sidebar.

All data is sourced from free, open-source APIs. No API keys or accounts are required.

---

## Setting Your Location

Before any data can load, you need to set your flight location using one of two methods:

**Browser Geolocation** — Click **"Use My Location"** and allow the browser to access your position. This uses your device's GPS or network location.

**Manual Entry** — Type latitude and longitude values into the input fields and click **Apply**. Coordinates must be in decimal degrees (e.g. `51.9225` and `4.4792` for Rotterdam, Netherlands).

Once a location is set, all environmental data loads automatically.

### Saved Locations

You can save up to **5 flight locations** for quick access:

1. Set a location (via geolocation or manual entry) and wait for data to load
2. Click the **Save** button (bookmark icon, or **+** if you already have saved locations)
3. Enter a name for the location (max 20 characters) and confirm

Your saved locations appear in a dropdown. **Selecting a saved location automatically loads it** — coordinates are applied and all data is fetched immediately. Use the trash icon to delete a saved location.

Saved locations are stored in your browser's local storage and persist across sessions.

---

## Launch Status

A prominent banner at the top shows an overall flight recommendation:

| Status               | Meaning                                                     |
| -------------------- | ----------------------------------------------------------- |
| **GO** (green)       | All conditions are favorable for flight                     |
| **CAUTION** (yellow) | Some conditions are marginal — review details before flying |
| **WARNING** (orange) | Significant concerns — fly with extra caution or postpone   |
| **NO-GO** (red)      | Conditions are unsafe for flight                            |

The status is computed from wind speed, visibility, precipitation, and solar activity. It updates when you click **Refresh**.

### Individual Checks

Below the banner, a breakdown shows each check with its own status icon:

| Check             | Source     | What It Evaluates                    |
| ----------------- | ---------- | ------------------------------------ |
| **Wind**          | Open-Meteo | Wind speed and gusts at ground level |
| **Visibility**    | Open-Meteo | Horizontal visibility distance       |
| **Precipitation** | Open-Meteo | Current rain, snow, or drizzle       |
| **Solar**         | NOAA SWPC  | Kp index / geomagnetic disturbance   |

Each check displays a colored icon — green check (good), yellow/orange exclamation (caution/warning), or red cross (danger) — so you can quickly see which specific condition is driving the overall status.

---

## Current Weather

Displays real-time weather conditions at your location:

| Field             | What It Means for Flying                                                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Wind Speed**    | Ground-level wind. Values above 11 m/s are strong; above 14 m/s is dangerous for most drones                                            |
| **Wind Gusts**    | Peak wind speeds — sudden gusts can cause loss of control                                                                               |
| **Visibility**    | How far you can see. Below 1 km is poor; VLOS (Visual Line of Sight) rules typically require clear visibility                           |
| **Precipitation** | Rain, snow, or drizzle. Any precipitation increases risk to electronics and optics                                                      |
| **Dew Point**     | Temperature at which condensation forms. When the air temperature is close to the dew point (within 2-4°C), expect fog and lens fogging |
| **Cloud Cover**   | Percentage of sky covered by clouds                                                                                                     |
| **Feels Like**    | Apparent temperature accounting for wind chill and humidity — relevant for pilot comfort and equipment handling                         |
| **Humidity**      | Relative humidity — high values combined with temperature drops can cause condensation                                                  |
| **Pressure**      | Atmospheric pressure in hPa — rapid changes may indicate incoming weather fronts                                                        |
| **Battery Risk**  | LiPo temperature assessment. Below 10°C: reduced capacity; below 0°C: risk of damage. Above 40°C: risk of swelling                      |
| **Fog Risk**      | Fog probability based on dew point spread, humidity, and wind speed. Calm, humid conditions near the dew point indicate high fog risk   |

Color-coded values: **green** = good, **yellow** = moderate, **orange** = warning, **red** = dangerous.

Data source: [Open-Meteo](https://open-meteo.com/) (free, open-source, no API key required).

---

## Flight Window

Shows time-based conditions for planning your session:

| Field                   | Description                                                                                                                                                                       |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sunrise / Sunset**    | Legal flight in most countries is restricted to daylight hours. These times help you plan                                                                                         |
| **Legal Flight Window** | Civil twilight window (30 minutes before sunrise to 30 minutes after sunset). Green when you are currently within the window, red when outside. Note: regulations vary by country |
| **Daylight Duration**   | Total hours and minutes of daylight available                                                                                                                                     |
| **UV Index**            | Solar UV intensity. High UV (6+) can make screens hard to read outdoors                                                                                                           |
| **Temperature Range**   | Daily minimum and maximum temperature — extreme cold affects LiPo battery performance                                                                                             |
| **Currently**           | Whether it is currently daytime or nighttime at the location                                                                                                                      |

Data source: [Open-Meteo](https://open-meteo.com/) daily forecast parameters.

---

## Wind at Altitude Forecast

A 12-hour hourly table showing wind conditions at three altitudes above ground level (AGL):

| Column     | Description                                                                                         |
| ---------- | --------------------------------------------------------------------------------------------------- |
| **10m**    | Ground-level wind (what you feel on the ground)                                                     |
| **80m**    | Mid-altitude wind — relevant for most FPV and commercial flights                                    |
| **120m**   | High-altitude wind — important for long-range flights (120m is the legal ceiling in many countries) |
| **Gusts**  | Peak gust speed at ground level                                                                     |
| **Rain %** | Probability of precipitation for that hour                                                          |

Wind speeds are in **meters per second (m/s)**. As a rule of thumb:

- Below 5 m/s: Calm conditions, ideal for flying
- 5-8 m/s: Light wind, suitable for most drones
- 8-11 m/s: Moderate — smaller drones may struggle
- 11-14 m/s: Strong — only fly heavy/powerful aircraft
- Above 14 m/s: Dangerous for most UAVs

A 2-day forecast window is fetched to guarantee at least 12 hours of future data regardless of the time of day.

Data source: [Open-Meteo](https://open-meteo.com/) hourly forecast at multiple pressure levels.

---

## 5-Day Forecast

A compact daily overview to help plan flight sessions ahead. Shows weather conditions, temperature range, wind, gusts, and precipitation probability for the next 5 days.

| Column      | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| **Day**     | Weekday and date                                             |
| **Weather** | Weather condition with icon (clear, cloudy, rain, snow, etc) |
| **Temp**    | Daily temperature range (min / max °C)                       |
| **Wind**    | Maximum wind speed for the day (m/s)                         |
| **Gusts**   | Maximum gust speed for the day (m/s)                         |
| **Rain %**  | Maximum precipitation probability for the day                |

Rows are color-coded by overall flyability:

- **No highlight**: Good conditions for flying
- **Light yellow**: Moderate — wind 8-11 m/s or rain chance above 30%
- **Light orange**: Warning — wind 11-14 m/s or rain chance above 50%
- **Light red**: Dangerous — wind above 14 m/s or rain chance above 80%

Data source: [Open-Meteo](https://open-meteo.com/) daily forecast parameters.

---

## Solar Activity

Solar and geomagnetic activity directly affects GPS accuracy. The sun's activity disturbs Earth's ionosphere, which GPS signals pass through.

### Kp Index

The **Planetary K-index (Kp)** measures geomagnetic disturbance on a 0-9 scale:

| Kp Value | Level             | Effect on GPS                                             |
| -------- | ----------------- | --------------------------------------------------------- |
| 0-2      | Low (green)       | Minimal impact — GPS Rescue reliable                      |
| 3-4      | Moderate (yellow) | Slight degradation possible                               |
| 5        | Elevated (orange) | GPS accuracy may be noticeably reduced                    |
| 6-9      | Storm (red)       | Significant GPS interference — GPS Rescue NOT recommended |

### NOAA Storm Scales

Three scales from 0 (none) to 5 (extreme):

- **G (Geomagnetic Storm)** — affects GPS accuracy and compass reliability
- **S (Solar Radiation)** — affects satellite electronics
- **R (Radio Blackout)** — affects HF radio propagation

Data source: [NOAA Space Weather Prediction Center](https://www.swpc.noaa.gov/) (free, public JSON feeds).

---

## GNSS / GPS Status

### Elevation

Ground elevation at your location in meters above mean sea level (AMSL), fetched from the Open-Meteo Elevation API. Useful for calculating your absolute altitude ceiling (e.g., 120m AGL from 450m AMSL = 570m AMSL).

### Density Altitude

Density altitude indicates how "thin" the air feels to propellers, calculated from elevation, pressure, and temperature. Higher density altitude means less lift and higher power consumption. Included in the launch status checks.

| Density Altitude | Status   | Impact                         |
| ---------------- | -------- | ------------------------------ |
| < 1000m          | Good     | Normal performance             |
| 1000–2000m       | Moderate | Slightly reduced lift          |
| 2000–3000m       | Warning  | Noticeably reduced performance |
| > 3000m          | Danger   | Significant lift reduction     |

### Ionospheric Impact

Shows a plain-language assessment of how current solar conditions affect GPS performance.

### GPS Rescue Reliability

Indicates whether Betaflight's GPS Rescue feature can be relied upon given current geomagnetic conditions. At Kp > 5, GPS Rescue may experience degraded position accuracy, leading to unreliable return-to-home behavior.

### Magnetic Declination

The angle between true north and magnetic north at your location, calculated using the **World Magnetic Model (WMM)**. This is the value you should set in Betaflight's compass configuration if using a magnetometer.

### Magnetic Inclination

The dip angle of Earth's magnetic field. Near the magnetic poles, high inclination angles can cause compass issues.

### GNSS Planning Tool

Link to [gnssplanning.com](https://www.gnssplanning.com/) for detailed satellite visibility predictions at your location and time.

Magnetic data: Calculated client-side using the [geomagnetism](https://github.com/naturalatlas/geomagnetism) library (NOAA WMM model, no API call needed).

---

## Airspace & No-Fly Zones

Direct links to external airspace information services, pre-filled with your location where supported:

| Link                         | Coverage                | Description                                                                                       |
| ---------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------- |
| **Drone Safety Map**         | Global (155+ countries) | Free map by Altitude Angel showing airspace restrictions, ground hazards, and controlled zones    |
| **SkyVector Airspace Chart** | Global                  | Aeronautical VFR/IFR sectional charts showing controlled airspace, airports, and restricted areas |
| **FAA NOTAMs (US)**          | United States           | Official FAA Notice to Airmen search — check for temporary flight restrictions (TFRs)             |
| **EUROCONTROL NOTAMs (EU)**  | Europe                  | Official European NOTAM database for temporary airspace restrictions                              |

**Important:** Always check your local aviation authority's rules before flying. Drone regulations vary significantly by country and region.

---

## Location Map

An interactive map showing your selected flight location with a position marker. Controls:

| Button        | Action                                 |
| ------------- | -------------------------------------- |
| **S**         | Satellite imagery layer                |
| **H**         | Hybrid (satellite + road labels) layer |
| **R**         | Road/street map layer                  |
| **+** / **−** | Zoom in / zoom out                     |
| **⛶**         | Toggle fullscreen map view             |

---

## Data Attribution

- Weather data: [Open-Meteo.com](https://open-meteo.com/) (CC BY 4.0)
- Elevation data: [Open-Meteo Elevation API](https://open-meteo.com/en/docs/elevation-api)
- Solar data: [NOAA Space Weather Prediction Center](https://www.swpc.noaa.gov/)
- Magnetic model: World Magnetic Model (WMM) via [geomagnetism](https://github.com/naturalatlas/geomagnetism)
