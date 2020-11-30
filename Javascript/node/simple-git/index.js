const simpleGit = require("simple-git");

!(async () => {
  const remote = {
    name: "simple",
    repo: "https://github.com/steveukx/git-js.git",
  };

  const git = simpleGit("repo");

  git.outputHandler((bin, stdOut, stdErr) => {
    let totalProgress = 0;
    let previousProgress = 0;
    let progress = 0;

    stdErr.on("data", (line) => {
      if (line) {
        let match = null;

        if ((match = /Counting objects:\s*(\d+)%/i.exec(line))) {
          totalProgress = Math.floor(parseInt(match[1]) * 0.1);
        } else if ((match = /Compressing objects:\s*(\d+)%/i.exec(line))) {
          totalProgress = 10 + Math.floor(parseInt(match[1]) * 0.1);
        } else if ((match = /Receiving objects:\s*(\d+)%/i.exec(line))) {
          totalProgress = 20 + Math.floor(parseInt(match[1]) * 0.4);
        } else if ((match = /Resolving deltas:\s*(\d+)%/i.exec(line))) {
          totalProgress = 60 + Math.floor(parseInt(match[1]) * 0.4);
        }

        if (totalProgress !== previousProgress) {
          progress += totalProgress - previousProgress;
          previousProgress = totalProgress;
          console.log(`${progress}%`);
        }
      }
    });
  });

  try {
    await git.clone(remote.repo, ["--progress", "--verbose"]);
  } catch (e) {
    // handle clone error
    console.log(e)
  }
})();
