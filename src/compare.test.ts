import { isMsgDefEqual } from "./compare";
import { MessageDefinition } from "./types";

describe("isMsgDefEqual", () => {
  it("Should return true for definition for same msg parsed from .msg and .idl", () => {
    const definition1: MessageDefinition = {
      definitions: [
        {
          name: "sec",
          type: "int32",
          isComplex: false,
          isArray: false,
        },
        {
          name: "nanosec",
          type: "uint32",
          isComplex: false,
          isArray: false,
        },
      ],
    };
    const definition2: MessageDefinition = {
      name: "builtin_interfaces/msg/Time",
      definitions: [
        {
          type: "int32",
          isComplex: false,
          name: "sec",
        },
        {
          type: "uint32",
          isComplex: false,
          name: "nanosec",
        },
      ],
    };
    expect(isMsgDefEqual(definition1, definition2)).toBe(true);
  });

  it("should return true for identical definitions", () => {
    const definition1: MessageDefinition = {
      name: "definition",
      definitions: [
        { type: "string", name: "field1" },
        { type: "number", name: "field2" },
      ],
    };
    const definition2: MessageDefinition = { ...definition1 };
    expect(isMsgDefEqual(definition1, definition2)).toBe(true);
  });

  it("should return false for different definitions", () => {
    const definition1: MessageDefinition = {
      name: "definition",
      definitions: [{ type: "string", name: "field1" }],
    };
    const definition2: MessageDefinition = {
      ...definition1,
      definitions: [{ type: "string", name: "fieldWithDifferentName" }],
    };
    expect(isMsgDefEqual(definition1, definition2)).toBe(false);
  });

  it("should return true for matching array default values", () => {
    const definition1: MessageDefinition = {
      name: "definition",
      definitions: [
        { type: "string", isArray: true, name: "field1", defaultValue: ["a", "b"] },
        { type: "number", isArray: true, name: "field2", defaultValue: [1, 2] },
      ],
    };
    const definition2: MessageDefinition = {
      name: "definition",
      definitions: [
        { type: "string", isArray: true, name: "field1", defaultValue: ["a", "b"] },
        { type: "number", isArray: true, name: "field2", defaultValue: [1, 2] },
      ],
    };
    expect(isMsgDefEqual(definition1, definition2)).toBe(true);
  });

  it("should return false for different array default values", () => {
    const definition1: MessageDefinition = {
      name: "definition",
      definitions: [
        { type: "string", isArray: true, name: "field1", defaultValue: ["a", "b"] },
        { type: "number", isArray: true, name: "field2", defaultValue: [1, 2] },
      ],
    };
    const definition2: MessageDefinition = {
      name: "definition",
      definitions: [
        { type: "string", isArray: true, name: "field1", defaultValue: ["a", "b"] },
        { type: "number", isArray: true, name: "field2", defaultValue: [1, 3] },
      ],
    };
    expect(isMsgDefEqual(definition1, definition2)).toBe(false);
  });
});
