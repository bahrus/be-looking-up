# be-looking-up [TODO]

Attribute-based DOM decorator/behavior equivalent of xtal-fetch.

```html
<select be-looking-up=https://images-api.nasa.gov/search?debiaski></select>
```

If api returns html for options, sets innerHTML to the result.  

However, JSON is also supported, but requires more work:

## Options

```html
<label for=target>Target</label>
<select id=target be-looking-up='{
        "urlVal": "https://images-api.nasa.gov/search",
        "baseLink": "my-preconnect-link-id",
        "methodVal": "GET",
        "headers": "...",
        "as": "json",
        "hostAdjuster": "myHostMethod",
        "cache": true,
        "propKey": "items",
        "inProgressClassVal": "fetch-in-progress",
}'>
    <template be-looking-up-template></template>
</select>
```

baseLink allows the urlVal to be prepended with the href value of a link tag (ideally located in the head of the document). 

What this does:

If propKey is specified, it sets the property of the element the attribute adorns to that value.

If no propKey is specified, then:

1.  Searches for a template within the element it adorns with attribute be-looking-up-template.
2.  If not found, creates a template and prepends it to the element's light children.
3.  Adds/sets the field "value" to the JSON returned from the fetch.
4.  Dispatches an event "value-changed" from the template.



consistent syntax with be-reformable.

## Dependencies, support for html and json

```html
<label for=target>Target</label>
<select id=target>
    <template be-looking-up='{
        "url": "https://images-api.nasa.gov/search",
        "reqInit": {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": "Bearer <token>"
            }
        },
        "as": "json",
        "cache": true,
        "path":[

        ],
        "params": {
            "search": ["debiaski"],
        },
        "transform": {
            "option": [{"textContent": "name", "value": "id"}]
        }
    }'>
        <option></option>
    </template>
</select>

<label for=object>Object</label>
<select id=object>
    <template be-looking-up='{
        "url": "https://images-api.nasa.gov/",
        "reqInit": {
            "method": "GET",
            "headers": {
                "Accept": "text/html",
                "Authorization": "Bearer <token>"
            }
        },
        "as": "html",
        "xslt": "https://mydomain.com/api/path-to-xslt",
        "path": [
            "asset",
            {
                "observe": "target",
            }
        ],
        "mapping": {
            "value": "id",
            "text": "name"
        }
    }'>
        
    </template>
</select>
```

xslt is optional.  If not provided, then the content inside the template can provide the xslt.  If no xslt provided inside the template, then just paste the html inside as is.

