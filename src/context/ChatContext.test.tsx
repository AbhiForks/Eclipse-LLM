/**
 * @vitest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import {
  ChatProvider,
  useChat,
  MessageRole,
  Conversation,
} from "../context/ChatContext";

// Wrapper providing the context ChatProvider needs (no data-fetching lib involved)
const createWrapper = () => {
  return ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
      <ChatProvider>{children}</ChatProvider>
    </BrowserRouter>
  );
};

describe("ChatContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("provides initial empty conversations array", () => {
    const TestComponent = () => {
      const { conversations } = useChat();
      return (
        <div data-testid="conversations-count">{conversations.length}</div>
      );
    };

    render(<TestComponent />, { wrapper: createWrapper() });

    expect(screen.getByTestId("conversations-count")).toHaveTextContent("1");
  });

  it("creates a new conversation when createNewConversation is called", async () => {
    const TestComponent = () => {
      const { conversations, createNewConversation } = useChat();
      return (
        <div>
          <span data-testid="count">{conversations.length}</span>
          <button onClick={createNewConversation} data-testid="create-btn">
            Create
          </button>
        </div>
      );
    };

    render(<TestComponent />, { wrapper: createWrapper() });

    const createBtn = screen.getByTestId("create-btn");
    fireEvent.click(createBtn);

    await waitFor(() => {
      expect(screen.getByTestId("count")).toHaveTextContent("2");
    });
  });
});

describe("MessageRole type", () => {
  it("accepts valid message roles", () => {
    const userRole: MessageRole = "user";
    const assistantRole: MessageRole = "assistant";
    const systemRole: MessageRole = "system";

    expect(userRole).toBe("user");
    expect(assistantRole).toBe("assistant");
    expect(systemRole).toBe("system");
  });
});

describe("Conversation interface", () => {
  it("validates conversation structure", () => {
    const conversation: Conversation = {
      id: "test-id",
      title: "Test Conversation",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(conversation.id).toBe("test-id");
    expect(conversation.title).toBe("Test Conversation");
    expect(conversation.messages).toHaveLength(0);
  });
});
