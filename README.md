# Load script

Loads a JavaScript file asynchronously.

## Usage

```ts
import { loadScript } from '@emc/load-script';

// Simple use case
loadScript('https://some-domain.com/path/to/script.js');

// Or with a callback
loadScript('https://some-domain.com/path/to/script.js', err => {
  if (err) {
    // Script failed to load
  }
  // Script successfully loaded
});
```
