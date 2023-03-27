declare function queryGPT(jsonData: any, queryString: string, openaiKey: string, maxTokens?: number, chunk?: number): Promise<number[]>;
export = queryGPT;
