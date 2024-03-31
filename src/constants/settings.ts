/*
    Here we define the main Nepture API server address and the
    engine (or endpoint) we are going to use with the playground.

    Available Engine Endpoints:

    GPT 3.5 Turbo: '/playground/gpt35t'
    GPT 4 Turbo: '/playground/gpt4t'

    If you are using a local Nepture API server, make sure to
    declare the correct port.
*/
export const NeptureAPI = `http://localhost:5000/api`;
export const NeptureEngineEndpoint = `/playground/gpt35t`;