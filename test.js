
var path = require('path');
var tsReport = require('./index.js');

tsReport.createPdf('output/demo.pdf', {
    template: 'demo/demo.ejs',
    data: {val: 'hello'},
    htmlPath: 'output/demo.html',
    outputHtml: true,
    dimension: {
        marginInInch: 0.7,
        dpi: 72
    }
}).then(function(file) {
    console.log(file);
}, function(err) {
    console.log(err);
});

tsReport.createPdf('output/table.pdf', {
    template: 'demo/logsTableTemplate.ejs',
    data: {
        pagename: 'Event Log',
        data: [
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"},
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"},
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"},
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"},
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"},
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"},
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"},
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"},
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"},
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"},
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"},
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"},
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"},
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"},
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"},
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"},
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"},
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"},
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"},
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"},
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"},
            {Timestamp:"12:00:00", TSLink:"TS-Link0", Username:"user-name0", Event:"event-0"}
        ]
    },
    htmlPath: 'output/table.html',
    outputHtml: true
}).then(function(file) {
    console.log(file);
}, function(err) {
    console.log(err);
});

tsReport.createPdf('output/lineGraph.pdf', {
    template: 'demo/xyGraphTemplate.ejs',
    outputHtml: false,
    data: {
        title: "X-Y",
        xtitle: "THIS IS X",
        ytitle: "THIS IS Y",
        data: [
            {x:1, y:3},
            {x:2, y:8},
            {x:3, y:5},
            {x:4, y:13},
            {x:5, y:4}
        ]
    }
}).then(function(file) {
    console.log(file);
}, function(err) {
    console.log(err);
});

tsReport.createPdf('output/time.pdf', {
    template: 'demo/timeSeriesTemplate.ejs',
    outputHtml: true,
    htmlPath: 'output/time.html',
    data: {
        title: "Time v Value",
        xtitle: "date",
        ytitle: "value",
        data: [
            { value: 3, date: new Date(2000, 1, 1, 5, 00).getTime() },
            { value: 8, date: new Date(2000, 1, 1, 6, 30).getTime() },
            { value: 5, date: new Date(2000, 1, 1, 11, 15).getTime() },
            { value: 13, date: new Date(2000, 1, 1, 22, 00).getTime() },
            { value: 4, date: new Date(2000, 1, 2, 5, 00).getTime() }
        ]
    }
}).then(function(file) {
    console.log(file);
}, function(err) {
    console.log(err);
});

tsReport.createPdf('output/pie.pdf', {
    template: 'demo/usageReportPieTemplate.ejs',
    outputHtml: true,
    htmlPath: 'output/pie.html',
    data: {
        title: "Usage Report",
        data: [
            {label:"Running", data:20},
            {label:"Idle", data:60},
            {label:"Stalled", data:20}
        ]
    }
}).then(function(file) {
    console.log(file);
}, function(err) {
    console.log(err);
});

tsReport.createPdf('output/cssTemplate.pdf', {
    template: 'demo/cssTemplate.ejs',
    htmlPath: 'output/cssTemplate.html',
    outputHtml: true,
    waitBeforeRendering: 100,
    dimension: {
        orientation: 'landscape'
    },
    data: {
        title: "Usage Report",
        logs: [
            'CYCLE NAME: GRAVITY 3<CR><LF>',
            'CYCLE NAME: GRAVITY 3<CR><LF>',
            'CYCLE NAME: GRAVITY 3<CR><LF>',
            'CYCLE NAME: GRAVITY 3<CR><LF>',
            'CYCLE NAME: GRAVITY 3<CR><LF>'
        ],
        feeds: [{
            data:[
                [1459346339160,22.1],
                [1459346337155,22.1],
                [1459346335148,22.1],
                [1459346334140,21.9],
                [1459346330114,21]
            ],
            color:"#ff0000",
            paramId:"temperature",
            name:"Temperature",
            unit:"degC",
            preferredUnit:"degC",
            feedId:"716238430b15a46220d8d2a71819ce47a3d10756",
            yaxes:[{"axisLabel":"Temperature(°C)"}]
        }, {
            data:[
                [1459346339160,22.1],
                [1459346337155,22.1],
                [1459346335148,22.1],
                [1459346334140,21.9],
                [1459346330114,21]
            ],
            color:"#00ff00",
            paramId:"pressure",
            name:"Pressure",
            unit:"psi",
            preferredUnit:"psi",
            feedId:"716238430b15a46220d8d2a71819ce47a3d10756",
            yaxes:[{"axisLabel":"Pressure(psi)"}]
        }],
        notes: [
            'note 1',
            'note 2',
            'note 3'
        ]
    }
}).then(function(file) {
    console.log(file);
}, function(err) {
    console.log(err);
});


tsReport.createPdf('output/utilizationSingle.pdf', {
    template: 'demo/utilizationSingle.ejs',
    outputHtml: true,
    htmlPath: 'output/utilizationSingle.html',
    data: require('./seed.js').single,
    dimension: {
        marginInInch: 0,
        dpi: 70
    }    
}).then(function(file) {
    console.log(file);
}, function(err) {
    console.log(err);
});


tsReport.createPdf('output/utilizationFleetwide.pdf', {
    template: 'demo/utilizationFleetwide.ejs',
    outputHtml: true,
    htmlPath: 'output/utilizationFleetwide.html',
    data: require('./seed.js').fleetwide,
    dimension: {
        marginInInch: 0,
        dpi: 70
    }    
}).then(function(file) {
    console.log(file);
}, function(err) {
    console.log(err);
});

