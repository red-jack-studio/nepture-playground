/*
    Here we define the main Nepture API server address, the
    engine (or endpoint) we are going to use with the playground,
    and the context factor (the amount of messages used for
    context with each request).

    Available Engine Endpoints:

    GPT 3.5 Turbo: '/playground/gpt35t'
    GPT 4 Turbo: '/playground/gpt4t'

    If you are using a local Nepture API server, make sure to
    declare the correct port.

    Default Configuration:

    export const NeptureAPI = `http://localhost:5000/api`;
    export const NeptureEngineEndpoint = `/playground/gpt35t`;
    export const ContextFactor = '10';
*/

export const NeptureAPI = `http://localhost:5000/api`;
export const NeptureEngineEndpoint = `/playground/gpt35t`;
export const ContextFactor = '10';