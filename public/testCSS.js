var pdf = require('./htmlToPdf.js');
pdf.output("output/css.pdf", {
    logs: [
        "CYCLE NAME: GRAVITY 3<CR><LF>",
        "CYCLE NAME: GRAVITY 3<CR><LF>",
        "CYCLE NAME: GRAVITY 3<CR><LF>",
        "CYCLE NAME: GRAVITY 3<CR><LF>",
        "CYCLE NAME: GRAVITY 3<CR><LF>"
    ],
    notes: [
        'note 1',
        'note 2',
        'note 3'
    ],
    feeds: [{
        data: [
            [1459346339160, 22.1],
            [1459346337155, 22.1],
            [1459346335148, 22.1],
            [1459346334140, 21.9],
            [1459346330114, 21]
        ],
        color: '#ff0000',
        paramId: 'temperature',
        name: 'Temperature',
        unit: 'degC',
        preferredUnit: 'degC',
        feedId: '716238430b15a46220d8d2a71819ce47a3d10756',
        yAxisLabel: 'Temperature(°C)'
    },{
        data: [
            [1459346339160, 22.1],
            [1459346337155, 22.1],
            [1459346335148, 22.1],
            [1459346334140, 21.9],
            [1459346330114, 21]
        ],
        color: '#00ff00',
        paramId: 'pressure',
        name: 'Pressure',
        unit: 'psi',
        preferredUnit: 'psi',
        feedId: '716238430b15a46220d8d2a71819ce47a3d10756',
        yAxisLabel: 'Pressure(psi)'
    }]
}, {
    title: "Cycle Report", type: "cssTemplate.ejs",
    pageNumbers: "on", timestamp: "on",
    success: function() {
        console.log("output/css.pdf rendered");
    }
});