const path = require("path");

module.exports = () => ({
  plugins: [
    require("tailwindcss")(
      path.join(
        process.cwd(),
        "../gatsby-theme-qurantine-wordpress/tailwind.config.js"
      )
    ),
    require("autoprefixer"),
  ],
});
