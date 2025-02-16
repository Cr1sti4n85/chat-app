import { Query } from "types/repository.types";
import MessageModel from "../models/message.model";
import { IMessageRepository, Message } from "../types/message.types";

export class MessageRepository implements IMessageRepository {
  create(data: Message): Promise<Message> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: Partial<Message>): Promise<Message | null> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Message | null> {
    throw new Error("Method not implemented.");
  }
  async findByUser(senderId: string, receiverId: string): Promise<Message[]> {
    return await MessageModel.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });
  }
}
