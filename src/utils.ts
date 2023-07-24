import { MessageDefinition, MessageDefinitionField } from "./types";

export function isMsgDefFieldEqual(
  lhs: MessageDefinitionField,
  rhs: MessageDefinitionField,
): boolean {
  return (
    lhs.type === rhs.type &&
    lhs.name === rhs.name &&
    (lhs.isComplex ?? false) === (rhs.isComplex ?? false) &&
    (lhs.isArray ?? false) === (rhs.isArray ?? false) &&
    lhs.arrayLength === rhs.arrayLength &&
    (lhs.isConstant ?? false) === (rhs.isConstant ?? false) &&
    lhs.value === rhs.value &&
    lhs.valueText === rhs.valueText &&
    lhs.upperBound === rhs.upperBound &&
    lhs.arrayUpperBound === rhs.arrayUpperBound &&
    lhs.defaultValue === rhs.defaultValue
  );
}

export function isMsgDefEqual(lhs: MessageDefinition, rhs: MessageDefinition): boolean {
  return (
    (lhs.name == undefined || rhs.name == undefined || lhs.name === rhs.name) &&
    lhs.definitions.length === rhs.definitions.length &&
    lhs.definitions.every((def, i) => isMsgDefFieldEqual(def, rhs.definitions[i]!))
  );
}
