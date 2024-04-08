import { ClassValidatorFields } from "../../domain/validators/class-validator-fields";
import { EntityValidationError } from "../../domain/validators/validation.error";
import { FieldErrors } from "../../domain/validators/validator-fields-interface";

type Expected =
    | {
        validator: ClassValidatorFields<any>;
        data: any;
    }
    | (() => any);

expect.extend({
    containsErrorMessages(expected: any, received: FieldErrors) {
        if (typeof expected === "function") {
            try {
                expected();
                return isValid();
            } catch (e) {
                const error = e as EntityValidationError;
                return assertContainsErrorMessage(error.errors, received);
            }
        } else {
            const { validator, data } = expected;
            const validated = validator.validate(data);

            if (validated) {
                return isValid();
            }

            return assertContainsErrorMessage(validator.errors, received);
        }
    },
});

function assertContainsErrorMessage(
    expected: FieldErrors,
    received: FieldErrors
) {
    const isMatch = expect.objectContaining(received).asymmetricMatch(expected);

    return isMatch
        ? { pass: true, message: () => "" }
        : {
            pass: false,
            message: () => `Validation errors do not contain ${JSON.stringify(received)}. Current: ${JSON.stringify(expected)}`,
        };
}

function isValid() {
    return { pass: true, message: () => "" };
}
