import { renderHook, act } from "@testing-library/react-hooks";
import { useAuth } from "../../hooks/useAuth";
import { api, setAuthToken } from "../../services/api";

jest.mock("../../services/api");

describe("useAuth", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("initializes with no user and not loading if no token in localStorage", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth());

    await waitForNextUpdate();

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBeFalsy();
  });

  it("fetches user if token exists in localStorage", async () => {
    localStorage.setItem("token", "fake-token");
    (api.get as jest.Mock).mockResolvedValue({
      data: { id: 1, username: "testuser" },
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth());

    await waitForNextUpdate();

    expect(result.current.user).toEqual({ id: 1, username: "testuser" });
    expect(result.current.loading).toBeFalsy();
  });

  it("logs in user successfully", async () => {
    (api.post as jest.Mock).mockResolvedValue({
      data: { user: { id: 1, username: "testuser" }, token: "new-token" },
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth());

    act(() => {
      result.current.login("testuser", "password123");
    });

    await waitForNextUpdate();

    expect(result.current.user).toEqual({ id: 1, username: "testuser" });
    expect(localStorage.getItem("token")).toBe("new-token");
    expect(setAuthToken).toHaveBeenCalledWith("new-token");
  });

  it("registers user successfully", async () => {
    (api.post as jest.Mock).mockResolvedValue({
      data: { user: { id: 1, username: "newuser" }, token: "new-token" },
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth());

    act(() => {
      result.current.register("newuser", "password123");
    });

    await waitForNextUpdate();

    expect(result.current.user).toEqual({ id: 1, username: "newuser" });
    expect(localStorage.getItem("token")).toBe("new-token");
    expect(setAuthToken).toHaveBeenCalledWith("new-token");
  });

  it("logs out user", () => {
    localStorage.setItem("token", "fake-token");
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
    expect(setAuthToken).toHaveBeenCalledWith("");
  });
});
