## Cygwin on Windows

Cygwin on Windows is no longer supported. Use Windows Subsystem for Linux (WSL) instead.

## GNU ARM Toolchain Version

To install or update the GNU Arm Embedded Toolchain, run:

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
$ sudo apt install libblocksruntime-dev
```

## Compiling Unit Tests fails with errors

Betaflight has been updated to work with recent clang version 18 and will be the official supported (required) version from now on. The `Makefile` has been updated to be compatible with this version to run the tests successfully. `make test` depends on a specific `clang` compiler. The codebase and tools are updated to work with version 18. Ubuntu 24.04 LTS (including on the Windows Subsystem for Linux) should work with the installed clang version. Install `clang` on Ubuntu (including on WSL) using:

```
$ sudo apt update
$ sudo apt install clang
```

## GLIBC issues on Alpine

Please see: [Alpine wiki](https://wiki.alpinelinux.org/wiki/Running_glibc_programs)
