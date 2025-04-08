import Dotenv from "dotenv-webpack";

module.exports = {
  plugins: [new Dotenv(
    {
      systemvars: true,
      path: "./.env", // Path to .env file (this is the default)
    }
  )],
};
