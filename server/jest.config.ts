import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      diagnostics: { warnOnly: true },
      tsconfig: "./tsconfig.json"
    }
  }
};

export default config;
