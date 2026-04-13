const fs = require("fs");
const path = require("path");
const { getFileLoader } = require("./load_file_factory");
const { getTestResultFormatter } = require("./test_result_formatter_factory");
const { validateFileFormat } = require("./file_validation");
const { linkAutomatedTestStabilityReport } = require("./api_client");
const { getInputFiles } = require("./get_input_files");

async function linkTestResults(
  inputFilePath,
  testFramework,
  autoTestSuiteKey,
  autoTestCycleName,
  autoExecutionDeviceName,
  apiKey,
) {
  validateFileFormat(inputFilePath, testFramework);
  const inputFilePaths = await getInputFiles(inputFilePath);

  try {
    const formattedList = [];
    for (const filePath of inputFilePaths) {
      const fileProcessor = getFileLoader(
        path.extname(filePath),
        getTestResultFormatter(testFramework),
      );

      const data = await readFileAsync(filePath);
      let formattedData = await fileProcessor.format(data);
      formattedList.push(formattedData);
    }

    await processFormattedDataList(
      formattedList,
      apiKey,
      autoTestSuiteKey,
      autoTestCycleName,
      autoExecutionDeviceName,
    );
    console.log(
      "The integration of automated test results has been completed.",
    );
  } catch (error) {
    throw new Error(
      `The integration of automated test results has failed: ${error.message}`,
    );
  }
}

function readFileAsync(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(new Error(`Error reading file: ${err.message}`));
      } else {
        resolve(data);
      }
    });
  });
}

async function processFormattedDataList(
  formattedList,
  apiKey,
  autoTestSuiteKey,
  autoTestCycleName,
  autoExecutionDeviceName,
) {
  for (const formattedData of formattedList) {
    await linkAutomatedTestStabilityReport(
      formattedData,
      apiKey,
      autoTestSuiteKey,
      autoTestCycleName,
      autoExecutionDeviceName,
    );
  }
}
module.exports = { linkTestResults };
