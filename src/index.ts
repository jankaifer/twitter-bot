import puppeteer from "puppeteer";

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
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1080,
      height: 1024,
    },
  });
  const page = await browser.newPage();

  await page.goto("https://twitter.com");

  await alert("Please login to Twitter and press ENTER to continue.");

  await browser.close();
}

main();
