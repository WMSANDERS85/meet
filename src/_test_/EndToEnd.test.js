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

describe('Filter events by city', () => {
  jest.setTimeout(30000);
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 250,
      // ignoreDefaultArgs: ['--disable-extensions'],
    }); // open browser
    page = await browser.newPage(); // open new page
    await page.goto('http://localhost:3000/'); // go to localhost:3000
    await page.waitForSelector('.event'); // wait for event class
  });

  afterAll(() => {
    browser.close(); // close browser
  });

  test('When user hasn’t searched for a city, show upcoming events from all cities.', async () => {
    const events = await page.$('.event');
    expect(events).toBeDefined();
  });

  test('User should see a list of suggestions when they search for a city.', async () => {
    await page.type('.city', 'Berlin');
    const suggestions = await page.$('.suggestions li');
    expect(suggestions).toBeDefined();
  });

  test('User can select a city from the suggested list.', async () => {
    await page.click('.suggestions li');
    const events = await page.$('.event');
    expect(events).toBeDefined();
  });

  test('All displayed events match the selected city.', async () => {
    const eventLocations = await page.$$('.event .event-location');

    for (const location of eventLocations) {
      const text = await page.evaluate((el) => el.textContent, location);
      expect(text).toBe('Berlin, Germany');
    }
  });
});
