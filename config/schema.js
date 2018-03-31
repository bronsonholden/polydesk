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

  metadataValue: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: [
          'S', // string
          'B', // boolean
          'N', // number
        ]
      },
      value: {
        type: [ 'string', 'number', 'boolean' ]
      }
    },
    oneOf: [
      {
        type: {
          const: 'S'
        },
        value: {
          type: 'string'
        }
      },
      {
        type: {
          const: 'N'
        },
        value: {
          type: 'number'
        }
      },
      {
        type: {
          const: 'B'
        },
        value: {
          type: 'boolean'
        }
      }
    ]
  }

};
