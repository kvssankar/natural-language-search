
# QueryGPT

A simple npm package to perform natural language search on JSON data using OpenAI's GPT-3 API.

## Installation

You can install the package using npm:



`npm install query-gpt` 

## Usage

The package exports a function `queryGPT` that takes 3 compulsory parameters and 2 optional parameters:



`queryGPT(jsonData, queryString, apiKey, maxTokens = 2048, chunks = 100)` 

The parameters are described below:

-   `jsonData`: An array of objects that you want to search. Pass only arrays.
-   `queryString`: The search query string in natural language.
-   `apiKey`: Your OpenAI API key.
-   `maxTokens` (optional): The maximum number of characters to generate for each search result. Defaults to 2048.
-   `chunks` (optional): The number of elements to send in each API request. The default is 100, but you may need to reduce this value if the size of your data is large.
-    `Return Type`: A promise that resolves to an array of indexes that match the search query.

Here's an example usage:

    const queryGPT = require('query-gpt');
    //or
    import queryGPT from 'query-gpt';
    
    const jsonData = [
      { name: 'Alice', age: 25, city: 'New York' },
      { name: 'Bob', age: 30, city: 'San Francisco' },
      { name: 'Charlie', age: 35, city: 'Chicago' }
    ];
    
    const queryString = 'find people who live in New York';
    
    const openApiKey = 'YOUR_API_KEY';
    
    queryGPT(jsonData, queryString, openApiKey)
      .then(results => console.log(results))
      .catch(error => console.error(error));
      
    //full usage
    queryGPT(jsonData, queryString, openApiKey, 2700, 50)
      .then(results => console.log(results))
      .catch(error => console.error(error));

    //result: [0]


> NOTE: 
> If your getting an empty array as result repeatedly
> 1. You might have exceeded your max token of 2048, try increasing max tokens and decreasing chunks
> 2. Please re-verify the Open Apikey that you passed


## Limitations

This package is suitable for small JSON data and may not work well for large datasets.

 

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

## License

This package is licensed under the MIT License.