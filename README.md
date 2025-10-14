# xivapi-js

[![npm version](https://badge.fury.io/js/%40xivapi%2Fjs.svg)](https://badge.fury.io/js/%40xivapi%2Fjs)
[![license](https://img.shields.io/github/license/xivapi/xivapi-js.svg)](LICENSE)

A pure JS wrapper for interacting with [XIVAPI v2](https://v2.xivapi.com/) 
and handling all requests in a simple, promise-driven manner.

## Installation
```bash
npm install @xivapi/js
```

## Quick Start

```javascript
import xivapi from '@xivapi/js';

const xiv = new xivapi();

// Get a specific item
const item = await xiv.items.get(1);
console.log(item.fields.Name); // "Gil"

// Search for items
const search = xiv.data.search();
const data = await search.get({
  query: 'Name~"sword"',
  sheets: "Item",
  limit: 5
});
console.log(data.results);
```

## Examples

### Get Item Data
```javascript
// Get item by ID
const item = await xiv.items.get(1, {
  fields: "Name,LevelItem,ItemUICategory",
  language: "en"
});

// List items with pagination
const items = await xiv.items.list({ limit: 10 });
```

### Search Game Data
```javascript
const search = xiv.data.search();

// Find items by name
const swords = await search.get({
  query: 'Name~"sword"',
  sheets: "Item",
  limit: 5
});

// Find high-level items
const highLevelItems = await search.get({
  query: "LevelItem>=90",
  sheets: "Item",
  limit: 10
});

// Search across multiple sheets
const results = await search.get({
  query: 'Name~"fire"',
  sheets: "Action,Item",
  limit: 5
});
```

### Get Achievement Data
```javascript
// Get achievement by ID
const achievement = await xiv.achievements.get(1, {
  fields: "Name,Description",
  language: "en"
});

// List achievements
const achievements = await xiv.achievements.list({ limit: 5 });
```

### Custom Client Options
```javascript
const xiv = new xivapi({
  language: "ja",    // Japanese
  version: "latest",
  verbose: true
});
```

### Get Game Assets
```javascript
const assets = xiv.data.assets();

// Get item icon
const icon = await assets.get({
  path: "ui/icon/051000/051474_hr1.tex",
  format: "png"
});
```

## License

MIT License - see [LICENSE](LICENSE) file for details.