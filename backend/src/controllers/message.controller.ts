import { Request, Response } from "express";
import { MessageRepository } from "../repositories/message.repository";
import { MessageService } from "../services/message.service";
import {
  IMessageRepository,
  IMessageService,
  Message,
} from "../types/message.types";
import asyncHandler from "../lib/asyncHandler";
import { UploadApiResponse } from "cloudinary";
import { uploadImage } from "lib/uploadImage";

const messageRepository: IMessageRepository = new MessageRepository();
const messageService: IMessageService = new MessageService(messageRepository);

export const getMessages = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const myId = req.currentUser._id as string;

  const messages: Message[] = await messageService.findUserMessages(myId, id);

  res.status(200).json(messages);
});

export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
  const { text, image } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.currentUser._id as string;

  let imageUrl = "";
  if (image) {
    const uploadResponse: UploadApiResponse = await uploadImage(image);
    imageUrl = uploadResponse.secure_url;
  }

  await messageService.createMessage({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });

  //TODO: add websockets

  res.status(201).json({ senderId, receiverId, text, imageUrl });
});
