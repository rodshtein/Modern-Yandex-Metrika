export function optionsNormalize(args) {
  const responseObj = {};
  const counters = {};
  let dev, useCDN, delay;

  const addCounters = (arr) =>
    arr.forEach((el) => {
      if (typeof el === 'number') counters[el] = { id: el };
      if (typeof el === 'object') 'name' in el 
        ? (counters[el.name] = el) 
        : (counters[el] = el);
    });

  args.forEach((el) => {
    if (typeof el === 'number') {
      counters[el] = { id: el };
    } else if (Array.isArray(el)) {
      addCounters(el);
    } else if (typeof el === 'object') {
      if ('id' in el) {
        'name' in el ? (counters[el.name] = el) : (counters[el] = el);
      } else {
        ({ dev, useCDN, delay } = el);
        if (el.counters) addCounters(el.counters);
      }
    }
  });

  responseObj.counters = counters;
  if (dev != undefined) responseObj.dev = dev;
  if (useCDN != undefined) responseObj.useCDN = useCDN;
  if (delay != undefined) responseObj.delay = delay;

  return responseObj;
}

export function isBrowser(){
  return (new Function('try { return this === window } catch(e) { return false }'))()
}