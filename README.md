# easy-customize-cli

[![image](https://img.shields.io/badge/Myblog-Mask-yellowgreen.svg)](https://maskblog.com)
![image](https://img.shields.io/badge/npm-%3E%3D3.10.10-brightgreen.svg)
![image](https://img.shields.io/npm/l/express.svg)

- easy-customize-cli can help you quickly build your own scaffolding (cli), add, delete, check and other functions.

- easy-customize-cli 可以帮助您快速搭建输入自己的脚手架（ cli ），还有增删查改等功能

## example

 > add github template:

   ![image](imgs/add.gif)

  > init:

  ![image](imgs/init.gif)

  > edit:

  ![image](imgs/edit.gif)

  > delete:

  ![image](imgs/delete.gif)

## Use(使用)

 ```shell
 npm -g install easy-customize-cli
 ```
### Commands:
>ADD
```shell
   easy add
```

添加模板，需要输入模板名称，模板简述，模板的github地址。并且选择分支

To add a template, you need to enter the template name, a brief description of the template, and the github address of the template. And select branches

>Init
```shell
    easy init
```

拉取项目。它将会展示您添加的项目。当选择模板后，会将项目自动拉取到本地

Pull the project. It will show the items you have added. When the template is selected, the project will be automatically pulled to the local



>delete
```shell
    easy delete
```

您可以删除您的模板，删除后再模板列表中将不存在

You can delete your template, after deleting it will not exist in the template list


>edit
```shell
    easy edit
```

您可以编辑您的模板。包括 名称、GitHub 地址、分支、描述等。

You can edit your template. Including name, GitHub address, branch, description, etc.


## why use it ( 为什么使用它 )

它可以帮助您搭建一个自己的前端脚手架cli工具，您只需要 add 命令，添加你的脚手架github地址，
就可以生成一个cli，接下来进入一个空的文件夹，运行 init 命令 ，选择你添加过的模板，就可以
拉取你的git项目到本地。同时他还支持 edit 、 delete 、list 等命令 ，用来编辑对模板列表的
操作。

It can help you to build your own front-end scaffolding cli tool, you only need to add command, add your scaffold github address, you can generate a cli, then enter an empty folder, run the init command, select the one you added Template, you can pull your git project locally. At the same time, he also supports edit, delete, list and other commands to edit the operation of the template list.


## Stay In Touch

myBlog: [MaskBlog](https://maskblog.com)

Email : 704694231@qq.com

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2018 Jorie