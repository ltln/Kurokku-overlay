let k1IDToBeDeleted = [];
let k2IDToBeDeleted = [];
let k1, k2;
const app = {
  name: "App",
  components: {},
  // https://v3.vuejs.org/guide/composition-api-introduction.html#basics-of-composition-api
  setup(props, context) {
    const data = Vue.reactive({
      tokens: {},
      rws: {},
    });
    //map global _GetToken helper method
    const getToken = (tokenName, decimalPlaces) =>
      _GetToken(data.rws, data.tokens, tokenName, decimalPlaces);

    let isPlayingOrWatching = Vue.computed(() =>
      _IsInStatus(data.rws, data.tokens, [window.overlay.osuStatus.Playing, window.overlay.osuStatus.ResultsScreen, window.overlay.osuStatus.Watching])
    );
    //start websocket connection to SC
    data.rws = watchTokens(["keyOverlay", "status"], (values) => {
      let oldToken = {};
      if (data.tokens && data.tokens.keyOverlay) {
        oldToken = JSON.parse(data.tokens.keyOverlay);
      }
      Object.assign(data.tokens, values);
      k1 = oldToken.K1Count;
      k2 = oldToken.K2Count;
      let d_k1 = document.getElementById('k1_overlay');
      let d_k2 = document.getElementById('k2_overlay');
      if (k1 > 0 && (data.tokens && (data.tokens.status == 8 || data.tokens.status == 2))) {
        d_k1.style.display = 'flex';
      } else {
        d_k1.style.display = 'none';
      }
      if (k2 > 0 && (data.tokens && (data.tokens.status == 8 || data.tokens.status == 2))) {
        d_k2.style.display = 'flex';
      } else {
        d_k2.style.display = 'none';
      }
      document.getElementById('kc1').innerHTML = k1;
      document.getElementById('kc2').innerHTML = k2;
      const parsed = JSON.parse(values.keyOverlay);
      const isK1Pressed = Boolean(parsed.K1Pressed || parsed.M1Pressed);
      const isK2Pressed = Boolean(parsed.K2Pressed || parsed.M2Pressed);
      const isK1OldPressed = Boolean(oldToken.K1Pressed || oldToken.M1Pressed);
      const isK2OldPressed = Boolean(oldToken.K2Pressed || oldToken.M2Pressed);
      // [[key, event]]
      let events = [];
      if (isK1OldPressed === false && isK1Pressed === true) {
        // K1 on key down
        events.push(["K1", "keydown"]);
      }

      if (isK2OldPressed === false && isK2Pressed === true) {
        // K2 on key down
        events.push(["K2", "keydown"]);
      }

      if (isK1OldPressed === true && isK1Pressed === false) {
        // K1 on key up
        events.push(["K1", "keyup"]);
      }

      if (isK2OldPressed === true && isK2Pressed === false) {
        // K2 on key up
        events.push(["K2", "keyup"]);
      }
      for (let i = 0; i < events.length; i++) {
        const event = events[i][1];
        const key = events[i][0];
        if (event === "keydown") {
          const prefix = key;
          let tile = document.createElement("div");
          tile.classList.add("tile");
          let original = "left: 247px;";
          tile.style.cssText = original;
          let newIdToBeDeleted = `${prefix}${new Date().getTime()}`;
          tile.id = newIdToBeDeleted;
          const expandIntervalId = setInterval(function () {
            let tile = document.getElementById(newIdToBeDeleted);
            if (tile) {
              const nextHeight = parseInt(tile.style.width || 0) + 1;
              tile.style.setProperty("width", `${nextHeight}px`);
            }
          }, 1);
          const transformIntervalId = setInterval(function () {
            let tile = document.getElementById(newIdToBeDeleted);
            if (tile) {
              const nextPos = parseInt(tile.style.left || 0) - 1;
              tile.style.setProperty("left", `${nextPos}px`);
            }
          }, 1);
          tile.setAttribute("transformID", transformIntervalId);
          tile.setAttribute("expandID", expandIntervalId);
          const div = document.getElementById(prefix === "K2" ? "tile2" : "tile1");

          div.appendChild(tile);
          let overlayId = "";
          if (prefix === "K1") {
            k1IDToBeDeleted.push(newIdToBeDeleted);
            overlayId = "K1Overlay";
          }
          if (prefix === "K2") {
            k2IDToBeDeleted.push(newIdToBeDeleted);
            overlayId = "K2Overlay";
          }
          const overlay = document.getElementById(overlayId);
          overlay.classList.add("active");
          // overlay.style.setProperty(
          //   "box-shadow",
          //   "0 0 5px 2px #48ee8a"
          // )
        }

        if (event === "keyup") {
          const prefix = key;
          let ids = [];
          let overlayId = "";
          if (prefix === "K1") {
            ids = [...k1IDToBeDeleted];
            k1IDToBeDeleted = [];
            overlayId = "K1Overlay";
          }
          if (prefix === "K2") {
            ids = [...k2IDToBeDeleted];
            k2IDToBeDeleted = [];
            overlayId = "K2Overlay";
          }
          const overlay = document.getElementById(overlayId);
          overlay.classList.remove("active");
          // overlay.style.setProperty(
          //   "box-shadow",
          //   "none"
          // )
          for (let k = 0; k < ids.length; k++) {
            const id = ids[k];
            const tile = document.getElementById(id);
            if (tile) {
              const transformIntervalId = Number(
                tile.getAttribute("transformID")
              );
              const expandIntervalId = Number(tile.getAttribute("expandID"));
              clearInterval(expandIntervalId);
              setTimeout(function () {
                clearInterval(transformIntervalId);
                tile.remove();
              }, 3000);
            }
          }
        }
      }
    });

    //return all data & computed vars & methods that we want to use elsewhere in this component
    return {
      getToken,
      isPlayingOrWatching
    };
  },
};

export default app;
