export const parseRequestUrl = () => {
    const url = document.location.hash.toLowerCase();
    const request = url.split("/");
    return {
        resource: request[1],
        id: request[2],
        // action: request[3]
    }
}

export const $ = selector => {
    let elements = document.querySelectorAll(selector);
    return elements.length == 1 ? elements[0] : [...elements]
}

export const validateItem = (id, idText) => {
    if (!document.getElementById(id).value) {
        document.getElementById(idText).style.display = 'block';
        document.getElementById(id).style.borderColor = 'red';
        return false;
    }
    document.getElementById(idText).style.display = 'none';
    document.getElementById(id).style.borderColor = '';
    return true;
}