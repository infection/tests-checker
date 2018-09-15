# Tests Checker

To install this bot to your Open Sourced project:

* open https://github.com/apps/tests-checker
* click "Install"
* add it to your project

## Settings

You can configure bot by adding `.github/tests_checker.yml` file to the repository and override any of the settings listed below.

Default values are:

```yaml
comment: 'Could you please add tests to make sure this change works as expected?',
fileExtensions: ['.php', '.ts', '.js']
testDir: 'tests'
```

If you want to change only directory where the tests are placed, just add `.github/tests_checker.yml`:

```yaml
testDir: app-tests
```

If you don't want to change anything, this files should not be created.

## Setup

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

Set a permanent alias for the new deployed application URL:

```bash
now alias set https://tests-checker-XYZ.now.sh https://tests-checker.now.sh
``` 

### Debugging `now.sh`

* `now ls tests-checker`
* `now inspect tests-checker.now.sh`
* `now rm tests-checker-qkkyxnelyo.now.sh` to free some instances available for OSS plan

## Contributing

If you have suggestions for how Botest could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

> A GitHub App built with [Probot](https://github.com/probot/probot) that require writing tests in Pull Requests.

## License

[ISC](LICENSE) © 2018 Maks Rafalko <maks.rafalko@gmail.com> (https://github.com/infection/tests-checker)
