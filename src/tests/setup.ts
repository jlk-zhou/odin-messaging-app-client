import { server } from "#/mocks/node";
import { vi, beforeAll, afterEach, afterAll } from "vitest";

window.scrollTo = vi.fn();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
