import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import findLocation from '../helpers/find-location';

@ValidatorConstraint({ name: 'location', async: true })
export class Location implements ValidatorConstraintInterface {
  errorType = null;

  async validate(text: string): Promise<boolean> {
    const location = findLocation(text);

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
      return "There are multiple location! Please provide it's state/province, eg 'springfield issouri'";
  }
}
