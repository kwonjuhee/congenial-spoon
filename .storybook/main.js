import path from "path";
import { VanillaExtractPlugin } from "@vanilla-extract/webpack-plugin";

const config = {
  stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "..");

    const imageRule = config.module.rules.find((rule) => rule.test && rule.test.test(".svg"));
    imageRule.exclude = /.svg$/;

    config.module.rules.push({
      test: /.svg$/,
      use: ["@svgr/webpack"],
    });

    config.plugins.push(new VanillaExtractPlugin());

    return config;
  },
};
export default config;
