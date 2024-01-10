const app = {
  name: 'App',
  components: { },
  // https://v3.vuejs.org/guide/composition-api-introduction.html#basics-of-composition-api
  setup(props, context) {
    const data = Vue.reactive({
      tokens: {},
      rws: {},
    });
    //map global _GetToken helper method
    const getToken = (tokenName, decimalPlaces) => _GetToken(data.rws, data.tokens, tokenName, decimalPlaces);
    //start websocket connection to SC with some predefined tokens
    data.rws = watchTokens(["status"], (values) => {
      Object.assign(data.tokens, values);

      let status = (data.tokens.status == 8 || data.tokens.status == 2);
      let ur = document.getElementById('ur');
      if (status) {
        ur.style.opacity = 1;
      } else {
        ur.style.opacity = 0;
      }
    });
    
    //return all data & computed vars & methods that we want to use elsewhere in this component
    return {
      getToken
    };
  },
};

export default app;
