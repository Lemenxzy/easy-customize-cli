'use strict';
const co = require('co');
const exec = require('child_process').exec;
const config = require('../../templates.json');
const chalk = require('chalk');
const fs = require('fs');
const logo = require('../Log/logo');
const body = require('./Log');
const footer = require('../Log/footer');
const inquirer = require('inquirer');
const deleteFolderRecursive = require('../Utils/deleteFolder');
const getCaption = require('../Utils/utils');
module.exports = () => {
    co(function *() {
        let boolean = logo();
        if (yield boolean) {
            body();
            //console底部
            footer();
            // 分步接收用户输入的参数
            const firstQuestion = {
                type: 'input',
                name: 'templateName',
                message: "What's your template name ?"
            };
            const secondQuestion = {
                type: 'input',
                name: 'description',
                message: "What's your description ?"
            };

            const thirdQuestion = {
                type: 'input',
                name: 'GitLink',
                message: "Git https link ?"
            };

            inquirer.prompt([
                firstQuestion,
            ]).then(function(answer) {
                const tplName = answer.templateName.trim();
                // 避免重复添加
                if (tplName.trim() !== '' && !config.tpl[tplName]) {
                    //继续问
                    inquirer.prompt([
                        secondQuestion,
                        thirdQuestion,
                    ]).then(function (answer2) {
                        const description = answer2.description.trim();
                        const gitUrl = answer2.GitLink.trim();
                        //如果git地址不为空，获取分支列表
                        if (gitUrl.trim() !== ''){
                            console.log(chalk.yellow('Please wait...'));
                            let crypto;
                            try {
                                crypto = require('crypto');
                            } catch (err) {
                                console.log(chalk.red('不支持 crypto!'));
                                process.exit()
                            }
                            const hmac = crypto.createHmac('sha256', (new Date()+''));
                            let fileName = hmac.digest('hex');
                            //创建一个新的文件夹来执行git命令
                            fs.mkdir(fileName , function(err){
                                if(err){
                                    //创建失败
                                    console.log(chalk.red(err));
                                    process.exit()
                                }else{
                                    exec(`cd ${fileName} && git init`,function(err,out) {
                                        if (err) {
                                            console.log(chalk.red(err));
                                            process.exit()
                                        }
                                        exec(`cd ${fileName} && git remote add demo ${gitUrl}`,function(err){
                                            if (err) {
                                                console.log(chalk.red(err));
                                                process.exit()
                                            }
                                            exec(`cd ${fileName} && git remote show demo`,function (err,stdout) {
                                                if (err) {
                                                    console.log(chalk.red(err));
                                                    process.exit()
                                                }
                                                //确认分支
                                                const lastQuestion = {
                                                    type: 'list',
                                                    message: 'Please choices one branch?',
                                                    name: 'line',
                                                    choices: getCaption(stdout),
                                                };
                                                inquirer.prompt([
                                                    lastQuestion
                                                ]).then(function (answers) {
                                                    const branch = answers.line;
                                                    //准备写入
                                                    config.tpl[tplName] = {};
                                                    config.tpl[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, ''); // 过滤unicode字符
                                                    config.tpl[tplName]['description'] = description;
                                                    config.tpl[tplName]['branch'] = branch;
                                                    // 把模板信息写入templates.json
                                                    fs.writeFile(__dirname + '/../../templates.json', JSON.stringify(config), 'utf-8', (err) => {
                                                        if (err) {console.log(err);process.exit()}
                                                        console.log(chalk.green('\n √ success ! New template added!\n'));
                                                        console.log('\n');
                                                        process.exit()
                                                    })

                                                });
                                                //删除文件夹
                                                deleteFolderRecursive(process.cwd()+`/${fileName}`)
                                            })
                                        })
                                    });
                                }
                            })

                        } else{
                            console.log(chalk.red('GitLink cannot be empty!'));
                            process.exit()
                        }
                    });
                } else {
                    console.log(chalk.red('Template cannot be empty or has already existed!'));
                    process.exit()
                }
            })
        }
    });


};