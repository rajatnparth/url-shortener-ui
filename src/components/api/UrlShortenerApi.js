import { apiClient } from "./ApiClient";

export function shortenUrlApi(urlDetails){
    return apiClient.post(`/shortenUrl`,urlDetails)
}

export function getOriginalUrlApi(shortUrlPath){
    return apiClient.get(`/${shortUrlPath}`)
}