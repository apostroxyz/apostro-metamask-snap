<h1 align="center">Apostro Snap</h1>
<p align="center"><img src='https://raw.githubusercontent.com/apostroxyz/apostro-metamask-snap/c2b121bd13c3dba4b0fdc8087f05934613c73eb7/packages/snap/images/logo.svg' alt='logo' /></p>

<p align="center">
<a href='https://www.apostro.xyz/'>Website</a>
•
<a href='https://explorer.apostro.xyz/'>App</a>
•
<a href='https://docs.apostro.xyz/'>Docs</a>
•
<a href='https://twitter.com/apostroxyz'>Twitter</a>
</p>

Apostro offers a straightforward way to check the credit ratings of lending protocols, helping you make informed investment decisions. It's a practical tool for anyone looking to understand and manage portfolio risks with ease. Whether you're a beginner or an experienced investor, Apostro guides you in identifying potential risks, ensuring smarter and safer investments.

<p align="center"><img src='https://raw.githubusercontent.com/apostroxyz/apostro-metamask-snap/main/images/tx-insight.png' alt='tx insight' /></p>

This repository contains Apostro Snap code and a frontend that connects to Snap.

MetaMask Snaps is a system that allows anyone to safely expand the capabilities of MetaMask. A snap is a program that we run in an isolated environment that can customize the wallet experience. For more details, see [the MetaMask documentation](https://docs.metamask.io/snaps/).

## Development

### Prerequisites

- ⚠️ **Snaps is pre-release software**. To interact with Snaps, you will need to install [MetaMask Flask](https://metamask.io/flask/).
- [Node.js](https://nodejs.org/en) 18.16.\* or later
- [Yarn](https://yarnpkg.com/) version 3

Set up the development environment:

```shell
yarn install && yarn start
```

Snap server: http://localhost:8080/

UI: http://localhost:8000/

#### Connection to @apostroxyz/metamask-snap

If you want to connect the frontend to the npm package `@apostroxyz/metamask-snap`, you should uncomment `SNAP_ORIGIN` variable in the `./packages/site/.env.development` file

#### Linting

Run `yarn lint` to run the linter, or run `yarn lint:fix` to run the linter and
fix any automatically fixable issues.

### Notes

- Scripts are disabled by default for security reasons. If you need to use NPM
  packages with scripts, you can run `yarn allow-scripts auto`, and enable the
  script in the `lavamoat.allowScripts` section of `package.json`.
  See the documentation for [@lavamoat/allow-scripts](https://github.com/LavaMoat/LavaMoat/tree/main/packages/allow-scripts) for more information.
