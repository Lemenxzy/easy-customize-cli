'use strict';
const gradient = require('gradient-string');
const ConsoleLog = require('../../Utils/console');
const strarr = [
    {
        style: 'pastel',
        value: '  In the current mode, you can edit the template！'
    }
];

const body = ()=>{
    for (const t of strarr) {
        ConsoleLog(gradient[t.style](t.value) + '\n');
    }
};

module.exports = body;