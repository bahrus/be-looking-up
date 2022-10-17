import {BeDecoratedProps, EventHandler, MinimalProxy} from 'be-decorated/types';
import {IObserve} from 'be-observant/types';


export interface EndUserProps{
    url?: IObserve,
    urlVal?: string,
    urlValEcho?: string,
    inProgressClass?: IObserve;
    inProgressClassVal?: string,
    baseLink?: string,
    debounceDuration?: number,
    body?: IObserve,
    bodyVal?: any,
    method?: IObserve<'GET' | 'POST' | 'PUT' | 'DELETE'>,
    methodVal?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    mode?: IObserve<'cors' | 'no-cors' | 'same-origin' | 'navigate'>,
    modeVal?: 'cors' | 'no-cors' | 'same-origin' | 'navigate',
    credentials?: IObserve<'omit' | 'same-origin' | 'include'>,
    credentialsVal?: 'omit' | 'same-origin' | 'include',
    cache?: IObserve<'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached'>,
    cacheVal?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached',
    redirect?: IObserve<'follow' | 'error' | 'manual'>,
    redirectVal?: 'follow' | 'error' | 'manual',
    referrerPolicy?: IObserve<'no-referrer' |  'no-referrer-when-downgrade' | 'same-origin' | 'origin' | 'strict-origin' |  'origin-when-cross-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'>,
    referrerPolicyVal?: 'no-referrer' |  'no-referrer-when-downgrade' | 'same-origin' | 'origin' | 'strict-origin' |  'origin-when-cross-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url',
    init?: RequestInit,
    contentType?: IObserve,
    contentTypeVal?: string,
    authorization?: IObserve,
    authorizationVal?: string,
    headers?: {[key: string]: string},
    headerFormSelector?: string,
    headerFormSubmitOn?: string | string[],
}

export interface VirtualProps extends EndUserProps, MinimalProxy{
    fetchInProgress?: boolean,
    value?: any,
}

export type Proxy = Element & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;

export interface Actions{
    intro(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps): void;
    finale(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps): void;
    onMount(self: PP): void;
    onUrlVal(self: PP): Promise<void>;
    onUrlValPre(self: PP): void;
    onInProgressClass(self: PP): void;
    onInitPartChange(self: PP): {init: RequestInit};
    onHeaderFormSubmitOn(self: PP): void;
}