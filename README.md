# xivapi-js

[![npm version](https://badge.fury.io/js/xivapi-js.svg)](https://www.npmjs.com/package/xivapi-js)
[![license](https://img.shields.io/github/license/xivapi/xivapi-js.svg)](LICENSE)

This is a pure JS wrapper for interacting with [XIVAPI](https://xivapi.com/) and handling all requests in a simple, promise-driven manner.

## Installation

Simply add the module to your node project with `npm`:
```
npm i xivapi-js
```

## Usage

Require and initialize the module in your code:
```js
const XIVAPI = require('xivapi-js')
const xiv = new XIVAPI()
```

...and then check out the [wiki](https://github.com/xivapi/xivapi-js/wiki) for usage help!

If you get really stuck and need some help, or run into any problems/concerns, either open up an issue on github or join the [XIVAPI discord server](https://discord.gg/MFFVHWC) and ping/DM @SacredPixel.

### Examples:

Find an item ID, and then get the lowest market board price in a specific server:
```js
const getItemPrice = async () => {
  //find item
  let res = await xiv.search('Stuffed Khloe')

  //use item ID for market query
  res = await xiv.market.get(res.Results[0].ID, {servers: 'Excalibur'})

  //return lowest price
  return res.Prices[0].PricePerUnit
}
```

Get the most recent lodestone news post:
```javascript
const getLatestNews = async () => {
  //get the lodestone state
  let ls = await xiv.lodestone()

  //get most recent entry
  let entry = ls.News[0]

  //get the time since the entry's creation
  let timeNow = new Date()
  let diff = new Date(timeNow - entry.Time) //xivapi-js converts the timestamp into a Date object,
                                            //so you can just do this!

  //return your parsed entry
  console.log(`${entry.Title} (published ${diff.getUTCMinutes()} minutes ago)`)
}
```

Check for character ownership using a token we generated and provided to the user:
```js
const verifyCharacter = async () => {
  //find the character with their name and server
  let res = await xiv.character.search('Kai Megumi', {server: 'excalibur'}) //case insensitive server names, btw ;)

  //get the character's ID
  let id = res.Results[0].ID

  //return whether or not the character's lodestone bio matches our token
  return await xiv.character.verification(id, 'token string')
}
```

## Contribute

Feel free to open up issues/PRs or anything else.

Just `git clone https://github.com/xivapi/xivapi-js.git`, run `npm i`, and go to town!

## License

This project is open source, under the terms described in the [MIT License](LICENSE).
