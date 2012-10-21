# html2bemdecl

A simple tool for converting bem-friendly HTML files into bemdecl.js declarations

## Install

```bash
$ [sudo] npm install html2bemdecl [-g]
```

## Usage

```bash
$ html2bemdecl --help

Usage: html2bemdecl [options]

Options:

  -h, --help               output usage information
  -V, --version            output the version number
  -i, --input <filename>   Input HTML file
  -o, --output <filename>  Output BEMDECL
  -enc, --encoding         Input file encoding [encoding]

```

You must specify paths to input and output files. That's all!

NOTE: bem-friendly HTML means that all your bem classes start with b- l- or i- prefixes.