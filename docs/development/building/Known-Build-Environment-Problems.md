## Cygwin on Windows

Don't do it. Use WSL :)

## GNU ARM Toolchain Version

To use the latest tool chain, simply run:

```
make arm_sdk_install
```

## Linking Unit Tests may fail.

When trying to build and run the unittests on Linux or WSL, you may encounter this problem:

```
linking ../../obj/test/alignsensor_unittest/alignsensor_unittest
/usr/bin/ld: cannot find -lBlocksRuntime
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```

Problem is a missing library, install it this way:

```
$ sudo apt-get install libblocksruntime-dev
```

## Compiling Unit Tests fails with errors

Betaflight has been updated to work with clang version 10 (12 on OS X) and will be the official supported (required) version from now on. The `Makefile` has been updated to be compatible with this version to run the tests successfully. `make test` depends on a specific `clang` compiler. The codebase and tools are updated to work with version 10 on Linux and version 12 on OS X. Ubuntu 20.04 LTS and Windows Subsystem for Linux should work with clang version 7, 8 or 10. OS X should support clang 7, 10 or 12. Install `clang` on Ubuntu (or Ubuntu using WSL) using:

```
$ sudo apt update
$ sudo apt install clang
```

## GLIBC issues on Alpine

Please see: [Apline wiki](https://wiki.alpinelinux.org/wiki/Running_glibc_programs)
