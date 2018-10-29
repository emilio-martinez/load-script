type Callback<T> = (value: T) => void;
type StoredCallbacks = { resolve: Callback<null>; reject: Callback<Error> };

const callbackMap: { [src: string]: StoredCallbacks[] } = {};

function addCallbacksFor(src: string, callbacks: StoredCallbacks) {
  callbackMap[src] = (callbackMap[src] || []).concat(callbacks);
}

function runCallbacksFor(src: string, success: boolean) {
  let i = callbackMap[src].length;
  while (i--) {
    const cb = callbackMap[src].pop()!;
    success ? cb.resolve(null) : cb.reject(new Error(`Failed to load script at ${src}`));
  }
}

function loadHandler(
  script: HTMLScriptElement,
  src: string,
  resolve: Callback<null>,
  reject: Callback<Error>
) {
  addCallbacksFor(src, { resolve, reject });

  script.onload = () => {
    script.onerror = script.onload = null as any;
    runCallbacksFor(src, true);
  };
  script.onerror = () => {
    script.onerror = script.onload = null as any;
    runCallbacksFor(src, false);
  };
}

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
    loadHandler(script, src, cb, cb);
  }

  // If Promise is available, return Promise
  if (typeof Promise == 'function') {
    return new Promise<null>((resolve, reject) => loadHandler(script, src, resolve, reject));
  }
}
