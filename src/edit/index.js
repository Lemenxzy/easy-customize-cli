'use strict';
const exec = require('child_process').exec;
const co = require('co');
const config = require('../../templates');
const chalk = require('chalk');
const inquirer = require('inquirer');
const logo = require('../Log/logo');
const footer = require('../Log/footer');
const body = require('./Log');
const fs = require('fs');
const getCaption = require('../Utils/utils');
const deleteFolderRecursive = require('../Utils/deleteFolder');

module.exports = () => {
    co(function* () {
        let boolean = logo();
        //异步在选择完成后执行
        if (yield boolean){
            //console身体
            body();
            //console底部
            footer();

            let newurl = '';
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
                message: 'Please select one template?',
                name: 'line',
                choices: choicesarr,
            };
            inquirer.prompt([
                firstQuestion
            ]).then(function (answers) {
                let tplName = answers.line.substring(0,answers.line.lastIndexOf('(')).trim();
                let choicesarr = Object.keys(temp[tplName]);
                choicesarr.unshift('name');
                const secondQuestion = {
                    type: 'list',
                    message: 'Please select change item',
                    name: 'secondLine',
                    choices: choicesarr
                };
                //选择修改项
                inquirer.prompt([
                    secondQuestion
                ]).then(function (awswers) {
                    const editItem = awswers.secondLine;
                    switch (editItem) {
                        case 'url':
                            editUrl();
                            break;
                        case 'description':
                            editDescription();
                            break;
                        case 'name':
                            editName();
                            break;
                        case 'branch':
                            editBranch();
                            break;
                        default:
                            break;
                    }
                    //修改名字
                    function editName() {
                        const thirdQuestion = {
                            type: 'input',
                            name: 'name',
                            message: "new name?"
                        };
                        inquirer.prompt([
                            thirdQuestion
                        ]).then(function (aswers3) {
                            const name = aswers3.name.trim();
                            if (name.trim() !== '') {
                                config.tpl[name] = config.tpl[tplName];
                                delete config.tpl[tplName];
                                writeFile();
                            } else{
                                console.log(chalk.red('Name cannot be empty!'));
                                process.exit()
                            }
                        })
                    }

                    //更改url
                    function editUrl() {
                        const thirdQuestion = {
                            type: 'input',
                            name: 'url',
                            message: "new Git https link ?"
                        };

                        inquirer.prompt([
                            thirdQuestion
                        ]).then(function (aswers3) {
                            const gitUrl = aswers3.url.trim();
                            //如果git地址不为空，获取分支列表
                            if (gitUrl.trim() !== ''){
                                newurl = gitUrl.replace(/[\u0000-\u0019]/g, '');
                                editBranch();
                            }else{
                                console.log(chalk.red('GitLink cannot be empty!'));
                                process.exit()
                            }
                        });
                    }

                    //更改简述
                    function editDescription() {
                        const thirdQuestion = {
                            type: 'input',
                            name: 'description',
                            message: "new description ?"
                        };

                        inquirer.prompt([
                            thirdQuestion
                        ]).then(function (aswers3) {
                            const gitUrl = aswers3.description.trim();
                            config.tpl[tplName]['description'] = gitUrl.replace(/[\u0000-\u0019]/g, ''); // 过滤unicode字符
                            writeFile();
                        });
                    }

                    //更改分支
                    function editBranch() {
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

                                    exec(`cd ${fileName} && git remote add demo ${newurl?newurl:config.tpl[tplName]['url']}`,function(err){
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
                                                message: 'Please choices new branch?',
                                                name: 'line',
                                                choices: getCaption(stdout),
                                            };
                                            inquirer.prompt([
                                                lastQuestion
                                            ]).then(function (answers) {
                                                const branch = answers.line;
                                                //如果存在新的地址
                                                if (newurl) {
                                                    config.tpl[tplName]['url'] = newurl
                                                }
                                                config.tpl[tplName]['branch'] = branch;
                                                writeFile();
                                            });
                                            //删除文件夹
                                            deleteFolderRecursive(process.cwd()+`/${fileName}`)
                                        })
                                    })
                                });
                            }
                        })
                    }

                    //写入模板
                    function writeFile() {
                        fs.writeFile(__dirname + '/../../templates.json', JSON.stringify(config), 'utf-8', (err) => {
                            if (err){
                                console.log(err);
                                process.exit()
                            }
                            console.log(chalk.green('\n √ success ! New template added!\n'));
                            console.log('\n');
                            process.exit()
                        })
                    }
                })
            })
        }
    })
};