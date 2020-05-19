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
        {filename: 'test_test.ts'} as Octokit.GetFilesResponseItem,
    ];

    const filteredFilesTestDir = getTouchedTestFiles(files, 'lib/tests', '');
    expect(filteredFilesTestDir.length).toBe(2);
    expect(filteredFilesTestDir[0].filename).toBe('lib/tests/bar1.ts');
    expect(filteredFilesTestDir[1].filename).toBe('lib/tests/foo1.ts');

    const filteredFilesTestPatternSimple = getTouchedTestFiles(files, '', '*_test.ts');
    expect(filteredFilesTestPatternSimple.length).toBe(1);
    expect(filteredFilesTestPatternSimple[0].filename).toBe('test_test.ts');

    const filteredFilesTestPatternSubdir = getTouchedTestFiles(files, '', '*/test/*.ts');
    expect(filteredFilesTestPatternSubdir.length).toBe(1);
    expect(filteredFilesTestPatternSubdir[0].filename).toBe('a/test/bar3.ts');

    const filteredFilesTestPatternAllInTests = getTouchedTestFiles(files, '', '**/tests/*.ts');
    expect(filteredFilesTestPatternAllInTests.length).toBe(3);
    expect(filteredFilesTestPatternAllInTests[0].filename).toBe('lib/tests/bar1.ts');
    expect(filteredFilesTestPatternAllInTests[1].filename).toBe('lib/tests/foo1.ts');
    expect(filteredFilesTestPatternAllInTests[2].filename).toBe('a/tests/bar4.ts');

    const filteredFilesTestBothDirAndPattern = getTouchedTestFiles(files, 'lib/testsxxx', '**/tests/*.ts');
    expect(filteredFilesTestBothDirAndPattern.length).toBe(4);
    expect(filteredFilesTestBothDirAndPattern[0].filename).toBe('lib/testsxxx/bar2.ts');
    expect(filteredFilesTestBothDirAndPattern[1].filename).toBe('lib/tests/bar1.ts');
    expect(filteredFilesTestBothDirAndPattern[2].filename).toBe('lib/tests/foo1.ts');
    expect(filteredFilesTestBothDirAndPattern[3].filename).toBe('a/tests/bar4.ts');
});
