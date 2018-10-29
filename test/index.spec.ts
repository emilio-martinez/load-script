import { loadScript } from '../src/index';

const isPromise = (p: any) => p instanceof Promise;

describe('loadScript', () => {
  it('should return a Promise for a single argument', () => {
    expect(isPromise(loadScript(''))).toBe(true);
  });

  it('should return nothing when provided a callback', () => {
    expect(loadScript('', () => {})).toBeUndefined();
  });

  describe('callbacks', () => {
    it('should return no error for successful script loads', done => {
      loadScript('/base/test/scripts/a.js', err => {
        expect(err).toBeNull();
        expect((window as any).__A).toEqual(jasmine.any(Function));
        done();
      });
    });

    it('should return an error for invalid scripts', done => {
      loadScript('nope', err => {
        expect(err).toEqual(jasmine.any(Error));
        done();
      });
    });
  });

  describe('promise', () => {
    it('should return no error for successful script loads', done => {
      loadScript('/base/test/scripts/b.js').then(() => {
        expect((window as any).__B).toEqual(jasmine.any(Function));
        done();
      });
    });

    it('should return an error for invalid scripts', done => {
      loadScript('nope').catch(err => {
        expect(err).toEqual(jasmine.any(Error));
        done();
      });
    });
  });
});
