type Callback<T> = (value: T) => void;

function loadHandler(script: HTMLScriptElement, resolve: Callback<null>, reject: Callback<Error>) {
  script.onload = () => {
    script.onerror = script.onload = null as any;
    resolve(null);
  };
  script.onerror = () => {
    script.onerror = script.onload = null as any;
    reject(new Error(`Failed to load script at ${script.src}`));
  };
}

export function loadScript(src: string): Promise<null>;
export function loadScript(src: string, cb: Callback<Error | null>): void;
export function loadScript(src: string, cb?: Callback<Error | null>) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;

  setTimeout(() => {
    const firstScript = document.scripts[0];
    firstScript.parentNode!.insertBefore(script, firstScript);
    script.src = `${src}`;
  }, 0);

  // Handle callback, if available
  if (typeof cb == 'function') {
    loadHandler(script, cb, cb);
    return;
  }

  // If Promise is available, return Promise
  if (typeof Promise == 'function') {
    return new Promise<null>((resolve, reject) => loadHandler(script, resolve, reject));
  }
}
