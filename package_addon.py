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
base_dir = os.path.dirname(os.path.abspath(__file__))
addon_dir = os.path.join(base_dir, "firefox_addon")
output_xpi = os.path.join(base_dir, "pixel-start-v2.2.xpi")

if __name__ == "__main__":
    if os.path.exists(output_xpi):
        os.remove(output_xpi)
    create_xpi(addon_dir, output_xpi)
