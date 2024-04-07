/*
    This util is used to manage requests to and from the Nepture API server.
    If you are running a stable and supported version of the Nepture API Server,
    you will not need to make any changes to the code below.
*/

interface NeptureApiProps {
  apiEngine: string;
  apiParameters: string;
  apiMessage: string;
  apiEndpoint: string;
  userResponse: string;
  trainingData: string;
}

export function useNeptureApi({
  apiEngine,
  apiParameters,
  apiMessage,
  apiEndpoint,
  trainingData
}: NeptureApiProps): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", apiEndpoint, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // Ensure trainingData is an object, even if it's empty
    let trainingDataObj = {};
    try {
      trainingDataObj = JSON.parse(trainingData);
    } catch (e) {
      console.error("Failed to parse trainingData as JSON:", e);
      // Handle the error as needed
    }

    const requestData = {
      model: apiEngine,
      messages: [
        {
          role: "system",
          content: apiParameters
        },
        {
          role: "user",
          content: apiMessage
        }
      ],
      trainingData: trainingDataObj // Ensure this is correctly included
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

export default useNeptureApi;
