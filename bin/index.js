#!/usr/bin/env node --harmony
'use strict';
// 定义脚手架的文件路径
process.env.NODE_PATH = __dirname + '/../node_modules/';

const program = require('commander');

// 定义当前版本
program
    .version(require('../package').version );

// 定义使用方法
program
    .usage('<command>');

program
    .command('add')
    .description('Add a new template')
    .alias('a')
    .action(() => {
        require('../src/add/index')()
    });

program
    .command('list')
    .description('List all the templates')
    .alias('l')
    .action(() => {
        require('../src/list/index')()
    });

program
    .command('init')
    .description('Generate a new project')
    .alias('i')
    .action(() => {
        require('../src/init/index')()
    });

program
    .command('delete')
    .description('Delete a template')
    .alias('d')
    .action(() => {
        require('../src/delete/index')()
    });
program
    .command('edit')
    .description('edit templates')
    .alias('e')
    .action(() => {
        require('../src/edit/index')()
    });


program.parse(process.argv);

if(!program.args.length){
    program.help()
}