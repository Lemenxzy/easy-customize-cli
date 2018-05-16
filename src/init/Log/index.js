'use strict';
const gradient = require('gradient-string');
const ConsoleLog = require('../../Utils/console');
const strarr = [
    {
        style: 'pastel',
        value: '  Choose a template that belongs to yourself, then initiate a routine'
    }
];

const body = ()=>{
    for (const t of strarr) {
        ConsoleLog(gradient[t.style](t.value) + '\n');
    }
};

module.exports = body;