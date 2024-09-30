const { test, expect } = require("@playwright/test");

const BASE_URL = "http://localhost:3000";

test.describe("User List Application", () => {
  // Test 1: Ensure the user list page loads successfully
  // Wait for user list to appear before counting
  test("should load user list on homepage", async ({ page }) => {
    await page.goto(BASE_URL);

    // Ensure the page contains "User List" heading
    await expect(page.locator("h1")).toContainText("User List");

    // Add a manual wait to see if it's a data loading issue
    await page.waitForTimeout(3000); // Wait for 3 seconds (remove after debugging)

    // Ensure at least one user is listed on the page
    const userItems = page.locator("ul li");
    const count = await userItems.count();
    expect(count).toBeGreaterThan(0); // Check for more than 0 users
  });

  // Test 2: Search functionality should filter users
  test("should search users by name", async ({ page }) => {
    await page.goto(BASE_URL);

    // Type a search query
    const searchInput = page.locator('input[type="text"]');
    await searchInput.fill("John");

    // Wait for the search results to load (use appropriate delay for real API)
    await page.waitForTimeout(2000); // Debug wait time (remove later)

    // Ensure at least one user is listed after the search
    const userItems = page.locator("ul li");
    const count = await userItems.count();
    expect(count).toBeGreaterThan(0); // Check for non-zero users

    // Ensure the first user contains the search text
    await expect(userItems.first()).toContainText("John");
  });

  // Test 3: Clicking on a user should navigate to user details page
  test("should navigate to user details page", async ({ page }) => {
    await page.goto(BASE_URL);

    // Click the first user in the list
    const firstUserLink = page.locator("ul li a").first();
    await firstUserLink.click();

    // Ensure the page contains "User Details" heading
    await expect(page.locator("h1")).toContainText("User Details");

    // Target specific user details by text or class
    await expect(page.locator('p:has-text("First Name:")')).toContainText(
      "First Name"
    );
    await expect(page.locator('p:has-text("Email:")')).toContainText("Email");

    // (Optional) Use more specific locators if they have unique identifiers
  });

  // Test 4: Navigate back to the user list from the details page
  test("should navigate back to user list", async ({ page }) => {
    await page.goto(BASE_URL);

    // Click the first user in the list
    const firstUserLink = page.locator("ul li a").first();
    await firstUserLink.click();

    // Click the "Back to User List" link
    const backLink = page.locator('a:has-text("Back to User List")');
    await backLink.click();

    // Ensure we are back on the homepage with the user list
    await expect(page.locator("h1")).toContainText("User List");
  });
});
