const { ref } = require("./firebase");
const puppeteer = require("puppeteer");

const isProduction = process.env.NODE_ENV.trim() === "production"

const wait = (t) => new Promise((res, req) => {
	setTimeout(() => {
		res()
	}, t)
})

const saveResult = (obj) => {
	ref.child(obj.name).push({
		date: Date.now(),
		score: obj.score
	})
}

const scoresToGet = [
	{
		region: "Oslo",
		names: ["Nanna Wahl"]
	},
	{
		region: "Buskerud",
		names: ["Gry Evensen", "C W", "Sigurd Moland Wahl", "Karine Noël Moland Wahl"]
	}
]


const getScores = async (region, names = []) => {
	const browser = await puppeteer.launch(isProduction ? {
		executablePath: process.env.PUPPETEER_EXEC_PATH, // set by docker container
  		headless: false
	} : undefined);
	const page = await browser.newPage();
	await page.goto('https://turappen.no/lister.html');
	await page.click("main .container .row:nth-child(1) .col-md-2:nth-child(4) button:nth-child(1)")
	await page.waitForSelector('#velgFylke');
	await page.select('#velgFylke', region);
	await wait(2000)

	const result = []
	for (const name of names) {
		const foundName = await page.$$("#poengTable tr")
		for(const el of foundName) {
			const element = await el.$("td:nth-child(2)")
			const text = await page.evaluate(el => el.innerText, element)
			if(text.trim() === name) {
				const scoreElement = await el.$("td:nth-child(4)")
				const score = await page.evaluate(el => el.innerText, scoreElement)
				result.push({
					name,
					score
				})
			}
		}
	}
	console.log("Finished, result is ", result)
	result.forEach(saveResult)
	await browser.close();
}

const run = async () => {
	try {
		await Promise.all(scoresToGet.map((obj) => getScores(obj.region, obj.names)))
		process.exit(0)
	} catch(e) {
		console.log(e)
		process.exit(1)
	}
}

run()