const { test, expect } = require("@playwright/test");

test("Refund With One Ticket Event Hub", async ({ page }) => {
  const email = "wesani6040@37xiao.com";
  const Password = "TempEmail1@";
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  await page.getByPlaceholder("you@email.com").fill(email);
  await page.getByLabel("password").fill(Password);
  await page.locator("#login-btn").click();

  await page.getByTestId("nav-events").click();
  const eventsCards = page.locator('[data-testid="event-card"]');
  await eventsCards.last().waitFor();
  await eventsCards.first().getByTestId("book-now-btn").click();

  await expect(page.locator("#ticket-count")).toContainText("1");
  await page.getByLabel("Full Name").fill("Mohammed");
  await page.locator("#customer-email").fill("mohammed@gmail.com");
  await page.getByPlaceholder("+91 98765 43210").fill("01508887478");
  await page.locator(".confirm-booking-btn").click();
  const bookingRefDone = await page.locator(".booking-ref").textContent();

  await page.getByRole("button", { name: "View My Bookings" }).click();
  await expect(page).toHaveURL(
    "https://eventhub.rahulshettyacademy.com/bookings",
  );
  await page
    .locator("#booking-card")
    .filter({ hasText: `${bookingRefDone}` })
    .getByRole("button", { name: "View Details" })
    .click();
  const bookingRef = await page
    .locator(
      "span.font-mono.font-bold.text-indigo-600.bg-indigo-50.px-3.py-1.rounded-lg.text-sm",
    )
    .textContent();
  await expect(page.getByText("Booking Information")).toBeVisible();

  const eventTitle = await page.locator("div h1").textContent();
  await expect(bookingRef.split("-")[0]).toBe(eventTitle.slice(0, 1));

  await page.getByTestId("check-refund-btn").click();
  await expect(page.getByTestId("refund-spinner")).toBeVisible();
  await expect(page.getByTestId("refund-spinner")).not.toBeVisible({
    timeout: 6000,
  });

  const refundResult = page.getByTestId("refund-result");
  await expect(refundResult).toBeVisible();
  await expect(refundResult).toContainText("Eligible for refund");
  await expect(refundResult).toContainText(
    "Single-ticket bookings qualify for a full refund",
  );
});

test("Refund With Three Ticket Event Hub", async ({ page }) => {
  const email = "wesani6040@37xiao.com";
  const Password = "TempEmail1@";
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  await page.getByPlaceholder("you@email.com").fill(email);
  await page.getByLabel("password").fill(Password);
  await page.locator("#login-btn").click();

  await page.getByTestId("nav-events").click();
  const eventsCards = page.locator('[data-testid="event-card"]');
  await eventsCards.last().waitFor();
  await eventsCards.first().getByTestId("book-now-btn").click();

  await page.getByRole("button", { name: "+" }).dblclick();
  await page.getByLabel("Full Name").fill("Mohammed");
  await page.locator("#customer-email").fill("mohammed@gmail.com");
  await page.getByPlaceholder("+91 98765 43210").fill("01508887478");
  await page.locator(".confirm-booking-btn").click();
  const bookingRefDone = await page.locator(".booking-ref").textContent();

  await page.getByRole("button", { name: "View My Bookings" }).click();
  await expect(page).toHaveURL(
    "https://eventhub.rahulshettyacademy.com/bookings",
  );
  await page
    .locator("#booking-card")
    .filter({ hasText: `${bookingRefDone}` })
    .getByRole("button", { name: "View Details" })
    .click();
  const bookingRef = await page
    .locator(
      "span.font-mono.font-bold.text-indigo-600.bg-indigo-50.px-3.py-1.rounded-lg.text-sm",
    )
    .textContent();
  await expect(page.getByText("Booking Information")).toBeVisible();
  const eventTitle = await page.locator("div h1").textContent();
  await expect(bookingRef.split("-")[0]).toBe(eventTitle.slice(0, 1));

  await page.getByTestId("check-refund-btn").click();
  await expect(page.getByTestId("refund-spinner")).toBeVisible();
  await expect(page.getByTestId("refund-spinner")).not.toBeVisible({
    timeout: 6000,
  });

  const refundResult = page.getByTestId("refund-result");
  await expect(refundResult).toBeVisible();
  await expect(refundResult).toContainText("Not eligible for refund.");
  await expect(refundResult).toContainText(
    "Group bookings (3 tickets) are non-refundable.",
  );
});
