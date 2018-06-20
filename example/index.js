import compareScreenshots from '../compare-screenshots'
import { ClientFunction } from 'testcafe'
import { UAParser } from 'ua-parser-js'

fixture `Getting Started`
    .page `http://devexpress.github.io/testcafe/example`;

const screenshotPath = __dirname + "/screenshots/",
	  modelPath = "models/";

test('Screenshot test', async t => {
    const userAgent = await t.eval(() => window.navigator.userAgent);
    const browserName = new UAParser().setUA(userAgent).getBrowser().name.toLowerCase();

	let testScreenshotPath = "tests/";
	let imgName = browserName + ".png";

    let screenshotName = screenshotPath + testScreenshotPath + imgName;
    let screenshotModel = screenshotPath + modelPath    + imgName;

    await t
        .typeText('#developer-name', 'John Smith')
        .click('#submit-button')
        .takeScreenshot(testScreenshotPath + imgName);

    await compareScreenshots(screenshotModel, screenshotName);
    
});