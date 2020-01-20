# Task Result

## Used technologies / Frameworks

I use the following technologies / frameworks in my project:

- JavaScript / jQuery
- HTML, CSS.

I chose these technologies because they are the most used on the frontend side as they allow you to create a basic interface as required, and also they are the ones I am most confident using. Also, jQuery allow to build certain functionalities more easily than vanilla JavaScript, like listening to certain changes on the document and executing a function once that happens.

## Used 3rd Party Libraries

I use the following 3rd party libraries in my project: 

Name | Reason
--- | ---
[Bootstrap](https://getbootstrap.com/) | To help style the page more easily, especially the alignment on the page and styling of the buttons and canvas

Because I have not previously worked with the canvas and found it relatively hard to understand at first, I started off with an already built meme generator, to which I made modifications and fixed some bugs. The code is mostly commented to help with understanding both for me as I will go back to it in the future and add more functionalities to it, but also for someone that wants to use it in the future. 
Here is the link to the meme generator I built off from:
    https://anexia.com/blog/en/meme-generator-with-jquery-and-canvas/
## Installation / Run

Describe how we can check your project locally.
---

The following components must be installed locally:

  There is a minor issue regarding downloading the template image posted on the page at the beginning. It will not allow you to download the image because of the tainted canvas and/or CORS policy if I try to add the crossorigin="anonymous" property to the image tag. 
   Once you upload an image of your own and dowload it, there should not be any problem.
   
   A workaround this issue is to run the project on a local server. I have used the "Live Server" extension for Visual Studio Code which did the trick.
   
   https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
   

To run the project locally, enter the following in the command line / bash:

```console
$ git init
$ git clone https://github.com/elenaman/meme_generator.git
$ cd meme_generator
```
---
