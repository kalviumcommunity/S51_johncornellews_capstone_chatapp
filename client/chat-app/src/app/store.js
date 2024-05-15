import { create } from "zustand";

export const useStore = create((set) => ({
  authUser: localStorage.getItem("user") || null,
  setAuthUser: (data) =>
    set({
      authUser: data,
    }),
  selectedConversation: null,
  setSelectedConversation: (id) =>
    set({
      selectedConversation: id,
    }),
  onlineUsers: [],
  setOnlineUsers: (users) =>
    set({
      onlineUsers: users,
    }),
  socket: null,
  setSocket: (sock) =>
    set({
      socket: sock,
    }),
}));
