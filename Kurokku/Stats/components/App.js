import lineChart from './LineChart.js';

const app = {
  name: 'App',
  components: { 
    Linechart: lineChart
  },
  // https://v3.vuejs.org/guide/composition-api-introduction.html#basics-of-composition-api
  setup(props, context) {
    const data = Vue.reactive({
      tokens: {},
      rws: {},
      settings: {},
    });
    //map global _GetToken helper method
    const getToken = (tokenName, decimalPlaces) => _GetToken(data.rws, data.tokens, tokenName, decimalPlaces);
    //start websocket connection to SC with some predefined tokens
    data.rws = watchTokens(["mapStrains", "status"], (values) => {
      Object.assign(data.tokens, values);

      let status = (data.tokens.status == 8 || data.tokens.status == 2);
      let stats = document.getElementById('stats');
      if (status) {
        stats.style.opacity = 1;
      } else {
        stats.style.opacity = 0;
      }

      let star = document.getElementById('star');
      star.innerHTML = getToken('liveStarRating').toFixed(2);
    });

    const getWebOverlaySettings = () =>
      fetch(`${window.overlay.config.getUrl()}/settings`)
        .then((response) => response.json())
        .then((responseData) => responseData.WebOverlay_Config);

    getWebOverlaySettings().then((config) => {
      Object.assign(data.settings, config);
    });

    let mapStrains = Vue.computed(() => Object.entries(data.tokens.mapStrains || {}));
    let mapProgress = Vue.computed(() => getToken('time') / (getToken('totaltime') / 1000));
    
    //return all data & computed vars & methods that we want to use elsewhere in this component
    return {
      getToken,
      mapStrains,
      mapProgress
    };
  },
  computed: {
    overlaySettings() {
      return {
        backgroundColor: hexToRgbA('#233d2d'), // --key-dark -> RGBA
        chartHeight: 200,
        hideChartLegend: true,
      };
    },
    progressChartSettings() {
      return {
        backgroundColor: '#6ac48e', // --key
        yAxesFontColor: 'transparent',
      };
    },
    chartStyle() {
      if (Object.keys(this.overlaySettings).length === 0) return `height:200px`;
      return `height: ${this.overlaySettings.chartHeight}px;`;
    },
    progressChartStyle() {
      return `clip-path: inset(0px ${100 - this.mapProgress * 100}% 0px 0px);`;
    },
  },
};

function hexToRgbA(hex){
  var c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length== 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+', 0.7)';
  }
  throw new Error('Bad Hex');
}

export default app;
