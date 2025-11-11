# be-looking-up (🙄)

Windows key + . (period) + "rolling"

Attribute-based DOM decorator/behavior equivalent of [xtal-fetch](https://github.com/bahrus/xtal-fetch).

```html
<select be-looking-up=https://images-api.nasa.gov/search?debiaski></select>
```

If api returns html for options, sets innerHTML to the result.  Easy peasy

However, JSON is also supported, but it takes a bit more work for anything of interest to come from it.  be-looking-up just sets:

```JavaScript
oSelect.beDecorated.lookingUp.value = json;
```

It also emits event: "looking-up::value-changed"

A template inside the select element can be adorned with the [be-repeated](https://github.com/bahrus/be-repeated), which can "look up" to the select element and listen for the json value to change, and generate the options.

However, because the select element hides elements contained within, and be-decorated based decorators / behaviors such as be-looking-up and be-repeated require being seen in order to be heard, the select element will also need to be adorned by [be-vigilant](https://github.com/bahrus/be-vigilant).

## Options for Restful JSON service

```html
<label>
NASA Images
<select id=target be-looking-up='{
        "urlVal": "https://images-api.nasa.gov/search",
        "baseLink": "my-preconnect-link-id",
        "methodVal": "GET",
        "headers": {
            "...": "..."
        },
        "cacheVal": "no-store",
        "inProgressClassVal": "fetch-in-progress",
}'>    
</select>
</label>

```

baseLink allows the urlVal to be prepended with the href value of a link tag (ideally located in the head of index.html, typically). 

## Authentication

One of the trickier aspects of fetch is having a static site that needs to authenticate to an api.  Often this [authentication results in use of a Bearer token.](https://msusdev.github.io/microsoft_identity_platform_dev/presentations/auth_users_msaljs.html)

be-looking-up provides the following support for this scenario:

The authorization property can use the be-observant binding support to get the dynamic value from the hosting web component, or a more global location, like session storage.

## Support for headers and body

Follow same approach as [be-reformable](https://github.com/bahrus/be-reformable?tab=readme-ov-file#support-for-headers-and-body)

Hardcoded:

```html
<script type=module>
    (await import('trans-render/lib/weave.js'))
        .weave({
            Authorization: "sessionStorage://auth?.bearerToken",
            "Content-Type": "indexedDB://db/store?.key",
            "User-Agent": "globalThis://navigator?.userAgent",
            Accept: "application/json"
        })
        .into('rPpwNLcYsUOjFcg+N8lmOA')
        .andWeave({
            baseURL:  "globalThis://newton-microservice/href"
        })
        .into('qmywdO1vr0SwyuIe4fvzxQ');
</script>
...

<label>
NASA Images
<select id=target be-looking-up='{
    "...": "qmywdO1vr0SwyuIe4fvzxQ",
    "urlVal": "https://images-api.nasa.gov/search",
    "baseLink": "my-preconnect-link-id",
    "methodVal": "GET",
    "headers": {
       "...": "rPpwNLcYsUOjFcg+N8lmOA",
    },
    "cacheVal": "no-store",
    "inProgressClassVal": "fetch-in-progress",
}'>    
</select>
</label>

```



