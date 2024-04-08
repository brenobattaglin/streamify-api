import { FieldErrors } from "./shared/domain/validators/validator-fields-interface";

declare global {
    namespace jest {
        interface Matchers<R> {
            containsErrorMessages: (expected: FieldErrors) => R;
        }
    }
}