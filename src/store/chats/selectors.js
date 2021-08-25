export const selectChatList = (state) => state.chats.chatList;

export function getNameChatById(chatId) {
  return (state) =>
    !state.chats.chatList.find((chat) => chat.id === chatId)
      ? ""
      : state.chats.chatList.find((chat) => chat.id === chatId).name;
}

export function getRobotFlag(chatId) {
  return (state) =>
    !state.chats.chatList.find((chat) => chat.id === chatId)
      ? ""
      : state.chats.chatList.find((chat) => chat.id === chatId).robot;
}
