import {Application} from 'probot';
import {getTouchedSourceFilesRequireTests, getTouchedTestFiles} from './fileFilters';

export = (app: Application) => {
    // todo parse "- [x] covered by tests" - case insensitive
    // todo comment or reject review - based on settings
    // todo documentation as now.sh site
    // todo fix production mode

    app.on('pull_request.opened', async (context) => {
        const config = await context.config('tests_checker.yml', {
            comment: 'Could you please add tests to make sure this change works as expected?',
            fileExtensions: ['.php', '.ts', '.js'],
            testDir: 'tests',
        });

        const issue = context.issue();
        const files = await context.github.pullRequests.getFiles(issue);

        const sourceFilesRequireTests = getTouchedSourceFilesRequireTests(files.data, config.fileExtensions);

        if (sourceFilesRequireTests.length === 0) {
            context.log('PR does not have files that require tests. Skipping...');
            return;
        }

        const testFiles = getTouchedTestFiles(files.data, config.testDir);

        context.log('testFiles=', testFiles);

        if (testFiles.length === 0) {
            context.log('Adding a comment about tests.');
            context.github.pullRequests.createReview({
                ...issue,
                body: config.comment,
                event: 'REQUEST_CHANGES',
            });
        }
    });
};
