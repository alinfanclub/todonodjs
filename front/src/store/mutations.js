export default {
    SET_POST(state, data) {
        state.postlist = data;
      },
    SET_TEXT(state, text) {
          state.text = text;
          state.content = text;
      },
}