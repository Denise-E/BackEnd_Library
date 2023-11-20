import swaggerJson from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"; // Para creacion "web"

// Metadata info about our API
/*
const options = {
  definition: {
    //openapi: "3.0.0",
    info: { title: "TH2 Library 2023", version: "1.0.0" },
  },
  apis: ["router/books.js", "router/reservations.js", "router/users.js"]
}; */
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        description: "API Proyecto Libreria 2023",
        version: "1.0.0",
        title: "TH2 Library"
      },
      paths: {
        "/api/books": {
          get: {
            security: [
              {
                bearerAuth: []
              }
            ],
            tags: ["book"],
            summary: "Listar libros",
            description: "Este método lista todos los libros disponibles",
            responses: {
              200: {
                description: "Operación correcta",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        $ref: '#/components/schemas/Book'
                      }
                    }
                  }
                }
              },
              500: {
                description: "Error de servidor",
                content: {
                  "application/json": {
                    schema: {
                      $ref: '#/components/schemas/Error'
                    }
                  }
                }
              }
            }
          },
          post: {
            security: [
              {
                bearerAuth: []
              }
            ],
            tags: ["book"],
            summary: "Crear libro",
            description: "Este método crea un nuevo libro",
            responses: {
              201: {
                description: "Libro creado",
                parameters: [
                    {
                      title: "title",
                      in: "query",
                      description: "Title",
                      schema: {
                        type: "string"
                      }
                    },
                    {
                        author: "author",
                        in: "query",
                        description: "Author",
                        schema: {
                          type: "string"
                        }
                    },
                    {
                        stock: "stock",
                        in: "query",
                        description: "Stock",
                        schema: {
                          type: "string"
                        }
                    }

                  ],
                content: {
                  "application/json": {
                    schema: {
                      $ref: '#/components/schemas/Book'
                    }
                  }
                }
              },
              500: {
                description: "Error de servidor",
                content: {
                  "application/json": {
                    schema: {
                      $ref: '#/components/schemas/Error'
                    }
                  }
                }
              },
              400: {
                description: "Bad Request",
                content: {
                  "application/json": {
                    schema: {
                      $ref: '#/components/schemas/Error'
                    }
                  }
                }
              }
            },
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    $ref: '#/components/schemas/Book'
                  }
                }
              }
            }
          }
        },
        "/api/reservations": {
            post: {
              security: [
                {
                  bearerAuth: []
                }
              ],
              tags: ["reservation"],
              summary: "Crear reserva",
              description: "Este método crea una nueva reserva",
              responses: {
                201: {
                  description: "Reserva creada",
                  content: {
                    "application/json": {
                      schema: {
                        $ref: '#/components/schemas/Reservation'
                      }
                    }
                  }
                },
                500: {
                  description: "Error de servidor",
                  content: {
                    "application/json": {
                      schema: {
                        $ref: '#/components/schemas/Error'
                      }
                    }
                  }
                },
                400: {
                  description: "Bad Request",
                  content: {
                    "application/json": {
                      schema: {
                        $ref: '#/components/schemas/Error'
                      }
                    }
                  }
                }
              },
              requestBody: {
                content: {
                  "application/json": {
                    schema: {
                      $ref: '#/components/schemas/Reservation'
                    }
                  }
                }
              }
            }
        }
      },
      components: {
        schemas: {
          Book: {
            type: "object",
            required: ["title", "author", "stock"],
            properties: {
              id: {
                type: "string",
                format: "uuid",
                readOnly: true
              },
              title: {
                type: "string",
                required: true
              },
              author: {
                type: "string",
                required: true
              },
              stock: {
                type: "integer",
                required: true,
                minimum: 1
              }
            }
          },
          Reservation: {
            type: "object",
            required: ["id_book", "id_client"],
            properties: {
              id_book: {
                type: "string",
                required: true
              },
              id_client: {
                type: "string",
                required: true
              }
            }
          },
          Error: {
            type: "object",
            properties: {
              code: {
                description: "Código de error",
                type: "string"
              },
              status: {
                description: "HTTP status",
                type: "integer",
                format: "int32"
              },
              type: {
                type: "string",
                description: "Tipo de error"
              },
              message: {
                type: "string",
                description: "Mensaje de error"
              }
            }
          }
        }
      }
    },
    apis: ["router/books.js", "router/reservations.js", "router/users.js"]
  };

// Docs en JSON format
const swaggerSpec = swaggerJson(options);

/// Function to setup our docs - "Controllador"
const swaggerDocs = (app, port) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Crea la web
  console.log(`Docs are available at http://localhost:${port}/api/docs`)
}

export default { 
    swaggerDocs 
};
