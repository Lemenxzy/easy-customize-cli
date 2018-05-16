'use strict';
const co = require('co');
const config = require('../../templates');
const chalk = require('chalk');
const fs = require('fs');
const logo = require('../Log/logo');
const footer = require('../Log/footer');
const body = require('./Log/index');
const inquirer = require('inquirer');
module.exports = () => {
    co(function *() {
        let boolean = logo();
        //异步在选择完成后执行
        if (yield boolean){
            body();
            footer();

            const temp = config.tpl;
            let choicesarr = [];
            for (let i = 0;i< Object.keys(temp).length; i++){
                choicesarr.push(`${Object.keys(temp)[i]}(${temp[Object.keys(temp)[i]].description || '暂无描述'})`)
            }
            if (choicesarr.length === 0){
                console.log(chalk.red('   x Please add one template!'))
                process.exit()
            }

            //选择自己的模板 ;
            const firstQuestion = {
                type: 'list',
                message: 'Please select the template you want to delete',
                name: 'line',
                choices: choicesarr,
            };

            const secondQuestion = {
                type: 'input',
                name: 'DeleteName',
                message: "Are you sure to delete it?  will not be restored  (yes/no)"
            };

            inquirer.prompt([
                firstQuestion,
                secondQuestion
            ]).then(function (answers) {
                let boolean = answers.DeleteName;
                if (boolean.toLowerCase() === 'yes' || boolean.toLowerCase() === 'y') {
                    let tplName = answers.line.substring(0,answers.line.lastIndexOf('(')).trim();

                    // 删除对应的模板
                    if (config.tpl[tplName]) {
                        config.tpl[tplName] = undefined
                    } else {
                        console.log(chalk.red('Template does not exist!'))
                        process.exit()
                    }

                    // 写入template.json
                    fs.writeFile(__dirname + '/../../templates.json', JSON.stringify(config),     'utf-8', (err) => {
                        if (err) {console.log(err);process.exit()}
                        console.log(chalk.green('Template deleted!'));
                        process.exit()
                    })

                }else if (boolean.toLowerCase() === 'no' || boolean.toLowerCase() === 'n'){
                    console.log(chalk.yellow('You canceled the operation！'));
                    process.exit()
                }else{
                    console.log(chalk.red('Please enter the correct instruction'))
                }
            });
        }
    })
};