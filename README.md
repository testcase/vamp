# vamp
This package was created using the Min-DevKit for Max, an API and supporting tools for writing externals in modern C++.
It also utilizes the [vamp-plugin-sdk](https://github.com/c4dm/vamp-plugin-sdk). You can read more about vamp plugins [here.](https://www.vamp-plugins.org)



## Prerequisites

You will need a compiler:

* On the Mac this means **Xcode 9 or later** (you can get from the App Store for free). 
* On Windows this means **Visual Studio 2017** (you can download a free version from Microsoft). The installer for Visual Studio 2017 offers an option to install Git, which you should choose to do.


You will also need to install a recent version of [CMake](https://cmake.org/download/) (version 3.19 or higher).

## Building

0. Clone this repo **into Max's Packages folder**. 
   Make sure you clone recursively so that all sub-modules are properly initiated : `git clone https://github.com/testcase/vamp.git --recursive`
1. In the Terminal or Console app of your choice, change directories (cd) into the vamp folder you cloned/installed in step 0.
2. `mkdir build` to create a folder with your various build files
3. `cd build` to put yourself into that folder
4. Now you can generate the projects for your choosen build environment:

### Mac 

Run `cmake -G Xcode ..`

Next run `cmake --build .` or open the Xcode project from this "build" folder and use the GUI.

Note: you can add the `-j4` option where "4" is the number of cores to use.  This can help to speed up your builds, though sometimes the error output is interleaved in such a way as to make troubleshooting more difficult.

If you are running on a Mac M1 machine, you will likely see an error `cannot be loaded due to system security policy` when loading your externals in Max. To resolve this, you can ad-hoc codesign your external with `codesign --force --deep -s - myobject.mxo`.

### Windows

You can run `cmake --help` to get a list of the options available.  Assuming some version of Visual Studio 2019, the commands to generate the projects will look like this: 

`cmake -G "Visual Studio 16 2019" ..`

Or using Visual Studio 2017 it will look like this:

`cmake -G "Visual Studio 15 2017 Win64" ..`

Having generated the projects, you can now build by opening the .sln file in the build folder with the Visual Studio app (just double-click the .sln file) or you can build on the command line like this:

`cmake --build . --config Release`

## Contributors / Acknowledgements

Todd Ingalls testcase@asu.edu

## Support

For support, please contact the developer of this package. 
