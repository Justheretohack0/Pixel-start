$assets = "firefox_addon\assets"
Get-ChildItem $assets | ForEach-Object {
    $name = $_.Name
    $ext = $_.Extension
    if ($ext -eq ".js" -or $ext -eq ".css") { return }
    
    # First, delete explicitly unwanted variants
    if ($name -match "Italic" -or $name -match "Light" -or $name -match "Mini" -or $name -match "Modern" -or $name -match "SEGGCHAN" -or $name -match "cyrillic" -or $name -match "greek" -or $name -match "vietnamese") {
        Write-Host "Deleting unwanted variant: $name"
        Remove-Item $_.FullName -Force
        return
    }

    # Then, keep only the standard weights/types
    if ($name -notmatch "Regular" -and $name -notmatch "Bold" -and $name -notmatch "Weather" -and $name -notmatch "normal") {
        Write-Host "Deleting non-standard file: $name"
        Remove-Item $_.FullName -Force
    }
}

Write-Host "Running Python Packagers..."
python package_addon.py
python package_source.py

Write-Host "Renaming Artifacts..."
if (Test-Path "pixel-start-v2.2.xpi") {
    Move-Item "pixel-start-v2.2.xpi" "pixel-start-CLEAN-v2.2.xpi" -Force
}
if (Test-Path "pixel-start-source-v2.2.zip") {
    Move-Item "pixel-start-source-v2.2.zip" "pixel-start-source-CLEAN-v2.2.zip" -Force
}
Write-Host "Done."
