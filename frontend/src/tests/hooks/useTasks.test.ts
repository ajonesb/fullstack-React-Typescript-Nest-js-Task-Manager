import { renderHook, act } from "@testing-library/react-hooks";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";

jest.mock("../../services/api");

describe("useAuth", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should return user as null initially", () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
  });

  it("should login user", async () => {
    (api.post as jest.Mock).mockResolvedValue({
      data: { access_token: "token", user: { id: 1, username: "testuser" } },
    });
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login("testuser", "password");
    });

    expect(result.current.user).toEqual({ id: 1, username: "testuser" });
    expect(localStorage.getItem("token")).toBe("token");
  });

  it("should register user", async () => {
    (api.post as jest.Mock).mockResolvedValue({
      data: { access_token: "token", user: { id: 1, username: "newuser" } },
    });
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.register("newuser", "password");
    });

    expect(result.current.user).toEqual({ id: 1, username: "newuser" });
    expect(localStorage.getItem("token")).toBe("token");
  });

  it("should logout user", () => {
    localStorage.setItem("token", "token");
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
  });
});
