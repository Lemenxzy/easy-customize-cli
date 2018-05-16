'use strict';
const gradient = require('gradient-string');
const ConsoleLog = require('../../Utils/console');
const strarr = [
    {
        style: 'morning',
        value: '  This command will delete your selected template.'
    }
];

const body = ()=>{
    for (const t of strarr) {
        ConsoleLog(gradient[t.style](t.value) + '\n');
    }
};

module.exports = body;