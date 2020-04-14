export const colors = {
  white: "#ffffff",
  bluePurple: "#6500ff",
  weirdGreen: "#3dd598",
  charcoalGrey: "#44444f",
  blueyGrey: "#92929d",
  paleLilac: "#e2e2ea",
  softBlue: "#50b5ff",
  brightBlue: "#0062ff",
  lightGreyBlue: "#b5b5be",
  paleGrey: "#fafafb",
  dark: "#171725",
  grapefruit: "#fc5a5a",
  darkRed: "#e15a54",
  darkBlue: "#293859",
  black: "#000000",
  green: "#7caa55",
  lightGreen: "#DEEAD4",
  homeGreen: "#419D55",
  homeGrey: "#767676",
  backgroundGrey: "#F7F7F7",
  borderGrey: "#C4C4C4",
  lightGrey: "#eeeef0",
  orange: "#FF7A00",
  lightOrange: "#FFECDA",
};

// TODO: Add error names based on index.
export const errorCode = ["NO ERROR"]

// Index is value to give.
export const modes = ["Standby", "Pressure Control", "Pressure Support"];

export const defaultAlarms = {
  minuteVentilation: {
    min: 6,
    max: 10
  },
  pressure: {
    min: 0,
    max: 35
  }
}

export const readingNames = [
  "checkSum",
  "batteryPercentage",
  "breathCompleted",
  "tidalVolume",
  "errorCode",
  "abnormalPressure",
  "abnormalFiO2"
];

export const readingsInfo = {
  checkSum: {
    readableName: "Check Sum",
    unit: "",
    alarmMin: 0,
    alarmMax: 0,
    sampleErrorValue: 0,
    default: 1
  },
  batteryPercentage: {
    readableName: "Battery Percentage",
    unit: "%",
    alarmMin: 0,
    alarmMax: 0,
    sampleErrorValue: 0,
    default: 1
  },
  breathCompleted: {
    readableName: "Breath Completed",
    unit: "",
    alarmMin: 0,
    alarmMax: 0,
    sampleErrorValue: 0,
    default: 1
  },
  tidalVolume: {
    readableName: "Tidal Volume",
    unit: "L",
    alarmMin: 0,
    alarmMax: 0,
    sampleErrorValue: 0,
    default: 1
  },
  errorCode: {
    readableName: "Error Code",
    unit: "",
    alarmMin: 0,
    alarmMax: 0,
    sampleErrorValue: 0,
    default: 1
  },
  abnormalPressure: {
    readableName: "Abnormal Pressure",
    unit: "cm H2O",
    alarmMin: 0,
    alarmMax: 0,
    sampleErrorValue: 0,
    default: 1
  },
  abnormalFiO2: {
    readableName: "Abnormal FiO2",
    unit: "%",
    alarmMin: 0,
    alarmMax: 0,
    sampleErrorValue: 0,
    default: 1
  }



};

// Defines parameters to send, as all params are sent to arduino
// for consistency.
// Note: riseTime is just set as a default.
export const allParams = [
  "fiO2",
  "peep",
  "inspiratoryPressure",
  "sensitivity",
  "respiratoryRate",
  "inspiratoryTime",
  "flowCyclingOff",
  "apneaTime",
  "riseTime"
]
export const controlParams = [
  "fiO2",
  "peep",
  "inspiratoryPressure",
  "inspiratoryTime",
  "respiratoryRate",
];

export const supportParams = [
  "fiO2",
  "peep",
  "inspiratoryPressure",
  "sensitivity",
  "apneaTime",
  "flowCyclingOff",
];


export const parameterInfo = {
  mode: {
    default: "Pressure Control"
  },
  fiO2: {
    readableName: "FiO2",
    unit: "%",
    step: 1,
    min: 0,
    max: 100,
    recMin: 50,
    recMax: 60,
    default: 50
  }, // min and max that can be set on the interface
  peep: {
    readableName: "PEEP",
    unit: "cm H2O",
    step: 1,
    min: 0,
    max: 100,
    recMin: 50,
    recMax: 60,
    default: 50
  },
  inspiratoryPressure: {
    readableName: "Inspiratory pressure",
    unit: "cm H2O",
    step: 1,
    min: 0,
    max: 100,
    recMin: 50,
    recMax: 60,
    default: 50
  },
  inspiratoryTime: {
    readableName: "Inspiratory time",
    unit: "%",
    step: 1,
    min: 0,
    max: 100,
    recMin: 50,
    recMax: 60,
    default: 50
  },
  respiratoryRate: {
    readableName: "Respiratory rate",
    unit: "bpm",
    step: 1,
    min: 0,
    max: 100,
    recMin: 50,
    recMax: 60,
    default: 50
  },
  sensitivity: {
    readableName: "Sensitivity",
    unit: "L/min",
    step: 1,
    min: 0,
    max: 100,
    recMin: 50,
    recMax: 60,
    default: 50
  },
  apneaTime: {
    readableName: "Apnea time",
    unit: "s",
    step: 1,
    min: 0,
    max: 100,
    recMin: 50,
    recMax: 60,
    default: 50
  },
  flowCyclingOff: {
    readableName: "Flow cycling off",
    unit: "",
    step: 1,
    min: 0,
    max: 100,
    recMin: 50,
    recMax: 60,
    default: 50
  },
  riseTime: {
    readableName: "Rise Time",
    unit: "",
    step: 1,
    default: 0.1
  }
};