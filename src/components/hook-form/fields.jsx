import { RHFTextField } from './rhf-text-field';
import { RHFSelect } from './rhf-select';
import { RHFAutocomplete } from './rhf-autocomplete';
import { RHFUploadAvatar } from './rhf-upload';
import { RHFSwitch } from './rhf-switch';
import { RHFPhoneInput } from './rhf-phone-input';
import { RHFCountrySelect } from './rhf-country-select';

// ----------------------------------------------------------------------

export const Field = {
  Text: RHFTextField,
  Select: RHFSelect,
  Switch: RHFSwitch,
  Phone: RHFPhoneInput,
  CountrySelect: RHFCountrySelect,
  Autocomplete: RHFAutocomplete,
  UploadAvatar: RHFUploadAvatar,
};
