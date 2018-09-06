const  puppeteer = require('puppeteer');
const  config = require('../config/config');
const chalk = require('chalk');

let main = async function (){
    const browser = await puppeteer.launch({
        headless:true,
        width:1440,
        height:1800
    });
    const page = await browser.newPage();
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
    await page.keyboard.sendCharacter('mimamima');
    await page.click('#wp-submit');
    console.log(chalk.green('登录成功'));
    await page.waitForSelector('#wp-admin-bar-site-name');
    await page.hover('#wp-admin-bar-site-name'); 
    await page.waitForSelector('#wp-admin-bar-view-site');
    await page.click('#wp-admin-bar-view-site');
    console.log(chalk.green('进入掌控你的生活主页'));
    
    const exercisePage = await browser.newPage();
    await exercisePage.goto('http://www.zhoujingen.cn/blog/');
    await exercisePage.waitFor(200);
    await exercisePage.hover('#menu-item-364'); 
    console.log(chalk.green('进入掌控你的生活主页HOU.............'));
    await exercisePage.waitFor(200);
    await exercisePage.waitForSelector('#menu-item-9931');
    await exercisePage.click('#menu-item-9931');
    console.log(chalk.green('进入手头心练习主页'));
    await exercisePage.waitFor(1000);  

    let aTags = await exercisePage.evaluate(()=>{
       
        let as = [...document.querySelectorAll('h2.entry-title a')];
        return as.map((a)=>{
            return {
                href:a.href.trim(),
                name:a.text
            };
        }); 
    });
    console.log(aTags);

    

    await exercisePage.click('.nextpostslink');
    console.log(chalk.green('进入练习的第二页'));
    await exercisePage.waitFor(1000);

    let aTagsSecond = await exercisePage.evaluate(()=>{
       
        let as = [...document.querySelectorAll('h2.entry-title a')];
        return as.map((a)=>{
            return {
                href:a.href.trim(),
                name:a.text
            };

            // aTags.push({
            //     href:a.href.trim(),
            //     name:a.text
            // });
        }); 
    });

    let allLinks=aTags.concat(aTagsSecond);
    console.log(chalk.green(allLinks));
    //page.close();
   

    for (let i = 0; i < allLinks.length; i++) {
        let exercisePage = await browser.newPage();
        let a = allLinks[i];
        await exercisePage.goto(a.href);
        await exercisePage.waitFor(2000);
        await exercisePage.pdf({path: `${config.fileDir}/${i}.pdf`});
       
    }
    browser.close();
};

main();

