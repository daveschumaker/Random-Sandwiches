# Sandwich E-book Generator
[NaNoGenMo 2017](https://github.com/NaNoGenMo/2017)

I stumbled upon [this interesting entry](https://github.com/lizadaly/a-physical-book) for the 2017 National Novel Generation Month and wanted to utilize the example book they provided for my own purposes.

This script parses text from a book published in 1909, entitled, "400 Ways to Make a Sandwich" and uses that data to build up a text corpus. Once this happens, we use the magical power of Markov chains to generate new sandwich recipes.

**I DO NOT RECOMMEND MAKING ANY OF THESE SANDWICHES!**
(But if you do, please tell me).

To run this script:

```
npm install
npm start
```

It will take a minute or so to run, but you will find the output available as an HTML file titled `random-sandwiches.html` in the `output` directory.

