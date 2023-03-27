import { Configuration, OpenAIApi } from "openai";

async function helper(
  jsonData: any,
  queryString: string,
  openaiKey: string,
  maxTokens: number
) {
  const configuration = new Configuration({
    apiKey: openaiKey,
  });

  const openai = new OpenAIApi(configuration);

  const query = `${JSON.stringify(
    jsonData
  )}\n find the indexes for the query - ${queryString}, just answer me with an array of numbers`;

  try {
    let result = await await openai.createCompletion({
      model: "text-davinci-003",
      prompt: query,
      max_tokens: maxTokens,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.25,
    });

    if (
      result &&
      result.data &&
      result.data.choices &&
      result.data.choices[0] &&
      result.data.choices[0].text
    ) {
      //@ts-ignore
      const arr = result.data.choices[0].text.match(/\d+/g).map(Number);
      return arr;
    } else {
      return [];
    }
  } catch (err) {
    return [];
  }
}

async function queryGPT(
  jsonData: any,
  queryString: string,
  openaiKey: string,
  maxTokens: number = 2048,
  chunk: number = 100
) {
  const arr = [];
  for (let i = 0; i < jsonData.length; i += chunk) {
    const temp = jsonData.slice(i, i + chunk);
    const result = await helper(temp, queryString, openaiKey, maxTokens);
    if (result && result.length) {
      for (let j = 0; j < result.length; j++) {
        arr.push(result[j] + i);
      }
    }
  }
  return arr;
}

export = queryGPT;
