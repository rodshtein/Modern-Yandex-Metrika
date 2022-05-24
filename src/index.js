import {optionsNormalize, isBrowser} from "./helpers";
import info from "./informer";

const urls = {
  yandex: 'https://mc.yandex.ru/metrika/tag.js',
  cdn: 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js'
}

const defaultOptions = {
  trackLinks : true,
  accurateTrackBounce: true,
  clickmap: false,
};

let dev, src, delay, counters, err, initStatus;

export {initMetrika, initCounters, YMHit, YMGoal, YMParams};

async function initMetrika (...options) {
  // Skip init for SSR
  if (!isBrowser() || Object.keys(counters).length) return
    
  ({
    dev = false,
    src = 'yandex', 
    delay = true, 
    counters = {},
    err = false
  } = optionsNormalize(options))
  
  if (dev) info('dev-mode')

  // Check for counters
  if (err) {info(err); return}

  // init all
  initMetrikaFunction()
  initCounters(counters)
  loadJsLibrary()

  return {
    hint: (from, to) => YMHit(from, to),
    goal: (options, id = false) => YMGoal(options, id),
    params: (options, id = false) => YMParams(options, id),
  }
}

function initMetrikaFunction () {
  if (!window.ym) return
  /**
   * Create Metrika public function
   * ----------------
   * How it works
   *
   * 1. Check if function already exist, for example
   * it was init by another tool - so, we keep it.
   *
   * 2. When call the function it store called arguments
   * to itself array in public object.
   *
   * 3. So that later the Metrika script can get the data
   *
   */

  window.ym = function () {
    (window.ym.a = window.ym.a || []).push(arguments)
  };

  // Init timer
  window.ym.l = 1 * new Date();
}

function initCounters () {
  for (let key in counters) {
    let {id, disable, ...options} = counters[key];
    if (!disable) {
      initStatus = true 
      window.ym(id, 'init', Object.assign(defaultOptions,options))
    }
  }
}

function loadJsLibrary () {
  if (dev) return
  if (!initStatus) {info('no-counters-error'); return}
  let script = document.createElement("script");
  script.async = true
  script.src = src == 'yandex'  
    ? urls.yandex
    : src == 'cdn'  
      ? urls.cdn
      : src;

  if (delay > 1) {
    setTimeout(() => {document.head.append(script)}, delay)
  } else if (delay) {
    window.onload = document.head.append(script);
  } else {
    document.head.append(script);
  }
}


function checkId (func, id) {
  if (dev) return
  if (!counters.includes(id)) {
    console.error(`[YMetrika][sendParams] The ${id} is not initiated`)
    return
  }

  func.apply(this, arguments);
}


// ======== Methods ======== 
function YMHit (from, to, name) {
  if (!from || !to) {info('hit-error', {from, to}); return}
  if (dev) {info('hit', {from, to}); return}
  if (name) { 
    window.ym(counters[name].id, 'hit', to, {referer: from})
  } else {
    for (let key in counters) {
      window.ym(counters[key].id, 'hit', to, {referer: from});
    }
  }
}

function YMGoal (options, id = false) {
  // Check arguments
  if (dev) return
  if (!counters.length) {
    console.error(`[YMetrika][YMGoal] Metrika is not initiated`)
    return
  }
  if (options === null || !options) {
    console.error(`[YMetrika][YMGoal] First argument must be an Object or String`)
    return
  }

  // Logic
  let target, params, callback, ctx;

  if (typeof target === 'object') {
    ({target, params, callback, ctx} = options)
  } else {
    target = options;
  }

  if (id) {
    checkId(window.ym(id, 'reachGoal', target, params, callback, ctx), id);
    return
  }

  counters.forEach(({id}) => {
    window.ym(id, 'reachGoal', target, params, callback, ctx);
  })
}


function YMParams (options, id=false) {
  // Check
  if (dev) return
  if (typeof options !== 'object' || options === null || !options) {
    console.error(`[YMetrika][YMParams] First argument must be an Object`)
    return
  }
  if (!counters.length) {
    console.error(`[YMetrika][YMParams] Metrika is not initiated`)
    return
  }

  // Logic
  let {visitParams, goalParams} = options;
  visitParams = visitParams ? visitParams : options

  if (id) {
    checkId(window.ym(id, 'params', visitParams, goalParams), id);
    return
  }
  counters.forEach(({id}) => {
    window.ym(id, 'params', options)
  })
}


/* eslint-disable spaced-comment */
//! http://github.com/rodshtein/modern-yandex-metrika
//! Made in Misha Rodstein, thanks for using ❤️ 