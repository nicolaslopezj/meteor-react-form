import ArrayComponent from './array.jsx';
import FieldType from './field-type.jsx';
import Field from './field.jsx';
import Form from './form.jsx';
import ObjectComponent from './object.jsx';
import Utility from './utility.js';
import {
  registerType,
  getFieldTypeName,
  getFieldType,
  getFieldComponent,
  Attributes,
} from './types.jsx';

SimpleSchema.extendOptions({
  mrf: Match.Optional(Object),
});

export default MRF = {
  ArrayComponent,
  ObjectComponent,
  FieldType,
  Field,
  Form,
  registerType,
  getFieldTypeName,
  getFieldType,
  getFieldComponent,
  Attributes,
  Utility,
};
