import puppeteer from 'puppeteer';

describe('show/hide event details',()=> {
  test('an event element is collapsed by default',async()=> {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');

    await page.waitForSelector('.event-wrapper');
    const eventDetails = await page.$('.event-wrapper .show-more');
    expect(eventDetails).toBeNull();
    browser.close();
  })
})