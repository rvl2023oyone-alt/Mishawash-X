import { NasaDatasetInfo } from '../types/telemetry';

export const NASA_DATASETS: NasaDatasetInfo[] = [
  {
    id: 'lsda-hrp-std',
    name: 'NASA Life Sciences Data Archive (LSDA) - HRP Standard Measures',
    sourceAuthority: 'NASA Johnson Space Center / Human Research Program',
    studyId: 'HRP-SM-ISS-Expedition',
    description: 'Longitudinal core physiological and behavioral measurements collected pre-flight, in-flight, and post-flight from International Space Station crewmembers. Tracks autonomic regulation, cardiovascular orthostatic function, circadian rhythms, and immune markers.',
    variablesCovered: [
      'Continuous 24h ECG Holter (HR, HRV rMSSD, SDNN)',
      'Actigraphy (Sleep duration, sleep efficiency, circadian phase)',
      'Ultrasound vascular assessments',
      'Continuous blood pressure waveform',
      'Core body temperature via telemetric pill / Double Sensor'
    ],
    sampleCohort: '38 Long-duration ISS crewmembers (180+ days microgravity)',
    sensorHardware: 'Bio-Monitor smart garment, Actiwatch Spectrum, Philips Holter, Double Sensor thermistor',
    limitations: 'Ground-to-orbit telemetry is buffered in 12-hour batches; periodic motion artifacts during treadmill/ARED resistive exercise countermeasure sessions.',
    citation: 'NASA Human Research Program. (2023). Standard Measures Cross-Mission Physiological Baseline Archive. NASA Technical Reports Server (NTRS), Document ID: 20230008412.',
    doiLink: 'https://lsda.jsc.nasa.gov/Dataset/Page/HRP-Standard-Measures'
  },
  {
    id: 'csa-biomonitor',
    name: 'Canadian Space Agency (CSA) Bio-Monitor Flight Telemetry',
    sourceAuthority: 'Canadian Space Agency / Carré Technologies (Hexoskin)',
    studyId: 'CSA-BIO-ISS-01',
    description: 'Operational wearable biomonitoring system deployed aboard the ISS. Integrates skin-contact sensors in a custom form-fitting smart garment to measure vitals during sleep, daily habitat activities, and post-exercise recovery without interrupting mission duties.',
    variablesCovered: [
      '3-lead high-resolution ECG (256 Hz)',
      'Dual-band inductive plethysmography (Respiration rate & tidal volume)',
      'Reflectance pulse oximetry (SpO2)',
      'Infrared skin temperature sensor',
      '3-axis triaxial accelerometer (Physical load METs)'
    ],
    sampleCohort: 'ISS Expeditions 58 through 70 astronauts',
    sensorHardware: 'Bio-Monitor Shirt & On-Orbit Headband with wireless smart hub',
    limitations: 'Inductive bands require snug calibration check after microgravity thoracic fluid shifts in the first 48 hours of flight.',
    citation: 'Canadian Space Agency. (2021). Bio-Monitor: Keeping an eye on astronauts\' vital signs. CSA Space Medicine and Life Sciences Division.',
    doiLink: 'https://www.asc-csa.gc.ca/eng/iss/bio-monitor.asp'
  },
  {
    id: 'genelab-twin-study',
    name: 'NASA GeneLab & Twins Study Longitudinal Physiological Profile',
    sourceAuthority: 'NASA GeneLab Data Repository',
    studyId: 'GLDS-204 / NASA Twin Study',
    description: 'Multi-omic and systemic physiological comparison examining the long-term molecular, physiological, cognitive, and cardiovascular consequences of 340 days of human spaceflight.',
    variablesCovered: [
      'Arterial stiffness (Carotid ultrasound pulse wave velocity)',
      'Cardiovascular deconditioning markers',
      'Serum stress hormones (Cortisol, Epinephrine)',
      'Telomere dynamics and DNA damage response'
    ],
    sampleCohort: '1 Spaceflight astronaut (340 days) vs. 1 Earth-based monozygotic twin control',
    sensorHardware: 'Spaceflight Carotid Ultrasound, In-flight venous blood processing centrifuge',
    limitations: 'N=1 deep longitudinal case study; requires contextualization alongside wider population baselines for generalized risk modeling.',
    citation: 'Garrett-Bakelman, F. E., et al. (2019). The NASA Twins Study: A multidimensional analysis of a year-long human spaceflight. Science, 364(6436), eaau8650.',
    doiLink: 'https://doi.org/10.1126/science.aau8650'
  },
  {
    id: 'artemis-orion-eclss',
    name: 'Orion ECLSS & Space Radiation Analysis Group (SRAG) Telemetry',
    sourceAuthority: 'NASA Johnson Space Center / Orion Life Support & SRAG',
    studyId: 'ORION-ENV-ARTEMIS-II',
    description: 'Cabin environmental telemetry synchronizing habitat environmental life support metrics with human physiological responses. Provides environmental co-factors including ambient CO2 accumulation, barometric pressure, and ionizing radiation flux.',
    variablesCovered: [
      'Cabin ambient CO2 partial pressure (mmHg / ppm)',
      'Cabin barometric atmospheric pressure (kPa)',
      'Cabin ambient O2 concentration (%)',
      'Active crew personal dosimeter radiation rate (μSv/h and cumulative mSv)'
    ],
    sampleCohort: 'Deep-space cislunar trajectory environment simulation',
    sensorHardware: 'Active Personal Dosimeters (APD), Orion Cabin Atmosphere Sensor Suite',
    limitations: 'CO2 scrub cycles create cyclic variations; dosimeter bursts peak during trans-lunar injection across the Van Allen radiation belts.',
    citation: 'NASA Orion Life Support Systems and Habitability Office. (2024). Artemis Environmental Telemetry Protocol for Crew Health.',
    doiLink: 'https://www.nasa.gov/artemis-program'
  }
];
