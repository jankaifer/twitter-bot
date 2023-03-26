import puppeteer, { Puppeteer } from "puppeteer";
import { config } from "dotenv";

const waitForKeyPress = async () => {
  process.stdin.setRawMode(true);
  return await new Promise<void>((resolve) =>
    process.stdin.once("data", () => {
      process.stdin.setRawMode(false);
      resolve();
    })
  );
};

const alert = async (message: string) => {
  console.log(message);
  await waitForKeyPress();
};

async function main() {
  config();

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1450,
      height: 850,
    },
  });
  const page = await browser.newPage();

  const type = async (selector: string, text: string) => {
    await page.waitForSelector(selector);
    await page.type(selector, text);
  };

  const click = async (selector: string) => {
    await page.waitForSelector(selector);
    await page.click(selector);
  };

  await page.goto("https://twitter.com/login");
  await type('input[autocomplete="username"]', process.env.TWITTER_EMAIL!);
  await type('input[autocomplete="username"]', "\n");
  await type(
    'input[autocomplete="current-password"]',
    process.env.TWITTER_PASSWORD!
  );
  await type('input[autocomplete="current-password"]', "\n");

  await click('span[aria-label="Refuse non-essential cookies"]');

  // await alert("Please login to Twitter and press ENTER to continue.");

  // await browser.close();
}

main();
