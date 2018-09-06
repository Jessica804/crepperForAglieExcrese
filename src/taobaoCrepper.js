const puppeteer = require('puppeteer');
const chalk = require('chalk');

let url = 'https://detail.tmall.com/item.htm?spm=a1z10.1-b-s.w19370147-18846483048.2.5ccf70bfVlqaMZ&id=568960237310&sku_properties=5919063:1173069333&scene=taobao_shop';

let main = async function(){
    let browser = await puppeteer.launch({
        headless:false
    });

    let page = await browser.newPage();

    page.on('console',msg =>{
        if(typeof msg === 'object'){
            console.dir(msg);
        }else{
            console.log(chalk.yellow(msg));
        }
    });
    await page.goto(url,{
        waitUntil:'networkidle0'
    });

    console.log(chalk.green('进入宝贝详情页'));

    await page.setViewport({
        width:1920,
        height:1080
    });

    // let title = await page.$eval('.tb-detail-hd > h1 >a',ele => ele.text);
    // console.log(chalk.green(title));
    let price = await page.$eval('.tm-price',ele => ele.text);
    console.log(chalk.green(price));




    
    
    // let page = await page.evaluate(()=>{
 
         


    // });



    

     


};

main();