

import OpenAI from 'openai';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;
require('dotenv').config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
  });
  
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });
app.post('/status', async (request, response) => {
  const locale = request.body.locale;
  const data = request.body.endata;
  // if condition has to be written
    function translationService (locale,data) {
          const prompt = `convert values in this ${data} into ${locale} and return object`;
           async function runCompletion (prompt) {
            try {
            const chatCompletion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{"role": "user", "content": prompt},
                {"role": "system", "content": "This returns translated object"}
              ],
                max_tokens: 4000
              });
              response.send(chatCompletion.choices[0].message);
        }
        catch (error) {
            if (error instanceof OpenAI.APIError) {
              console.error(error.status, "errorStatus");  // e.g. 401
              console.error(error.message, "errorMessage"); // e.g. The authentication token you passed was invalid...
              console.error(error.code, "errorCode");  // e.g. 'invalid_api_key'
              console.error(error.type, "errorType");  // e.g. 'invalid_request_error'
            } else {
              // Non-API error
              console.log(error, "Error");
            }
          }
       }
        runCompletion(prompt);
    }
      translationService(locale,data);
  });
