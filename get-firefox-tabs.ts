// Name: Get Firefox Tabs

import '@johnlindquist/kit';

let result = await applescript(`
use scripting additions
use framework "Foundation"

tell application "Firefox" to activate

-- get the tab title from FF
tell application "System Events" to tell process "firefox"
	set frontmost to true
	set the_title to name of windows's item 1
	set the_title to (do shell script "echo " & quoted form of the_title & " | tr '[' ' '")
	set the_title to (do shell script "echo " & quoted form of the_title & " | tr ']' ' '")
end tell

set thePasteboard to current application's NSPasteboard's generalPasteboard()
set theCount to thePasteboard's changeCount()

-- send cmd+l and cmd+c keystrokes to FF to highlight and copy the URL
tell application "System Events"
	keystroke "l" using {command down}
	delay 0.2
	keystroke "c" using {command down}
end tell

-- wait for the clipboard content change to have been detected
repeat 20 times
	if thePasteboard's changeCount() is not theCount then exit repeat
	delay 0.1
end repeat

-- get the clipboard contents
set the_url to the clipboard

return the_url as text

`);

inspect(result);
