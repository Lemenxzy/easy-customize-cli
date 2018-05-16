const co = require('co');
let chalk = require('chalk');
let templates = require("../../templates.json");
const logo = require('../Log/logo');
const footer = require('../Log/footer');
const body = require('./Log');
module.exports = function(){
    co(function *(){
        let boolean = logo();
        if (yield boolean){
            //console身体
            body();
            //console底部
            footer();
            for(let key in templates.tpl){
                let temp = templates.tpl[key];
                console.log(
                    '  ' + chalk.green('★') +
                    '  ' + chalk.green(key) +
                    '  ' + `(${temp.description}) \n`
                )
            };
            if(JSON.stringify(templates.tpl) === '{}'){
                console.log(chalk.yellow('   x no templates'))
            }
        }
    });
};