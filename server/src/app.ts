import { Request, Response } from 'express';
import OpenAI from 'openai';

/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({ apiKey: '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' });

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

app.post('/parse', async (req: Request, res: Response) => {
  const { content } = req.body as { content: string };
  if (!req.body || !req.body.content) {
    return res.status(400).send('Content field is missing in the request body');
  }
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You are a helpful assistant designed to output JSON. Your output should be like {"category": 'for-sale' | 'for-rent', "type": 'house' | 'apartment' 'condo', "price": number, "location": Object({country: string, region: string, city: string, province: string, other: string, currency: {{currency acronyms avoid e.g PHP, USD, etc}}}) "short_form_description": string, "long_form_description": string, "payment_terms": string }`,
      },
      {
        role: 'user',
        content: content as string,
      },
    ],
    model: 'gpt-3.5-turbo-1106',
    response_format: { type: 'json_object' },
  });

  res.send({ response: JSON.parse(completion.choices[0].message.content as string) });
});
