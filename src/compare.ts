import { DefaultValue, MessageDefinition, MessageDefinitionField } from "./types";

/**
 * Deep equality comparison of two DefaultValue values. Two default values are considered equal
 * if they are both arrays and all their elements are equal, or if they are both primitives and
 * equal.
 *
 * @param lhs Left-hand side of the comparison.
 * @param rhs Right-hand side of the comparison.
 * @returns True if the two default values are equal, false otherwise.
 */
function defaultValuesEqual(lhs: DefaultValue, rhs: DefaultValue): boolean {
  if (Array.isArray(lhs) && Array.isArray(rhs)) {
    if (lhs.length !== rhs.length) {
      return false;
    }
    for (let i = 0; i < lhs.length; i++) {
      if (lhs[i] !== rhs[i]) {
        return false;
      }
    }
    return true;
  }
  return lhs === rhs;
}

/**
 * Compares two MessageDefinitionField objects for equality. Two fields are considered equal if all
 * their properties are equal. Assumes default values (False) for boolean properties that are undefined.
 *
 * @param lhs MessageDefinitionField field
 * @param rhs MessageDefinitionField field to compare with
 * @returns True if the two fields are equal, false otherwise.
 */
export function isMsgDefFieldEqual(
  lhs: MessageDefinitionField,
  rhs: MessageDefinitionField,
): boolean {
  return (
    lhs.type === rhs.type &&
    lhs.name === rhs.name &&
    (lhs.isComplex ?? false) === (rhs.isComplex ?? false) &&
    lhs.enumName === rhs.enumName &&
    (lhs.isArray ?? false) === (rhs.isArray ?? false) &&
    lhs.arrayLength === rhs.arrayLength &&
    (lhs.isConstant ?? false) === (rhs.isConstant ?? false) &&
    lhs.value === rhs.value &&
    lhs.valueText === rhs.valueText &&
    lhs.upperBound === rhs.upperBound &&
    lhs.arrayUpperBound === rhs.arrayUpperBound &&
    defaultValuesEqual(lhs.defaultValue, rhs.defaultValue)
  );
}

/**
 * Compares two MessageDefinition objects for equality. Two message definitions are considered
 * equal if their name (if given) and all their definitions equal.
 *
 * @param lhs MessageDefinition message definition
 * @param rhs MessageDefinition message definition to compare with
 * @returns True if the two message definitions are equal, false otherwise.
 */
export function isMsgDefEqual(lhs: MessageDefinition, rhs: MessageDefinition): boolean {
  return (
    (lhs.name == undefined || rhs.name == undefined || lhs.name === rhs.name) &&
    lhs.definitions.length === rhs.definitions.length &&
    lhs.definitions.every((def, i) => isMsgDefFieldEqual(def, rhs.definitions[i]!))
  );
}
