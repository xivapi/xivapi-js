# xivapi-js

[![npm version](https://badge.fury.io/js/%40xivapi%2Fjs.svg)](https://badge.fury.io/js/%40xivapi%2Fjs)
[![license](https://img.shields.io/github/license/xivapi/xivapi-js.svg)](LICENSE)

A JavaScript library for working with [XIVAPI v2](https://v2.xivapi.com/), providing a source of Final Fantasy XIV game data. It lets you fetch, search, and use FFXIV data easily in a promise-based manner.

> [!WARNING]
> `@xivapi/js@0.4.5` (using XIVAPI v1) is now deprecated. Please use it at your own risk. We strongly recommend you update to the latest version. Migration guide and details: <https://v2.xivapi.com/docs/migrate/>.

If you need help or run into any issues, please [open an issue](https://github.com/xivapi/xivapi-js/issues) on GitHub or join the [Discord] for support.

## Installation

```sh
npm install @xivapi/js # or pnpm/yarn/bun/deno
```

This package supports importing via a CDN instead of using the above terminal command, please use the following URL if you want to non-Node.js environment: `https://cdn.jsdelivr.net/npm/@xivapi/js/+esm`.

## Basic Usage

```js
import XIVAPI from "@xivapi/js";

const client = new XIVAPI();

// Override the default client options
const customClient = new XIVAPI({
  version: "7.55"
  language: "ja",
  verbose: true
});

// Get a particular 'row_id' from the predefined sheet
const item = await client.items.get(1);
console.log(item.fields.Name);

// Search for row(s) in a particular game sheet(s)
const params = { query: 'Name~"gil"', sheets: "Item" };
const { results } = await client.search(params);
console.log(results[0]);

// Get game assets (images/maps)
const assets = await client.data.assets();
const asset = await assets.get({
  path: "ui/icon/051000/051474_hr1.tex",
  format: "png", // Supports "png", "jpg", or "webp"
});

// List all game sheets available
const sheets = await client.data.sheets();
const quests = await sheets.list("Quest");
console.log(quests);

// List all support game versions on XIVAPI
const versions = await client.data.versions();
console.log(versions[0]);
```

## Contributing

Thanks for your interest in contributing! We welcome contributions of all kinds, including bug fixes, new features, documentation improvements, and translations.

For details on getting started, coding standards, and submitting PRs, please refer to our [Contributor Manual](/CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See [`LICENSE`](/LICENSE) for details.

[Discord]: https://discord.gg/MFFVHWC
