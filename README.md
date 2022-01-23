# be-looking-up [WIP]

Attribute-based DOM decorator/behavior equivalent of xtal-fetch.

```html
<select be-looking-up=https://images-api.nasa.gov/search?debiaski></select>
```

If api returns html for options, sets innerHTML to the result.  

However, JSON is also supported, but requires more work:

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
        "propKey": "items",
        "inProgressClassVal": "fetch-in-progress",
}'>
    <template be-looking-up-template></template>
</select>
```

Ok, not necessarily that much work.  Most all the settings are optional (on the other hand, not all options are shown.) 

baseLink allows the urlVal to be prepended with the href value of a link tag (ideally located in the head of the document). 

If propKey is specified, be-looking-up sets the property of the element the attribute adorns to the JSON response.  Unless be-looking-up is decorating a template element, in which case be-looking searches for the hosting container and sets the property with key propKey to the JSON response.

If no propKey is specified, then:

1.  be-looking-up searches for a template within the element it adorns with attribute be-looking-up-template.
2.  If not found, it creates a template and prepends it to the element's light children.
3.  Adds/sets the field "value" of the template to the JSON returned from the fetch.
4.  Causes the template to dispatches an event "value-changed".

## Authentication

One of the trickier aspects of fetch is having a static site that needs to authenticate to an api.  Often this [authentication results in use of a Bearer token.](https://msusdev.github.io/microsoft_identity_platform_dev/presentations/auth_users_msaljs.html)

be-looking-up provides the following support for this scenario:

The authorization property can use the be-observant binding support to get the dynamic value from the hosting web component, or a more global location, like appHistory.



