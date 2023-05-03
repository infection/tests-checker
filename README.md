> **Warning**
> 
> This GitHub App has been deprecated in favor of GitHub Action with the same functionality: https://github.com/infection/tests-checker-action

[![Build Status](https://travis-ci.org/infection/tests-checker.svg?branch=master)](https://travis-ci.org/infection/tests-checker)

# Tests Checker

To install this bot to your Open Sourced project:

* open https://github.com/apps/tests-checker
* click "Install"
* choose the repository you want to install `tests-checker` to

<img width="990" alt="tests-checker" src="https://user-images.githubusercontent.com/3725595/45590526-b7f3fa00-b942-11e8-972d-143c0b367017.png">


## Settings

You can configure bot by adding `.github/tests_checker.yml` file to the repository and override any of the settings listed below.

Default values are:

```yaml
comment: 'Could you please add tests to make sure this change works as expected?',
fileExtensions: ['.php', '.ts', '.js', '.c', '.cs', '.cpp', '.rb', '.java']
testDir: 'tests'
testPattern: ''
```

where

* `comment` - a text that bot will post when it won't find tests in the PR
* `fileExtensions` - extensions of the files that should be treated as a `source code`. Bot will do nothing if you just updating `README.md` because usually no tests are required to cover such change.
* `testDir` - folder, where tests are located. Make sure to set it correctly, otherwise bot will not be able to understand whether the test file was added or not.
* `testPattern` - a shell glob pattern that should match test files. For example, you can set it to `testPattern: *_test.go` and Bot will be able to understand, that added test has this pattern instead of located in `testDir`. `testDir` and `testPattern` are alternatives, however can be used together.

Both `testDir` and `testPattern` may be specified in a custom configuration, both settings will be used to locate test files.
If you want to change any of the settings, just add `.github/tests_checker.yml`:

```yaml
testDir: app-tests
```

If you don't want to change anything, you can skip creating this file.

## Setup

This is needed if you want to deploy this bot to your server or want to contribute to it.
Please note, that `tests-checker` is ready to use.
You just need to install Github Application as mentioned in above.

```sh
# Install dependencies
npm install

# Run typescript
npm run build

# Run the bot for production or
npm start

# for development
npm run dev
```

## Deploy

Install `now`:

`npm install -g now`

Deploy:

```bash
now -e APP_ID=17064 \
    -e WEBHOOK_SECRET=XXX \
    -e PRIVATE_KEY_BASE64="$(cat ./key.pem | base64)"
```

See `WEBHOOK_SECRET` on GitHub app: https://github.com/settings/apps/tests-checker.

Set a permanent alias for the new deployed application URL:

```bash
now alias set https://tests-checker-XYZ.now.sh https://tests-checker.now.sh
```

### Debugging `now.sh`

* `now ls tests-checker`
* `now inspect tests-checker.now.sh`
* `now rm tests-checker-qkkyxnelyo.now.sh` to free some instances available for OSS plan

## Contributing

If you have suggestions for how `tests-checker` could be improved, or want to report a bug, open an issue!
We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

> A GitHub App built with [Probot](https://github.com/probot/probot) that require writing tests in Pull Requests.

# Developing

1. Read https://probot.github.io/docs/development/#manually-configuring-a-github-app and configure `smee`
2. add generated `smee` URL to `.env` - `WEBHOOK_PROXY_URL` variable, and to github app: https://github.com/settings/apps/tests-checker-dev
3. Open terminal 1 and run `smee -u https://smee.io/xxx`
4. open terminal 2 and run `npm start`
5. now bot is ready to work from the local machine! 

## License

[ISC](LICENSE) © 2018 Maks Rafalko <maks.rafalko@gmail.com> (https://github.com/infection/tests-checker)
