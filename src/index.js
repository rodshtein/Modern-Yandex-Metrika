import { optionsNormalize, isBrowser} from "./helpers";
const urls = {
  def: 'https://mc.yandex.ru/metrika/tag.js',
  cdn: 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js'
}

const defaultOptions = {
  trackLinks : true,
  accurateTrackBounce: true,
  clickmap: false,
};

let dev = false;
let useCDN = false;
let delay = true;
let counters = {};

export {initMetrika, initCounters, YMHit, YMGoal, YMParams };

async function initMetrika(...options){
  ({ dev = false, useCDN = false, delay = true, counters = {} } = optionsNormalize(options))

  if (!isBrowser() || dev || Object.keys(counters).length) return

  let validOptions = counters.filter(item => item.id).length === counters.length;

  if (!validOptions) {
    console.error("[initYandexMetrika] Can't recognition YM ID's! Check options")
    return
  }


  // init all
  initMetrikaFunc()
  initCounters(counters)
  loadTagScript({delay, useCDN})

  return {
    hint: (from, to) => YMHit(from, to),
    goal: (options, id = false) => YMGoal(options, id),
    params: (options, id = false) => YMParams(options, id),
  }
}



function initMetrikaFunc(){

  if (window.ym) return
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

  window.ym = function(){
    (window.ym.a = window.ym.a || []).push(arguments)
  };

  // Init timer
  window.ym.l = 1 * new Date();
}

function initCounters(options){
  // Add counters
  // We can start collect data immediately
  options.forEach(i => {
    let {id, ...restOptions} = i;
    window.ym(id, 'init', Object.assign(defaultOptions, restOptions))
  });
}

function loadTagScript({delay, useCDN}={}){
  let script = document.createElement("script");
  script.async = true
  script.src = getBaseUrl(useCDN)

  if (delay > 1){
    window.onload = setTimeout(()=>{document.head.append(script)}, delay)
  } else if (delay){
    window.onload = document.head.append(script);
  } else {
    document.head.append(script);
  }
}

function getBaseUrl(useCDN){
  return typeof(useCDN) == 'string' 
    ? useCDN
    : useCDN 
      ? urls.cdn
      : urls.def;
}

function checkId(func, id) {
  if (dev) return
  if (!counters.includes(id)) {
    console.error(`[YMetrika][sendParams] The ${id} is not initiated`)
    return
  }

  func.apply(this, arguments);
}


// ======== Methods ======== 

function YMHit(from, to){
  if (!from || !to || dev ) return
  counters.forEach(({id}) => {
    window.ym(id, 'hit', to, { referer: from });
  })
}

function YMGoal(options, id = false){
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
    ({ target, params, callback, ctx } = options)
  } else {
    target = options;
  }

  if (id) {
    checkId(window.ym(id, 'reachGoal', target, params, callback, ctx ), id);
    return
  }

  counters.forEach(({id}) => {
    window.ym(id, 'reachGoal', target, params, callback, ctx );
  })
}


function YMParams(options, id=false){
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
  let { visitParams, goalParams } = options;
  visitParams = visitParams ? visitParams : options

  if (id) {
    checkId(window.ym(id, 'params', visitParams, goalParams), id);
    return
  }
  counters.forEach(({id}) => {
    window.ym(id, 'params', options)
  })
}
