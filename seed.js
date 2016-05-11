module.exports = {
  totalUsageTime: 5.33,
  operatingPercentage: 12,
  idlePercentage: 76,
  offPercentage: 12,
  powerRange: {
    min: 0,
    max: 44.4,
    unit: 'W',
  },
  energyConsumed: {
    value: 2.91,
    unit: 'kWh',
  },
  totalIdleHours: {
    value: 33,
  },
  mostOftenUsed: {
    min: 14,
    max: 18,
  },
  leastOftenUsed: {
    min: 12,
    max: 10,
  },
  offHoursUsage: {
    value: 55,
    unit: 'min'
  },
  utilizationChart: [
    {value: 0, label: {min: 'Midnight', max: '2AM'}},
    {value: 0, label: {min: '2AM', max: '4AM'}},
    {value: 0, label: {min: '4AM', max: '6AM'}},
    {value: 0, label: {min: '6AM', max: '8AM'}},
    {value: 0, label: {min: '8AM', max: '10AM'}},
    {value: 3, label: {min: '10AM', max: '12PM'}},
    {value: 5, label: {min: '12PM', max: '2PM'}},
    {value: 16.3, label: {min: '2PM', max: '4PM'}},
    {value: 17.9, label: {min: '4PM', max: '6PM'}},
    {value: 8.1, label: {min: '6PM', max: '8PM'}},
    {value: 2.6, label: {min: '8PM', max: '10PM'}},
    {value: 0, label: {min: '10PM', max: '12AM'}},
  ],
  meta: {
    dateRange: 'April 12 - April 19, 2016',
    reportingDevice: 'Newton-123A',
    generationTimestamp: 'April 21, 2016 21:44:26',
    instrument: 'ViCell',
  }
};
