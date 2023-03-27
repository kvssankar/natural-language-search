"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const openai_1 = require("openai");
function helper(jsonData, queryString, openaiKey, maxTokens) {
    return __awaiter(this, void 0, void 0, function* () {
        const configuration = new openai_1.Configuration({
            apiKey: openaiKey,
        });
        const openai = new openai_1.OpenAIApi(configuration);
        const query = `${JSON.stringify(jsonData)}\n find the indexes for the query - ${queryString}, just answer me with an array of numbers`;
        try {
            let result = yield yield openai.createCompletion({
                model: "text-davinci-003",
                prompt: query,
                max_tokens: maxTokens,
                temperature: 0.7,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0.25,
            });
            if (result &&
                result.data &&
                result.data.choices &&
                result.data.choices[0] &&
                result.data.choices[0].text) {
                //@ts-ignore
                const arr = result.data.choices[0].text.match(/\d+/g).map(Number);
                return arr;
            }
            else {
                return [];
            }
        }
        catch (err) {
            return [];
        }
    });
}
function queryGPT(jsonData, queryString, openaiKey, maxTokens = 2048, chunk = 100) {
    return __awaiter(this, void 0, void 0, function* () {
        const arr = [];
        for (let i = 0; i < jsonData.length; i += chunk) {
            const temp = jsonData.slice(i, i + chunk);
            const result = yield helper(temp, queryString, openaiKey, maxTokens);
            if (result && result.length) {
                for (let j = 0; j < result.length; j++) {
                    arr.push(result[j] + i);
                }
            }
        }
        return arr;
    });
}
module.exports = queryGPT;
