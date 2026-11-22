
import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Mentorship API",
      version: "1.0.0",
      description: "API documentation for Mentorship backend",
    },

    servers: [
      {
        url:
          process.env.NODE_ENV === "development"
            ? "http://localhost:5000"
            : "https://mentorship-api-5mdj.onrender.com",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
