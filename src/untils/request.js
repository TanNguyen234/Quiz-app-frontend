export const API_DOMAIN = "http://localhost:8080/";

export const get = async (path) => {
    const res = await fetch(API_DOMAIN + path);
    const data = await res.json();
    return data;
}

export const post = async (path, options) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify(options)
    })
    const result = await response.json();
    return result;
}

export const del = async (path) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "DELETE",
    })
    const result = await response.json();
    return result;
}

export const patch = async (path, options) => {
    const response = await fetch(API_DOMAIN + path, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify(options)
    })
    const result = await response.json()
    return result;
}