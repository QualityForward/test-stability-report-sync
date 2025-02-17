# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Apply Dependabot updates

### Fixed

- Modified MagicPod format data formatting process
  - remove unnecessary object key in API integration

## [1.2.0] - 2024-10-08

### Added

- Add Parameter: `mabl-deploy-event`
  - Format the Data Obtained from the mabl Deployment Event and Integrate it into the QualityForward Automated Test Stability Report

### Fixed

- Modified MagicPod format data formatting process
  - Change the Item Used for Execution Time Calculation from `duration_seconds` to the Difference Between `finished_at` and `started_at`

## [1.1.0] - 2024-9-26

### Fixed

- Modified JUnit format data formatting process
  - If no test cycle name is specified, the action execution date and time (UTC) is now used instead.

### Changed

- Added processing to handle multiple file paths
  - Data formatting is performed for each file path, and then all data is combined and synced into the QualityForward automated test stability report.

## [1.0.0] - 2024-9-20

- Initial Release of the Automated Test Stability Report Sync Action
