# [6.0.0](https://github.com/sebbo2002/semantic-release-docker/compare/v5.0.4...v6.0.0) (2025-05-12)

### chore

- Drop node v18 support ([3e18405](https://github.com/sebbo2002/semantic-release-docker/commit/3e18405ac1e1be738a414623f97169c802567f99))

### BREAKING CHANGES

- Drop node.js v18 Support

This node.js version is no longer supported. For more information see https://nodejs.dev/en/about/releases/

## [5.0.4](https://github.com/sebbo2002/semantic-release-docker/compare/v5.0.3...v5.0.4) (2025-01-09)

### Bug Fixes

- **deps:** downgrade eslint to v9.13.0 to resolve typescript-eslint issue ([43aa6ca](https://github.com/sebbo2002/semantic-release-docker/commit/43aa6cacd0201891827c2a6f6e2dcf8cb64b3a86)), closes [#10353](https://github.com/sebbo2002/semantic-release-docker/issues/10353) [typescript-eslint/typescript-eslint#10353](https://github.com/typescript-eslint/typescript-eslint/issues/10353)

## [5.0.3](https://github.com/sebbo2002/semantic-release-docker/compare/v5.0.2...v5.0.3) (2024-11-15)

## [5.0.2](https://github.com/sebbo2002/semantic-release-docker/compare/v5.0.1...v5.0.2) (2024-10-24)

## [5.0.1](https://github.com/sebbo2002/semantic-release-docker/compare/v5.0.0...v5.0.1) (2024-09-11)

### Bug Fixes

- Fix tsup config / bundled modules ([92bfa4c](https://github.com/sebbo2002/semantic-release-docker/commit/92bfa4c97dc3196433f4764ab950d32e93c29e10))
- Try to fix `Dynamic require of "child_process" is not supported` ([94ceb4c](https://github.com/sebbo2002/semantic-release-docker/commit/94ceb4c204b7a2cba0b787bdd0fe6d43947a601f))
- Try to fix `Dynamic require of "child_process" is not supported` II ([96c4a29](https://github.com/sebbo2002/semantic-release-docker/commit/96c4a29a1ad77b4eeb4a13523cb7f5d7e5f5f99a))

# [5.0.0](https://github.com/sebbo2002/semantic-release-docker/compare/v4.0.3...v5.0.0) (2024-08-26)

### chore

- Drop support for node.js v19 and v21 ([2fff079](https://github.com/sebbo2002/semantic-release-docker/commit/2fff079040a377fbe9ecc340388f6a29b863cf80))

### BREAKING CHANGES

- Drop node.js v21 Support

These node.js versions are no longer supported. For more information see https://nodejs.dev/en/about/releases/

## [4.0.3](https://github.com/sebbo2002/semantic-release-docker/compare/v4.0.2...v4.0.3) (2024-08-03)

## [4.0.2](https://github.com/sebbo2002/semantic-release-docker/compare/v4.0.1...v4.0.2) (2023-10-25)

### Reverts

- Revert "ci: Downgrade is-semantic-release till it's fixed" ([91c2ab5](https://github.com/sebbo2002/semantic-release-docker/commit/91c2ab59d0559a060c11d07973382c465dd3345d))

## [4.0.2-develop.3](https://github.com/sebbo2002/semantic-release-docker/compare/v4.0.2-develop.2...v4.0.2-develop.3) (2023-09-18)

## [4.0.2-develop.2](https://github.com/sebbo2002/semantic-release-docker/compare/v4.0.2-develop.1...v4.0.2-develop.2) (2023-09-01)

## [4.0.2-develop.1](https://github.com/sebbo2002/semantic-release-docker/compare/v4.0.1...v4.0.2-develop.1) (2023-08-23)

### Reverts

- Revert "ci: Downgrade is-semantic-release till it's fixed" ([91c2ab5](https://github.com/sebbo2002/semantic-release-docker/commit/91c2ab59d0559a060c11d07973382c465dd3345d))

## [4.0.1](https://github.com/sebbo2002/semantic-release-docker/compare/v4.0.0...v4.0.1) (2023-08-17)

## [4.0.1-develop.1](https://github.com/sebbo2002/semantic-release-docker/compare/v4.0.0...v4.0.1-develop.1) (2023-08-03)

# [4.0.0](https://github.com/sebbo2002/semantic-release-docker/compare/v3.0.0...v4.0.0) (2023-06-14)

### Build System

- Deprecate node.js v14 / v17 ([7a2de45](https://github.com/sebbo2002/semantic-release-docker/commit/7a2de45c12f19a1ec441b3a004f4aa935efc197c))

### BREAKING CHANGES

- The node.js versions v14 and v17 are no longer maintained and are therefore no longer supported. See https://nodejs.dev/en/about/releases/ for more details on node.js release cycles.

# [4.0.0-develop.1](https://github.com/sebbo2002/semantic-release-docker/compare/v3.0.0...v4.0.0-develop.1) (2023-06-14)

### Build System

- Deprecate node.js v14 / v17 ([7a2de45](https://github.com/sebbo2002/semantic-release-docker/commit/7a2de45c12f19a1ec441b3a004f4aa935efc197c))

### BREAKING CHANGES

- The node.js versions v14 and v17 are no longer maintained and are therefore no longer supported. See https://nodejs.dev/en/about/releases/ for more details on node.js release cycles.

# [3.0.0](https://github.com/sebbo2002/semantic-release-docker/compare/v2.1.0...v3.0.0) (2023-03-31)

### Build System

- Deprecate node.js 12 ([426588b](https://github.com/sebbo2002/semantic-release-docker/commit/426588b4bb7bde2924bbc92006ca839e960872e1))

### BREAKING CHANGES

- From now on, only node.js ^14.8.0 || >=16.0.0 are supported

# [3.0.0-develop.2](https://github.com/sebbo2002/semantic-release-docker/compare/v3.0.0-develop.1...v3.0.0-develop.2) (2023-03-29)

# [3.0.0-develop.1](https://github.com/sebbo2002/semantic-release-docker/compare/v2.1.1-develop.1...v3.0.0-develop.1) (2023-02-12)

### Build System

- Deprecate node.js 12 ([426588b](https://github.com/sebbo2002/semantic-release-docker/commit/426588b4bb7bde2924bbc92006ca839e960872e1))

### BREAKING CHANGES

- From now on, only node.js ^14.8.0 || >=16.0.0 are supported

## [2.1.1-develop.1](https://github.com/sebbo2002/semantic-release-docker/compare/v2.1.0...v2.1.1-develop.1) (2022-12-04)

# [2.1.0](https://github.com/sebbo2002/semantic-release-docker/compare/v2.0.1...v2.1.0) (2022-10-18)

### Features

- Add regclient support for multi-OS images ([81d9031](https://github.com/sebbo2002/semantic-release-docker/commit/81d9031d1f686c926453b4ee7f68e0209d1eb35d))

# [2.1.0-develop.1](https://github.com/sebbo2002/semantic-release-docker/compare/v2.0.2-develop.1...v2.1.0-develop.1) (2022-10-14)

### Features

- Add regclient support for multi-OS images ([81d9031](https://github.com/sebbo2002/semantic-release-docker/commit/81d9031d1f686c926453b4ee7f68e0209d1eb35d))

## [2.0.2-develop.1](https://github.com/sebbo2002/semantic-release-docker/compare/v2.0.1...v2.0.2-develop.1) (2022-09-12)

## [2.0.1](https://github.com/sebbo2002/semantic-release-docker/compare/v2.0.0...v2.0.1) (2022-08-04)

### Bug Fixes

- Reverse ESM change ([a26ccc1](https://github.com/sebbo2002/semantic-release-docker/commit/a26ccc174dd8cf37ad9f45fd3a707f7ba5ff6401)), closes [#66](https://github.com/sebbo2002/semantic-release-docker/issues/66)

## [2.0.1-develop.2](https://github.com/sebbo2002/semantic-release-docker/compare/v2.0.1-develop.1...v2.0.1-develop.2) (2022-08-04)

## [2.0.1-develop.1](https://github.com/sebbo2002/semantic-release-docker/compare/v2.0.0...v2.0.1-develop.1) (2022-08-04)

### Bug Fixes

- Reverse ESM change ([a26ccc1](https://github.com/sebbo2002/semantic-release-docker/commit/a26ccc174dd8cf37ad9f45fd3a707f7ba5ff6401)), closes [#66](https://github.com/sebbo2002/semantic-release-docker/issues/66)

# [2.0.0](https://github.com/sebbo2002/semantic-release-docker/compare/v1.1.3...v2.0.0) (2022-07-25)

### Build System

- **deps:** Upgrade to execa 6.0 ([8654327](https://github.com/sebbo2002/semantic-release-docker/commit/8654327029acf5d3abd20c32d67aaca533dcaa44))
- Native ESM support ([7b86a4f](https://github.com/sebbo2002/semantic-release-docker/commit/7b86a4f1187c387a3a5792e1fb72d822b04e3631))

### BREAKING CHANGES

- **deps:** Only Support for node.js ^12.20.0 || >=14.13.1
- Only Support for node.js ^12.20.0 || >=14.13.1

# [2.0.0-develop.2](https://github.com/sebbo2002/semantic-release-docker/compare/v2.0.0-develop.1...v2.0.0-develop.2) (2022-06-28)

### Build System

- **deps:** Upgrade to execa 6.0 ([8654327](https://github.com/sebbo2002/semantic-release-docker/commit/8654327029acf5d3abd20c32d67aaca533dcaa44))

### BREAKING CHANGES

- **deps:** Only Support for node.js ^12.20.0 || >=14.13.1

# [2.0.0-develop.1](https://github.com/sebbo2002/semantic-release-docker/compare/v1.1.4-develop.1...v2.0.0-develop.1) (2022-06-28)

### Build System

- Native ESM support ([7b86a4f](https://github.com/sebbo2002/semantic-release-docker/commit/7b86a4f1187c387a3a5792e1fb72d822b04e3631))

### BREAKING CHANGES

- Only Support for node.js ^12.20.0 || >=14.13.1

## [1.1.4-develop.1](https://github.com/sebbo2002/semantic-release-docker/compare/v1.1.3...v1.1.4-develop.1) (2022-06-09)

## [1.1.3](https://github.com/sebbo2002/semantic-release-docker/compare/v1.1.2...v1.1.3) (2022-05-14)

## [1.1.3-develop.3](https://github.com/sebbo2002/semantic-release-docker/compare/v1.1.3-develop.2...v1.1.3-develop.3) (2022-05-13)

## [1.1.3-develop.2](https://github.com/sebbo2002/semantic-release-docker/compare/v1.1.3-develop.1...v1.1.3-develop.2) (2022-05-03)

## [1.1.3-develop.1](https://github.com/sebbo2002/semantic-release-docker/compare/v1.1.2...v1.1.3-develop.1) (2022-05-01)

## [1.1.2](https://github.com/sebbo2002/semantic-release-docker/compare/v1.1.1...v1.1.2) (2022-04-25)

## [1.1.2-develop.1](https://github.com/sebbo2002/semantic-release-docker/compare/v1.1.1...v1.1.2-develop.1) (2022-04-25)

## [1.1.1](https://github.com/sebbo2002/semantic-release-docker/compare/v1.1.0...v1.1.1) (2022-03-31)

## [1.1.1-develop.2](https://github.com/sebbo2002/semantic-release-docker/compare/v1.1.1-develop.1...v1.1.1-develop.2) (2022-03-31)

## [1.1.1-develop.1](https://github.com/sebbo2002/semantic-release-docker/compare/v1.1.0...v1.1.1-develop.1) (2022-03-31)

# [1.1.0](https://github.com/sebbo2002/semantic-release-docker/compare/v1.0.1...v1.1.0) (2022-01-12)

### Features

- generate meaningful links for the published container ([c4fef0f](https://github.com/sebbo2002/semantic-release-docker/commit/c4fef0f25e3d1df4629370321afcf9c11c1dc787))

# [1.1.0-develop.1](https://github.com/sebbo2002/semantic-release-docker/compare/v1.0.1...v1.1.0-develop.1) (2022-01-12)

### Features

- generate meaningful links for the published container ([c4fef0f](https://github.com/sebbo2002/semantic-release-docker/commit/c4fef0f25e3d1df4629370321afcf9c11c1dc787))

## [1.0.1](https://github.com/sebbo2002/semantic-release-docker/compare/v1.0.0...v1.0.1) (2021-12-13)

### Bug Fixes

- **CI:** Fix DockerHub container release ([01b7534](https://github.com/sebbo2002/semantic-release-docker/commit/01b753406d1f1ef24a949c7d7b946d99b779d013))

## [1.0.1-develop.2](https://github.com/sebbo2002/semantic-release-docker/compare/v1.0.1-develop.1...v1.0.1-develop.2) (2021-12-06)

### Bug Fixes

- **CI:** Fix DockerHub container release ([01b7534](https://github.com/sebbo2002/semantic-release-docker/commit/01b753406d1f1ef24a949c7d7b946d99b779d013))

## [1.0.1-develop.1](https://github.com/sebbo2002/semantic-release-docker/compare/v1.0.0...v1.0.1-develop.1) (2021-11-05)

# 1.0.0 (2021-08-03)

### chore

- Remove node.js 10 Support ([2b910c0](https://github.com/sebbo2002/semantic-release-docker/commit/2b910c09bc8a41085fc4472159494d8738d5521e))

### Features

- first commit ([c266619](https://github.com/sebbo2002/semantic-release-docker/commit/c266619159154233be9b24412745bb134564962f))
- Return release info after successful release ([139345d](https://github.com/sebbo2002/semantic-release-docker/commit/139345dfdd08ff258efc97da5fb6ec52d7a2c8b6))

### BREAKING CHANGES

- Removed support for node.js v10

# [1.0.0-develop.2](https://github.com/sebbo2002/semantic-release-docker/compare/v1.0.0-develop.1...v1.0.0-develop.2) (2021-08-03)

### Features

- Return release info after successful release ([139345d](https://github.com/sebbo2002/semantic-release-docker/commit/139345dfdd08ff258efc97da5fb6ec52d7a2c8b6))

# 1.0.0-develop.1 (2021-07-26)

### chore

- Remove node.js 10 Support ([2b910c0](https://github.com/sebbo2002/semantic-release-docker/commit/2b910c09bc8a41085fc4472159494d8738d5521e))

### Features

- first commit ([c266619](https://github.com/sebbo2002/semantic-release-docker/commit/c266619159154233be9b24412745bb134564962f))

### BREAKING CHANGES

- Removed support for node.js v10
