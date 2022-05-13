# be-looking-up

Attribute-based DOM decorator/behavior equivalent of [xtal-fetch](https://github.com/bahrus/xtal-fetch).

```html
<select be-looking-up=https://images-api.nasa.gov/search?debiaski></select>
```

If api returns html for options, sets innerHTML to the result.  

However, JSON is also supported.  It just sets:

```JavaScript
oSelect.beDecorated.lookingUp.value = json;
```

It also emits event: "looking-up::value-changed"

## Options for Restful JSON service

```html
<label for=target>Target</label>
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
```

baseLink allows the urlVal to be prepended with the href value of a link tag (ideally located in the head of index.html, typically). 

## Authentication

One of the trickier aspects of fetch is having a static site that needs to authenticate to an api.  Often this [authentication results in use of a Bearer token.](https://msusdev.github.io/microsoft_identity_platform_dev/presentations/auth_users_msaljs.html)

be-looking-up provides the following support for this scenario:

The authorization property can use the be-observant binding support to get the dynamic value from the hosting web component, or a more global location, like session storage.



