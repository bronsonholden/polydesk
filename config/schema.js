module.exports.schema = {

  workflow: {
    type: 'object',
    properties: {
      nodes: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'number'
            }
          },
          required: [
            'id'
          ]
        }
      },
      links: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'number'
            },
            source: {
              type: 'number'
            },
            dest: {
              type: 'number'
            }
          },
          required: [
            'id',
            'source',
            'dest'
          ]
        }
      }
    },
    required: [
      'nodes',
      'links'
    ]
  },

  metadataTemplate: {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      fields: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            type: {
              type: 'string'
            },
            required: {
              type: 'boolean'
            },
            readOnly: {
              type: 'boolean'
            },
            indexed: {
              type: 'boolean'
            }
          },
          required: [
            'name',
            'type',
            'required',
            'readOnly',
            'indexed'
          ]
        }
      },
      formulas: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            field: {
              type: 'string'
            },
            formula: {
              type: 'string'
            },
            fields: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          },
          required: [
            'field'
          ]
        }
      }
    },
    required: [
      'name'
    ]
  }

};
