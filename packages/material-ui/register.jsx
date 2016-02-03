MRF.registerAttribute({
  type: 'String',
  component: MRF.Components.String,
  schema: {
    type: String,
  },
});

MRF.registerAttribute({
  type: 'Textarea',
  component: MRF.Components.Textarea,
  schema: {
    type: String,
  },
});

MRF.registerAttribute({
  type: 'Number',
  component: MRF.Components.Number,
  schema: {
    type: Number,
  },
});

MRF.registerAttribute({
  type: 'Date',
  component: MRF.Components.Date,
  schema: {
    type: Date,
  },
});

MRF.registerAttribute({
  type: 'Boolean',
  component: MRF.Components.Boolean,
  schema: {
    type: Boolean,
  },
});

MRF.registerAttribute({
  type: 'MultipleCheckbox',
  component: MRF.Components.MultipleCheckbox,
  schema: function(options) {
    return {
      type: [String],
      mrfOptions: options,
    };
  },
});

MRF.registerAttribute({
  type: 'SelectWithMethod',
  component: MRF.Components.SelectWithMethod,
  schema: function(options) {
    return {
      mrfOptions: options,
    };
  },
});
