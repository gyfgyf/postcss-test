/**
 * @type {import('postcss').PluginCreator}
 */
const cheerio = require('cheerio');
const fs = require('fs')
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const tailwindcssMap = {
  position: {
    static: "static",
    fixed: "fixed",
    relative: "relative",
    sticky: "sticky"
  },
  bottom: (key, value) => {

    const map = {
      "0px": key + "-0",
      "1px": key + "-px",
      "2px": key + "-0.5",
      "4px": key + "-2",
      "6px": key + "-1.5",
      "8px": key + "-2",
      "10px": key + "-2.5",
      "12px": key + "-3",
      "14px": key + "-3.5",
      "16px": key + "-4",
      "20px": key + "-5",
      "24px": key + "-6",
      "28px": key + "-7",
      "32px": key + "-8",
      "36px": key + "-9",
      "40px": key + "-10",
      "44px": key + "-11",
      "48px": key + "-12",
      "56px": key + "-14",
      "64px": key + "-16",
      "80px": key + "-20",
      "96px": key + "-24",
      "112px": key + "-28",
      "128px": key + "-32",
      "144px": key + "-36",
      "160px": key + "-40",
      "176px": key + "-44",
      "192px": key + "-48",
      "208px": key + "-52",
      "224px": key + "-56",
      "240px": key + "-60",
      "256px": key + "-64",
      "288px": key + "-72",
      "320px": key + "-80",
      "384px": key + "-96",
    }
    return map[value]
  }
};
module.exports = (opts = {}) => {

  return {
    postcssPlugin: "postcss-test",
    Root(root, postcss) {
      root.walkDecls("position", decl => {
        const text = tailwindcssMap.position[decl.value]
        const comment = postcss.comment({ text });
        updatedHtmlFile(decl, text)
        decl.before(comment);
        decl.remove()
      });

      root.walkDecls("bottom", decl => {
        const text = tailwindcssMap.bottom('bottom', decl.value)
        const comment = postcss.comment({ text });
        updatedHtmlFile(decl, text)
        decl.before(comment);
      });
      root.walkDecls("left", decl => {
        const text = tailwindcssMap.bottom('left', decl.value)
        const comment = postcss.comment({ text });
        updatedHtmlFile(decl, text)
        decl.before(comment);
      });
      root.walkDecls("right", decl => {

        const text = tailwindcssMap.bottom('right', decl.value)
        const comment = postcss.comment({ text });
        updatedHtmlFile(decl, text)
        decl.before(comment);
      });
      root.walkDecls("top", decl => {
        const text = tailwindcssMap.bottom('top', decl.value)
        const comment = postcss.comment({ text });
        updatedHtmlFile(decl, text)
        decl.before(comment);
      });
    }
  };
};



function updatedHtmlFile(decl, text) {
  const html = fs.readFileSync('./index.html')
  const reacthtml = ReactDOMServer.renderToString(`const MyComponent = () => (
    <div class="footer-btns">
    <div class="footer-btns-content">
      <div class="btn">
        <img class="service-icon" src="https://img3.dian.so/lhc/2023/11/28/132w_132h_753C01701151179.png">
      </div>
      <div class="scan-btn">
        <img class="btn-icon" src="https://img3.dian.so/lhc/2023/09/06/63w_63h_88CF91693996106.png">
        <div class="scan-text">扫码充电</div>
      </div>
      <div class="btn">
        <img class="user-icon" src="https://img3.dian.so/lhc/2023/11/28/132w_132h_4FF241701151209.png">
      </div>
    </div>
  </div>
  );`);
  console.log('reacthtml', reacthtml)
  const $ = cheerio.load(html)
  $(decl.parent.selector).addClass(text);
  const updatedHtml = $.html();
  fs.writeFileSync('./index.html', updatedHtml)
}
module.exports.postcss = true;
