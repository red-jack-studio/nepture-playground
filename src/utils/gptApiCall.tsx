interface ApiProps {
    apiEngine: string;
    apiParameters: string;
    apiMessage: string;
    apiKey: string;
    apiEndpoint: string;
}

export function callApi({ apiEngine, apiParameters, apiMessage, apiKey, apiEndpoint }: ApiProps): Promise<string> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', apiEndpoint, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${apiKey}`);

        const requestData = {
            model: apiEngine,
            messages: [
                {
                    role: 'system',
                    content: apiParameters,
                },
                {
                    role: 'user',
                    content: apiMessage,
                }
            ],
        };

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.statusText);
                }
            }
        };

        xhr.onerror = function () {
            reject(xhr.statusText);
        };

        xhr.send(JSON.stringify(requestData));
    });
}

export default callApi