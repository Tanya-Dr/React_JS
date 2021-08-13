export const selectMsgList = (state) => state.messages.messageList;

export function getMsgListById(chatId) {
  return (state) => state.messages.messageList[chatId];
}
