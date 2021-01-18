# 11up

![11up](https://user-images.githubusercontent.com/5865/104914612-51a29a80-5987-11eb-9937-068e425ef3b5.jpg "11up")

Quickly bootstrap 11ty sites from some basic templates.


## Project templates

The list of templates will slowly grow. Currently available via 11up:

- https://github.com/philhawksworth/11ty-scaffold-with-sass
- https://github.com/philhawksworth/11ty-with-serverless


## Prerequisites

- [Node and npm](https://nodejs.org) - For running the command and using [11ty](https://11ty.dev)
- [Netlify CLI](https://github.com/netlify/cli) - For dev utilities like [serverless functions](https://www.netlify.com/products/functions/?utm_source=github&utm_medium=11up-pnh&utm_campaign=devex) on Netlify.

## Usage

No need to install this package, you can create a new site structure by using `npx`.

`npx 11up`

- Choose one of the starter templates (it's a short list for now)
- Create your new site in the current directory or create a new subdirectory
- That's it


![11up command](https://user-images.githubusercontent.com/5865/104914515-2ddf5480-5987-11eb-900d-64845871ed2e.jpg "11up command")

![Choose template](https://user-images.githubusercontent.com/5865/104914537-320b7200-5987-11eb-8878-c6c63d89d3bc.jpg "Choose template")

![Set output location](https://user-images.githubusercontent.com/5865/104914528-30da4500-5987-11eb-9cad-6933d75a0b02.jpg "Set output location")

![New site scaffold created](https://user-images.githubusercontent.com/5865/104914521-2fa91800-5987-11eb-9a2a-12ef92c93ae6.jpg "New site scaffold created")


## Updating for the latest version

To ensure you always use the latest templates, you can ask npm for the latest release as you execute `npx` like this:

`npx 11up@latest`
