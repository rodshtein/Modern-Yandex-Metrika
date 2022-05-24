export function optionsNormalize (args) {
  const response = {counters: {}};

  args.forEach((el) => {
    if (typeof el === 'number') {
      response.counters[el] = {id: el};
      
    } else if (Array.isArray(el)) {
      addCounters(el, response);

    } else if (typeof el === 'object') {
      if ('id' in el) {
        let {name = el.id, ...options} = el;
        name == undefined 
          ? response.err == 'empty-id-error' 
          : response.counters[name] = options;

      } else {
        ({
          dev: response.dev,
          src: response.src, 
          delay: response.delay, 
        } = el);
        if (el.counters) addCounters(el.counters, response);
      }
    }
  });

  return response;
}

function addCounters (arr, response) {
  arr.forEach((el) => {
    if (typeof el === 'number') response.counters[el] = {id: el};
    if (typeof el === 'object') {
      let {name = el.id, ...options} = el;
      name == undefined 
        ? response.err == 'empty-id-error' 
        : response.counters[name] = options;
    }
  })
}

export function isBrowser () {
  return (new Function('try { return this === window } catch(e) { return false }'))()
}