export const selectChatList = (state) => state.chats.chatList;

export function getNameChatById(chatId) {
  return (state) =>
    state.chats.chatList.find((chat) => chat.id === chatId).name;
}
