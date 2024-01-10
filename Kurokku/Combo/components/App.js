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
      let c_w = document.getElementById('combo_wrapper');
      if (status) {
        c_w.style.opacity = 1;
      } else {
        c_w.style.opacity = 0;
      }

      let combo = getToken('combo');
      let combo_max = getToken('currentMaxCombo');
      let isBreak = combo < combo_max;

      let c_box = document.getElementById('combo_box');
      let c_text = document.getElementById('combo_text');
      let c_x = document.getElementById('combo_x');
      let c_max = document.getElementById('combo_max');
      console.log(c_text.offsetWidth);

      if (isBreak) {
        c_text.style.transform = `translateX(-${getTranslateValue(combo) + getMaxPxValue(combo_max)}px)`;
        c_max.style.opacity = 1;
        c_x.style.display = 'none';
      } else {
        c_text.style.transform = `translateX(-${getTranslateValue(combo)}px)`;
        c_max.style.opacity = 0;
        c_x.style.display = 'inline';
      }

      if (combo < 10) { 
        c_box.style.width = `${26 + (isBreak ? getMaxPxValue(combo_max) : 0)}px`;
      }
      if (combo >= 10 && combo < 100) { 
        c_box.style.width = `${39 + (isBreak ? getMaxPxValue(combo_max) : 0)}px`;
      }
      if (combo >= 100 && combo < 1000) {
        c_box.style.width = `${53 + (isBreak ? getMaxPxValue(combo_max) : 0)}px`;
      }
      if (combo >= 1000 && combo < 10000) {
        c_box.style.width = `${73 + (isBreak ? getMaxPxValue(combo_max) : 0)}px`;
      }
      if (combo >= 10000 && combo < 1000) {
        c_box.style.width = `${87 + (isBreak ? getMaxPxValue(combo_max) : 0)}px`;
      }

      function getMaxPxValue(x) {
        if (x < 10) return 33.36;
        if (x >= 10 && x < 100) return 46.7;
        if (x >= 100 && x < 1000) return 60.1;
        if (x >= 1000 && x < 10000) return 73.41;
      }

      function getTranslateValue(x) {
        if (x < 10) return 0;
        if (x >= 10 && x < 100) return 14;
        if (x >= 100 && x < 1000) return 27;
        if (x >= 1000 && x < 10000) return 47;
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
