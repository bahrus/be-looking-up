import {BeDecoratedProps, EventHandler} from 'be-decorated/types';
import {IObserve} from 'be-observant/types';

type InterpolatingObserveParams<T> = T | IObserve | InterpolatingObserveParams<T>[];
export interface BeLookingUpVirtualProps{
    url?: InterpolatingObserveParams<string>,
    urlVal?: string,
    as?: 'html' | 'json',
    inProgressClass?: string | IObserve;
    baseLink?: string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | IObserve,
    methodVal?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    mode?: 'cors' | 'no-cors' | 'same-origin' | 'navigate' | IObserve,
    credentials?: 'omit' | 'same-origin' | 'include' | IObserve,
    cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached' | IObserve,
    redirect?: 'follow' | 'error' | 'manual' | IObserve,
    //referrer?: 'client' | 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'unsafe-url' | IObserve,
    referrerPolicy?: 'no-referrer' |  'no-referrer-when-downgrade' | 'same-origin' | 'origin' | 'strict-origin' |  'origin-when-cross-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url' | IObserve

}

export interface BeLookingUpProps extends BeLookingUpVirtualProps{
    proxy: Element & BeLookingUpVirtualProps;
}

export interface BeLookingUpActions{
    onUrl(self: this): void;
    onUrlVal(self: this): Promise<void>;
}