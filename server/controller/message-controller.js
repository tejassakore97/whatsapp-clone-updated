import Message from "../modal/Message.js";
import Conversation from "../modal/Conversation.js";

import { GoogleGenerativeAI } from "@google/generative-ai";

export const newMessage = async (request, response) => {
  const newMessage = new Message(request.body);
  try {
    await newMessage.save();
    await Conversation.findByIdAndUpdate(request.body.conversationId, {
      message: request.body.text,
    });
    response.status(200).json("Message has been sent successfully");
  } catch (error) {
    response.status(500).json(error);
    console.log(error);
  }
};

export const getMessage = async (request, response) => {
  try {
    const messages = await Message.find({ conversationId: request.params.id });
    response.status(200).json(messages);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getAIMessage = async (request, response) => {
  // app.use(express.json());
  // app.use(cors());
  const genAI = new GoogleGenerativeAI(
    "AIzaSyBxWUaCl5vCDpxxbzNNbCvtNUGtm3yPf-g"
  );
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
  });
  try {
    // const prompt = request.body.prompt;
    const prompt = request.body.prompt;
    console.log("prompt is " + prompt);

    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    console.log(text);
    response.status(200).json({ text: text });
  } catch (error) {
    console.error("Error generating content:", error);
    response.status(500).json();
  }
};
