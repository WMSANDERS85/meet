import puppeteer from 'puppeteer';

describe('show/hide detials', () => {
  jest.setTimeout(30000);
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      //   headless: false,
      //   slowMo: 250,
      //   ignoreDefaultArgs: ['--disable-extensions'],
    }); // open browser
    page = await browser.newPage(); // open new page
    await page.goto('http://localhost:3000/'); // go to localhost:3000
    await page.waitForSelector('.event'); // wait for event class
  });

  afterAll(() => {
    browser.close(); // close browser
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-btn');

    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });
});
