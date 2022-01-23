import {BeDecoratedProps, EventHandler} from 'be-decorated/types';
import {IObserve, InterpolatingObserveParams} from 'be-observant/types';


export interface BeLookingUpVirtualProps{
    url?: InterpolatingObserveParams,
    urlVal?: string,
    urlValEcho?: string,
    // as?: InterpolatingObserveParams,
    // asVal?: 'html' | 'json' | '',
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
    credentials?: InterpolatingObserveParams,
    credentialsVal?: 'omit' | 'same-origin' | 'include',
    cache?: InterpolatingObserveParams,
    cacheVal?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached',
    redirect?: InterpolatingObserveParams,
    redirectVal?: 'follow' | 'error' | 'manual',
    referrerPolicy?: InterpolatingObserveParams,
    referrerPolicyVal?: 'no-referrer' |  'no-referrer-when-downgrade' | 'same-origin' | 'origin' | 'strict-origin' |  'origin-when-cross-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url',
    fetchInProgress?: boolean,
    init?: RequestInit,
    contentType?: string,
    contentTypeVal?: string,
    headers?: {[key: string]: string},
}

export interface BeLookingUpProps extends BeLookingUpVirtualProps{
    proxy: Element & BeLookingUpVirtualProps;
}

export interface BeLookingUpActions{
    intro(proxy: Element & BeLookingUpVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    onUrl(self: this): void;
    onUrlVal(self: this): Promise<void>;
    onUrlValPre(self: this): void;
    onInProgressClass(self: this): void;
    onInitPartChange(self: this): void;
}