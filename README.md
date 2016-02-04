# Material React Form

Automatic forms creation with [aldeed:simple-schema](http://github.com/aldeed/simple-schema) and React.

MRF is an attempt to make something like AutoForm but for react,
with the priority of making it extendable and easy to use.

This is on development stage, don't use in production.

## How to use

Install the core package

```sh
meteor add nicolaslopezj:mrf
```

Install a set of fields. *only material-ui right now*.

```sh
meteor add nicolaslopezj:mrf-material-ui
```

## Basic Example

Schema

```js
Posts = new Meteor.Collection('posts');

Posts.attachSchema({
  title: {
    type: String,
  },
  body: MRF.Attribute.Textarea({
    label: 'Content',
  }),
  createdAt: {
    type: Date,
    index: 1,
    mrfOptions: {
      omit: true,
    },
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else {
        this.unset();
      }
    },
  },
});
```

An insert form.

```jsx
PostsCreate = React.createClass({
  render() {
    return (
      <div>
        <h1>Create a post</h1>
        <MRF.Form
          collection={Posts}
          type="insert"
          ref="form"
          autoRender={true}
          onSuccess={(docId) => FlowRouter.go('posts.update', { postId: docId })}
          />
        <RaisedButton label="Create" onTouchTap={() => this.refs.form.submit()}/>
      </div>
    );
  },
});
```

An update form.

```jsx
PostsUpdate = React.createClass({
  render() {
    return (
      <div>
        <h1>Post update</h1>
        <MRF.Form
          collection={Posts}
          type="update"
          ref="form"
          autoRender={true}
          doc={this.props.post}
          />
        <RaisedButton primary={true} label="Save" onTouchTap={() => this.refs.form.submit()}/>
      </div>
    );
  },
});
```

## Create Components

MRF is built from the idea that you can create custom components easily.

First, you have to register the attribute:

```js
MRF.registerAttribute(options);
```

**Options:**

- **type**: *String*. The name of the attribute.
- **component**: *React Component*. The component of the field.
- **schema**: *String* or *Function*. The schema of the field, for example, ```{ type: String }```.

And the component must have the following propTypes:

- **value**: *Any* Optional. The value of the field.
- **label**: *String*. The label for the field.
- **errorMessage**: *String* Optional. If there is a error, this will be the message.
- **onChange**: *Function*. Call this function when the value changes. If the value change, the prop ```value``` will change too.

#### Example:

```js
var TextareaComponent = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    errorMessage: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
  },

  render: function() {
    return (
      <TextField
        ref="input"
        fullWidth={true}
        multiLine={true}
        rows={2}
        value={this.props.value}
        floatingLabelText={this.props.label}
        errorText={this.props.errorMessage}
        onChange={(event) => this.props.onChange(event.target.value)} />
    );
  },
});

MRF.registerAttribute({
  type: 'Textarea',
  component: TextareaComponent,
  schema: {
    type: String,
  },
});
```

## To Do

- [x] Api to create custom components.
- [ ] Make a better documentation.
- [ ] Create more callbacks.
- [ ] Add more form type, like *method*.
- [ ] Create components for other UI library.
