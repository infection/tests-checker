import Octokit from '@octokit/rest';
import {getTouchedSourceFilesRequireTests, getTouchedTestFiles} from '../src/fileFilters';

test('getTouchedSourceFilesRequireTests should filter out files by file extensions', () => {
    const files = [
        {filename: 'README.md'} as Octokit.GetFilesResponseItem,
        {filename: 'foo.php'} as Octokit.GetFilesResponseItem,
        {filename: 'bar.ts'} as Octokit.GetFilesResponseItem,
    ];
    const extensions = ['.php'];

    const filteredFiles = getTouchedSourceFilesRequireTests(files, extensions);

    expect(filteredFiles.length).toBe(1);
    expect(filteredFiles[0].filename).toBe('foo.php');
});

test('getTouchedTestFiles should return test files from the list of different files', () => {
    const files = [
        {filename: 'README.md'} as Octokit.GetFilesResponseItem,
        {filename: 'foo.php'} as Octokit.GetFilesResponseItem,
        {filename: 'lib/tests/bar1.ts'} as Octokit.GetFilesResponseItem,
        {filename: 'lib/tests/foo1.ts'} as Octokit.GetFilesResponseItem,
        {filename: 'lib/testsxxx/bar2.ts'} as Octokit.GetFilesResponseItem,
        {filename: 'a/test/bar3.ts'} as Octokit.GetFilesResponseItem,
        {filename: 'a/tests/bar4.ts'} as Octokit.GetFilesResponseItem,
    ];

    const filteredFiles = getTouchedTestFiles(files, 'lib/tests');

    expect(filteredFiles.length).toBe(2);
    expect(filteredFiles[0].filename).toBe('lib/tests/bar1.ts');
    expect(filteredFiles[1].filename).toBe('lib/tests/foo1.ts');
});
