import { Request, Response } from "express";
import { MessageRepository } from "../repositories/message.repository";
import { MessageService } from "../services/message.service";
import {
  IMessageRepository,
  IMessageService,
  Message,
} from "../types/message.types";
import asyncHandler from "../lib/asyncHandler";

const messageRepository: IMessageRepository = new MessageRepository();
const messageService: IMessageService = new MessageService(messageRepository);

export const getMessages = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const myId = req.currentUser._id as string;

  const messages: Message[] = await messageService.findUserMessages(myId, id);

  res.status(200).json(messages);
});
