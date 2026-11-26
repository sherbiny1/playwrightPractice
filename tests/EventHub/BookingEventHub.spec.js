const { test, expect } = require("@playwright/test");

test("Full Booking Flow", async ({ page }) => {
  const email = "wesani6040@37xiao.com";
  const Password = "TempEmail1@";
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  await page.getByPlaceholder("you@email.com").fill(email);
  await page.getByLabel("password").fill(Password);
  await page.locator("#login-btn").click();
  await expect(page.getByText("Browse Events →")).toBeVisible();

  await page.getByRole("button", { name: "Admin" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Manage Events" })
    .click();
  await page.locator("#event-title-input").fill("Gouna");
  await page
    .locator("#admin-event-form textarea")
    .fill("Gouna is the best place in red sea to visit in egypt");
  await page.getByLabel("Category*").selectOption("Concert");
  await page.getByLabel("City").fill("Gouna");
  await page.getByLabel("Venue").fill("Makani Beach Club El Gouna");
  await page
    .getByRole("textbox", { name: "Event Date & Time*" })
    .fill("2027-01-01T00:00");
  await page.getByLabel("Price").fill("20000");
  await page.getByLabel("Total Seats").fill("50");
  await page.locator("#add-event-btn").click();
  await expect(page.getByText("✓Event created!×")).toBeVisible();

  await page.getByTestId("nav-events").click();
  const eventsCards = page.locator('[data-testid="event-card"]');
  await eventsCards.last().waitFor();
  await expect(eventsCards.first()).toBeVisible();
  const filteredEvent = eventsCards.filter({ hasText: "Gouna" });
  const textSeatsBefore = await filteredEvent
    .getByText("seats available")
    .textContent();
  const seatsBeforeBooking = parseInt(textSeatsBefore.split("s")[0]);

  await expect(filteredEvent).toBeVisible({ timeout: 5000 });
  await filteredEvent.getByRole("link", { name: "Book Now" }).click();

  await expect(page.locator("#ticket-count")).toContainText("1");
  await page.getByLabel("Full Name").fill("Mohammed");
  await page.locator("#customer-email").fill("mohammed@gmail.com");
  await page.getByPlaceholder("+91 98765 43210").fill("01508887478");
  await page.locator(".confirm-booking-btn").click();

  const bookingRefLocation = page.locator(".booking-ref");
  const bookingRef = await page.locator(".booking-ref").textContent();
  await expect(bookingRefLocation).toBeVisible();

  await page.getByRole("button", { name: "View My Bookings" }).click();
  await expect(page).toHaveURL(
    "https://eventhub.rahulshettyacademy.com/bookings",
  );
  const bookingCards = page.locator("#booking-card");
  expect(bookingCards.first()).toBeVisible();
  const matchedCard = bookingCards.filter({ hasText: bookingRef });
  await expect(matchedCard).toBeVisible();
  await expect(matchedCard).toContainText("Gouna");

  await page.getByTestId("nav-events").click();
  await page.reload();
  await eventsCards.last().waitFor();
  await expect(eventsCards.first()).toBeVisible();
  await expect(filteredEvent).toBeVisible();
  const textSeatsAfter = await filteredEvent
    .getByText("seats available")
    .textContent();
  const seatsAfterBooking = parseInt(textSeatsAfter.split("s")[0]);
  expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
});
