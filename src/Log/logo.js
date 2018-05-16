'use strict';
const gradient = require('gradient-string');
const figlet = require('figlet');
const ConsoleLog = require('../Utils/console');

const logo = () => new Promise((resolve,reject)=>{
    figlet.text('o h  c l i  !',{
        font:'Standard',
        kerning: 'full',
    }, function (err, data) {
        if (err) {
            ConsoleLog('Something went wrong...');
            return;
        }
        ConsoleLog(gradient.pastel.multiline(data) + '\n');
        ConsoleLog(gradient.atlas('  Welcome to use the Easy-customize-cli ！') + '\n');
        resolve(true)
    });
});


module.exports = logo;