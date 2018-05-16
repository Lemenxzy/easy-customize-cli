'use strict';
const exec = require('child_process').exec;
const co = require('co');
const config = require('../../templates');
const chalk = require('chalk');
const chalkAnimation = require('chalk-animation');
const inquirer = require('inquirer');
const logo = require('../Log/logo');
const footer = require('../Log/footer');
const body = require('./Log');

module.exports = () => {
    co(function *() {
        //设置写入的字体
        let boolean = logo();
        //异步在选择完成后执行
        if (yield boolean){
            //console身体
            body();
            //console底部
            footer();
            const temp = config.tpl;
            let choicesarr = [];
            for (let i = 0;i< Object.keys(temp).length; i++){
                choicesarr.push(`${Object.keys(temp)[i]}(${temp[Object.keys(temp)[i]].description || '暂无描述'})`)
            }

            //选择自己的模板 ;
            const firstQuestion = {
                type: 'list',
                message: 'Please select one template?',
                name: 'line',
                choices: choicesarr,
            };

            const secondQuestion = {
                type: 'input',
                name: 'projectName',
                message: "What's your project name?"
            };
            inquirer.prompt([
                firstQuestion,
                secondQuestion
            ]).then(function (answers) {

                //模板名称
                let tplName = answers.line.substring(0,answers.line.lastIndexOf('(')).trim();
                //项目名称
                let projectName = answers.projectName;
                let gitUrl;
                let branch;

                if (!temp[tplName]) {
                    console.log(chalk.red('\n × Template does not exit!'));
                    process.exit()
                }
                gitUrl = temp[tplName].url;
                branch = temp[tplName].branch;

                // git命令，远程拉取项目并自定义项目名
                chalkAnimation.rainbow('\n Start generating...');
                const clone =  exec(`git clone --progress ${gitUrl} ${projectName}`,(error, stdout, stderr)=>{
                    if (error) {
                        console.log(error);
                        process.exit()
                    }
                    exec(`cd ${projectName} && git checkout ${branch}`, (error2, stdout2, stderr2) => {
                        if (error2) {
                            console.log(error2);
                            process.exit()
                        }
                        console.log(chalk.green('\n √ Generation completed!'));
                        console.log(`\n cd ${projectName} && npm install \n`);
                        process.exit()
                    })
                });

                clone.stderr.on('data', function(data){
                    if (data.indexOf('Receiving objects') >= 0){
                        console.log(chalk.yellow(`\n The current progress is'${data.replace('Receiving objects','')}`));
                    }
                });
            });
        }

    })

}