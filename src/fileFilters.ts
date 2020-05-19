import Octokit from '@octokit/rest';
import minimatch = require('minimatch');

export function getTouchedSourceFilesRequireTests(
    files: Octokit.GetFilesResponseItem[],
    fileExtensions: string[]): Octokit.GetFilesResponseItem[] {
    return files.filter((file) => {
        return fileExtensions.find((fileExtension: string) => {
            return file.filename.substr(-fileExtension.length) === fileExtension;
        });
    });
}

export function getTouchedTestFiles(
    files: Octokit.GetFilesResponseItem[],
    testDir: string,
    testPattern: string): Octokit.GetFilesResponseItem[] {

    let filtered: Octokit.GetFilesResponseItem[] = [];

    if (testDir) {
        filtered = files.filter((file) => {
            return file.filename.indexOf(testDir + '/') === 0;
        });
    }
    if (testPattern) {
        filtered = filtered.concat(files.filter((file) => {
            return minimatch(file.filename, testPattern);
        }));
    }
    return filtered;
}
