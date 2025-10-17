# xivapi-js

[![npm version](https://badge.fury.io/js/%40xivapi%2Fjs.svg)](https://badge.fury.io/js/%40xivapi%2Fjs)
[![license](https://img.shields.io/github/license/xivapi/xivapi-js.svg)](LICENSE)

A JavaScript library for working with [XIVAPI v2](https://v2.xivapi.com/), providing a source of Final Fantasy XIV game data. It lets you fetch, search, and use FFXIV data easily in a promise-based manner.

> [!WARNING]
> `@xivapi/js@0.4.5` (using XIVAPI v1) is now deprecated. Please use it at your own risk. We strongly recommend you update to the latest version. Migration guide and details: https://v2.xivapi.com/docs/migrate/.

If you need help or run into any issues, please [open an issue](https://github.com/xivapi/xivapi-js/issues) on GitHub or join the [XIVAPI Discord server](https://discord.gg/MFFVHWC) for support.

## Installation

```bash
npm install @xivapi/js@latest    # or use yarn, pnpm, or bun
```

## Usage Examples

#### 1. Importing and Initialization

```js
import xivapi from '@xivapi/js';

// Basic instance
const xiv = new xivapi();

// With options
const xivCustom = new xivapi({
  version: "7.0",    // specify game version
  language: "jp",    // specify language (jp, en, de, fr)
  verbose: true      // output more logging
});
```

#### 2. Get an Item

```js
// Fetch the Gil item (item ID 1)
const item = await xiv.items.get(1);

console.log(item.Name); // "Gil" (or equivalent in your language)
```

#### 3. Search Example

```js
// Find all items named "gil"
const params = {
  query: 'Name~"gil"',
  sheets: "Item"
};

const { results } = await xiv.search(params);
console.log(results[0]);

/*
Output example:
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

#### 4. Using Raw XIVAPI v2 Endpoints

```js
// Fetch a raw asset file (e.g. icon image)
const asset = await xiv.data.assets.get({
  path: "ui/icon/051000/051474_hr1.tex",
  format: "png" // jpg or webp also supported
});

// List all quests
const quests = await xiv.data.sheets.list("Quest");
console.log(quests);

// List available game versions
const versions = await xiv.data.versions();
console.log(versions[0]); // e.g. "7.0"
```

## Contributing

We welcome all contributions! Whether you'd like to report a bug, suggest a feature, improve the documentation, or submit a pull request, your help is appreciated.

To get started, clone the repository with: `git clone https://github.com/xivapi/xivapi-js.git`

Before opening a pull request, please:
- Make sure your code passes linting and all current tests (`npm run lint && npm test`).
- Clearly explain your changes and reference any relevant issues in your PR description.

If you have questions, suggestions, or want to discuss changes before contributing, feel free to open an issue!

## License

MIT License - see [LICENSE](LICENSE) file for details.