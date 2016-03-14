import { React } from 'meteor/npmdeps';
import ArrayComponent from './lib/array.jsx';
import FieldType from './lib/field-type.jsx';
import Field from './lib/field.jsx';
import Form from './lib/form.jsx';
import ObjectComponent from './lib/object.jsx';
import {
  Attributes,
  registerType,
  getFieldTypeName,
  getFieldType,
  getFieldComponent,
} from './lib/types.jsx';
import Utility from './lib/utility.js';

SimpleSchema.extendOptions({
  mrf: Match.Optional(Object),
});

export default MRF = {
  ArrayComponent,
  ObjectComponent,
  FieldType,
  Field,
  Form,
  Attributes,
  registerType,
  getFieldTypeName,
  getFieldType,
  getFieldComponent,
  Utility,
};
