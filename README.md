
# ⚠️ Work in progress - stay tune!

## Modern-Yandex-Metrika
Yandex Metrika for modern frameworks like React, Vue, Svelte, etc.  

### Benefits
👨‍💻   Prevent run on Dev Environment  
🤖   Prevent run on server during SSR render  
🚀   [3 Init strategy](#init-strategy) for better SEO metrics  
😎   [Self hosted option](#init-strategy) for bypass blocks  

[Official Guides from Yandex](https://yandex.ru/support/metrica/index.html)


## Init Metrika Public function
### Optional

It's official recommendation by Yandex[^1] but not necessary.  
Create `ym` function inside `<head>` tag of your main `html` template.

```html
<script type="text/javascript">
  window.ym=function(){(ym.a=ym.a||[]).push(arguments)};
  ym.l = 1 * new Date();
</script>
```

[^1]: By official guides we must init `ym` function on top level inside the `<head>` tag. You may have noticed the timestamp `ym.l`? They don't say how it used. Instead, they can use `perfomans.now()` for get page live time. I think it need for better time tracking 🤷‍♂️  Actually Metrika is a Black Box, and we don't know how they used it.


### init Metrika Counter
Init script in your `Main Layout`, default options are presented:

```javascript
import { initMetrika } from 'Modern-Yandex-Metrika'

let params = {
  counter: {          // For more counters use an array: [{},{}] 
    id: ['string'],
    ['rest options']  // See more on ##Counter options section
  },
  browser: true,      // Check for browser, see ##Environment section  
  dev: false,         // Check for dev mode and prevent run if true
  scriptURL: ['url'], // You can use ##Self Hosting metrika script
  useCDN: false,      // Load metrika script from official CND 
  delay: true,        // Init strategy, see ##Init Strategy section 
}

initMetrika(params);

```

## Self Hosting
It's better option for bypassing adBlock or Sanctions and Censors.
Download last Metrika script, rename, host on your side and pass url to `scriptURL`

## Init Strategy