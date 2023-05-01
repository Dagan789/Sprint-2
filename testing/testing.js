const puppeteer = require("puppeteer");

async function go() {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 15,
    });

    const page = await browser.newPage();

    // site to be tested

    await page.goto("https://outfitpro-8d030.web.app/home.html");

    // test login

    await page.click("#login");

    await page.type("#login_email", "dagan@gmail.com");

    await page.type("#login_password", "password");

    await page.click("#login_form > div:nth-child(3) > div:nth-child(1) > button:nth-child(1)");

    //test survey functionallity

    await new Promise((r) => setTimeout(r, 1000));

    await page.click("#survey_button");

    await page.select("#gender_survey", "women");

    await page.select("#color_survey", "black");

    await page.select("#color_survey", "black");

    await page.select("#style_survey", "formal");

    await page.click("#check_submit");

}


go();