import Octokit from '@octokit/rest';

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
    testDir: string): Octokit.GetFilesResponseItem[] {
    return files.filter((file) => {
        return file.filename.indexOf(testDir) === 0;
    });
}
