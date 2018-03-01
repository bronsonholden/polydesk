module.exports = {
<<<<<<< HEAD
=======

  documents: {
    s3: {
      key: 'AKIAIXX3BC3JACSBRQKQ',
      secret: '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',
      bucket: 'polydesk-dev',
      region: 'us-west-2'
    },
    sqs: {
      queue: 'ocr-polydesk-dev.fifo',
      url: 'https://sqs.us-west-2.amazonaws.com/641163449917/ocr-polydesk-dev.fifo'
    }
  },


  /**************************************************************************
  *                                                                         *
  * Tell Sails what database(s) it should use in development.                *
  *                                                                         *
  * (https://sailsjs.com/config/datastores)                                 *
  *                                                                         *
  **************************************************************************/
>>>>>>> ocr
  datastores: {
    default: {
      adapter: 'sails-postgresql',
      url: 'postgresql://postgres:postgres@localhost:5432/polydesk'
      //  sails_datastores__default__url=mysql://admin:myc00lpAssw2D@db.example.com:3306/my_prod_db
      // ssl: true,
    }
  },
  models: {
    migrate: 'drop'
  },
  blueprints: {
    shortcuts: false,
  },
  security: {
    cors: {
      // allowOrigins: [
      //   'https://example.com',
      // ]
    }
  },
  session: {
    // adapter: 'connect-redis',
    // url: 'redis://user:password@localhost:6379/dbname',
    // sails_session__url=redis://admin:myc00lpAssw2D@bigsquid.redistogo.com:9562/sessions
    cookie: {
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000  // 24 hours
    }
  },
  sockets: {
    // onlyAllowOrigins: [
    //   'https://example.com',
    //   'https://staging.example.com',
    // ],
    // adapter: 'socket.io-redis',
    // url: 'redis://user:password@bigsquid.redistogo.com:9562/dbname'
  },
  log: {
    level: 'debug'
  },
  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000 // One year
    // trustProxy: true
  },
  // port: 80,
  // ssl: undefined,
  custom: {
    baseUrl: 'https://example.com',
    internalEmailAddress: 'support@example.com'
    // mailgunDomain: 'mg.example.com',
    // mailgunSecret: 'key-prod_fake_bd32301385130a0bafe030c',
    // stripeSecret: 'sk_prod__fake_Nfgh82401348jaDa3lkZ0d9Hm',
    // sails_custom__mailgunDomain=mg.example.com,
    // sails_custom__mailgunSecret=key-prod_fake_bd32301385130a0bafe030c,
    // sails_custom__stripeSecret=sk_prod__fake_Nfgh82401348jaDa3lkZ0d9Hm
  }
};
