# Material React Form

Automatic forms creation with [aldeed:simple-schema](http://github.com/aldeed/simple-schema) and React.

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

## Example

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
