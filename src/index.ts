const hasDocument = typeof document === 'object' && !!document;

export function loadScript(src: string, callback?: (err: Error | null) => void) {
  const cb = typeof callback == 'function' ? callback : null;

  if (!hasDocument && cb) cb(new Error(`No Document available.`));

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = src;

  if (cb) {
    script.onload = () => {
      script.onerror = script.onload = null as any;
      cb(null);
    };
    script.onerror = () => {
      script.onerror = script.onload = null as any;
      cb(new Error(`Failed to load script at ${src}`));
    };
  }

  setTimeout(() => {
    const firstScript = document.scripts[0];
    firstScript.parentNode!.insertBefore(script, firstScript);
  }, 0);

  // Return script element in case any further manipulations are needed
  return script;
}
