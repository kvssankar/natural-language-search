# Natural Language Search
Search through your json data using natural language

> Note: Only pass JSON Arrays

    const queryGPT = require("natural-language-search");
    const dummyData = [
      {
        color: "red",
        value: "#f00",
      },
      {
        color: "black",
        value: "#000",
        age: "1",
      },
    ];
     const result = await queryGPT(
       dummyData,
       "find the data that has age",
       "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"
     );
     // result = [1]
    
    
    main();

