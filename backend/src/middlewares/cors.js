export const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    callback(null, true);
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};
