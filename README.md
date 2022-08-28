# NodeJS Console Utilities

NodeJS Console Utilities project is composed by a set of command line apps/scripts (batch executable files) designed to help with daily basis activities (e.g. zip.js) and bulk/recursive executions (e.g. `ffmpeg.js`). It also includes a useful library (`lib.js`), with lots of helpers for basic NodeJS operations, such as prompt/confirm questions and find files recursively. More details in the [Instructions to run](#instructions-to-run) section below.

It was implemented for didactic reasons, therefore it is not yet ready for production (see [Next steps](#next-steps) section below).

## Instructions to run:

1. Clone these files locally and change permissions to allow apps/scripts execution:

```
git checkout https://github.com/samereberlin/NodeJS-Console-Utilities.git
cd NodeJS-Console-Utilities
chmod +x *
```

2. Execute the command line apps/scripts according to your needs, e.g.:

    `./ffmpeg.js video.mp4` # encode the video.mp4 according to the interactively supplied options.

    `./ffmpeg.js path-to-dir` # same as above, but recursively into path-to-dir directory.

    `./imagemagick.js image.png` # encode the image.png according to the interactively supplied options.

    `./imagemagick.js path-to-dir` # same as above, but recursively into path-to-dir directory.

    `./zip.js path-to-dir` # compress the path-to-dir according to the interactively supplied options.

    `lib.js` is not an app/script itself, but a library instead, widely used by other apps/scripts included in the project.

## Next steps

The project still needs lots of adjustments to reach the production level, and the list below presents the main/urgent needs according to my feeling...

-   Include a command line option to use graphic mode (UI widgets) for user interactions (instead of the default console text mode).

-   Include a command line option to accept default options without interactive promoting (useful for task automation without interruptions).

-   Improve error messages, including instruction to run and app/script description (currently they describe the errors only).

-   Choose an i18n solution (currently it contains hard-coded english texts only).

-   Write unit-tests and/or end-to-end validations (to assure a good coverage before official release).

-   Besides of above suggestions, the project should have a larger variety of apps/scripts (currently we have good examples/templates for learning, but not enough for production).
