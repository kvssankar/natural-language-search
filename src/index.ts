import { Configuration, OpenAIApi } from "openai";

async function queryGPT(jsonData, queryString, openaiKey) {
  const configuration = new Configuration({
    apiKey: openaiKey,
  });

  const openai = new OpenAIApi(configuration);

  const query = `${JSON.stringify(
    jsonData
  )}\n find the indexes for the query - ${queryString}, just answer me with an array of numbers`;

  let result = await await openai.createCompletion({
    model: "text-davinci-003",
    prompt: query,
    max_tokens: 1400,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.25,
  });

  try {
    const arr = result.data.choices[0].text.match(/\d+/g).map(Number);
    return arr;
  } catch (err) {
    return [];
  }
}

export = queryGPT;
