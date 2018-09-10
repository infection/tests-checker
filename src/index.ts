import {Application} from 'probot'
import {getChangedSourceFilesRequireTests, getTouchedTestFiles} from './fileFilters';

export = (app: Application) => {

    // todo remove 'reopened' event in app.on()
    // todo parse "- [x] covered by tests" - case insensitive
    // todo comment or reject review - based on settings
    // todo documentation as now.sh site

    app.on(['pull_request.opened', 'pull_request.reopened'], async (context) => {
        const config = await context.config('tests_checker.yml', {
            fileExtensions: ['.php', '.ts', '.js'],
            testDir: 'tests',
            comment: 'Could you please add tests to make sure this change works as expected?'
        });

        const issue = context.issue();
        const files = await context.github.pullRequests.getFiles(issue);

        context.log('files.data=', files.data); // todo remove

        const sourceFilesRequireTests = getChangedSourceFilesRequireTests(files.data, config.fileExtensions);

        context.log('sourceFilesRequireTests=', sourceFilesRequireTests); // todo remove

        if (sourceFilesRequireTests.length === 0) {
            context.log('PR does not have files that require tests. Skipping...');
            return;
        }

        const testFiles = getTouchedTestFiles(files.data, config.testDir)

        context.log('testFiles=', testFiles);

        if (testFiles.length === 0) {
            context.log('Adding a comment about tests.');
            context.github.pullRequests.createReview({
                ...issue,
                event: 'REQUEST_CHANGES',
                body: config.comment
            });
        }
    });
}
