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

Find an item's ID:
```js
const getItemPrice = async () => {
  //find item
  let res = await xiv.search('Stuffed Khloe')

  //return item ID
  return res.Results[0].ID
}
```

Search for an FC and get an list of members:
```javascript
const getMembers = async () => {
  //find the FC with its name and server
  let res = await xiv.freecompany.search('My Fun FC', {server: 'Excalibur'})

  //get the FC ID
  let id = res.Results[0].ID

  //get and return fc members
  let fc = await xiv.freecompany.get('9231253336202687179', {data: FCM})
  return fc.FreeCompanyMembers
}
```

Check for character ownership using a token we generated and provided to the user:
```js
const verifyCharacter = async () => {
  //find the character with their name and server
  let res = await xiv.character.search('Kai Megumi', {server: 'excalibur'}) //case insensitive server names, btw ;)

  //get the character
  let char = res.Results[0]

  //return whether or not the character's lodestone bio matches our token
  return char.Bio === 'example_token'
}
```

## Contribute

Feel free to open up issues/PRs or anything else.

Just `git clone https://github.com/xivapi/xivapi-js.git`, run `npm i`, and go to town!

## License

This project is open source, under the terms described in the [MIT License](LICENSE).
