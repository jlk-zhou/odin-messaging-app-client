import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { server } from "../mocks/node.js";

window.scrollTo = vi.fn();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
