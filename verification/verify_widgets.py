
from playwright.sync_api import sync_playwright, expect
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # 1. Open the app
    print("Navigating to app...")
    page.goto("http://localhost:5173/")
    time.sleep(2) # Wait for load animation

    # 2. Open Settings
    print("Opening settings...")
    settings_trigger = page.locator("text=( settings )")
    settings_trigger.hover()
    settings_trigger.click()
    time.sleep(1)

    # 3. Go to Widgets tab
    print("Switching to Widgets tab...")
    page.get_by_role("button", name="widgets").click()
    time.sleep(1)

    # 4. Find Snake widget toggle and double click
    print("Double clicking Snake widget...")
    snake_toggle = page.get_by_text("snake", exact=True).first
    snake_toggle.dblclick()
    time.sleep(1)

    # 5. Verify Modal and Click YES
    print("Verifying modal...")
    modal = page.locator("text=Add another 'snake'?")
    expect(modal).to_be_visible()

    print("Clicking YES...")
    page.get_by_role("button", name="[ YES ]").click()
    time.sleep(1)

    # 6. Verify duplicate toggle in settings
    print("Verifying duplicate toggle in settings...")
    extra_snake_toggle = page.get_by_text("snake (extra)")
    expect(extra_snake_toggle).to_be_visible()

    # 7. Close settings
    print("Closing settings...")
    page.get_by_role("button", name="[x]").click()
    time.sleep(1)

    # 8. Verify two snake widgets on grid
    print("Verifying widgets on grid...")
    snakes = page.locator("text=snake.exe")
    count = snakes.count()
    print(f"Found {count} snake widgets")
    if count < 2:
        print("Error: Expected at least 2 snake widgets")
        exit(1)

    # 9. Verify timestamp and close button presence
    print("Verifying timestamp and close button...")

    # Check if we can find a title with a timestamp pattern
    # The extra widget title format is "snake.exe (xxxx)"
    extra_widget_header = page.locator("div.flex.items-center.justify-between", has_text="snake.exe (")
    expect(extra_widget_header).to_be_visible()

    # Check for [x] button inside the extra widget header
    close_button = extra_widget_header.locator("text=[x]")
    expect(close_button).to_be_visible()

    # 10. Close via [x] button
    print("Closing extra widget via [x] button...")
    close_button.click()
    time.sleep(1)

    # 11. Verify removal
    print("Verifying removal...")
    expect(extra_widget_header).not_to_be_visible()

    count_after = page.locator("text=snake.exe").count()
    if count_after != 1:
        print(f"Error: Expected 1 snake widget, found {count_after}")
        exit(1)

    print("Success!")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
