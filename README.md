# StoryGenerator - CBGA India's Budget Analysis Tool

|  Branch   | Build   | Coverage  |
|-----------|:-------:|:---------:|
|Development| [![Build Status development](https://travis-ci.org/cbgaindia/story-generator.svg?branch=development)](https://travis-ci.org/cbgaindia/story-generator) | [![Coverage Status](https://coveralls.io/repos/github/cbgaindia/story-generator/badge.svg?branch=development)](https://coveralls.io/github/cbgaindia/story-generator?branch=development) |
|Master     | [![Build Status](https://travis-ci.org/cbgaindia/story-generator.svg?branch=master)](https://travis-ci.org/cbgaindia/story-generator) | [![Coverage Status](https://coveralls.io/repos/github/cbgaindia/story-generator/badge.svg?branch=master)](https://coveralls.io/github/cbgaindia/story-generator?branch=master) |
|Production | [![Build Status](https://travis-ci.org/cbgaindia/story-generator.svg?branch=production)](https://travis-ci.org/cbgaindia/story-generator) | [![Coverage Status](https://coveralls.io/repos/github/cbgaindia/story-generator/badge.svg?branch=production)](https://coveralls.io/github/cbgaindia/story-generator?branch=production) |

## Getting Started

### Prerequisites
- NodeJS (v4.4.3) (prefer using [nodenv](https://github.com/nodenv/nodenv) or [nvm](https://github.com/creationix/nvm) to switch node versions)
- `Make` & `GNU Base Utilities` to run server, release and deploy scripts

### Tech Stack
- Frontend (serves the dashboard on github pages)
  - Browserify + BabelJS - to compose app 
  - ReactJS - modularize app in components and act as bare-bones web framework
  - Jest - testing framework for frontend
- Backend (serves the tooling for data transformation `./bin/transform`)
  - NodeJS + CSVParser - parses csv to json for better bucketing
  - Mocha - testing framework for backend

## Development Setup:
- `make shrinkwrap` (for OSX) or `make npm` (for Linux) to install project dependencies 
- `make tests` Run combined tests (backend + frontend)
  - For frontend tests, run `npm run assets-tests`
  - For backend tests, run `npm run tests`
- `make coverage` Run combined tests with coverage (backend + frontend)
  - For frontend tests, run `npm run assets-coverage`
  - For backend tests, run `npm run coverage`
- `make run` to run project on default server `localhost` on port `4001` [link](http://localhost:4001)

## Building
- `make local-release` to release locally & run it using `./bin/server`
- `make deploy` to do a production release directly on github-pages (make sure to run it from `production` branch)

## Contributing
- Fork and submit pull requests (standard GitHub OSS house rules)
- We follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript). Please run `make lint` locally
  before submitting a pull request and make sure that there are no warnings or errors.
- Thats it. _Happy Hacking!_

## Contributors
- [Navya B. Raju](https://github.com/navsie)
- [Noopur Varma](https://github.com/noopurvarma)
- [Ranjeet Singh](https://github.com/raeoks)
- [Suchismita Naik](https://github.com/SuchismitaNaik)
- [Teja Srivastav](https://github.com/tejasrivastav)
- [Chetana Amancharla](https://github.com/archetana)

_PS: We always try hard to improve this documentation. If you have any suggestions or contributions, please let us know._  
