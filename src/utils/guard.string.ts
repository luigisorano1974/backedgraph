import { ValidationError } from "./error.js";

export function normalizeRequiredString(value: string, fieldName: string): string {

    const normalized = value?.trim();

    if (!normalized) {
      throw new ValidationError(`${fieldName} obbligatorio.`);
    }

    if (normalized.length < 2) {
      throw new ValidationError(`${fieldName} troppo corto.`);
    }

    if (normalized.length > 80) {
      throw new ValidationError(`${fieldName} troppo lungo.`);
    }

    return normalized;
}
