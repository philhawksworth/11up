# 11up

![11up](https://user-images.githubusercontent.com/5865/104914612-51a29a80-5987-11eb-9937-068e425ef3b5.jpg "11up")

Quickly bootstrap 11ty sites from some basic templates.


## Project templates

The list of templates will slowly grow. Currently available via 11up:

- https://github.com/philhawksworth/11ty-scaffold-with-sass
- https://github.com/philhawksworth/11ty-with-serverless
- https://github.com/11ty/eleventy-base-blog


## Prerequisites

- [Node and npm](https://nodejs.org) - For running the command and using [11ty](https://11ty.dev)
- [Netlify CLI](https://github.com/netlify/cli) - For dev utilities like [serverless functions](https://www.netlify.com/products/functions/?utm_source=github&utm_medium=11up-pnh&utm_campaign=devex) on Netlify.

## Usage

No need to install this package, you can create a new site structure by using `npx`.

```npx 11up```

- Choose one of the starter templates (it's a short list for now)
- Create your new site in the current directory or create a new subdirectory
- That's it


![11up command](https://user-images.githubusercontent.com/5865/105028378-dd303000-5a48-11eb-9b03-35adecf20a6c.jpg "11up command")

![Choose template](https://user-images.githubusercontent.com/5865/105028403-e4efd480-5a48-11eb-8d67-4ad8a28fd7ee.jpg "Choose template")

![Set output location](https://user-images.githubusercontent.com/5865/105028427-eb7e4c00-5a48-11eb-8795-2dbd162db166.jpg "Set output location")

![New site scaffold created](https://user-images.githubusercontent.com/5865/105028434-ede0a600-5a48-11eb-8a93-3ab77661dfed.jpg "New site scaffold created")


### See more information about the templates

To discover more about the available templates you can see a listing of them along with links to their GitHub repositories via the list argument.

```npx 11up list```


## Updating for the latest version

To ensure you always use the latest templates, you can ask npm for the latest release as you execute `npx` like this:

```npx 11up@latest```


