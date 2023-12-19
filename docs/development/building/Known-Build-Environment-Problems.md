## Cygwin on Windows

### ccache

ccache 3.1.9 in Cygwin 2.874 is broken. Returns false cache hits. Do not install. Betaflight build system uses ccache if available.

### clang

Compiling the unittests using clang may fail on Cygwin. There is a version mismatch with Cygwin supplied \<sys/unistd.h> and clang. Not easily fixed, needs a Cygwin patch. Do not run unittests on Cygwin. The error looks like this:

```
/usr/include/sys/unistd.h:53:36: error: __block attribute not allowed, only allowed on local variables
void    _EXFUN(encrypt, (char *__block, int __edflag));
```

Using gcc works better with this particular problem, but fails in other places where clang is required.

## GNU ARM Toolchain Version

Using the 4.8-2014-q2 version of the [GNU ARM Toolchain](https://launchpad.net/gcc-arm-embedded/+download) with Windows/Cygwin (recommended on the Cleanflight "[Building in Windows.md](https://github.com/cleanflight/cleanflight/blob/master/docs/development/Building%20in%20Windows.md)" page) lead to strange results. (When running a 2.9.1 version of Betaflight I built on NAZE the change-flight-mode beep would constantly sound when in Horizon mode.) Updating the toolchain to 4.9-2015-q3 and rebuilding fixed the issue (and also cleared some compiler warnings). BorisB mentions the toolchain version [here](http://www.rcgroups.com/forums/showthread.php?p=34530653#post34530653).
Update 2/2017: The Windows/Cygwin 'make' requests toolchain version 6.2.1, gcc-arm-none-eabi-6_2-2016q4-20161216-win32, available here: https://developer.arm.com/open-source/gnu-toolchain/gnu-rm

## Running a 32-bit Tool chain on a 64-bit Linux system

The arm-sdk installation done from the new "make arm_sdk_install" command will install a 32-bit variant of the tool chain. This may fail to execute on a 64-bit Linux system, bash will say "No such file or directory", if no support for 32-bit 386 program are installed. To install this:

```
$ sudo dpkg --add-architecture i386
$ sudo apt-get update
$ sudo apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386
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

Betaflight has been updated to work with clang version 10 (12 on OS X) and will be the official supported (required) version from now on.
The `Makefile` has been updated to be compatible with this version to run the tests successfully.
`make test` depends on a specific `clang` compiler. The codebase and tools are updated to work with version 10 on Linux and version 12 on OS X.
Ubuntu 20.04 LTS and Windows Subsystem for Linux should work with clang version 7, 8 or 10.
OS X should support clang 7, 10 or 12. Install `clang` on Ubuntu (or Ubuntu using WSL) using:

```
$ sudo apt update
$ sudo apt install clang
```

## GLIBC issues on Alpine

Please see: [Apline wiki](https://wiki.alpinelinux.org/wiki/Running_glibc_programs)
