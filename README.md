# hain-plugin-shortcut

Command-line shortcuts for [Hain](https://github.com/appetizermonster/hain).

![screenshot](https://raw.githubusercontent.com/e-/hain-plugin-shortcut/master/screenshot.png)

## Install

Type the following command in Hain:

```
/hpm install shortcut
```

## Setup

1. Open the preference window (enter "/preference")
2. Choose "hain-plugin-shortcut" on the left panel
2. Add shortcuts
	* Specify "(regex for an executable),(path to the executable)" in a line.
	* ```(^s.*),(C:\Program Files\Sublime Text 2\sublime_text.exe)```
	* ```(^c.*),(${SystemRoot}\\System32\\calc.exe)```
3. Type `/restart` to restart Hain



