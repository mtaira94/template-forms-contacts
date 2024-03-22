import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from "@angular/forms";

@Directive({
    selector: '[restrictedWords]',
    standalone: true,
    providers: [{
        provide: NG_VALIDATORS,
        multi: true,
        useExisting: RestrictedWordValidator
    }]
})
export class RestrictedWordValidator {
    @Input('restrictedWords') restrictedWords: string[] = [];

    validate(control: AbstractControl): null | ValidationErrors {
        if (!control.value) return null

        const invalidWords = this.restrictedWords
            .map(w => control.value.includes(w) ? w : null)
            .filter(w => w !== null);

        return invalidWords.length > 0
            ? { restrictedwords: invalidWords.join(',') }
            : null
    }
}