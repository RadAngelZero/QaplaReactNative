const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

require('react-native-mock-render/mock');

require('@babel/register')({
  presets: [require('metro-react-native-babel-preset')],
  ignore: [
    function (filepath) {
      const packages = [
        'native-base-shoutem-theme',
      ];
      if (packages.some(p => filepath.startsWith(`${__dirname}/node_modules/${p}`))) {
        return false;
      }
      return filepath.startsWith(`${__dirname}/node_modules`);
    },
  ],
});