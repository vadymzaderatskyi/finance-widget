function renderTable(data) {
	const tableBody = document.querySelector('#table-body')

	tableBody.innerHTML = ''

	for (let i = 0; i < data.length; i++) {
		let tr = document.createElement('tr')

		let th = document.createElement('th')
		th.setAttribute('scope', 'row')
		th.innerText = i + 1
		tr.appendChild(th)

		let tdName = document.createElement('td')
		let tdSell = document.createElement('td')
		let tdBuy = document.createElement('td')
		let tdChange = document.createElement('td')

		tdName.innerHTML = data[i].symbol
		tr.appendChild(tdName)

		tdSell.innerHTML = data[i].regularMarketPrice
		tr.appendChild(tdSell)

		tdBuy.innerHTML = data[i].regularMarketPrice
		tr.appendChild(tdBuy)

		let changePercent = Math.round(data[i].regularMarketChangePercent * 1000) / 1000
		changePercent = (changePercent <= 0 ? '' : '+') + changePercent
		tdChange.innerHTML = changePercent
		if (data[i].regularMarketChangePercent > 0) {
			tdChange.classList.add('chg-up')
		} else {
			tdChange.classList.add('chg-down')
		}
		tr.appendChild(tdChange)

		let tdButton = document.createElement('td')
		let buttonCont = document.createElement('div')
		buttonCont.classList.add('button-gradient')
		let button = document.createElement('button')
		button.innerHTML = 'Trade Now'
		buttonCont.appendChild(button)
		tdButton.appendChild(buttonCont)
		tr.appendChild(tdButton)

		tableBody.appendChild(tr)
	}
}

async function getData() {
	const url = new URL('https://yfapi.net/v6/finance/quote')

	let params = { region: 'DE', lang: 'en', symbols: 'AAPL,TSLA,BTC-USD,GOOGL,FB,TWTR,ETH-USD' } //AAPL,TSLA,BTC-USD,GOOGL,FB,TWTR,ETH-USD       AAPL%2CBTC-USD%2CEURUSD%3DX
	url.search = new URLSearchParams(params).toString()

	const init = {
		method: 'GET',
		headers: { 'x-api-key': 'WAPxs347YaaJ5WcwMUbMo236NsVObYOk3Cte0KaO' },
	}

	const req = new Request(url, init)
	const res = await fetch(req)
	return await res.json()
}

async function useData() {
	const data = await getData()
	console.log(data)
	renderTable(data.quoteResponse.result)
}

useData()
