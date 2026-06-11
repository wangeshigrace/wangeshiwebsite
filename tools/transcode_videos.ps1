# Transcode MP4/MOV videos in a source folder to multiple sizes and WebM variants.
# Requires ffmpeg on PATH. Produces outputs in dist/videos by default.

param(
  [string]$SrcDir = "New folder",
  [string]$OutDir = "dist/videos",
  [int]$WidthLarge = 720,
  [int]$WidthSmall = 480,
  [int]$CRFMp4 = 23,
  [int]$CRFWebm = 30
)

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  Write-Error "ffmpeg not found in PATH. Install ffmpeg and retry."
  exit 1
}

$srcPath = Join-Path -Path (Get-Location) -ChildPath $SrcDir
$outPath = Join-Path -Path (Get-Location) -ChildPath $OutDir

if (-not (Test-Path $srcPath)) {
  Write-Error "Source directory not found: $srcPath"
  exit 1
}

New-Item -ItemType Directory -Force -Path $outPath | Out-Null

$files = Get-ChildItem -Path $srcPath -Include *.mp4,*.mov -File -Recurse
if ($files.Count -eq 0) {
  Write-Host "No video files found in $srcPath"
  exit 0
}

foreach ($f in $files) {
  $base = [IO.Path]::GetFileNameWithoutExtension($f.Name)
  $safeBase = $base -replace '\s','_' -replace '[^A-Za-z0-9_\-]',''

  $inFile = $f.FullName
  $outMp4Large = Join-Path $outPath "${safeBase}_${WidthLarge}p.mp4"
  $outMp4Small = Join-Path $outPath "${safeBase}_${WidthSmall}p.mp4"
  $outWebmLarge = Join-Path $outPath "${safeBase}_${WidthLarge}p.webm"
  $outWebmSmall = Join-Path $outPath "${safeBase}_${WidthSmall}p.webm"

  Write-Host "Transcoding $($f.Name) -> $outMp4Large, $outMp4Small, $outWebmLarge, $outWebmSmall"

  ffmpeg -y -i "$inFile" -vf "scale='min($WidthLarge,iw)':-2" -c:v libx264 -crf $CRFMp4 -preset medium -c:a aac -b:a 128k -movflags +faststart "$outMp4Large"
  ffmpeg -y -i "$inFile" -vf "scale='min($WidthSmall,iw)':-2" -c:v libx264 -crf $CRFMp4 -preset medium -c:a aac -b:a 96k -movflags +faststart "$outMp4Small"

  ffmpeg -y -i "$inFile" -vf "scale='min($WidthLarge,iw)':-2" -c:v libvpx-vp9 -b:v 0 -crf $CRFWebm -c:a libopus "$outWebmLarge"
  ffmpeg -y -i "$inFile" -vf "scale='min($WidthSmall,iw)':-2" -c:v libvpx-vp9 -b:v 0 -crf $CRFWebm -c:a libopus "$outWebmSmall"
}

Write-Host "Done. Transcoded files are in $outPath"
