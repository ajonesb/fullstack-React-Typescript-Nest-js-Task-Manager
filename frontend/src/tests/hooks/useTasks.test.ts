import { renderHook, act } from "@testing-library/react-hooks";
import { useTasks } from "../../hooks/useTasks";
import { taskService } from "../../services/taskService";

jest.mock("../../services/taskService");
jest.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({ user: { id: 1, username: "testuser" } }),
}));

describe("useTasks", () => {
  it("fetches tasks on mount", async () => {
    const mockTasks = [
      { id: 1, title: "Test Task", completed: false, userId: 1 },
    ];
    (taskService.getTasks as jest.Mock).mockResolvedValue({ data: mockTasks });

    const { result, waitForNextUpdate } = renderHook(() => useTasks());

    await waitForNextUpdate();

    expect(result.current.tasks).toEqual(mockTasks);
  });

  it("adds a new task", async () => {
    const newTask = { id: 2, title: "New Task", completed: false, userId: 1 };
    (taskService.createTask as jest.Mock).mockResolvedValue({ data: newTask });

    const { result, waitForNextUpdate } = renderHook(() => useTasks());

    await waitForNextUpdate();

    act(() => {
      result.current.addTask("New Task");
    });

    await waitForNextUpdate();

    expect(result.current.tasks).toContainEqual(newTask);
  });
});
