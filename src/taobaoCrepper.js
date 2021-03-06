const puppeteer = require('puppeteer');
const chalk = require('chalk');

let url = 'https://detail.tmall.com/item.htm?spm=a1z10.1-b-s.w19370147-18846483048.2.5ccf70bfVlqaMZ&id=568960237310&sku_properties=5919063:1173069333&scene=taobao_shop';

let main = async function(){
    let browser = await puppeteer.launch({
        headless:false,
        devtools:true
    });

    let page = await browser.newPage();

    // page.on('console',msg =>{
    //     if(typeof msg === 'object'){
    //         console.dir(msg);
    //     }else{
    //         console.log(chalk.yellow(msg));
    //     }
    // });
    await page.goto(url,{
        waitUntil:'networkidle0'
    });

    console.log(chalk.green('进入宝贝详情页'));

    // await page.setViewport({
    //     width:1920,
    //     height:1080
    // });

    let obj ={
        title:'',
        colors:[],
        price:0,
        suit:[],
        skus:[],
        detailImgs:[],
        evaList:[]

    
    };
    try{

        //获取模态窗口
        let modalArray = await page.$$('#sufei-dialog-close');
        
        //判断模态窗口是否存在，存在就关闭
        if(modalArray.length){
            await page.click('#sufei-dialog-close');
        }


        await page.waitFor(15000);

        obj.title= await page.$eval('.tb-detail-hd > h1 >a',ele =>ele.text) ;
        obj.price = await page.$eval('.tm-price',ele => ele.innerHTML);
    
        obj.colors = await page.evaluate(()=>{  
            let as = [...document.querySelectorAll('li.tb-txt a > span')];
            return as.map((a)=>{
                return a.innerHTML;
            }); 
        });

        obj.suit = await page.evaluate(()=>{  
            let as = [...document.querySelectorAll('li.tb-selected > a > span')];
            return as.map((a)=>{
                return a.innerHTML;
            }); 
        });

        obj.skus = await page.evaluate(()=>{  
            let as = [...document.querySelectorAll('ul#J_UlThumb >li> a > img')];
            return as.map((a)=>{
                return a.src;
            }); 
        });

    

        obj.detailImgs = await page.evaluate(()=>{  
            let as = [...document.querySelectorAll('div.ke-post > p > img')];
            return as.map((a)=>{
                return a.src;
            }); 
        });
        
        await page.click('a[href="#J_Reviews"] ');
        await page.waitFor(15000);
        obj.evaList = await page.evaluate(()=>{  
            console.log('进入评价分析抓取方法');
            let evaList = [...document.querySelectorAll('div.tm-rate-content>div.tm-rate-fulltxt')];
            console.log(evaList);
            return evaList.map((a)=>{
                return a.textContent;
            });
            
           
        });

        console.log(chalk.yellow(obj.evaList.length));

        console.log(obj);
    }catch(err){
        console.log(chalk.red(err));
    }
    
};

main();