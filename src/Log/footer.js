'use strict';
const gradient = require('gradient-string');
const ConsoleLog = require('../Utils/console');

const ConsoleFoot = ()=>{
    ConsoleLog(gradient.cristal('  My blog : https://maskblog.com') + '\n');
    ConsoleLog(gradient.rainbow('  Github : https://github.com/Lemenxzy/easy-customize-cli') + '\n');
};

module.exports = ConsoleFoot;