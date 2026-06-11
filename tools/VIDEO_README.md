Transcode videos and update markup

1) Install ffmpeg and make it available on PATH.

2) Run the PowerShell script from the workspace root (adjust params if needed):

```powershell
cd "c:\Users\Peris Nyawira W\Downloads\wangeshis website"
.\tools\transcode_videos.ps1 -SrcDir "New folder" -OutDir "dist/videos" -WidthLarge 720 -WidthSmall 480 -CRFMp4 23 -CRFWebm 30
```

3) After the script finishes, you'll have MP4 and WebM variants in `dist/videos`.

4) I can automatically update `index.html` to point reel `<video>` sources to the generated files (and add `poster` images). Reply "update HTML" and I'll patch the markup to reference the new files.
