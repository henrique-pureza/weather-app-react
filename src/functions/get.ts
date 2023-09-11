import { encodeURL } from "./encodeURL";
import { paramsToRecord } from "./paramsToRecord";
import axios from "axios";

export interface WeatherParams {
    appid: string;
    lat: number;
    lon: number;
    units?: string;
    lang?: string;
    mode?: "xml" | "html";
}

export interface GeolocationParams {
    appid: string;
    q: string;
    limit?: number;
}

export async function fetchWeather(params: WeatherParams) {
    return get("weather", params);
}

export async function fetchGeolocation(params: GeolocationParams) {
    return get("geolocation", params);
}

async function get(
    data: "weather" | "geolocation",
    params: WeatherParams | GeolocationParams
) {
    const encodedParams = paramsToRecord(params);
    const url =
        data === "weather"
            ? encodeURL(
                  "https://api.openweathermap.org/data/2.5/weather",
                  encodedParams
              )
            : encodeURL(
                  "https://api.openweathermap.org/geo/1.0/direct",
                  encodedParams
              );

    const response = await axios.get(url);

    return response;
}
