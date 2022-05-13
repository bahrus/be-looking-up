import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeLookingUpActions, BeLookingUpVirtualProps, BeLookingUpProps} from './types';
import {hookUp} from 'be-observant/hookUp.js';
import { unsubscribe } from 'trans-render/lib/subscribe.js';

export class BeLookingUpController implements BeLookingUpActions{
    #beDecorProps!: BeDecoratedProps;
    #abortController: AbortController | undefined;
    intro(proxy: Element & BeLookingUpVirtualProps, target: Element, beDecorProps: BeDecoratedProps){
        this.#beDecorProps = beDecorProps;
    }
    finale(proxy: Element & BeLookingUpVirtualProps, target: Element, beDecorProps: BeDecoratedProps){
        unsubscribe(proxy);
    }
    onMount({url, method, mode, credentials, cache, redirect, referrerPolicy, contentType, proxy}: this): void{
        hookUp(url, proxy, 'urlVal');
        if(method !== undefined) hookUp(method, proxy, 'methodVal');
        if(mode !== undefined) hookUp(mode, proxy, 'modeVal');
        if(credentials !== undefined) hookUp(credentials, proxy, 'credentialsVal');
        if(cache !== undefined) hookUp(cache, proxy, 'cacheVal');
        if(redirect !== undefined) hookUp(redirect, proxy, 'redirectVal');
        if(referrerPolicy !== undefined) hookUp(referrerPolicy, proxy, 'referrerPolicyVal');
        if(contentType !== undefined) hookUp(contentType, proxy, 'contentTypeVal');
    }
    onInProgressClass({inProgressClass, proxy}: this): void {
        hookUp(inProgressClass, proxy, 'inProgressClassVal');
    }
    async onUrlValPre({urlVal, proxy, debounceDuration}: this){
        setTimeout(() => {
            proxy.urlValEcho = urlVal;
        }, debounceDuration);
    }
    async onUrlVal({urlVal, urlValEcho, propKey, proxy, fetchInProgress, baseLink, inProgressClassVal, init}: this): Promise<void>{
        if(urlVal !== urlValEcho){ return; }
        if(this.#abortController !== undefined){
            if(fetchInProgress){
                this.#abortController.abort();
            }
        }else{
            this.#abortController = new AbortController();
        }
        if(inProgressClassVal){
            proxy.fetchInProgress = true;
            proxy.classList.add(inProgressClassVal);
        }
        const url = baseLink !== undefined ? (<any>self)[baseLink].href + urlVal : urlVal;
        const resp = await fetch(url, init);
        const respContentType = resp.headers.get('Content-Type');
        const as = respContentType === null ? 'html' : 
                        respContentType.includes('json') ? 'json' : 'html';
        switch(as){
            case 'html':
                proxy.innerHTML = await resp.text();
                break;
            case 'json':
                proxy.value = await resp.json();
                break;
        }
        if(inProgressClassVal){
            proxy.classList.remove(inProgressClassVal);
            proxy.fetchInProgress = false;
        }
    }

    onInitPartChange({
        methodVal, modeVal, credentialsVal, cacheVal, redirectVal, referrerPolicyVal, bodyVal, 
        headers, contentTypeVal, authorizationVal
    }: this): {init: RequestInit} {
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
                'Content-Type': contentTypeVal!,
                'Content-Length': bodyVal?.length,
                'authorization': authorizationVal!,
                ...headers,
            }
        };
        return {init};
    }
}

export interface BeLookingUpController extends BeLookingUpProps{}

const tagName = 'be-looking-up';

const ifWantsToBe = 'looking-up';

const upgrade = '*';

define<BeLookingUpProps & BeDecoratedProps<BeLookingUpProps, BeLookingUpActions>, BeLookingUpActions>({
    config:{
        tagName,
        propDefaults:{
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
                'propKey', 'value'
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
        actions:{
            onMount: 'url',
            onUrlValPre: 'urlVal',
            onUrlVal: {
                ifAllOf: ['urlValEcho'],
                ifKeyIn: ['init']
            },
            onInitPartChange: {
                ifKeyIn: ['methodVal', 'modeVal', 'credentialsVal', 'cacheVal', 'redirectVal', 'referrerPolicyVal', 'bodyVal', 'contentTypeVal', 'authorizationVal'],
            }
        }
    },
    complexPropDefaults:{
        controller: BeLookingUpController
    }
});

register(ifWantsToBe, upgrade, tagName);
