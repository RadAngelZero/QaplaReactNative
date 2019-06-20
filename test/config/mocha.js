const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

const m = require('module');
const originalLoader = m._load;

m._load = function hookedLoader(request, parent, isMain) {
  if (request.match(/.jpeg|.jpg|.png$/)) {
    return { uri: request };
  }

  return originalLoader(request, parent, isMain);
};

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