import { WeatherParams, GeolocationParams } from "./../interfaces";

export function paramsToRecord(params: WeatherParams | GeolocationParams) {
    if ("lat" in params) {
        const record: Record<string, string> = {
            appid: params.appid,
            lat: params.lat.toString(),
            lon: params.lon.toString(),
            units: params.units ? params.units : "",
            lang: params.lang ? params.lang : "",
            mode: params.mode ? params.mode : ""
        };

        return record;
    } else {
        const record: Record<string, string> = {
            appid: params.appid,
            q: params.q,
            limit: params.limit ? params.limit.toString() : ""
        };

        return record;
    }
}
