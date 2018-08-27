const  puppeteer = require('puppeteer');
//const  config = require('../config/config');
const chalk = require('chalk');

let main = async function (){
    const broswer = await puppeteer.launch({
        headless:false,
        width:1440,
        height:1800
    });
    const page = await broswer.newPage();
    await page.goto('http://www.zhoujingen.cn/blog/wp-login.php');

    console.log(chalk.green('打开登录页面'));
    await page.setViewport({
        width:1440,
        height:1800
    });
    console.log(chalk.green('reset viewpoint'));
    await page.focus('#user_login');
    await page.keyboard.sendCharacter('18210655521');
    await page.focus('#user_pass');
    await page.keyboard.sendCharacter('111111');
    await page.click('#wp-submit');
    console.log(chalk.green('登录成功'));
    await page.waitForSelector('#wp-admin-bar-site-name');
    await page.hover('#wp-admin-bar-site-name'); 
    await page.waitForSelector('#wp-admin-bar-view-site');
    await page.click('#wp-admin-bar-view-site');
    console.log(chalk.green('进入掌控你的生活主页'));
    await page.waitFor(200);
    await page.hover('#site-title'); 
    console.log(chalk.green('进入掌控你的生活主页HOU.............'));
    await page.waitForSelector('#menu-item-9931');
    await page.click('#menu-item-9931');

    


    // await page.goto('http://www.zhoujingen.cn/blog/');
    // console.log('go to http://www.zhoujingen.cn/blog/');
    //await page.goto('http://www.zhoujingen.cn/blog/category/practice/head-hand-heart');
    //console.log(chalk.green('进入手头心练习主页'));




};

main();

