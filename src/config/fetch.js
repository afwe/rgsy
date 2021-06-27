import { json } from "express";
import { baseUrl } from "./env"

export default async function ifetch(
    url = "",
    method = "GET",
    data = {},
    headers = {},
){
    let timeout = 30*1000;
    method = method.toUpperCase();
    let header_data = headers;
    if(!(data instanceof FormData)) {
        header_data["Accept"] = "application/json";
        header_data["Content-Type"] = "application/json";
    }
    let requestConfig = {
        credentials: "include",
        method: method,
        headers: header_data,
        mode: "cors",
        cache: "force-cache"
    };
    if(method === "POST"){
        if(data instanceof FormData){
            Object.defineProperty(requestConfig, "body", {
                value: data
            });
        } else {
            Object.defineProperty(requestConfig, "body", {
                value: json.stringify(data)
            })
        }
    }
    let timeoutFunc = ()=>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(
                    new Response('{"status": 408, "message": "请求超时", "data": null}', {
                        ok: false,
                        status: 408,
                        url: url,
                    })
                );
            }, timeout)
        })
    }
    let fetchFunc = ()=>{
        return fetch(url, requestConfig).then((response) => {
            let retResp = response;
            if(!response.ok){
                retResp = new Response(
                    '{"status": -1, "message": "请求错误' +
                        response.status +
                    '", "data": null}',
                    {
                        ok: false,
                        status: response.status,
                        url: url,
                    }
                )
            }
            return retResp;
        }).catch((error) => {
            return new Response(
                '"status": -1,"message":"Fail to fetch:' +
                error + 
                '","data": null',
                {
                    ok: false,
                    status: 500,
                    url: url
                }
            )
        })

    }
    const retJson = Promise.race([fetchFunc(), timeoutFunc()]).then(
        (response)=>{
            return response.json();
        }
    )
    return retJson;
}