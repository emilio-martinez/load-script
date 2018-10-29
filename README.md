# Load script

Loads a JavaScript file asynchronously.

## Usage

```ts
import { loadScript } from '@emc/load-script';

// Simple
loadScript('https://some-domain.com/path/to/script.js');

// With Callback
loadScript('https://some-domain.com/path/to/script.js', err => {
  if (err) {
    // Script failed to load
  }
  // Script loaded
});

// With Promise
loadScript('https://some-domain.com/path/to/script.js').then(
  () => {
    // Script loaded
  },
  err => {
    // Script failed to load
  }
);
```
