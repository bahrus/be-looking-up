import { register } from 'be-hive/register.js';
import { define } from 'be-decorated/be-decorated.js';
import { hookUp } from 'be-observant/hookUp.js';
import { unsubscribe } from 'trans-render/lib/subscribe.js';
export class BeLookingUpController {
    #beDecorProps;
    #abortController;
    intro(proxy, target, beDecorProps) {
        this.#beDecorProps = beDecorProps;
    }
    onMount({ url, method, mode, credentials, cache, redirect, referrerPolicy, contentType, proxy }) {
        hookUp(url, proxy, 'urlVal');
        if (method !== undefined)
            hookUp(method, proxy, 'methodVal');
        if (mode !== undefined)
            hookUp(mode, proxy, 'modeVal');
        if (credentials !== undefined)
            hookUp(credentials, proxy, 'credentialsVal');
        if (cache !== undefined)
            hookUp(cache, proxy, 'cacheVal');
        if (redirect !== undefined)
            hookUp(redirect, proxy, 'redirectVal');
        if (referrerPolicy !== undefined)
            hookUp(referrerPolicy, proxy, 'referrerPolicyVal');
        if (contentType !== undefined)
            hookUp(contentType, proxy, 'contentTypeVal');
    }
    onInProgressClass({ inProgressClass, proxy }) {
        hookUp(inProgressClass, proxy, 'inProgressClassVal');
    }
    async onUrlValPre({ urlVal, proxy, debounceDuration }) {
        setTimeout(() => {
            proxy.urlValEcho = urlVal;
        }, debounceDuration);
    }
    async onUrlVal({ urlVal, urlValEcho, proxy, fetchInProgress, baseLink, inProgressClassVal, init }) {
        if (urlVal !== urlValEcho) {
            return;
        }
        if (this.#abortController !== undefined) {
            if (fetchInProgress) {
                this.#abortController.abort();
            }
        }
        else {
            this.#abortController = new AbortController();
        }
        if (inProgressClassVal) {
            proxy.fetchInProgress = true;
            proxy.classList.add(inProgressClassVal);
        }
        const url = baseLink !== undefined ? self[baseLink].href + urlVal : urlVal;
        const resp = await fetch(url, init);
        const respContentType = resp.headers.get('Content-Type');
        const as = respContentType === null ? 'html' :
            respContentType.includes('json') ? 'json' : 'html';
        switch (as) {
            case 'html':
                proxy.innerHTML = await resp.text();
                break;
            case 'json':
                proxy.value = await resp.json();
                break;
        }
        if (inProgressClassVal) {
            proxy.classList.remove(inProgressClassVal);
            proxy.fetchInProgress = false;
        }
    }
    onInitPartChange({ proxy, methodVal, modeVal, credentialsVal, cacheVal, redirectVal, referrerPolicyVal, bodyVal, headers, contentTypeVal, authorizationVal, headerFormSelector }) {
        const init = {
            method: methodVal,
            mode: modeVal,
            credentials: credentialsVal,
            forceVisibility: ['template'],
            cache: cacheVal,
            redirect: redirectVal,
            referrerPolicy: referrerPolicyVal,
            body: bodyVal,
            headers: {
                'Content-Type': contentTypeVal,
                'Content-Length': bodyVal?.length,
                'authorization': authorizationVal,
                ...headers,
            }
        };
        if (headerFormSelector !== undefined) {
            const headerForm = proxy.getRootNode().querySelector(headerFormSelector);
            if (headerForm === null)
                throw '404';
            const elements = headerForm.elements;
            for (const input of elements) {
                const inputT = input;
                if (inputT.name) {
                    init.headers[inputT.name] = inputT.value;
                }
            }
        }
        return { init };
    }
    handleHeaderChange = () => {
        this.onInitPartChange(this);
    };
    async onHeaderFormSubmitOn({ headerFormSubmitOn, proxy, headerFormSelector }) {
        const on = typeof headerFormSubmitOn === 'string' ? [headerFormSubmitOn] : headerFormSubmitOn;
        const headerForm = proxy.getRootNode().querySelector(headerFormSelector);
        if (headerForm === null)
            throw '404';
        for (const key of on) {
            headerForm.addEventListener(key, this.handleHeaderChange);
        }
        this.handleHeaderChange();
    }
    finale(proxy, target, beDecorProps) {
        const { headerFormSubmitOn } = proxy;
        if (headerFormSubmitOn !== undefined) {
            const on = typeof headerFormSubmitOn === 'string' ? [headerFormSubmitOn] : headerFormSubmitOn;
            for (const key of on) {
                proxy.removeEventListener(key, this.handleHeaderChange);
            }
        }
        unsubscribe(proxy);
    }
}
const tagName = 'be-looking-up';
const ifWantsToBe = 'looking-up';
const upgrade = '*';
define({
    config: {
        tagName,
        propDefaults: {
            upgrade,
            ifWantsToBe,
            forceVisible: [upgrade],
            virtualProps: [
                'url', 'urlVal', 'urlValEcho', 'baseLink',
                'inProgressClass', 'inProgressClassVal',
                'method', 'methodVal',
                'mode', 'modeVal',
                'credentials', 'credentialsVal',
                'cache', 'cacheVal',
                'redirect', 'redirectVal',
                'referrerPolicy', 'referrerPolicyVal',
                'body', 'bodyVal', 'fetchInProgress',
                'headers', 'init',
                'contentType', 'contentTypeVal',
                'authorization', 'authorizationVal',
                'value', 'debounceDuration', 'headerFormSelector', 'headerFormSubmitOn'
            ],
            primaryProp: 'urlVal',
            proxyPropDefaults: {
                fetchInProgress: false,
                debounceDuration: 20,
            },
            intro: 'intro',
            finale: 'finale',
            emitEvents: ['value', 'fetchInProgress'],
        },
        actions: {
            onMount: 'url',
            onUrlValPre: 'urlVal',
            onUrlVal: {
                ifAllOf: ['urlValEcho'],
                ifKeyIn: ['init']
            },
            onInitPartChange: {
                ifKeyIn: ['methodVal', 'modeVal', 'credentialsVal', 'cacheVal', 'redirectVal', 'referrerPolicyVal', 'bodyVal', 'contentTypeVal', 'authorizationVal'],
            },
            onHeaderFormSubmitOn: {
                ifAllOf: ['headerFormSubmitOn', 'headerFormSelector'],
            }
        }
    },
    complexPropDefaults: {
        controller: BeLookingUpController
    }
});
register(ifWantsToBe, upgrade, tagName);
