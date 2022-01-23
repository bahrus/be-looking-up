import {BeDecoratedProps, EventHandler} from 'be-decorated/types';
import {IObserve, InterpolatingObserveParams} from 'be-observant/types';


export interface BeLookingUpVirtualProps{
    url?: InterpolatingObserveParams,
    urlVal?: string,
    urlValEcho?: string,
    inProgressClass?: InterpolatingObserveParams;
    inProgressClassVal?: string,
    baseLink?: string,
    debounceDuration?: number,
    body?: IObserve,
    bodyVal?: any,
    method?: InterpolatingObserveParams<'GET' | 'POST' | 'PUT' | 'DELETE'>,
    methodVal?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    mode?: InterpolatingObserveParams<'cors' | 'no-cors' | 'same-origin' | 'navigate'>,
    modeVal?: 'cors' | 'no-cors' | 'same-origin' | 'navigate',
    credentials?: InterpolatingObserveParams<'omit' | 'same-origin' | 'include'>,
    credentialsVal?: 'omit' | 'same-origin' | 'include',
    cache?: InterpolatingObserveParams<'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached'>,
    cacheVal?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached',
    redirect?: InterpolatingObserveParams<'follow' | 'error' | 'manual'>,
    redirectVal?: 'follow' | 'error' | 'manual',
    referrerPolicy?: InterpolatingObserveParams<'no-referrer' |  'no-referrer-when-downgrade' | 'same-origin' | 'origin' | 'strict-origin' |  'origin-when-cross-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'>,
    referrerPolicyVal?: 'no-referrer' |  'no-referrer-when-downgrade' | 'same-origin' | 'origin' | 'strict-origin' |  'origin-when-cross-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url',
    fetchInProgress?: boolean,
    propKey?: string,
    init?: RequestInit,
    contentType?: InterpolatingObserveParams,
    contentTypeVal?: string,
    authorization?: InterpolatingObserveParams,
    authorizationVal?: string,
    headers?: {[key: string]: string},
}

export interface BeLookingUpProps extends BeLookingUpVirtualProps{
    proxy: Element & BeLookingUpVirtualProps;
}

export interface BeLookingUpActions{
    intro(proxy: Element & BeLookingUpVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    finale(proxy: Element & BeLookingUpVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    onMount(self: this): void;
    onUrlVal(self: this): Promise<void>;
    onUrlValPre(self: this): void;
    onInProgressClass(self: this): void;
    onInitPartChange(self: this): {init: RequestInit};
}