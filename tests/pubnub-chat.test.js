import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("PubNub Chat App", () => {
  it("loads the chat interface and verifies presence", async (context) => {
    const testdriver = TestDriver(context);

    // Launch Chrome with the PubNub chat application
    await testdriver.provision.chrome({
      url: "https://showcase.pubnub.com/chat",
    });

    // Verify chat UI elements are present
    const chatInput = await testdriver.find("chat message input field or compose box", {
      timeout: 30000,
    });
    expect(chatInput).toBeDefined();

    // Verify page state
    const assertResult = await testdriver.assert(
      "the PubNub chat interface is visible and loaded"
    );
    expect(assertResult).toBeTruthy();
  });

  it("can interact with chat message input", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({
      url: "https://showcase.pubnub.com/chat",
    });

    // Locate the message input box and type a sample message
    const input = await testdriver.find("message input box", {
      timeout: 30000,
    });
    await input.click();
    await testdriver.type("Hello from TestDriver automated test!");

    const result = await testdriver.assert(
      "the message text is entered into the chat input"
    );
    expect(result).toBeTruthy();
  });
});
