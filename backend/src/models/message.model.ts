import { Schema, Types, model } from "mongoose";
import { Message } from "../types/message.types";

const MessageSchema: Schema = new Schema<Message>(
  {
    senderId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const MessageModel = model<Message>("Message", MessageSchema);

export default MessageModel;
