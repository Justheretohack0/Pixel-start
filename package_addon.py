import zipfile
import os

def create_xpi(source_dir, output_filename):
    with zipfile.ZipFile(output_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                file_path = os.path.join(root, file)
                # Calculate the relative path for the archive
                arcname = os.path.relpath(file_path, source_dir)
                # FORCE forward slashes for ZIP compatibility (critical for AMO)
                arcname = arcname.replace(os.path.sep, '/')
                zipf.write(file_path, arcname)
    print(f"Successfully created {output_filename}")

# Paths
addon_dir = r"c:\Users\Straightheart\Downloads\Pixel-start-demo-main-20260212T085125Z-1-001\Pixel-start-demo-main\firefox_addon"
output_xpi = r"c:\Users\Straightheart\Downloads\Pixel-start-demo-main-20260212T085125Z-1-001\Pixel-start-demo-main\pixel-start-v2.1.xpi"

if __name__ == "__main__":
    if os.path.exists(output_xpi):
        os.remove(output_xpi)
    create_xpi(addon_dir, output_xpi)
