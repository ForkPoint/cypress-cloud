import { expect } from "@jest/globals";
import { run } from "cypress";
import { ValidatedCurrentsParameters } from "cypress-cloud/types";
import { runSpecFile } from "../cypress";
jest.mock("cypress", () => ({
  run: jest.fn(),
}));

const defaultOptions: ValidatedCurrentsParameters = {
  projectId: "some",
  cloudServiceUrl: "https://cloud.cypress.io",
  batchSize: 1,
  testingType: "e2e",
  recordKey: "some",
};
describe("runSpecFile", () => {
  it("should set record to false", () => {
    (run as jest.Mock).mockResolvedValue({});

    runSpecFile(
      {
        spec: "cypress/integration/test.spec.js",
      },
      defaultOptions
    );

    expect(run).toHaveBeenCalledWith(
      expect.objectContaining({
        record: false,
      })
    );
  });

  it("should set env", () => {
    (run as jest.Mock).mockResolvedValue({});

    runSpecFile(
      {
        spec: "cypress/integration/test.spec.js",
      },

      {
        ...defaultOptions,
        env: {
          foo: "bar",
        },
      }
    );

    expect(run).toHaveBeenCalledWith(
      expect.objectContaining({
        env: {
          currents_ws: true,
          foo: "bar",
        },
      })
    );
  });

  it("should set config", () => {
    (run as jest.Mock).mockResolvedValue({});

    runSpecFile(
      {
        spec: "cypress/integration/test.spec.js",
      },

      {
        ...defaultOptions,
        config: {
          reporter: "junit",
        },
      }
    );

    expect(run).toHaveBeenCalledWith(
      expect.objectContaining({
        config: {
          trashAssetsBeforeRuns: false,
          reporter: "junit",
        },
      })
    );
  });
});
