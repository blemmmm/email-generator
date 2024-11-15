import { Request, Response } from 'express';
import OpenAI from 'openai';
import path = require('path');

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
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and authentication headers
  }),
);

app.use(express.static(path.join(__dirname, '../../client/dist/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req: Request, res: Response) => {
  res.send({ server_response: 'hello express' });
});

app.post('/generate-email', async (req: Request, res: Response) => {
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

  try {
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
      stream: true,
    });

    res.writeHead(200, {
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      'Access-Control-Allow-Origin': '*',
    });
    res.flushHeaders();

    // Handle chunks from the stream
    for await (const chunk of completion) {
      const { choices } = chunk;
      const content = choices[0].delta.content;
      if (!content) continue;
      res.write(`${content}`);
    }

    res.end();
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).send('Something went wrong with the request.');
  }
});

app.post('/paraphrase', async (req: Request, res: Response) => {
  const { tone, text } = req.body as {
    tone: string;
    text: string;
  };

  const prompt = `
    You are a paraphraser. Paraphrase texts with a ${tone} tone.
    
    Remember to use the tone ${tone}.
    Correct grammatical errors. 
    Correct spelling errors.
    Don't include anything that has not mentioned in the text.
    Please note that you are a paraphraser. 
  `;

  const userPrompt = `
    text: ${text}
    tone: ${tone}`;

  try {
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
      stream: true,
    });

    res.writeHead(200, {
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      'Access-Control-Allow-Origin': '*',
    });
    res.flushHeaders();

    // Handle chunks from the stream
    for await (const chunk of completion) {
      const { choices } = chunk;
      const content = choices[0].delta.content;
      if (!content) continue;
      res.write(`${content}`);
    }

    res.end(); // End the stream once done
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).send('Something went wrong with the request.');
  }
});

app.post('/translate', async (req: Request, res: Response) => {
  const { language, text } = req.body as {
    language: string;
    text: string;
  };

  const prompt = `
    You are a text translator. Translate texts to the language specified.
    
    Remember to use the language ${language} to translate texts.
    Correct grammatical errors. 
    Correct spelling errors.
    Don't include anything that has not mentioned in the text.
    Don't explain the word, just give its equivalent translation.
    Please note that you are a text translator. 
  `;

  const userPrompt = `
    text: ${text}
    language: ${language}`;

  try {
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
      stream: true,
    });

    res.writeHead(200, {
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      'Access-Control-Allow-Origin': '*',
    });
    res.flushHeaders();

    // Handle chunks from the stream
    for await (const chunk of completion) {
      const { choices } = chunk;
      const content = choices[0].delta.content;
      if (!content) continue;
      res.write(`${content}`);
    }

    res.end(); // End the stream once done
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).send('Something went wrong with the request.');
  }
});
