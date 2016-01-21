// run mocha test via command line

var pdf = require('./htmlToPdf.js');

describe("Testing", function () {
  it('output', function (done) {
    this.timeout(5000);


     graph:{
          id: "graph",
          title: "Time Series Data",
          data: [{value:3, date:new Date(2000, 1, 1, 5, 00).getTime()},
                 {value:8, date:new Date(2000, 1, 1, 6, 30).getTime()},
                 {value:5, date:new Date(2000, 1, 1, 11, 15).getTime()},
                 {value:13, date:new Date(2000, 1, 1, 22, 00).getTime()},
                 {value:4, date:new Date(2000, 1, 2, 5, 00).getTime()}],
          xAxisLabel: "Time",
          yAxisLabel: "Units"
     },

      table:{
          id: "table",
          title: "Events Log Table",
          data: [{ Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"},
                 { Timestamp:"12:00:00" , TSLink:"TS-Link0" , Username:"user-name0" , Event:"event-0"} ]
     }


     },

});

