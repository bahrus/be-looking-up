import {BeDecoratedProps, EventHandler} from 'be-decorated/types';
import {IObserve, InterpolatingObserveParams} from 'be-observant/types';


export interface BeLookingUpVirtualProps{
    url?: InterpolatingObserveParams<string>,
    urlVal?: string,
    urlValEcho?: string,
    as?: 'html' | 'json',
    inProgressClass?: InterpolatingObserveParams<string>;
    inProgressClassVal?: string,
    baseLink?: string,
    debounceDuration?: number,
    method?: InterpolatingObserveParams<'GET' | 'POST' | 'PUT' | 'DELETE'>,
    methodVal?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    mode?: InterpolatingObserveParams<'cors' | 'no-cors' | 'same-origin' | 'navigate'>,
    modeVal?: 'cors' | 'no-cors' | 'same-origin' | 'navigate',
    credentials?: 'omit' | 'same-origin' | 'include' | IObserve,
    credentialsVal?: 'omit' | 'same-origin' | 'include',
    cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached' | IObserve,
    cacheVal?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached',
    redirect?: 'follow' | 'error' | 'manual' | IObserve,
    redirectVal?: 'follow' | 'error' | 'manual',
    //referrer?: 'client' | 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'unsafe-url' | IObserve,
    referrerPolicy?: 'no-referrer' |  'no-referrer-when-downgrade' | 'same-origin' | 'origin' | 'strict-origin' |  'origin-when-cross-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url' | IObserve
    fetchInProgress?: boolean,
    init?: RequestInit,
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
    //onInitChange(self: this): void;
}