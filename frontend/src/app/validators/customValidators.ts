import { Directive } from '@angular/core';
import { AsyncValidatorFn, AsyncValidator, NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import {UserService} from '../services/user.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

export function existingUsernameValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userService.isUsernameTaken(control.value).pipe(map((response: any) => {
          return (response != null) ? {'usernameExists': true} : null;
      }));
  };
}

@Directive({
  selector: '[usernameExists][formControlName],[usernameExists][formControl],[usernameExists][ngModel]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: ExistingUsernameValidatorDirective, multi: true}]
})
export class ExistingUsernameValidatorDirective implements AsyncValidator {
  constructor(private userService: UserService) {  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return existingUsernameValidator(this.userService)(control);
  }
}
