import { Request, Response } from 'express';
import OpenAI from 'openai';

/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define routes and middleware here

app.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your client's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and authentication headers
  }),
);

app.use(express.static('../../client/dist/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req: Request, res: Response) => {
  res.send({ server_response: 'hello express' });
});

app.post('/generate', async (req: Request, res: Response) => {
  // if (!req.body || !req.body.emailType) {
  //   return res.status(400).send('Email type field is missing in the request body');
  // }
  const { emailType, recipient, emailContext, tone } = req.body as {
    emailType: string;
    recipient: string;
    emailContext: string;
    tone: string;
  };

  if (
    !req.body ||
    !req.body.emailType ||
    !req.body.recipient ||
    !req.body.emailContext ||
    !req.body.tone
  ) {
    return res.status(400).send('One or more fields are missing in the request body');
  }

  const prompt = `
    You are a helpful email assistant. Create a ${emailType} with a ${tone} tone and with the following format:
    [Salutation],
    [Email Body]
    [Closing],
    [Email Signature]. 
    
    Please dont include the subject line on the email body.
    Stricly follow the above format. 
    Dont include text with [] in the email body.
    Remember to use the tone ${tone} in the email.
    Note that the email body should be a complete sentence.
    Use the emailContext to provide more context to the email.
    Please note that you are a helpful email assistant. 
  `;

  const userPrompt = `
    emailType: ${emailType}
    recipient: ${recipient}
    emailContext: ${emailContext}
    tone: ${tone}`;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: prompt,
      },
      {
        role: 'user',
        content: userPrompt,
      },
    ],
    model: 'gpt-4o-mini-2024-07-18',
  });

  if (completion && completion.choices && completion.choices.length > 0) {
    res.status(200).send({ response: completion.choices[0].message.content, success: true });
  } else {
    res.status(500).send({ message: 'Internal Server Error', success: false });
  }
});
