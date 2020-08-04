const path = require("path");
const tailWindConfig = require.resolve('./tailwind.config.js');

module.exports = () => ({
  plugins: [
    require("tailwindcss")(tailWindConfig),
    require("autoprefixer"),
  ],
});
