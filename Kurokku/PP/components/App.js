const app = {
  name: "App",
  components: {},
  setup(props, context) {
    const data = Vue.reactive({
      tokens: {},
      rws: {},
    });

    const getToken = (tokenName, decimalPlaces) =>
      _GetToken(data.rws, data.tokens, tokenName, decimalPlaces);

    let isPlayingOrWatching = Vue.computed(() =>
      _IsInStatus(data.rws, data.tokens, [
        window.overlay.osuStatus.Playing,
        window.overlay.osuStatus.Watching,
      ])
    );
    let Listening = Vue.computed(() =>
      _IsInStatus(data.rws, data.tokens, [window.overlay.osuStatus.Listening])
    );
    let ResultsScreen = Vue.computed(() =>
      _IsInStatus(data.rws, data.tokens, [
        window.overlay.osuStatus.ResultsScreen,
      ])
    );

    data.rws = watchTokens(['status'], (values) => {
      Object.assign(data.tokens, values);

      let status = (data.tokens.status == 8 || data.tokens.status == 2);
      let p_w = document.getElementById('pp_wrapper');
      if (status) {
        p_w.style.opacity = 1;
      } else {
        p_w.style.opacity = 0;
      }
      
      let pp = getToken('ppIfMapEndsNow',0);
      let ppFC = getToken('ppIfRestFced',0)
      let pp_box = document.getElementById('pp_box');
      let pp_text = document.getElementById('pp_text');
      let pp_tx = pp + " / " + ppFC + "pp";

      if (pp_tx.length == 7) { 
        pp_box.style.width = '74px';
        pp_text.style.width = '90px';
      }
      if (pp_tx.length == 8) { 
        pp_box.style.width = '87px';
        pp_text.style.width = '103px';
      }
      if (pp_tx.length == 9) {
        pp_box.style.width = '101px';
        pp_text.style.width = '117px';
      }
      if (pp_tx.length == 10) {
        pp_box.style.width = '114px';
        pp_text.style.width = '130px';
      }
      if (pp_tx.length == 11) {
        pp_box.style.width = '127px';
        pp_text.style.width = '143px';
      }
      if (pp_tx.length == 12) {
        pp_box.style.width = '147px';
        pp_text.style.width = '163px';
      }
      if (pp_tx.length == 13) {
        pp_box.style.width = '167px';
        pp_text.style.width = '183px';
      }
    });

    Vue.provide("SCTokens", {
      rws: data.rws,
      data,
      get tokens() {
        return this.data.tokens;
      },
      getToken,
    });

    return {
      getToken,
      isPlayingOrWatching,
      Listening,
      ResultsScreen,
      osuGrade: window.overlay.osuGrade,
    };
  },
};

export default app;
