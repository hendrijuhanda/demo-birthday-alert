import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import findLocation from 'src/utils/find-location';

@ValidatorConstraint({ name: 'location', async: true })
export class LocationConstraint implements ValidatorConstraintInterface {
  errorType = null;

  async validate(value: string): Promise<boolean> {
    const location = findLocation(value);

    if (!location.length) {
      this.errorType = 'not-found';

      return false;
    }

    if (location.length > 1) {
      this.errorType = 'multiple';

      return false;
    }

    return true;
  }

  defaultMessage(): string {
    if (this.errorType === 'not-found') return 'Location is not found!';
    if (this.errorType === 'multiple')
      return "There are multiple location! Please provide it's state/province, eg 'springfield missouri'";
  }
}
