const { exec, execSync, spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const utils = require("util");

const execAsync = utils.promisify(exec);

const user = "amagiddmxh";
const repo = "project-manager";
const currentDir = path.resolve(__dirname, "");

const main = async () => {
  if (fs.existsSync(`./${repo}`)) {
    console.log("removing repo", repo);
    await execAsync(`rm -rf ${repo}`, { stdio: [0, 1, 2], cwd: currentDir });
  }

  const url = `https://github.com/${user}/${repo}`;
  const git = spawn("git", [`clone`, url, "--progress"]);

  git.stdout.on("data", (data) => {
    console.log(`stdout: `, data);
  });

  let totalProgress = 0;
  let previousProgress = 0;
  let progress = 0

  git.stderr.on("data", (line) => {
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
      console.log(`${progress}%`);
      previousProgress = totalProgress;
    }
  });

  git.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });

  process.once("SIGTERM", function () {
    process.exit(0);
  });
  process.once("SIGTERM", function () {
    process.exit(0);
  });
  process.once("exit", function () {
    if (git) {
      git.kill();
    }
  });
};

main();
