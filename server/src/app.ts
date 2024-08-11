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
     {{salutation}}
    {{emailBody}}
    {{Closing}}
    {{Signature}}. 
    
    Please dont include the subject line on the email body.
    Stricly follow the above format. dont include text with {{}} in the email body.
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
