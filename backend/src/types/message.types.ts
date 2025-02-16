import { Document } from "mongoose";
import { Query, Repository } from "./repository.types";
import { User } from "./user.types";

export interface Message extends Document {
  senderId: User["_id"];
  receiverId: User["_id"];
  text: string;
  image: string;
}

export interface IMessageRepository extends Repository<Message> {
  findByUser(senderId: string, receiverId: string): Promise<Message[]>;
}

export interface IMessageService {
  createMessage(data: Partial<Message>): Promise<Message>;
  findOne(query: Query): Promise<Message | null>;
  updateMessage(id: string, data: Partial<Message>): Promise<Message | null>;
  findMessageById(id: string): Promise<Message | null>;
}
