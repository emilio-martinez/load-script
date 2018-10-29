type Callback<T> = (value: T) => void;

export function loadScript(src: string, cb?: Callback<Error | null>) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = `${src}`;

  const handler = (resolve: Callback<null>, reject: Callback<Error>) => {
    script.onload = () => {
      script.onerror = script.onload = null as any;
      resolve(null);
    };
    script.onerror = () => {
      script.onerror = script.onload = null as any;
      reject(new Error(`Failed to load script at ${src}`));
    };
  };

  setTimeout(() => {
    const firstScript = document.scripts[0];
    firstScript.parentNode!.insertBefore(script, firstScript);
  }, 0);

  // Handle callback, if available
  if (typeof cb == 'function') {
    return handler(cb, cb);
  }

  // If Promise is available, return Promise
  if (typeof Promise == 'function') {
    return new Promise<null>((resolve, reject) => handler(resolve, reject));
  }
}
