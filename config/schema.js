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
  }

};
