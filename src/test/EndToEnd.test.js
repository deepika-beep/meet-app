import puppeteer from 'puppeteer';
jest.setTimeout(30000);
describe('show/hide event details',() => {
  let browser;
  let page;

  beforeAll(async () => {
      browser = await puppeteer.launch({
      headless: false,
      slowMo: 250, // slow down by 250ms
      ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event-wrapper');
  });

  afterAll(()=>{
    browser.close();
  });

  test('an event element is collapsed by default',async()=> {
    const eventDetails = await page.$('.event-wrapper .show-more');
    expect(eventDetails).toBeNull();

  })

  test('user can expand an event to see its details',async()=>{

    await page.click('.btn-wrapper button');
    const eventDetails = await page.$('.event-wrapper .show-more');
    expect(eventDetails).toBeDefined();
  
  })

  test('user can collapse an event to hide its details',async()=>{
    await page.click('.btn-wrapper button');
    const eventDetails = await page.$('.event-wrapper .show-more');
    expect(eventDetails).toBeNull();
  })
})
describe('Filter events by city', () => {

    let browser;
    let page;

    beforeAll(async () => {  
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            ignoreDefaultArgs: ['--disable-extensions']
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/'); 
        await page.waitForSelector('.event-wrapper');
        await page.waitForSelector('.city');
        await page.waitForSelector('.suggestions');  
    });

    afterAll(() => {
        browser.close();
    });
    test('When user hasn\'t searched for a city, show upcoming events from all cities', async () => {    
        const events = await page.$('.event-wrapper');
        expect(events).toBeDefined();
         });
    test('user should see a list of suggestion when they search for a city', async () => {
      const searchCity = await page.$('.city');
      await searchCity.type('input[name=value]', 'berlin');
      const suggestions = await page.$$('.suggestions li')
      expect(suggestions).toBeDefined();
      })
    test('user can select a city from the suggested list', async () => {
         const suggestionsCityList = await page.$('.suggestions')
         expect(suggestionsCityList).toBeDefined();
      })
   
  })