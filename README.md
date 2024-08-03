


## How to create the project
$ npm install -y

$ vi package.json

## Installing TypeScript
$ npm i -D typescript @types/express @types/node
$ npm i --save-dev @types/morgan

this add this block in the package.json 

 "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^22.0.2",
    "typescript": "^5.5.4"
  }

  ## Generating tsconfig.json
  $ npx tsc --init

  $ vi tsconfig.json 

  {
  "compilerOptions": {
    ...
    "outDir": "./dist"   <<<<<<
    ...
  }
}