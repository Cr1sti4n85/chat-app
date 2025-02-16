import { Query } from "types/repository.types";
import {
  IMessageRepository,
  IMessageService,
  Message,
} from "../types/message.types";

export class MessageService implements IMessageService {
  constructor(private readonly messageRepo: IMessageRepository) {}
  findUserMessages(senderId: string, receiverId: string): Promise<Message[]> {
    return this.messageRepo.findByUser(senderId, receiverId);
  }
  createMessage(data: Partial<Message>): Promise<Message> {
    return this.messageRepo.create(data);
  }
  findOne(query: Query): Promise<Message | null> {
    throw new Error("Method not implemented.");
  }
  updateMessage(id: string, data: Partial<Message>): Promise<Message | null> {
    throw new Error("Method not implemented.");
  }
  findMessageById(id: string): Promise<Message | null> {
    throw new Error("Method not implemented.");
  }
}
