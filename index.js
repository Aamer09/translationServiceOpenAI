const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function translationService (langauge, data) {
    const prompt = `${data}}
       Hey convert this json file into english : ${langauge} and return transalated json file`;
       async function runCompletion () {
        const completion = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        prompt: prompt,
        max_tokens:4000
        });
        return completion.data.choices[0].text;
    }
    runCompletion();
}

