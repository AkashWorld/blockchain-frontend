## Prepare your editor

The editor of choice is [VSCode](https://code.visualstudio.com/) for its extensive support for JavaScript and TypeScript development. it is **strongly** suggested that you use it. Two **MUST HAVE** extensions for VSCode is ESLint and Prettier. ESLint catches errors and enforces policies for JavaScript code, and Prettier formats your code when you save to a standard format.

## Contributions

Before you push anything up, check that everything is working without errors:

1. Run the build scripts with

```
npm build
```

2. Start the application

```
npm start
```

3. Run all tests

```
npm test
```

## Working with Git

Then you are ready to submit a pull request (review). Every new change must go to a new branch:

```
git checkout -b BRANCH_NAME_HERE
```

Make sure you are on the right branch by typing the following command

```
git branch
```

Add all your changes

```
git add .
```

Make sure ONLY the files you intend to push are entered by checking the tracked files

```
git status
```

Finally, you must commit your changes (basically a snapshot of the repository state)

```
git commit -m "The change I made did ***"
```

If the build or tests fail, you will not be allowed to commit. Finally, push your changes up to github!

```
git push --set-upstream origin BRANCH_NAME_HERE
```
