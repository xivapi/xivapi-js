# xivapi-js

[![npm version](https://badge.fury.io/js/%40xivapi%2Fjs.svg)](https://badge.fury.io/js/%40xivapi%2Fjs)
[![license](https://img.shields.io/github/license/xivapi/xivapi-js.svg)](LICENSE)

A JavaScript library for working with [XIVAPI v2](https://v2.xivapi.com/), providing a source of Final Fantasy XIV game data. It lets you fetch, search, and use FFXIV data easily in a promise-based manner.

> [!WARNING]
> `@xivapi/js@0.4.5` (using XIVAPI v1) is now deprecated. Please use it at your own risk. We strongly recommend you update to the latest version. Migration guide and details: https://v2.xivapi.com/docs/migrate/.

If you need help or run into any issues, please [open an issue](https://github.com/xivapi/xivapi-js/issues) on GitHub or join the [XIVAPI Discord server](https://discord.gg/MFFVHWC) for support.

## Installation

```bash
npm install @xivapi/js # or pnpm/yarn/bun/deno
```

## Quick Start

### Node.js / Bundlers

```js
import xivapi from "@xivapi/js";

// Initialize with default settings
const xiv = new xivapi();

// Initialize with custom options
const xivCustom = new xivapi({
  version: "7.55",
  language: "ja",
});
```

## Browser (ESM)

No build step required &ndash; import directly via CDN:

<script type="module">
  import xivapi from "[https://cdn.jsdelivr.net/npm/@xivapi/js/+esm](https://cdn.jsdelivr.net/npm/@xivapi/js/+esm)";

  const xiv = new xivapi();
</script>

````

## Examples

#### Fetch an Item

```js
const item = await xiv.items.get(1);
console.log(item.fields.Name); // "Gil"
````

#### Search Game Sheets

```js
const params = { query: 'Name~"gil"', sheets: "Item" };
const { results } = await xiv.search(params);
console.log(results[0]);

/*
Output:
{
  "score": 1,
  "sheet": "Item",
  "row_id": 1,
  "fields": {
    "Icon": {
      "id": 65002,
      "path": "ui/icon/065000/065002.tex",
      "path_hr1": "ui/icon/065000/065002_hr1.tex"
    },
    "Name": "Gil",
    "Singular": "gil"
  }
}
*/
```

#### Asset & Raw Sheet Queries

```js
// Fetch an asset path
const assets = await xiv.data.assets();
const asset = await assets.get({
  path: "ui/icon/051000/051474_hr1.tex",
  format: "png", // Supports "png", "jpg", or "webp"
});

// List rows from a game sheet
const sheets = await xiv.data.sheets();
const quests = await sheets.list("Quest");
console.log(quests);

// Query available game patch versions
const versions = await xiv.data.versions();
console.log(versions[0]); // e.g. "7.0"
```

## Contributing

Thanks for your interest in contributing! We welcome contributions of all kinds, including bug fixes, new features, documentation improvements, and translations.

For details on getting started, coding standards, and submitting PRs, please see the [Contributor Manual](CONTRIBUTING.md). Please adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md) when participating in this project.

## License

This project is licensed under the MIT License. See [`LICENSE`](LICENSE) for details.
