import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessasgesLoading: false,

  async getUsers() {
    set({ isUsersLoading: true });

    try {
      const res = await axiosInstance.get("/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  async getMessages(userId) {
    set({ isMessasgesLoading: true });

    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessasgesLoading: false });
    }
  },
  async sendMessage(messageData) {
    const { selectedUser, messages } = get();

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  subscribeToMessages() {
    const { selectedUser } = get();
    if (!selectedUser) return;

    //getting state from another store
    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      set({ messages: [...get().messages, newMessage] });
    });
  },
  unsubscribefromMessages() {
    const socket = useAuthStore.getState().socket;

    socket.off("newMessage");
  },
  setSelectedUser(selectedUser) {
    set({ selectedUser });
  },
}));
