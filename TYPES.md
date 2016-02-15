# MRF Input Types

These are the form types that come with the Material UI package.
*If you need more or you don't use Material UI go to [Custom Input Types](https://github.com/nicolaslopezj/meteor-react-form#custom-input-types).*

To use this types, set ```{ mrf: { type: 'choosen-type' } }``` in the field schema.

#### ```checkbox```

Simple checkbox field.

Allowed types: ```Boolean```.

#### ```date-picker```

Material UI Date picker.

Allowed types: ```Date```.

Options:

- ```minDate```: ```Date``` Optional. Minimum date for the picker.
- ```maxDate```: ```Date``` Optional. Maximum date for the picker.
- ```formatDate```: ```Function``` Optional. Takes the date as a parameters and must return a string.

#### ```multiple-checkbox```

Select multiple values with checkboxes.

Allowed types: ```[String]``````[Number]```.

Options:

- ```options```: . The options for the checkbox. Each item must have ```label``` and ```value```.

#### ```select-with-method```

A select input that connects to a Meteor Method to fetch data.

Allowed types: ```String``````Number``````[String]``````[Number]```.

Options:

- ```multi```: ```Boolean``` Optional. Allow to select multiple items
- ```methodName```: . Meteor method that recieves the search string and returns an array of items with ```label``` and ```value```.
- ```labelMethodName```: . Meteor method that recieves the value and must return the label. If ```multi``` is set to true, it will recieve an array and it must return an with the labels in the same order.
- ```connection```: ```Any``` Optional. A Meteor connection.
- ```throttleTime```: ```Number``` Optional. Minimum time between 2 calls to ```methodName```. Defaults to 200.

#### ```text```

Simple checkbox field.

Allowed types: ```Any```.

Options:

- ```type```: ```String``` Optional. Input type, it can be email, password, etc.

#### ```textarea```

Textarea

Allowed types: ```String```.
