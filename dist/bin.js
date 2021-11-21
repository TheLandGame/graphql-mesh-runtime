#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

function _interopNamespace(e) {
	if (e && e.__esModule) { return e; } else {
		var n = {};
		if (e) {
			Object.keys(e).forEach(function (k) {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () {
						return e[k];
					}
				});
			});
		}
		n['default'] = e;
		return n;
	}
}

const utils = require('@graphql-mesh/utils');
const config = require('@graphql-mesh/config');
const Ajv = _interopDefault(require('ajv'));
const cosmiconfig = require('cosmiconfig');
const path = require('path');
const process$1 = require('process');
const runtime = require('@graphql-mesh/runtime');
const tsBasePlugin = require('@graphql-codegen/typescript');
const tsResolversPlugin = require('@graphql-codegen/typescript-resolvers');
const graphql = require('graphql');
const core = require('@graphql-codegen/core');
const pascalCase = require('pascal-case');
const tsOperationsPlugin = require('@graphql-codegen/typescript-operations');
const tsGenericSdkPlugin = require('@graphql-codegen/typescript-generic-sdk');
const ts = _interopDefault(require('typescript'));
const fs = require('fs');
const utils$1 = require('@graphql-tools/utils');
const express = _interopDefault(require('express'));
const cluster = require('cluster');
const os = require('os');
require('json-bigint-patch');
const http = require('http');
const graphqlUpload = require('graphql-upload');
const ws = _interopDefault(require('ws'));
const cors = _interopDefault(require('cors'));
const _ = _interopDefault(require('lodash'));
const bodyParser = _interopDefault(require('body-parser'));
const cookieParser = _interopDefault(require('cookie-parser'));
const graphqlHelix = require('graphql-helix');
const https = require('https');
const open = _interopDefault(require('open'));
const ws$1 = require('graphql-ws/lib/use/ws');
const store = require('@graphql-mesh/store');
const yargs = _interopDefault(require('yargs'));
const helpers = require('yargs/helpers');

/* tslint:disable */

var definitions = {
	Cache: {
		additionalProperties: true,
		type: "object",
		title: "Cache",
		properties: {
			file: {
				$ref: "#/definitions/FileCacheConfig"
			},
			inmemoryLRU: {
				$ref: "#/definitions/InMemoryLRUConfig"
			},
			localforage: {
				$ref: "#/definitions/LocalforageConfig"
			},
			redis: {
				$ref: "#/definitions/RedisConfig"
			}
		}
	},
	FileCacheConfig: {
		additionalProperties: false,
		type: "object",
		title: "FileCacheConfig",
		properties: {
			path: {
				type: "string"
			}
		}
	},
	InMemoryLRUConfig: {
		additionalProperties: false,
		type: "object",
		title: "InMemoryLRUConfig",
		properties: {
			max: {
				type: "integer"
			}
		}
	},
	LocalforageConfig: {
		additionalProperties: false,
		type: "object",
		title: "LocalforageConfig",
		properties: {
			driver: {
				type: "array",
				items: {
					type: "string",
					"enum": [
						"WEBSQL",
						"INDEXEDDB",
						"LOCALSTORAGE"
					],
					description: "Allowed values: WEBSQL, INDEXEDDB, LOCALSTORAGE"
				},
				additionalItems: false,
				description: "Allowed values: WEBSQL, INDEXEDDB, LOCALSTORAGE"
			},
			name: {
				type: "string"
			},
			version: {
				type: "number"
			},
			size: {
				type: "integer"
			},
			storeName: {
				type: "string"
			},
			description: {
				type: "string"
			}
		}
	},
	RedisConfig: {
		additionalProperties: false,
		type: "object",
		title: "RedisConfig",
		properties: {
			host: {
				type: "string"
			},
			port: {
				type: "integer"
			},
			password: {
				type: "string"
			},
			url: {
				type: "string"
			}
		}
	},
	ServeConfig: {
		additionalProperties: false,
		type: "object",
		title: "ServeConfig",
		properties: {
			fork: {
				description: "Spawn multiple server instances as node clusters (default: `1`) (Any of: Int, Boolean)",
				anyOf: [
					{
						type: "integer"
					},
					{
						type: "boolean"
					}
				]
			},
			port: {
				description: "TCP Port to listen (default: `3000`) (Any of: Int, String)",
				anyOf: [
					{
						type: "integer"
					},
					{
						type: "string"
					}
				]
			},
			hostname: {
				type: "string",
				description: "The binding hostname (default: `localhost`)"
			},
			cors: {
				$ref: "#/definitions/CorsConfig",
				description: "Configuration for CORS"
			},
			handlers: {
				type: "array",
				items: {
					description: "Any of: WebhookHandler, ExpressHandler",
					anyOf: [
						{
							$ref: "#/definitions/WebhookHandler"
						},
						{
							$ref: "#/definitions/ExpressHandler"
						}
					]
				},
				additionalItems: false,
				description: "Express/Connect compatible handlers and middlewares extend GraphQL Mesh HTTP Server (Any of: WebhookHandler, ExpressHandler)"
			},
			staticFiles: {
				type: "string",
				description: "Path to your static files you want to be served with GraphQL Mesh HTTP Server"
			},
			playground: {
				type: "boolean",
				description: "Show GraphiQL Playground"
			},
			maxRequestBodySize: {
				description: "Controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the bytes library for parsing. Defaults to '100kb'. (Any of: Int, String)",
				anyOf: [
					{
						type: "integer"
					},
					{
						type: "string"
					}
				]
			},
			upload: {
				$ref: "#/definitions/UploadOptions",
				description: "Configuration for GraphQL File Upload"
			},
			sslCredentials: {
				$ref: "#/definitions/HTTPSConfig",
				description: "SSL Credentials for HTTPS Server\nIf this is provided, Mesh will be served via HTTPS"
			},
			endpoint: {
				type: "string",
				description: "Path to GraphQL Endpoint (default: /graphql)"
			},
			browser: {
				description: "Path to the browser that will be used by `mesh serve` to open a playground window in development mode\nThis feature can be disable by passing `false` (Any of: String, Boolean)",
				anyOf: [
					{
						type: "string"
					},
					{
						type: "boolean"
					}
				]
			},
			customServerHandler: {
				type: "string",
				description: "If you want to use a custom GraphQL server, you can pass the path of the code file that exports a custom Mesh Server Handler\nWith a custom server handler, you won't be able to use the features of GraphQL Mesh HTTP Server"
			}
		}
	},
	CorsConfig: {
		additionalProperties: false,
		type: "object",
		title: "CorsConfig",
		properties: {
			origin: {
				anyOf: [
					{
						type: "object",
						additionalProperties: true
					},
					{
						type: "string"
					},
					{
						type: "array",
						additionalItems: true
					}
				]
			},
			allowedHeaders: {
				type: "array",
				items: {
					type: "string"
				},
				additionalItems: false
			},
			exposedHeaders: {
				type: "array",
				items: {
					type: "string"
				},
				additionalItems: false
			},
			credentials: {
				type: "boolean"
			},
			maxAge: {
				type: "integer"
			},
			preflightContinue: {
				type: "boolean"
			},
			optionsSuccessStatus: {
				type: "integer"
			}
		}
	},
	ExpressHandler: {
		additionalProperties: false,
		type: "object",
		title: "ExpressHandler",
		properties: {
			path: {
				type: "string",
				description: "Path that the handler will control"
			},
			handler: {
				type: "string",
				description: "Path of the handler's code"
			},
			method: {
				type: "string",
				"enum": [
					"GET",
					"POST",
					"DELETE",
					"PATCH"
				],
				description: "HTTP Method that the handler will control (Allowed values: GET, POST, DELETE, PATCH)"
			}
		},
		required: [
			"path",
			"handler"
		]
	},
	WebhookHandler: {
		additionalProperties: false,
		type: "object",
		title: "WebhookHandler",
		properties: {
			path: {
				type: "string",
				description: "Path that remote API will ping"
			},
			method: {
				type: "string",
				"enum": [
					"GET",
					"POST",
					"DELETE",
					"PATCH"
				],
				description: "HTTP Method that the handler will control (Allowed values: GET, POST, DELETE, PATCH)"
			},
			pubsubTopic: {
				type: "string",
				description: "Name of the topic you want to pass incoming payload"
			},
			payload: {
				type: "string",
				description: "Part of the object you want to pass (e.g. `data.messages`)"
			}
		},
		required: [
			"path",
			"pubsubTopic"
		]
	},
	UploadOptions: {
		additionalProperties: false,
		type: "object",
		title: "UploadOptions",
		properties: {
			maxFileSize: {
				type: "integer",
				description: "Maximum File Size for GraphQL Upload (default: `100000000`)"
			},
			maxFiles: {
				type: "integer",
				description: "Maximum number of files for GraphQL Upload (default: `10`)"
			}
		}
	},
	HTTPSConfig: {
		additionalProperties: false,
		type: "object",
		title: "HTTPSConfig",
		properties: {
			key: {
				type: "string"
			},
			cert: {
				type: "string"
			}
		},
		required: [
			"key",
			"cert"
		]
	},
	SDKConfig: {
		additionalProperties: false,
		type: "object",
		title: "SDKConfig",
		properties: {
			generateOperations: {
				$ref: "#/definitions/GenerateOperationsConfig",
				description: "Use this only if you don't want to use `documents` for SDK,\nand let Mesh generate them for you"
			}
		}
	},
	GenerateOperationsConfig: {
		additionalProperties: false,
		type: "object",
		title: "GenerateOperationsConfig",
		properties: {
			selectionSetDepth: {
				type: "integer"
			}
		}
	},
	Source: {
		additionalProperties: false,
		type: "object",
		title: "Source",
		properties: {
			name: {
				type: "string",
				description: "The name you wish to set to your remote API, this will be used for building the GraphQL context"
			},
			handler: {
				$ref: "#/definitions/Handler",
				description: "Point to the handler you wish to use, it can either be a predefined handler, or a custom"
			},
			transforms: {
				type: "array",
				items: {
					$ref: "#/definitions/Transform"
				},
				additionalItems: false,
				description: "List of transforms to apply to the current API source, before unifying it with the rest of the sources"
			}
		},
		required: [
			"name",
			"handler"
		]
	},
	Transform: {
		additionalProperties: true,
		type: "object",
		title: "Transform",
		properties: {
			cache: {
				type: "array",
				items: {
					$ref: "#/definitions/CacheTransformConfig"
				},
				additionalItems: false,
				description: "Transformer to apply caching for your data sources"
			},
			encapsulate: {
				$ref: "#/definitions/EncapsulateTransformObject",
				description: "Transformer to apply encapsulation to the API source, by creating a field for it under the root query"
			},
			extend: {
				$ref: "#/definitions/ExtendTransform"
			},
			federation: {
				$ref: "#/definitions/FederationTransform"
			},
			filterSchema: {
				description: "Transformer to filter (white/black list) GraphQL types, fields and arguments (Any of: FilterSchemaTransform, Any)",
				anyOf: [
					{
						$ref: "#/definitions/FilterSchemaTransform"
					},
					{
						anyOf: [
							{
								type: "object",
								additionalProperties: true
							},
							{
								type: "string"
							},
							{
								type: "array",
								additionalItems: true
							}
						]
					}
				]
			},
			mock: {
				$ref: "#/definitions/MockingConfig",
				description: "Mock configuration for your source"
			},
			namingConvention: {
				$ref: "#/definitions/NamingConventionTransformConfig",
				description: "Transformer to apply naming convention to GraphQL Types"
			},
			prefix: {
				$ref: "#/definitions/PrefixTransformConfig",
				description: "Prefix transform"
			},
			rename: {
				description: "Transformer to rename GraphQL types and fields (Any of: RenameTransform, Any)",
				anyOf: [
					{
						$ref: "#/definitions/RenameTransform"
					},
					{
						anyOf: [
							{
								type: "object",
								additionalProperties: true
							},
							{
								type: "string"
							},
							{
								type: "array",
								additionalItems: true
							}
						]
					}
				]
			},
			resolversComposition: {
				description: "Transformer to apply composition to resolvers (Any of: ResolversCompositionTransform, Any)",
				anyOf: [
					{
						$ref: "#/definitions/ResolversCompositionTransform"
					},
					{
						anyOf: [
							{
								type: "object",
								additionalProperties: true
							},
							{
								type: "string"
							},
							{
								type: "array",
								additionalItems: true
							}
						]
					}
				]
			},
			snapshot: {
				$ref: "#/definitions/SnapshotTransformConfig",
				description: "Configuration for Snapshot extension"
			},
			typeMerging: {
				$ref: "#/definitions/TypeMergingConfig",
				description: "[Type Merging](https://www.graphql-tools.com/docs/stitch-type-merging) Configuration"
			}
		}
	},
	Handler: {
		additionalProperties: true,
		type: "object",
		title: "Handler",
		properties: {
			graphql: {
				$ref: "#/definitions/GraphQLHandler",
				description: "Handler for remote/local/third-party GraphQL schema"
			},
			grpc: {
				$ref: "#/definitions/GrpcHandler",
				description: "Handler for gRPC and Protobuf schemas"
			},
			JsonSchema: {
				$ref: "#/definitions/JsonSchemaHandler",
				description: "Handler for JSON Schema specification. Source could be a local json file, or a url to it."
			},
			mongoose: {
				$ref: "#/definitions/MongooseHandler"
			},
			mysql: {
				$ref: "#/definitions/MySQLHandler"
			},
			neo4j: {
				$ref: "#/definitions/Neo4jHandler",
				description: "Handler for Neo4j"
			},
			odata: {
				$ref: "#/definitions/ODataHandler",
				description: "Handler for OData"
			},
			openapi: {
				$ref: "#/definitions/OpenapiHandler",
				description: "Handler for Swagger / OpenAPI 2/3 specification. Source could be a local json/swagger file, or a url to it."
			},
			postgraphile: {
				$ref: "#/definitions/PostGraphileHandler",
				description: "Handler for Postgres database, based on `postgraphile`"
			},
			soap: {
				$ref: "#/definitions/SoapHandler",
				description: "Handler for SOAP"
			},
			thrift: {
				$ref: "#/definitions/ThriftHandler",
				description: "Handler for OData"
			},
			tuql: {
				$ref: "#/definitions/TuqlHandler",
				description: "Handler for SQLite database, based on `tuql`"
			}
		}
	},
	AdditionalStitchingResolverObject: {
		additionalProperties: false,
		type: "object",
		title: "AdditionalStitchingResolverObject",
		properties: {
			sourceName: {
				type: "string"
			},
			sourceTypeName: {
				type: "string"
			},
			sourceFieldName: {
				type: "string"
			},
			sourceSelectionSet: {
				type: "string"
			},
			requiredSelectionSet: {
				type: "string"
			},
			sourceArgs: {
				type: "object",
				properties: {
				}
			},
			targetTypeName: {
				type: "string"
			},
			targetFieldName: {
				type: "string"
			},
			result: {
				type: "string",
				description: "Extract specific property from the result"
			},
			resultType: {
				type: "string",
				description: "If return types don't match,\nyou can specify a result type to apply inline fragment"
			}
		},
		required: [
			"sourceName",
			"sourceTypeName",
			"sourceFieldName",
			"targetTypeName",
			"targetFieldName"
		]
	},
	AdditionalStitchingBatchResolverObject: {
		additionalProperties: false,
		type: "object",
		title: "AdditionalStitchingBatchResolverObject",
		properties: {
			sourceName: {
				type: "string"
			},
			sourceTypeName: {
				type: "string"
			},
			sourceFieldName: {
				type: "string"
			},
			sourceSelectionSet: {
				type: "string"
			},
			requiredSelectionSet: {
				type: "string"
			},
			keyField: {
				type: "string"
			},
			keysArg: {
				type: "string"
			},
			additionalArgs: {
				type: "object",
				properties: {
				}
			},
			targetTypeName: {
				type: "string"
			},
			targetFieldName: {
				type: "string"
			},
			result: {
				type: "string",
				description: "Extract specific property from the result"
			},
			resultType: {
				type: "string",
				description: "If return types don't match,\nyou can specify a result type to apply inline fragment"
			}
		},
		required: [
			"sourceName",
			"sourceTypeName",
			"sourceFieldName",
			"keyField",
			"keysArg",
			"targetTypeName",
			"targetFieldName"
		]
	},
	AdditionalSubscriptionObject: {
		additionalProperties: false,
		type: "object",
		title: "AdditionalSubscriptionObject",
		properties: {
			targetTypeName: {
				type: "string"
			},
			targetFieldName: {
				type: "string"
			},
			pubsubTopic: {
				type: "string"
			},
			result: {
				type: "string"
			},
			filterBy: {
				type: "string"
			}
		},
		required: [
			"targetTypeName",
			"targetFieldName",
			"pubsubTopic"
		]
	},
	PubSubConfig: {
		additionalProperties: false,
		type: "object",
		title: "PubSubConfig",
		properties: {
			name: {
				type: "string"
			},
			config: {
				anyOf: [
					{
						type: "object",
						additionalProperties: true
					},
					{
						type: "string"
					},
					{
						type: "array",
						additionalItems: true
					}
				]
			}
		},
		required: [
			"name"
		]
	},
	LiveQueryInvalidation: {
		additionalProperties: false,
		type: "object",
		title: "LiveQueryInvalidation",
		properties: {
			field: {
				type: "string"
			},
			invalidate: {
				type: "array",
				items: {
					type: "string"
				},
				additionalItems: false
			}
		},
		required: [
			"field",
			"invalidate"
		]
	},
	GraphQLHandler: {
		additionalProperties: false,
		type: "object",
		title: "GraphQLHandler",
		properties: {
			endpoint: {
				type: "string",
				description: "A url or file path to your remote GraphQL endpoint.\nIf you provide a path to a code file(js or ts),\nother options will be ignored and the schema exported from the file will be used directly."
			},
			schemaHeaders: {
				anyOf: [
					{
						type: "object",
						additionalProperties: true
					},
					{
						type: "string"
					},
					{
						type: "array",
						additionalItems: true
					}
				],
				description: "JSON object representing the Headers to add to the runtime of the API calls only for schema introspection\nYou can also provide `.js` or `.ts` file path that exports schemaHeaders as an object"
			},
			operationHeaders: {
				type: "object",
				properties: {
				},
				description: "JSON object representing the Headers to add to the runtime of the API calls only for operation during runtime"
			},
			useGETForQueries: {
				type: "boolean",
				description: "Use HTTP GET for Query operations"
			},
			method: {
				type: "string",
				"enum": [
					"GET",
					"POST"
				],
				description: "HTTP method used for GraphQL operations (Allowed values: GET, POST)"
			},
			customFetch: {
				anyOf: [
					{
						type: "object",
						additionalProperties: true
					},
					{
						type: "string"
					},
					{
						type: "array",
						additionalItems: true
					}
				],
				description: "Path to a custom W3 Compatible Fetch Implementation"
			},
			webSocketImpl: {
				type: "string",
				description: "Path to a custom W3 Compatible WebSocket Implementation"
			},
			introspection: {
				type: "string",
				description: "Path to the introspection\nYou can seperately give schema introspection"
			},
			multipart: {
				type: "boolean",
				description: "Enable multipart/formdata in order to support file uploads"
			},
			batch: {
				type: "boolean",
				description: "Batch requests"
			},
			subscriptionsProtocol: {
				type: "string",
				"enum": [
					"SSE",
					"WS",
					"LEGACY_WS"
				],
				description: "SSE - Server Sent Events\nWS - New graphql-ws\nLEGACY_WS - Legacy subscriptions-transport-ws (Allowed values: SSE, WS, LEGACY_WS)"
			}
		},
		required: [
			"endpoint"
		]
	},
	GrpcHandler: {
		additionalProperties: false,
		type: "object",
		title: "GrpcHandler",
		properties: {
			endpoint: {
				type: "string",
				description: "gRPC Endpoint"
			},
			protoFilePath: {
				description: "gRPC Proto file that contains your protobuf schema (Any of: ProtoFilePath, String)",
				anyOf: [
					{
						$ref: "#/definitions/ProtoFilePath"
					},
					{
						type: "string"
					}
				]
			},
			descriptorSetFilePath: {
				description: "Use a binary-encoded or JSON file descriptor set file (Any of: ProtoFilePath, String)",
				anyOf: [
					{
						$ref: "#/definitions/ProtoFilePath"
					},
					{
						type: "string"
					}
				]
			},
			requestTimeout: {
				type: "integer",
				description: "Request timeout in milliseconds\nDefault: 200000"
			},
			credentialsSsl: {
				$ref: "#/definitions/GrpcCredentialsSsl",
				description: "SSL Credentials"
			},
			useHTTPS: {
				type: "boolean",
				description: "Use https instead of http for gRPC connection"
			},
			metaData: {
				type: "object",
				properties: {
				},
				description: "MetaData"
			},
			useReflection: {
				type: "boolean",
				description: "Use gRPC reflection to automatically gather the connection"
			}
		},
		required: [
			"endpoint"
		]
	},
	LoadOptions: {
		additionalProperties: false,
		type: "object",
		title: "LoadOptions",
		properties: {
			defaults: {
				type: "boolean"
			},
			includeDirs: {
				type: "array",
				items: {
					type: "string"
				},
				additionalItems: false
			}
		}
	},
	ProtoFilePath: {
		additionalProperties: false,
		type: "object",
		title: "ProtoFilePath",
		properties: {
			file: {
				type: "string"
			},
			load: {
				$ref: "#/definitions/LoadOptions"
			}
		},
		required: [
			"file"
		]
	},
	GrpcCredentialsSsl: {
		additionalProperties: false,
		type: "object",
		title: "GrpcCredentialsSsl",
		properties: {
			rootCA: {
				type: "string"
			},
			certChain: {
				type: "string"
			},
			privateKey: {
				type: "string"
			}
		}
	},
	JsonSchemaHandler: {
		additionalProperties: false,
		type: "object",
		title: "JsonSchemaHandler",
		properties: {
			baseUrl: {
				type: "string"
			},
			operationHeaders: {
				type: "object",
				properties: {
				}
			},
			schemaHeaders: {
				type: "object",
				properties: {
				}
			},
			operations: {
				type: "array",
				items: {
					$ref: "#/definitions/JsonSchemaOperation"
				},
				additionalItems: false
			},
			disableTimestampScalar: {
				type: "boolean"
			},
			errorMessage: {
				type: "string",
				description: "Field name of your custom error object (default: 'message')"
			}
		},
		required: [
			"operations"
		]
	},
	JsonSchemaOperation: {
		additionalProperties: false,
		type: "object",
		title: "JsonSchemaOperation",
		properties: {
			field: {
				type: "string"
			},
			path: {
				type: "string"
			},
			pubsubTopic: {
				type: "string"
			},
			description: {
				type: "string"
			},
			type: {
				type: "string",
				"enum": [
					"Query",
					"Mutation",
					"Subscription"
				],
				description: "Allowed values: Query, Mutation, Subscription"
			},
			method: {
				type: "string",
				"enum": [
					"GET",
					"HEAD",
					"POST",
					"PUT",
					"DELETE",
					"CONNECT",
					"OPTIONS",
					"TRACE",
					"PATCH"
				],
				description: "Allowed values: GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH"
			},
			requestSchema: {
				anyOf: [
					{
						type: "object",
						additionalProperties: true
					},
					{
						type: "string"
					},
					{
						type: "array",
						additionalItems: true
					}
				]
			},
			requestSample: {
				anyOf: [
					{
						type: "object",
						additionalProperties: true
					},
					{
						type: "string"
					},
					{
						type: "array",
						additionalItems: true
					}
				]
			},
			requestTypeName: {
				type: "string"
			},
			responseSchema: {
				anyOf: [
					{
						type: "object",
						additionalProperties: true
					},
					{
						type: "string"
					},
					{
						type: "array",
						additionalItems: true
					}
				]
			},
			responseSample: {
				anyOf: [
					{
						type: "object",
						additionalProperties: true
					},
					{
						type: "string"
					},
					{
						type: "array",
						additionalItems: true
					}
				]
			},
			responseTypeName: {
				type: "string"
			},
			argTypeMap: {
				type: "object",
				properties: {
				}
			},
			headers: {
				type: "object",
				properties: {
				}
			}
		},
		required: [
			"field",
			"type"
		]
	},
	MongooseHandler: {
		additionalProperties: false,
		type: "object",
		title: "MongooseHandler",
		properties: {
			connectionString: {
				type: "string"
			},
			models: {
				type: "array",
				items: {
					$ref: "#/definitions/MongooseModel"
				},
				additionalItems: false
			},
			discriminators: {
				type: "array",
				items: {
					$ref: "#/definitions/MongooseModel"
				},
				additionalItems: false
			},
			autoTypeMerging: {
				type: "boolean",
				description: "Enable Automatic Type Merging/Federation support"
			}
		}
	},
	MongooseModel: {
		additionalProperties: false,
		type: "object",
		title: "MongooseModel",
		properties: {
			name: {
				type: "string"
			},
			path: {
				type: "string"
			},
			options: {
				$ref: "#/definitions/ComposeWithMongooseOpts"
			}
		},
		required: [
			"name",
			"path"
		]
	},
	ComposeWithMongooseOpts: {
		additionalProperties: false,
		type: "object",
		title: "ComposeWithMongooseOpts",
		properties: {
			name: {
				type: "string"
			},
			description: {
				type: "string"
			},
			fields: {
				$ref: "#/definitions/ComposeWithMongooseFieldsOpts"
			},
			inputType: {
				$ref: "#/definitions/ComposeMongooseInputType"
			},
			resolvers: {
				$ref: "#/definitions/TypeConverterResolversOpts"
			}
		}
	},
	ComposeMongooseInputType: {
		additionalProperties: false,
		type: "object",
		title: "ComposeMongooseInputType",
		properties: {
			name: {
				type: "string"
			},
			description: {
				type: "string"
			},
			fields: {
				$ref: "#/definitions/ComposeWithMongooseFieldsOpts"
			},
			resolvers: {
				$ref: "#/definitions/TypeConverterResolversOpts"
			}
		}
	},
	ComposeWithMongooseFieldsOpts: {
		additionalProperties: false,
		type: "object",
		title: "ComposeWithMongooseFieldsOpts",
		properties: {
			only: {
				type: "array",
				items: {
					type: "string"
				},
				additionalItems: false
			},
			remove: {
				type: "array",
				items: {
					type: "string"
				},
				additionalItems: false
			},
			required: {
				type: "array",
				items: {
					type: "string"
				},
				additionalItems: false
			}
		}
	},
	TypeConverterResolversOpts: {
		additionalProperties: false,
		type: "object",
		title: "TypeConverterResolversOpts",
		properties: {
			findById: {
				description: "Any of: Boolean, ComposeWithMongooseResolverOpts",
				anyOf: [
					{
						type: "boolean"
					},
					{
						$ref: "#/definitions/ComposeWithMongooseResolverOpts"
					}
				]
			},
			findByIds: {
				description: "Any of: Boolean, ComposeWithMongooseResolverOpts",
				anyOf: [
					{
						type: "boolean"
					},
					{
						$ref: "#/definitions/ComposeWithMongooseResolverOpts"
					}
				]
			},
			findOne: {
				description: "Any of: Boolean, ComposeWithMongooseResolverOpts",
				anyOf: [
					{
						type: "boolean"
					},
					{
						$ref: "#/definitions/ComposeWithMongooseResolverOpts"
					}
				]
			},
			findMany: {
				description: "Any of: Boolean, ComposeWithMongooseResolverOpts",
				anyOf: [
					{
						type: "boolean"
					},
					{
						$ref: "#/definitions/ComposeWithMongooseResolverOpts"
					}
				]
			},
			updateById: {
				description: "Any of: Boolean, ComposeWithMongooseResolverOpts",
				anyOf: [
					{
						type: "boolean"
					},
					{
						$ref: "#/definitions/ComposeWithMongooseResolverOpts"
					}
				]
			},
			updateOne: {
				description: "Any of: Boolean, ComposeWithMongooseResolverOpts",
				anyOf: [
					{
						type: "boolean"
					},
					{
						$ref: "#/definitions/ComposeWithMongooseResolverOpts"
					}
				]
			},
			updateMany: {
				description: "Any of: Boolean, ComposeWithMongooseResolverOpts",
				anyOf: [
					{
						type: "boolean"
					},
					{
						$ref: "#/definitions/ComposeWithMongooseResolverOpts"
					}
				]
			},
			removeById: {
				description: "Any of: Boolean, ComposeWithMongooseResolverOpts",
				anyOf: [
					{
						type: "boolean"
					},
					{
						$ref: "#/definitions/ComposeWithMongooseResolverOpts"
					}
				]
			},
			removeOne: {
				description: "Any of: Boolean, ComposeWithMongooseResolverOpts",
				anyOf: [
					{
						type: "boolean"
					},
					{
						$ref: "#/definitions/ComposeWithMongooseResolverOpts"
					}
				]
			},
			removeMany: {
				description: "Any of: Boolean, ComposeWithMongooseResolverOpts",
				anyOf: [
					{
						type: "boolean"
					},
					{
						$ref: "#/definitions/ComposeWithMongooseResolverOpts"
					}
				]
			},
			createOne: {
				description: "Any of: Boolean, ComposeWithMongooseResolverOpts",
				anyOf: [
					{
						type: "boolean"
					},
					{
						$ref: "#/definitions/ComposeWithMongooseResolverOpts"
					}
				]
			},
			createMany: {
				description: "Any of: Boolean, ComposeWithMongooseResolverOpts",
				anyOf: [
					{
						type: "boolean"
					},
					{
						$ref: "#/definitions/ComposeWithMongooseResolverOpts"
					}
				]
			},
			count: {
				description: "Any of: Boolean, ComposeWithMongooseResolverOpts",
				anyOf: [
					{
						type: "boolean"
					},
					{
						$ref: "#/definitions/ComposeWithMongooseResolverOpts"
					}
				]
			},
			connection: {
				description: "Any of: Boolean, JSON",
				anyOf: [
					{
						type: "boolean"
					},
					{
						type: "object",
						properties: {
						}
					}
				]
			},
			pagination: {
				description: "Any of: Boolean, PaginationResolverOpts",
				anyOf: [
					{
						type: "boolean"
					},
					{
						$ref: "#/definitions/PaginationResolverOpts"
					}
				]
			}
		}
	},
	ComposeWithMongooseResolverOpts: {
		additionalProperties: false,
		type: "object",
		title: "ComposeWithMongooseResolverOpts",
		properties: {
			filter: {
				$ref: "#/definitions/FilterHelperArgsOpts"
			},
			sort: {
				$ref: "#/definitions/SortHelperArgsOpts"
			},
			limit: {
				$ref: "#/definitions/LimitHelperArgsOpts"
			},
			record: {
				$ref: "#/definitions/RecordHelperArgsOpts"
			},
			skip: {
				type: "boolean"
			}
		}
	},
	FilterHelperArgsOpts: {
		additionalProperties: false,
		type: "object",
		title: "FilterHelperArgsOpts",
		properties: {
			filterTypeName: {
				type: "string"
			},
			isRequired: {
				type: "boolean"
			},
			onlyIndexed: {
				type: "boolean"
			},
			requiredFields: {
				type: "array",
				items: {
					type: "string"
				},
				additionalItems: false
			},
			operators: {
				description: "Any of: Boolean, JSON",
				anyOf: [
					{
						type: "boolean"
					},
					{
						type: "object",
						properties: {
						}
					}
				]
			},
			removeFields: {
				type: "array",
				items: {
					type: "string"
				},
				additionalItems: false
			}
		}
	},
	SortHelperArgsOpts: {
		additionalProperties: false,
		type: "object",
		title: "SortHelperArgsOpts",
		properties: {
			sortTypeName: {
				type: "string"
			}
		}
	},
	LimitHelperArgsOpts: {
		additionalProperties: false,
		type: "object",
		title: "LimitHelperArgsOpts",
		properties: {
			defaultValue: {
				type: "integer"
			}
		}
	},
	RecordHelperArgsOpts: {
		additionalProperties: false,
		type: "object",
		title: "RecordHelperArgsOpts",
		properties: {
			recordTypeName: {
				type: "string"
			},
			isRequired: {
				type: "boolean"
			},
			removeFields: {
				type: "array",
				items: {
					type: "string"
				},
				additionalItems: false
			},
			requiredFields: {
				type: "array",
				items: {
					type: "string"
				},
				additionalItems: false
			}
		}
	},
	PaginationResolverOpts: {
		additionalProperties: false,
		type: "object",
		title: "PaginationResolverOpts",
		properties: {
			perPage: {
				type: "integer"
			}
		}
	},
	MySQLHandler: {
		additionalProperties: false,
		type: "object",
		title: "MySQLHandler",
		properties: {
			host: {
				type: "string"
			},
			port: {
				type: "integer"
			},
			user: {
				type: "string"
			},
			password: {
				type: "string"
			},
			database: {
				type: "string"
			},
			pool: {
				anyOf: [
					{
						type: "object",
						additionalProperties: true
					},
					{
						type: "string"
					},
					{
						type: "array",
						additionalItems: true
					}
				],
				description: "Use existing `Pool` instance\nFormat: modulePath#exportName"
			},
			tables: {
				type: "array",
				items: {
					type: "string"
				},
				additionalItems: false,
				description: "Use specific tables for your schema"
			},
			tableFields: {
				type: "array",
				items: {
					$ref: "#/definitions/TableField"
				},
				additionalItems: false,
				description: "Use specific fields of specific tables"
			}
		}
	},
	TableField: {
		additionalProperties: false,
		type: "object",
		title: "TableField",
		properties: {
			table: {
				type: "string"
			},
			fields: {
				type: "array",
				items: {
					type: "string"
				},
				additionalItems: false
			}
		},
		required: [
			"table",
			"fields"
		]
	},
	Neo4jHandler: {
		additionalProperties: false,
		type: "object",
		title: "Neo4jHandler",
		properties: {
			url: {
				type: "string",
				description: "URL for the Neo4j Instance e.g. neo4j://localhost"
			},
			username: {
				type: "string",
				description: "Username for basic authentication"
			},
			password: {
				type: "string",
				description: "Password for basic authentication"
			},
			alwaysIncludeRelationships: {
				type: "boolean",
				description: "Specifies whether relationships should always be included in the type definitions as [relationship](https://grandstack.io/docs/neo4j-graphql-js.html#relationship-types) types, even if the relationships do not have properties."
			},
			database: {
				type: "string",
				description: "Specifies database name"
			},
			typeDefs: {
				type: "string",
				description: "Provide GraphQL Type Definitions instead of inferring"
			}
		},
		required: [
			"url",
			"username",
			"password"
		]
	},
	ODataHandler: {
		additionalProperties: false,
		type: "object",
		title: "ODataHandler",
		properties: {
			baseUrl: {
				type: "string",
				description: "Base URL for OData API"
			},
			metadata: {
				type: "string",
				description: "Custom $metadata File or URL"
			},
			operationHeaders: {
				type: "object",
				properties: {
				},
				description: "Headers to be used with the operation requests"
			},
			schemaHeaders: {
				type: "object",
				properties: {
				},
				description: "Headers to be used with the $metadata requests"
			},
			batch: {
				type: "string",
				"enum": [
					"multipart",
					"json"
				],
				description: "Enable batching (Allowed values: multipart, json)"
			},
			expandNavProps: {
				type: "boolean",
				description: "Use $expand for navigation props instead of seperate HTTP requests (Default: false)"
			},
			customFetch: {
				anyOf: [
					{
						type: "object",
						additionalProperties: true
					},
					{
						type: "string"
					},
					{
						type: "array",
						additionalItems: true
					}
				],
				description: "Custom Fetch"
			}
		},
		required: [
			"baseUrl"
		]
	},
	OpenapiHandler: {
		additionalProperties: false,
		type: "object",
		title: "OpenapiHandler",
		properties: {
			source: {
				anyOf: [
					{
						type: "object",
						additionalProperties: true
					},
					{
						type: "string"
					},
					{
						type: "array",
						additionalItems: true
					}
				],
				description: "A pointer to your API source - could be a local file, remote file or url endpoint"
			},
			sourceFormat: {
				type: "string",
				"enum": [
					"json",
					"yaml"
				],
				description: "Format of the source file (Allowed values: json, yaml)"
			},
			operationHeaders: {
				type: "object",
				properties: {
				},
				description: "JSON object representing the Headers to add to the runtime of the API calls"
			},
			schemaHeaders: {
				type: "object",
				properties: {
				},
				description: "If you are using a remote URL endpoint to fetch your schema, you can set headers for the HTTP request to fetch your schema."
			},
			baseUrl: {
				type: "string",
				description: "Specifies the URL on which all paths will be based on.\nOverrides the server object in the OAS."
			},
			qs: {
				type: "object",
				properties: {
				},
				description: "JSON object representing the query search parameters to add to the API calls"
			},
			customFetch: {
				anyOf: [
					{
						type: "object",
						additionalProperties: true
					},
					{
						type: "string"
					},
					{
						type: "array",
						additionalItems: true
					}
				],
				description: "W3 Compatible Fetch Implementation"
			},
			includeHttpDetails: {
				type: "boolean",
				description: "Include HTTP Response details to the result object"
			},
			addLimitArgument: {
				type: "boolean",
				description: "Auto-generate a 'limit' argument for all fields that return lists of objects, including ones produced by links"
			},
			genericPayloadArgName: {
				type: "boolean",
				description: "Set argument name for mutation payload to 'requestBody'. If false, name defaults to camelCased pathname"
			},
			selectQueryOrMutationField: {
				type: "array",
				items: {
					$ref: "#/definitions/SelectQueryOrMutationFieldConfig"
				},
				additionalItems: false,
				description: "Allows to explicitly override the default operation (Query or Mutation) for any OAS operation"
			}
		},
		required: [
			"source"
		]
	},
	SelectQueryOrMutationFieldConfig: {
		additionalProperties: false,
		type: "object",
		title: "SelectQueryOrMutationFieldConfig",
		properties: {
			title: {
				type: "string",
				description: "OAS Title"
			},
			path: {
				type: "string",
				description: "Operation Path"
			},
			type: {
				type: "string",
				"enum": [
					"Query",
					"Mutation"
				],
				description: "Target Root Type for this operation (Allowed values: Query, Mutation)"
			},
			method: {
				type: "string",
				description: "Which method is used for this operation"
			}
		}
	},
	PostGraphileHandler: {
		additionalProperties: false,
		type: "object",
		title: "PostGraphileHandler",
		properties: {
			connectionString: {
				type: "string",
				description: "A connection string to your Postgres database"
			},
			schemaName: {
				type: "array",
				items: {
					type: "string"
				},
				additionalItems: false,
				description: "An array of strings which specifies the PostgreSQL schemas that PostGraphile will use to create a GraphQL schema. The default schema is the public schema."
			},
			pool: {
				anyOf: [
					{
						type: "object",
						additionalProperties: true
					},
					{
						type: "string"
					},
					{
						type: "array",
						additionalItems: true
					}
				],
				description: "Connection Pool instance or settings or you can provide the path of a code file that exports any of those"
			},
			appendPlugins: {
				type: "array",
				items: {
					type: "string"
				},
				additionalItems: false,
				description: "Extra Postgraphile Plugins to append"
			},
			skipPlugins: {
				type: "array",
				items: {
					type: "string"
				},
				additionalItems: false,
				description: "Postgraphile Plugins to skip (e.g. \"graphile-build#NodePlugin\")"
			},
			options: {
				description: "Extra Postgraphile options that will be added to the postgraphile constructor. It can either be an object or a string pointing to the object's path (e.g. \"./my-config#options\"). See the [postgraphile docs](https://www.graphile.org/postgraphile/usage-library/) for more information. (Any of: JSON, String)",
				anyOf: [
					{
						type: "object",
						properties: {
						}
					},
					{
						type: "string"
					}
				]
			},
			subscriptions: {
				type: "boolean",
				description: "Enable GraphQL websocket transport support for subscriptions (default: true)"
			},
			live: {
				type: "boolean",
				description: "Enables live-query support via GraphQL subscriptions (sends updated payload any time nested collections/records change) (default: true)"
			}
		}
	},
	SoapHandler: {
		additionalProperties: false,
		type: "object",
		title: "SoapHandler",
		properties: {
			wsdl: {
				type: "string",
				description: "A url to your WSDL"
			},
			basicAuth: {
				$ref: "#/definitions/SoapSecurityBasicAuthConfig",
				description: "Basic Authentication Configuration\nIncluding username and password fields"
			},
			securityCert: {
				$ref: "#/definitions/SoapSecurityCertificateConfig",
				description: "SSL Certificate Based Authentication Configuration\nIncluding public key, private key and password fields"
			},
			schemaHeaders: {
				anyOf: [
					{
						type: "object",
						additionalProperties: true
					},
					{
						type: "string"
					},
					{
						type: "array",
						additionalItems: true
					}
				],
				description: "JSON object representing the Headers to add to the runtime of the API calls only for schema introspection\nYou can also provide `.js` or `.ts` file path that exports schemaHeaders as an object"
			},
			operationHeaders: {
				type: "object",
				properties: {
				},
				description: "JSON object representing the Headers to add to the runtime of the API calls only for operation during runtime"
			}
		},
		required: [
			"wsdl"
		]
	},
	SoapSecurityBasicAuthConfig: {
		additionalProperties: false,
		type: "object",
		title: "SoapSecurityBasicAuthConfig",
		properties: {
			username: {
				type: "string",
				description: "Username for Basic Authentication"
			},
			password: {
				type: "string",
				description: "Password for Basic Authentication"
			}
		},
		required: [
			"username",
			"password"
		]
	},
	SoapSecurityCertificateConfig: {
		additionalProperties: false,
		type: "object",
		title: "SoapSecurityCertificateConfig",
		properties: {
			publicKey: {
				type: "string",
				description: "Your public key"
			},
			privateKey: {
				type: "string",
				description: "Your private key"
			},
			password: {
				type: "string",
				description: "Password"
			},
			publicKeyPath: {
				type: "string",
				description: "Path to the file or URL contains your public key"
			},
			privateKeyPath: {
				type: "string",
				description: "Path to the file or URL contains your private key"
			},
			passwordPath: {
				type: "string",
				description: "Path to the file or URL contains your password"
			}
		}
	},
	ThriftHandler: {
		additionalProperties: false,
		type: "object",
		title: "ThriftHandler",
		properties: {
			hostName: {
				type: "string",
				description: "The name of the host to connect to."
			},
			port: {
				type: "integer",
				description: "The port number to attach to on the host."
			},
			path: {
				type: "string",
				description: "The path on which the Thrift service is listening. Defaults to '/thrift'."
			},
			https: {
				type: "boolean",
				description: "Boolean value indicating whether to use https. Defaults to false."
			},
			protocol: {
				type: "string",
				"enum": [
					"binary",
					"compact",
					"json"
				],
				description: "Name of the Thrift protocol type to use. Defaults to 'binary'. (Allowed values: binary, compact, json)"
			},
			serviceName: {
				type: "string",
				description: "The name of your service. Used for logging."
			},
			operationHeaders: {
				type: "object",
				properties: {
				},
				description: "JSON object representing the Headers to add to the runtime of the API calls"
			},
			schemaHeaders: {
				type: "object",
				properties: {
				},
				description: "If you are using a remote URL endpoint to fetch your schema, you can set headers for the HTTP request to fetch your schema."
			},
			idl: {
				type: "string",
				description: "Path to IDL file"
			}
		},
		required: [
			"hostName",
			"port",
			"serviceName",
			"idl"
		]
	},
	CacheTransformConfig: {
		additionalProperties: false,
		type: "object",
		title: "CacheTransformConfig",
		properties: {
			field: {
				type: "string",
				description: "The type and field to apply cache to, you can use wild cards as well, for example: `Query.*`"
			},
			cacheKey: {
				type: "string",
				description: "Cache key to use to store your resolvers responses.\nThe defualt is: {typeName}-{fieldName}-{argsHash}-{fieldNamesHash}\n\nAvailable variables:\n- {args.argName} - use resolver argument\n- {typeName} - use name of the type\n- {fieldName} - use name of the field\n- {argsHash} - a hash based on the 'args' object\n- {fieldNamesHash} - a hash based on the field names selected by the client\n- {info} - the GraphQLResolveInfo of the resolver\n\nAvailable interpolations:\n- {format|date} - returns the current date with a specific format"
			},
			invalidate: {
				$ref: "#/definitions/CacheInvalidateConfig",
				description: "Invalidation rules"
			}
		},
		required: [
			"field"
		]
	},
	CacheInvalidateConfig: {
		additionalProperties: false,
		type: "object",
		title: "CacheInvalidateConfig",
		properties: {
			effectingOperations: {
				type: "array",
				items: {
					$ref: "#/definitions/CacheEffectingOperationConfig"
				},
				additionalItems: false,
				description: "Invalidate the cache when a specific operation is done without an error"
			},
			ttl: {
				type: "integer",
				description: "Specified in seconds, the time-to-live (TTL) value limits the lifespan"
			}
		}
	},
	CacheEffectingOperationConfig: {
		additionalProperties: false,
		type: "object",
		title: "CacheEffectingOperationConfig",
		properties: {
			operation: {
				type: "string",
				description: "Path to the operation that could effect it. In a form: Mutation.something. Note that wildcard is not supported in this field."
			},
			matchKey: {
				type: "string",
				description: "Cache key to invalidate on sucessful resolver (no error), see `cacheKey` for list of available options in this field."
			}
		},
		required: [
			"operation"
		]
	},
	EncapsulateTransformObject: {
		additionalProperties: false,
		type: "object",
		title: "EncapsulateTransformObject",
		properties: {
			name: {
				type: "string",
				description: "Optional, name to use for grouping under the root types. If not specific, the API name is used."
			},
			applyTo: {
				$ref: "#/definitions/EncapsulateTransformApplyTo",
				description: "Allow you to choose which root operations you would like to apply. By default, it's applied to all root types."
			}
		}
	},
	EncapsulateTransformApplyTo: {
		additionalProperties: false,
		type: "object",
		title: "EncapsulateTransformApplyTo",
		properties: {
			query: {
				type: "boolean"
			},
			mutation: {
				type: "boolean"
			},
			subscription: {
				type: "boolean"
			}
		}
	},
	ExtendTransform: {
		additionalProperties: false,
		type: "object",
		title: "ExtendTransform",
		properties: {
			typeDefs: {
				anyOf: [
					{
						type: "object",
						additionalProperties: true
					},
					{
						type: "string"
					},
					{
						type: "array",
						additionalItems: true
					}
				]
			},
			resolvers: {
				anyOf: [
					{
						type: "object",
						additionalProperties: true
					},
					{
						type: "string"
					},
					{
						type: "array",
						additionalItems: true
					}
				]
			}
		}
	},
	FederationTransform: {
		additionalProperties: false,
		type: "object",
		title: "FederationTransform",
		properties: {
			types: {
				type: "array",
				items: {
					$ref: "#/definitions/FederationTransformType"
				},
				additionalItems: false
			}
		}
	},
	FederationTransformType: {
		additionalProperties: false,
		type: "object",
		title: "FederationTransformType",
		properties: {
			name: {
				type: "string"
			},
			config: {
				$ref: "#/definitions/FederationObjectConfig"
			}
		},
		required: [
			"name"
		]
	},
	FederationObjectConfig: {
		additionalProperties: false,
		type: "object",
		title: "FederationObjectConfig",
		properties: {
			keyFields: {
				type: "array",
				items: {
					type: "string"
				},
				additionalItems: false
			},
			extend: {
				type: "boolean"
			},
			fields: {
				type: "array",
				items: {
					$ref: "#/definitions/FederationField"
				},
				additionalItems: false
			},
			resolveReference: {
				description: "Any of: String, ResolveReferenceObject",
				anyOf: [
					{
						type: "string"
					},
					{
						$ref: "#/definitions/ResolveReferenceObject"
					}
				]
			}
		}
	},
	ResolveReferenceObject: {
		additionalProperties: false,
		type: "object",
		title: "ResolveReferenceObject",
		properties: {
			queryFieldName: {
				type: "string",
				description: "Name of root field name that resolves the reference"
			},
			keyArg: {
				type: "string",
				description: "If the root field name has multiple args,\nyou need to define which argument should receive the key"
			}
		},
		required: [
			"queryFieldName"
		]
	},
	FederationField: {
		additionalProperties: false,
		type: "object",
		title: "FederationField",
		properties: {
			name: {
				type: "string"
			},
			config: {
				$ref: "#/definitions/FederationFieldConfig"
			}
		},
		required: [
			"name",
			"config"
		]
	},
	FederationFieldConfig: {
		additionalProperties: false,
		type: "object",
		title: "FederationFieldConfig",
		properties: {
			external: {
				type: "boolean"
			},
			provides: {
				type: "string"
			},
			requires: {
				type: "string"
			}
		}
	},
	FilterSchemaTransform: {
		additionalProperties: false,
		type: "object",
		title: "FilterSchemaTransform",
		properties: {
			mode: {
				type: "string",
				"enum": [
					"bare",
					"wrap"
				],
				description: "Specify to apply filter-schema transforms to bare schema or by wrapping original schema (Allowed values: bare, wrap)"
			},
			filters: {
				type: "array",
				items: {
					type: "string"
				},
				additionalItems: false,
				description: "Array of filter rules"
			}
		},
		required: [
			"filters"
		]
	},
	MockingConfig: {
		additionalProperties: false,
		type: "object",
		title: "MockingConfig",
		properties: {
			"if": {
				type: "boolean",
				description: "If this expression is truthy, mocking would be enabled\nYou can use environment variables expression, for example: `${MOCKING_ENABLED}`"
			},
			preserveResolvers: {
				type: "boolean",
				description: "Do not mock any other resolvers other than defined in `mocks`.\nFor example, you can enable this if you don't want to mock entire schema but partially."
			},
			mocks: {
				type: "array",
				items: {
					$ref: "#/definitions/MockingFieldConfig"
				},
				additionalItems: false,
				description: "Mock configurations"
			},
			initializeStore: {
				anyOf: [
					{
						type: "object",
						additionalProperties: true
					},
					{
						type: "string"
					},
					{
						type: "array",
						additionalItems: true
					}
				],
				description: "The path to the code runs before the store is attached to the schema"
			}
		}
	},
	MockingFieldConfig: {
		additionalProperties: false,
		type: "object",
		title: "MockingFieldConfig",
		properties: {
			apply: {
				type: "string",
				description: "Resolver path\nExample: User.firstName"
			},
			"if": {
				type: "boolean",
				description: "If this expression is truthy, mocking would be enabled\nYou can use environment variables expression, for example: `${MOCKING_ENABLED}`"
			},
			faker: {
				type: "string",
				description: "Faker.js expression or function\nRead more (https://github.com/marak/Faker.js/#fakerfake)\nExample;\nfaker: name.firstName\nfaker: \"{{ name.firstName }} {{ name.lastName }}\""
			},
			custom: {
				type: "string",
				description: "Custom mocking\nIt can be a module or json file.\nBoth \"moduleName#exportName\" or only \"moduleName\" would work"
			},
			length: {
				type: "integer",
				description: "Length of the mock list\nFor the list types `[ObjectType]`, how many `ObjectType` you want to return?\ndefault: 2"
			},
			store: {
				$ref: "#/definitions/GetFromMockStoreConfig",
				description: "Get the data from the mock store"
			},
			updateStore: {
				type: "array",
				items: {
					$ref: "#/definitions/UpdateMockStoreConfig"
				},
				additionalItems: false,
				description: "Update the data on the mock store"
			}
		},
		required: [
			"apply"
		]
	},
	GetFromMockStoreConfig: {
		additionalProperties: false,
		type: "object",
		title: "GetFromMockStoreConfig",
		properties: {
			type: {
				type: "string"
			},
			key: {
				type: "string"
			},
			fieldName: {
				type: "string"
			}
		}
	},
	UpdateMockStoreConfig: {
		additionalProperties: false,
		type: "object",
		title: "UpdateMockStoreConfig",
		properties: {
			type: {
				type: "string"
			},
			key: {
				type: "string"
			},
			fieldName: {
				type: "string"
			},
			value: {
				type: "string"
			}
		}
	},
	NamingConventionTransformConfig: {
		additionalProperties: false,
		type: "object",
		title: "NamingConventionTransformConfig",
		properties: {
			typeNames: {
				type: "string",
				"enum": [
					"camelCase",
					"capitalCase",
					"constantCase",
					"dotCase",
					"headerCase",
					"noCase",
					"paramCase",
					"pascalCase",
					"pathCase",
					"sentenceCase",
					"snakeCase",
					"upperCase",
					"lowerCase"
				],
				description: "Allowed values: camelCase, capitalCase, constantCase, dotCase, headerCase, noCase, paramCase, pascalCase, pathCase, sentenceCase, snakeCase, upperCase, lowerCase"
			},
			fieldNames: {
				type: "string",
				"enum": [
					"camelCase",
					"capitalCase",
					"constantCase",
					"dotCase",
					"headerCase",
					"noCase",
					"paramCase",
					"pascalCase",
					"pathCase",
					"sentenceCase",
					"snakeCase",
					"upperCase",
					"lowerCase"
				],
				description: "Allowed values: camelCase, capitalCase, constantCase, dotCase, headerCase, noCase, paramCase, pascalCase, pathCase, sentenceCase, snakeCase, upperCase, lowerCase"
			},
			enumValues: {
				type: "string",
				"enum": [
					"camelCase",
					"capitalCase",
					"constantCase",
					"dotCase",
					"headerCase",
					"noCase",
					"paramCase",
					"pascalCase",
					"pathCase",
					"sentenceCase",
					"snakeCase",
					"upperCase",
					"lowerCase"
				],
				description: "Allowed values: camelCase, capitalCase, constantCase, dotCase, headerCase, noCase, paramCase, pascalCase, pathCase, sentenceCase, snakeCase, upperCase, lowerCase"
			}
		}
	},
	PrefixTransformConfig: {
		additionalProperties: false,
		type: "object",
		title: "PrefixTransformConfig",
		properties: {
			mode: {
				type: "string",
				"enum": [
					"bare",
					"wrap"
				],
				description: "Specify to apply prefix transform to bare schema or by wrapping original schema (Allowed values: bare, wrap)"
			},
			value: {
				type: "string",
				description: "The prefix to apply to the schema types. By default it's the API name."
			},
			ignore: {
				type: "array",
				items: {
					type: "string"
				},
				additionalItems: false,
				description: "List of ignored types"
			},
			includeRootOperations: {
				type: "boolean",
				description: "Changes root types and changes the field names"
			}
		}
	},
	RenameTransform: {
		additionalProperties: false,
		type: "object",
		title: "RenameTransform",
		properties: {
			mode: {
				type: "string",
				"enum": [
					"bare",
					"wrap"
				],
				description: "Specify to apply rename transforms to bare schema or by wrapping original schema (Allowed values: bare, wrap)"
			},
			renames: {
				type: "array",
				items: {
					$ref: "#/definitions/RenameTransformObject"
				},
				additionalItems: false,
				description: "Array of rename rules"
			}
		},
		required: [
			"renames"
		]
	},
	RenameTransformObject: {
		additionalProperties: false,
		type: "object",
		title: "RenameTransformObject",
		properties: {
			from: {
				$ref: "#/definitions/RenameConfig"
			},
			to: {
				$ref: "#/definitions/RenameConfig"
			},
			useRegExpForTypes: {
				type: "boolean",
				description: "Use Regular Expression for type names"
			},
			useRegExpForFields: {
				type: "boolean",
				description: "Use Regular Expression for field names"
			},
			regExpFlags: {
				type: "string",
				description: "Flags to use in the Regular Expression"
			}
		},
		required: [
			"from",
			"to"
		]
	},
	RenameConfig: {
		additionalProperties: false,
		type: "object",
		title: "RenameConfig",
		properties: {
			type: {
				type: "string"
			},
			field: {
				type: "string"
			}
		}
	},
	ResolversCompositionTransform: {
		additionalProperties: false,
		type: "object",
		title: "ResolversCompositionTransform",
		properties: {
			mode: {
				type: "string",
				"enum": [
					"bare",
					"wrap"
				],
				description: "Specify to apply resolvers-composition transforms to bare schema or by wrapping original schema (Allowed values: bare, wrap)"
			},
			compositions: {
				type: "array",
				items: {
					$ref: "#/definitions/ResolversCompositionTransformObject"
				},
				additionalItems: false,
				description: "Array of resolver/composer to apply"
			}
		},
		required: [
			"compositions"
		]
	},
	ResolversCompositionTransformObject: {
		additionalProperties: false,
		type: "object",
		title: "ResolversCompositionTransformObject",
		properties: {
			resolver: {
				type: "string",
				description: "The GraphQL Resolver path\nExample: Query.users"
			},
			composer: {
				anyOf: [
					{
						type: "object",
						additionalProperties: true
					},
					{
						type: "string"
					},
					{
						type: "array",
						additionalItems: true
					}
				],
				description: "Path to the composer function\nExample: ./src/auth.js#authComposer"
			}
		},
		required: [
			"resolver",
			"composer"
		]
	},
	SnapshotTransformConfig: {
		additionalProperties: false,
		type: "object",
		title: "SnapshotTransformConfig",
		properties: {
			"if": {
				description: "Expression for when to activate this extension.\nValue can be a valid JS expression string or a boolean (Any of: String, Boolean)",
				anyOf: [
					{
						type: "string"
					},
					{
						type: "boolean"
					}
				]
			},
			apply: {
				type: "array",
				items: {
					type: "string"
				},
				additionalItems: false,
				description: "Resolver to be applied\nFor example;\n  apply:\n      - Query.* <- * will apply this extension to all fields of Query type\n      - Mutation.someMutationButProbablyYouWontNeedIt"
			},
			outputDir: {
				type: "string",
				description: "Path to the directory of the generated snapshot files"
			},
			respectSelectionSet: {
				type: "boolean",
				description: "Take snapshots by respecting the requested selection set.\nThis might be needed for the handlers like Postgraphile or OData that rely on the incoming GraphQL operation."
			}
		},
		required: [
			"apply",
			"outputDir"
		]
	},
	TypeMergingConfig: {
		additionalProperties: false,
		type: "object",
		title: "TypeMergingConfig",
		properties: {
			types: {
				type: "array",
				items: {
					$ref: "#/definitions/MergedTypeConfig"
				},
				additionalItems: false
			},
			queryFields: {
				type: "array",
				items: {
					$ref: "#/definitions/MergedRootFieldConfig"
				},
				additionalItems: false,
				description: "Denotes a root field used to query a merged type across services.\nThe marked field's name is analogous\nto the fieldName setting in\n[merged type configuration](https://www.graphql-tools.com/docs/stitch-type-merging#basic-example),\nwhile the field's arguments and return type are used to infer merge configuration.\nDirective arguments tune the merge behavior"
			},
			additionalConfiguration: {
				anyOf: [
					{
						type: "object",
						additionalProperties: true
					},
					{
						type: "string"
					},
					{
						type: "array",
						additionalItems: true
					}
				],
				description: "The path to a code file that has additional type merging configuration"
			}
		}
	},
	MergedRootFieldConfig: {
		additionalProperties: false,
		type: "object",
		title: "MergedRootFieldConfig",
		properties: {
			queryFieldName: {
				type: "string"
			},
			keyField: {
				type: "string",
				description: "Specifies the name of a field to pick off origin objects as the key value. When omitted, a `@key` directive must be included on the return type's definition to be built into an object key.\nhttps://www.graphql-tools.com/docs/stitch-directives-sdl#object-keys"
			},
			keyArg: {
				type: "string",
				description: "Specifies which field argument receives the merge key. This may be omitted for fields with only one argument where the recipient can be inferred."
			},
			additionalArgs: {
				type: "string",
				description: "Specifies a string of additional keys and values to apply to other arguments,\nformatted as `\\\"\\\"\\\" arg1: \"value\", arg2: \"value\" \\\"\\\"\\\"`."
			},
			key: {
				type: "array",
				items: {
					type: "string"
				},
				additionalItems: false,
				description: "Advanced use only; Allows building a custom key just for the argument from the selectionSet included by the `@key` directive."
			},
			argsExpr: {
				type: "string",
				description: "Advanced use only; This argument specifies a string expression that allows more customization of the input arguments. Rules for evaluation of this argument are as follows:\n  - basic object parsing of the input key: `\"arg1: $key.arg1, arg2: $key.arg2\"`\n  - any expression enclosed by double brackets will be evaluated once for each of the requested keys, and then sent as a list: `\"input: { keys: [[$key]] }\"`\n  - selections from the key can be referenced by using the $ sign and dot notation: `\"upcs: [[$key.upc]]\"`, so that `$key.upc` refers to the `upc` field of the key."
			}
		},
		required: [
			"queryFieldName"
		]
	},
	MergedTypeConfig: {
		additionalProperties: false,
		type: "object",
		title: "MergedTypeConfig",
		properties: {
			typeName: {
				type: "string",
				description: "Name of the type (Query by default)"
			},
			key: {
				$ref: "#/definitions/KeyAnnotation",
				description: "Specifies a base selection set needed to merge the annotated type across subschemas.\nAnalogous to the `selectionSet` setting specified in [merged type configuration](https://www.graphql-tools.com/docs/stitch-type-merging#basic-example)."
			},
			canonical: {
				type: "boolean",
				description: "Specifies types and fields\nthat provide a [canonical definition](https://www.graphql-tools.com/docs/stitch-type-merging#canonical-definitions) to be built into the gateway schema. Useful for selecting preferred characteristics among types and fields that overlap across subschemas. Root fields marked as canonical specify which subschema the field proxies for new queries entering the graph."
			},
			fields: {
				type: "array",
				items: {
					$ref: "#/definitions/MergedTypeField"
				},
				additionalItems: false
			}
		}
	},
	KeyAnnotation: {
		additionalProperties: false,
		type: "object",
		title: "KeyAnnotation",
		properties: {
			selectionSet: {
				type: "string"
			}
		},
		required: [
			"selectionSet"
		]
	},
	MergedTypeField: {
		additionalProperties: false,
		type: "object",
		title: "MergedTypeField",
		properties: {
			fieldName: {
				type: "string"
			},
			computed: {
				$ref: "#/definitions/ComputedAnnotation",
				description: "specifies a selection of fields required from other services to compute the value of this field.\nThese additional fields are only selected when the computed field is requested.\nAnalogous to [computed field](https://www.graphql-tools.com/docs/stitch-type-merging#computed-fields) in merged type configuration.\nComputed field dependencies must be sent into the subservice using an [object key](https://www.graphql-tools.com/docs/stitch-directives-sdl#object-keys)."
			}
		},
		required: [
			"fieldName"
		]
	},
	ComputedAnnotation: {
		additionalProperties: false,
		type: "object",
		title: "ComputedAnnotation",
		properties: {
			selectionSet: {
				type: "string"
			}
		},
		required: [
			"selectionSet"
		]
	},
	TuqlHandler: {
		additionalProperties: false,
		type: "object",
		title: "TuqlHandler",
		properties: {
			db: {
				type: "string",
				description: "Pointer to your SQLite database"
			},
			infile: {
				type: "string",
				description: "Path to the SQL Dump file if you want to build a in-memory database"
			}
		}
	}
};
var title = "Config";
var type = "object";
var $schema = "http://json-schema.org/draft-04/schema#";
var required = [
	"sources"
];
var properties = {
	serve: {
		$ref: "#/definitions/ServeConfig",
		description: "Configuration for `mesh start` or `mesh dev` command.\nThose commands won't be available in programmatic usage."
	},
	sdk: {
		$ref: "#/definitions/SDKConfig",
		description: "SDK Configuration"
	},
	require: {
		type: "array",
		items: {
			type: "string"
		},
		additionalItems: false
	},
	sources: {
		type: "array",
		items: {
			$ref: "#/definitions/Source"
		},
		additionalItems: false,
		description: "Defines the list of your external data sources for your API mesh"
	},
	transforms: {
		type: "array",
		items: {
			$ref: "#/definitions/Transform"
		},
		additionalItems: false,
		description: "Transform to apply to the unified mesh schema"
	},
	additionalTypeDefs: {
		anyOf: [
			{
				type: "object",
				additionalProperties: true
			},
			{
				type: "string"
			},
			{
				type: "array",
				additionalItems: true
			}
		],
		description: "Additional type definitions, or type definitions overrides you wish to add to the schema mesh"
	},
	additionalResolvers: {
		type: "array",
		items: {
			description: "Any of: String, AdditionalStitchingResolverObject, AdditionalStitchingBatchResolverObject, AdditionalSubscriptionObject",
			anyOf: [
				{
					type: "string"
				},
				{
					$ref: "#/definitions/AdditionalStitchingResolverObject"
				},
				{
					$ref: "#/definitions/AdditionalStitchingBatchResolverObject"
				},
				{
					$ref: "#/definitions/AdditionalSubscriptionObject"
				}
			]
		},
		additionalItems: false,
		description: "Additional resolvers, or resolvers overrides you wish to add to the schema mesh (Any of: String, AdditionalStitchingResolverObject, AdditionalStitchingBatchResolverObject, AdditionalSubscriptionObject)"
	},
	cache: {
		$ref: "#/definitions/Cache",
		description: "Backend cache"
	},
	merger: {
		type: "string",
		description: "Merge method"
	},
	pubsub: {
		description: "PubSub Implementation (Any of: String, PubSubConfig)",
		anyOf: [
			{
				type: "string"
			},
			{
				$ref: "#/definitions/PubSubConfig"
			}
		]
	},
	liveQueryInvalidations: {
		type: "array",
		items: {
			$ref: "#/definitions/LiveQueryInvalidation"
		},
		additionalItems: false,
		description: "Live Query Invalidations"
	},
	documents: {
		type: "array",
		items: {
			type: "string"
		},
		additionalItems: false,
		description: "Provide a query or queries for GraphQL Playground, validation and SDK Generation\nThe value can be the file path, glob expression for the file paths or the SDL.\n(.js, .jsx, .graphql, .gql, .ts and .tsx files are supported.\nBut TypeScript support is only available if `ts-node` is installed and `ts-node/register` is added under `require` parameter)"
	},
	logger: {
		anyOf: [
			{
				type: "object",
				additionalProperties: true
			},
			{
				type: "string"
			},
			{
				type: "array",
				additionalItems: true
			}
		],
		description: "Logger instance that matches `Console` interface of NodeJS"
	},
	skipSSLValidation: {
		type: "boolean",
		description: "Allow connections to an SSL endpoint without certificates"
	}
};
var additionalProperties = false;
const configSchema = {
	definitions: definitions,
	title: title,
	type: type,
	$schema: $schema,
	required: required,
	properties: properties,
	additionalProperties: additionalProperties
};

const jsonSchema = configSchema;

function validateConfig(config) {
    const ajv = new Ajv({
        strict: false,
    });
    jsonSchema.$schema = undefined;
    const isValid = ajv.validate(jsonSchema, config);
    if (!isValid) {
        console.warn(`GraphQL Mesh Configuration is not valid:\n${ajv.errorsText()}`);
    }
}
async function findAndParseConfig(options) {
    const { configName = 'mesh', dir: configDir = '', ...restOptions } = options || {};
    const dir = path.isAbsolute(configDir) ? configDir : path.join(process$1.cwd(), configDir);
    const explorer = cosmiconfig.cosmiconfig(configName, {
        loaders: {
            '.json': customLoader('json'),
            '.yaml': customLoader('yaml'),
            '.yml': customLoader('yaml'),
            '.js': customLoader('js'),
            noExt: customLoader('yaml'),
        },
    });
    const results = await explorer.search(dir);
    if (!results) {
        throw new Error(`No mesh config file was found in "${dir}"!`);
    }
    const config$1 = results.config;
    validateConfig(config$1);
    return config.processConfig(config$1, { dir, ...restOptions });
}
function customLoader(ext) {
    function loader(filepath, content) {
        if (process$1.env) {
            content = content.replace(/\$\{(.*?)\}/g, (_, variable) => {
                let varName = variable;
                let defaultValue = '';
                if (variable.includes(':')) {
                    const spl = variable.split(':');
                    varName = spl.shift();
                    defaultValue = spl.join(':');
                }
                return process$1.env[varName] || defaultValue;
            });
        }
        if (ext === 'json') {
            return cosmiconfig.defaultLoaders['.json'](filepath, content);
        }
        if (ext === 'yaml') {
            return cosmiconfig.defaultLoaders['.yaml'](filepath, content);
        }
        if (ext === 'js') {
            return cosmiconfig.defaultLoaders['.js'](filepath, content);
        }
    }
    return loader;
}

const serverSideScalarsMap = {
    BigInt: 'bigint',
    Byte: 'Buffer',
    Date: 'Date',
    DateTime: 'Date',
    ISO8601Duration: 'string',
    GUID: 'string',
    UnsignedInt: 'number',
    JSON: 'any',
    Timestamp: 'Date',
    Time: 'Date',
    Void: 'void',
    EmailAddress: 'string',
};

function generateOperations(schema, options) {
    var _a;
    const sources = [];
    const rootTypeMap = utils$1.getRootTypeMap(schema);
    for (const [operationType, rootType] of rootTypeMap) {
        const fieldMap = rootType.getFields();
        for (const fieldName in fieldMap) {
            const operationNode = utils$1.buildOperationNodeForField({
                schema,
                kind: operationType,
                field: fieldName,
                depthLimit: options.selectionSetDepth,
            });
            const defaultName = `operation_${sources.length}`;
            const virtualFileName = ((_a = operationNode.name) === null || _a === void 0 ? void 0 : _a.value) || defaultName;
            const rawSDL = graphql.print(operationNode);
            const source = utils$1.parseGraphQLSDL(`${virtualFileName}.graphql`, rawSDL);
            sources.push(source);
        }
    }
    return sources;
}

const { unlink, rename } = fs.promises;
const unifiedContextIdentifier = 'MeshContext';
class CodegenHelpers extends tsBasePlugin.TsVisitor {
    getTypeToUse(namedType) {
        if (this.scalars[namedType.name.value]) {
            return this._getScalar(namedType.name.value);
        }
        return this._getTypeForNode(namedType);
    }
}
function buildSignatureBasedOnRootFields(codegenHelpers, type) {
    if (!type) {
        return {};
    }
    const fields = type.getFields();
    const operationMap = {};
    for (const fieldName in fields) {
        const field = fields[fieldName];
        const argsExists = field.args && field.args.length > 0;
        const argsName = argsExists ? `${type.name}${field.name}Args` : '{}';
        const parentTypeNode = {
            kind: graphql.Kind.NAMED_TYPE,
            name: {
                kind: graphql.Kind.NAME,
                value: type.name,
            },
        };
        operationMap[fieldName] = `  ${field.name}: InContextSdkMethod<${codegenHelpers.getTypeToUse(parentTypeNode)}['${fieldName}'], ${argsName}, ${unifiedContextIdentifier}>`;
    }
    return operationMap;
}
function generateTypesForApi(options) {
    const codegenHelpers = new CodegenHelpers(options.schema, {}, {});
    const sdkIdentifier = pascalCase.pascalCase(`${options.name}Sdk`);
    const contextIdentifier = pascalCase.pascalCase(`${options.name}Context`);
    const queryOperationMap = buildSignatureBasedOnRootFields(codegenHelpers, options.schema.getQueryType());
    const mutationOperationMap = buildSignatureBasedOnRootFields(codegenHelpers, options.schema.getMutationType());
    const subscriptionsOperationMap = buildSignatureBasedOnRootFields(codegenHelpers, options.schema.getSubscriptionType());
    const sdk = {
        identifier: sdkIdentifier,
        codeAst: `export type Query${sdkIdentifier} = {
${Object.values(queryOperationMap).join(',\n')}
};

export type Mutation${sdkIdentifier} = {
${Object.values(mutationOperationMap).join(',\n')}
};

export type Subscription${sdkIdentifier} = {
${Object.values(subscriptionsOperationMap).join(',\n')}
};`,
    };
    const context = {
        identifier: contextIdentifier,
        codeAst: `export type ${contextIdentifier} = {
      ["${options.name}"]: { Query: Query${sdkIdentifier}, Mutation: Mutation${sdkIdentifier}, Subscription: Subscription${sdkIdentifier} },
    };`,
    };
    return {
        sdk,
        context,
    };
}
const BASEDIR_ASSIGNMENT_COMMENT = `/* BASEDIR_ASSIGNMENT */`;
async function generateTsArtifacts({ unifiedSchema, rawSources, mergerType = 'stitching', documents, flattenTypes, importedModulesSet, baseDir, meshConfigCode, logger, sdkConfig, }) {
    const artifactsDir = path.join(baseDir, '.mesh');
    logger.info('Generating index file in TypeScript');
    const scalarsMap = {
        ...serverSideScalarsMap,
    };
    const unifiedTypeMap = unifiedSchema.getTypeMap();
    for (const typeName in unifiedTypeMap) {
        const type = unifiedTypeMap[typeName];
        if (graphql.isScalarType(type) && type.extensions && 'codegenScalarType' in type.extensions) {
            scalarsMap[typeName] = type.extensions.codegenScalarType;
        }
    }
    const codegenOutput = await core.codegen({
        filename: 'types.ts',
        documents: (sdkConfig === null || sdkConfig === void 0 ? void 0 : sdkConfig.generateOperations)
            ? [...generateOperations(unifiedSchema, sdkConfig.generateOperations), ...documents]
            : documents,
        config: {
            scalars: scalarsMap,
            skipTypename: true,
            flattenGeneratedTypes: flattenTypes,
            onlyOperationTypes: flattenTypes,
            preResolveTypes: flattenTypes,
            namingConvention: 'keep',
            documentMode: 'documentNode',
        },
        schemaAst: unifiedSchema,
        schema: undefined,
        skipDocumentsValidation: true,
        pluginMap: {
            typescript: tsBasePlugin,
            typescriptOperations: tsOperationsPlugin,
            typescriptGenericSdk: tsGenericSdkPlugin,
            resolvers: tsResolversPlugin,
            contextSdk: {
                plugin: async () => {
                    const commonTypes = [
                        `import { MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';`,
                        `import { InContextSdkMethod } from '@graphql-mesh/types';`,
                    ];
                    const sdkItems = [];
                    const contextItems = [];
                    const results = await Promise.all(rawSources.map(source => {
                        const sourceMap = unifiedSchema.extensions.sourceMap;
                        const sourceSchema = sourceMap.get(source);
                        const item = generateTypesForApi({
                            schema: sourceSchema,
                            name: source.name,
                        });
                        if (item) {
                            if (item.sdk) {
                                sdkItems.push(item.sdk.codeAst);
                            }
                            if (item.context) {
                                contextItems.push(item.context.codeAst);
                            }
                        }
                        return item;
                    }));
                    const contextType = `export type ${unifiedContextIdentifier} = ${results
                        .map(r => { var _a; return (_a = r === null || r === void 0 ? void 0 : r.context) === null || _a === void 0 ? void 0 : _a.identifier; })
                        .filter(Boolean)
                        .join(' & ')} & BaseMeshContext;`;
                    const importCodes = [
                        `import { parse } from 'graphql';`,
                        `import { getMesh } from '@graphql-mesh/runtime';`,
                        `import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';`,
                        `import { cwd } from 'process';`,
                        `import { join, relative, isAbsolute, dirname } from 'path';`,
                        `import { fileURLToPath } from 'url';`,
                    ];
                    const importedModulesCodes = [...importedModulesSet].map((importedModuleName, i) => {
                        let moduleMapProp = importedModuleName;
                        let importPath = importedModuleName;
                        if (importPath.startsWith('.')) {
                            importPath = path.join(baseDir, importPath);
                        }
                        if (path.isAbsolute(importPath)) {
                            moduleMapProp = path.relative(baseDir, importedModuleName).split('\\').join('/');
                            importPath = `./${path.relative(artifactsDir, importedModuleName).split('\\').join('/')}`;
                        }
                        const importedModuleVariable = pascalCase.pascalCase(`ExternalModule$${i}`);
                        importCodes.push(`import ${importedModuleVariable} from '${importPath}';`);
                        return `  // @ts-ignore\n  [${JSON.stringify(moduleMapProp)}]: ${importedModuleVariable}`;
                    });
                    const meshMethods = `
${importCodes.join('\n')}

const importedModules: Record<string, any> = {
${importedModulesCodes.join(',\n')}
};

${BASEDIR_ASSIGNMENT_COMMENT}

const syncImportFn = (moduleId: string) => {
  const relativeModuleId = (isAbsolute(moduleId) ? relative(baseDir, moduleId) : moduleId).split('\\\\').join('/');
  if (!(relativeModuleId in importedModules)) {
    throw new Error(\`Cannot find module '\${relativeModuleId}'.\`);
  }
  return importedModules[relativeModuleId];
};
const importFn = async (moduleId: string) => syncImportFn(moduleId);

const rootStore = new MeshStore('.mesh', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
}), {
  readonly: true,
  validate: false
});

${meshConfigCode}

export const documentsInSDL = /*#__PURE__*/ [${documents.map(documentSource => `/* GraphQL */\`${documentSource.rawSDL}\``)}];

export async function getBuiltMesh(): Promise<MeshInstance> {
  const meshConfig = await getMeshOptions();
  return getMesh(meshConfig);
}

export async function getMeshSDK() {
  const { sdkRequester } = await getBuiltMesh();
  return getSdk(sdkRequester);
}`;
                    return {
                        content: [...commonTypes, ...sdkItems, ...contextItems, contextType, meshMethods].join('\n\n'),
                    };
                },
            },
        },
        plugins: [
            {
                typescript: {},
            },
            {
                resolvers: {
                    useIndexSignature: true,
                    noSchemaStitching: mergerType !== 'stitching',
                    contextType: unifiedContextIdentifier,
                    federation: mergerType === 'federation',
                },
            },
            {
                contextSdk: {},
            },
            {
                typescriptOperations: {},
            },
            {
                typescriptGenericSdk: {},
            },
        ],
    });
    const baseUrlAssignmentESM = `const baseDir = join(dirname(fileURLToPath(import.meta.url)), '${path.relative(artifactsDir, baseDir)}');`;
    const baseUrlAssignmentCJS = `const baseDir = join(__dirname, '${path.relative(artifactsDir, baseDir)}');`;
    logger.info('Writing index.ts for ESM to the disk.');
    const tsFilePath = path.join(artifactsDir, 'index.ts');
    await utils.writeFile(tsFilePath, codegenOutput.replace(BASEDIR_ASSIGNMENT_COMMENT, baseUrlAssignmentESM));
    logger.info('Compiling TS file as ES Module to `index.mjs`');
    const jsFilePath = path.join(artifactsDir, 'index.js');
    const dtsFilePath = path.join(artifactsDir, 'index.d.ts');
    compileTS(tsFilePath, ts.ModuleKind.ESNext, [jsFilePath, dtsFilePath]);
    const mjsFilePath = path.join(artifactsDir, 'index.mjs');
    await rename(jsFilePath, mjsFilePath);
    logger.info('Writing index.ts for CJS to the disk.');
    await utils.writeFile(tsFilePath, codegenOutput.replace(BASEDIR_ASSIGNMENT_COMMENT, baseUrlAssignmentCJS));
    logger.info('Compiling TS file as CommonJS Module to `index.js`');
    compileTS(tsFilePath, ts.ModuleKind.CommonJS, [jsFilePath, dtsFilePath]);
    logger.info('Deleting index.ts');
    await unlink(tsFilePath);
}
function compileTS(tsFilePath, module, outputFilePaths) {
    const options = {
        target: ts.ScriptTarget.ESNext,
        module,
        sourceMap: false,
        inlineSourceMap: false,
        importHelpers: true,
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
        declaration: true,
    };
    const host = ts.createCompilerHost(options);
    const hostWriteFile = host.writeFile.bind(host);
    host.writeFile = (fileName, ...rest) => {
        if (outputFilePaths.some(f => path.normalize(f) === path.normalize(fileName))) {
            return hostWriteFile(fileName, ...rest);
        }
    };
    // Prepare and emit the d.ts files
    const program = ts.createProgram([tsFilePath], options, host);
    program.emit();
}

function handleFatalError(e, logger = new utils.DefaultLogger('🕸️')) {
    const errorText = e.message;
    logger.error(errorText);
    if (process$1.env.DEBUG) {
        logger.error(utils$1.inspect({
            ...e,
            name: e.name,
            stack: e.stack,
            message: e.message,
        }));
    }
    process$1.exit(1);
}

/* eslint-disable */
// @ts-ignore

const playgroundMiddlewareFactory = ({ baseDir, documents, graphqlPath, logger, }) => {
    let defaultQuery$;
    return function (req, res, next) {
        defaultQuery$ =
            defaultQuery$ ||
                Promise.resolve()
                    .then(async () => {
                    let defaultQuery;
                    if (documents === null || documents === void 0 ? void 0 : documents.length) {
                        defaultQuery = documents.reduce((acc, doc) => (acc += doc.rawSDL + '\n'), '');
                    }
                    return defaultQuery;
                })
                    .catch(e => handleFatalError(e, logger));
        if (req.query.query) {
            next();
            return;
        }
        defaultQuery$.then(defaultQuery => {
            res.send(`
        <html>
        <head>
          <title>GraphQL Mesh</title>
        </head>
        <body>
          <script>
            window.defaultQuery = ${JSON.stringify(defaultQuery)};
            window.endpoint = ${JSON.stringify(graphqlPath)};
          </script>
          <script>
            ${playgroundContent}
          </script>
        </body>
      </html>
      `);
        });
    };
};

function normalizeGraphQLError(error) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return {
        ...error,
        extensions: error.extensions,
        locations: error.locations,
        message: error.message,
        name: error.name,
        nodes: error.nodes,
        originalError: {
            ...error === null || error === void 0 ? void 0 : error.originalError,
            name: (_a = error === null || error === void 0 ? void 0 : error.originalError) === null || _a === void 0 ? void 0 : _a.name,
            message: (_b = error === null || error === void 0 ? void 0 : error.originalError) === null || _b === void 0 ? void 0 : _b.message,
            stack: (_d = (_c = error === null || error === void 0 ? void 0 : error.originalError) === null || _c === void 0 ? void 0 : _c.stack) === null || _d === void 0 ? void 0 : _d.split('\n'),
        },
        path: error.path,
        positions: error.positions,
        source: {
            body: (_f = (_e = error.source) === null || _e === void 0 ? void 0 : _e.body) === null || _f === void 0 ? void 0 : _f.split('\n'),
            name: (_g = error.source) === null || _g === void 0 ? void 0 : _g.name,
            locationOffset: {
                line: (_j = (_h = error.source) === null || _h === void 0 ? void 0 : _h.locationOffset) === null || _j === void 0 ? void 0 : _j.line,
                column: (_l = (_k = error.source) === null || _k === void 0 ? void 0 : _k.locationOffset) === null || _l === void 0 ? void 0 : _l.column,
            },
        },
        stack: (_m = error.stack) === null || _m === void 0 ? void 0 : _m.split('\n'),
    };
}
const graphqlHandler = (mesh$) => function (req, res, next) {
    // Create a generic Request object that can be consumed by Graphql Helix's API
    const request = {
        body: req.body,
        headers: req.headers,
        method: req.method,
        query: req.query,
    };
    // Determine whether we should render GraphiQL instead of returning an API response
    if (graphqlHelix.shouldRenderGraphiQL(request)) {
        next();
    }
    else {
        // Extract the GraphQL parameters from the request
        const { operationName, query, variables } = graphqlHelix.getGraphQLParameters(request);
        Promise.resolve()
            .then(async function () {
            var _a;
            const { schema, execute, subscribe } = await mesh$;
            // Validate and execute the query
            const result = await graphqlHelix.processRequest({
                operationName,
                query,
                variables,
                request,
                schema,
                parse: utils.parseWithCache,
                execute: (_schema, _documentAST, rootValue, contextValue, variableValues, operationName) => execute(query, variableValues, contextValue, rootValue, operationName),
                subscribe: (_schema, _documentAST, rootValue, contextValue, variableValues, operationName) => subscribe(query, variableValues, contextValue, rootValue, operationName),
                contextFactory: () => req,
            });
            // processRequest returns one of three types of results depending on how the server should respond
            // 1) RESPONSE: a regular JSON payload
            // 2) MULTIPART RESPONSE: a multipart response (when @stream or @defer directives are used)
            // 3) PUSH: a stream of events to push back down the client for a subscription
            switch (result.type) {
                case 'RESPONSE':
                    // We set the provided status and headers and just the send the payload back to the client
                    result.headers.forEach(({ name, value }) => res.setHeader(name, value));
                    res.status(result.status);
                    if ((_a = result.payload.errors) === null || _a === void 0 ? void 0 : _a.length) {
                        result.payload.errors = result.payload.errors.map(graphQLError => normalizeGraphQLError(graphQLError));
                    }
                    res.json(result.payload);
                    break;
                case 'MULTIPART_RESPONSE':
                    // Indicate we're sending a multipart response
                    res.writeHead(200, {
                        Connection: 'keep-alive',
                        'Content-Type': 'multipart/mixed; boundary="-"',
                        'Transfer-Encoding': 'chunked',
                    });
                    // If the request is closed by the client, we unsubscribe and stop executing the request
                    req.on('close', () => {
                        result.unsubscribe();
                    });
                    res.write('---');
                    // Subscribe and send back each result as a separate chunk. We await the subscribe
                    // call. Once we're done executing the request and there are no more results to send
                    // to the client, the Promise returned by subscribe will resolve and we can end the response.
                    await result.subscribe(result => {
                        const chunk = Buffer.from(utils.jsonFlatStringify(result), 'utf8');
                        const data = [
                            '',
                            'Content-Type: application/json; charset=utf-8',
                            'Content-Length: ' + String(chunk.length),
                            '',
                            chunk,
                        ];
                        if (result.hasNext) {
                            data.push('---');
                        }
                        res.write(data.join('\r\n'));
                    });
                    res.write('\r\n-----\r\n');
                    res.end();
                    break;
                case 'PUSH':
                    // Indicate we're sending an event stream to the client
                    res.writeHead(200, {
                        'Content-Type': 'text/event-stream',
                        Connection: 'keep-alive',
                        'Cache-Control': 'no-cache',
                    });
                    // If the request is closed by the client, we unsubscribe and stop executing the request
                    req.on('close', () => {
                        result.unsubscribe();
                    });
                    // We subscribe to the event stream and push any new events to the client
                    await result.subscribe(result => {
                        const chunk = utils.flatString(`data: ${JSON.stringify(result)}\n\n`);
                        res.write(chunk);
                    });
                    break;
                default:
                    throw new Error(`Unknown GraphQL Result: ${utils$1.inspect(result)}`);
            }
        })
            .catch(e => {
            res.status(500);
            res.write(JSON.stringify({
                errors: 'errors' in e
                    ? e.errors.map((e) => ({
                        name: e.name,
                        message: e.message,
                        stack: e.stack,
                    }))
                    : [
                        {
                            name: e.name,
                            message: e.message,
                            stack: e.stack,
                        },
                    ],
            }));
            res.end();
        });
    }
};

/* eslint-disable dot-notation */
const { readFile } = fs.promises;
const terminateEvents = ['SIGINT', 'SIGTERM'];
function registerTerminateHandler(callback) {
    for (const eventName of terminateEvents) {
        process$1.on(eventName, () => callback(eventName));
    }
}
async function serveMesh({ baseDir, argsPort, getBuiltMesh, logger, rawConfig, documents }) {
    var _a;
    const { fork, port: configPort, hostname = 'localhost', cors: corsConfig, handlers, staticFiles, playground, upload: { maxFileSize = 10000000, maxFiles = 10 } = {}, maxRequestBodySize = '100kb', sslCredentials, endpoint: graphqlPath = '/graphql', browser, } = rawConfig.serve || {};
    const port = argsPort || parseInt(process$1.env.PORT) || configPort || 4000;
    const protocol = sslCredentials ? 'https' : 'http';
    const serverUrl = `${protocol}://${hostname}:${port}`;
    if (cluster.isMaster && fork) {
        const forkNum = fork > 1 ? fork : os.cpus().length;
        for (let i = 0; i < forkNum; i++) {
            const worker = cluster.fork();
            registerTerminateHandler(eventName => worker.kill(eventName));
        }
        logger.info(`Serving GraphQL Mesh: ${serverUrl} in ${forkNum} forks`);
    }
    else {
        logger.info(`Generating Mesh schema...`);
        let readyFlag = false;
        const mesh$ = getBuiltMesh()
            .then(mesh => {
            readyFlag = true;
            logger.info(`Serving GraphQL Mesh: ${serverUrl}`);
            registerTerminateHandler(eventName => {
                const eventLogger = logger.child(`${eventName}💀`);
                eventLogger.info(`Destroying GraphQL Mesh`);
                mesh.destroy();
            });
            return mesh;
        })
            .catch(e => handleFatalError(e, logger));
        const app = express();
        app.set('trust proxy', 'loopback');
        let httpServer;
        if (sslCredentials) {
            const [key, cert] = await Promise.all([
                readFile(sslCredentials.key, 'utf-8'),
                readFile(sslCredentials.cert, 'utf-8'),
            ]);
            httpServer = https.createServer({ key, cert }, app);
        }
        else {
            httpServer = http.createServer(app);
        }
        registerTerminateHandler(eventName => {
            const eventLogger = logger.child(`${eventName}💀`);
            eventLogger.debug(`Stopping HTTP Server`);
            httpServer.close(error => {
                if (error) {
                    eventLogger.debug(`HTTP Server couldn't be stopped: ${error.message}`);
                }
                else {
                    eventLogger.debug(`HTTP Server has been stopped`);
                }
            });
        });
        if (corsConfig) {
            app.use(cors(corsConfig));
        }
        app.use(bodyParser.json({
            limit: maxRequestBodySize,
        }));
        app.use(cookieParser());
        const wsServer = new ws.Server({
            path: graphqlPath,
            server: httpServer,
        });
        registerTerminateHandler(eventName => {
            const eventLogger = logger.child(`${eventName}💀`);
            eventLogger.debug(`Stopping WebSocket Server`);
            wsServer.close(error => {
                if (error) {
                    eventLogger.debug(`WebSocket Server couldn't be stopped: ${error.message}`);
                }
                else {
                    eventLogger.debug(`WebSocket Server has been stopped`);
                }
            });
        });
        const { dispose: stopGraphQLWSServer } = ws$1.useServer({
            schema: () => mesh$.then(({ schema }) => schema),
            onSubscribe: async (_ctx, msg) => {
                const { schema } = await mesh$;
                return {
                    schema,
                    operationName: msg.payload.operationName,
                    document: utils.parseWithCache(msg.payload.query),
                    variableValues: msg.payload.variables,
                };
            },
            execute: args => mesh$.then(({ execute }) => execute(args.document, args.variableValues, args.contextValue, args.rootValue)),
            subscribe: args => mesh$.then(({ subscribe }) => subscribe(args.document, args.variableValues, args.contextValue, args.rootValue)),
            context: async ({ connectionParams, extra: { request } }) => {
                var _a;
                // spread connectionParams.headers to upgrade request headers.
                // we completely ignore the root connectionParams because
                // [@graphql-tools/url-loader adds the headers inside the "headers" field](https://github.com/ardatan/graphql-tools/blob/9a13357c4be98038c645f6efb26f0584828177cf/packages/loaders/url/src/index.ts#L597)
                for (const [key, value] of Object.entries((_a = connectionParams.headers) !== null && _a !== void 0 ? _a : {})) {
                    // dont overwrite existing upgrade headers due to security reasons
                    if (!(key.toLowerCase() in request.headers)) {
                        request.headers[key.toLowerCase()] = value;
                    }
                }
                return request;
            },
        }, wsServer);
        registerTerminateHandler(eventName => {
            const eventLogger = logger.child(`${eventName}💀`);
            eventLogger.debug(`Stopping GraphQL WS`);
            Promise.resolve()
                .then(() => stopGraphQLWSServer())
                .then(() => {
                eventLogger.debug(`GraphQL WS has been stopped`);
            })
                .catch(error => {
                eventLogger.debug(`GraphQL WS couldn't be stopped: ${error.message}`);
            });
        });
        const pubSubHandler = (req, _res, next) => {
            Promise.resolve().then(async () => {
                const { pubsub } = await mesh$;
                req['pubsub'] = pubsub;
                next();
            });
        };
        app.use(pubSubHandler);
        const registeredPaths = new Set();
        await Promise.all((handlers === null || handlers === void 0 ? void 0 : handlers.map(async (handlerConfig) => {
            var _a;
            registeredPaths.add(handlerConfig.path);
            let handlerFn;
            const handlerLogger = logger.child(handlerConfig.path);
            if ('handler' in handlerConfig) {
                handlerFn = await utils.loadFromModuleExportExpression(handlerConfig.handler, {
                    cwd: baseDir,
                    defaultExportName: 'default',
                    importFn: m => new Promise(function (resolve) { resolve(_interopNamespace(require(m))); }),
                });
            }
            else if ('pubsubTopic' in handlerConfig) {
                handlerFn = (req, res) => {
                    let payload = req.body;
                    handlerLogger.debug(`Payload received; ${utils$1.inspect(payload)}`);
                    if (handlerConfig.payload) {
                        payload = _.get(payload, handlerConfig.payload);
                        handlerLogger.debug(`Extracting ${handlerConfig.payload}; ${utils$1.inspect(payload)}`);
                    }
                    req['pubsub'].publish(handlerConfig.pubsubTopic, payload);
                    handlerLogger.debug(`Payload sent to ${handlerConfig.pubsubTopic}`);
                    res.end();
                };
            }
            app[((_a = handlerConfig.method) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || 'use'](handlerConfig.path, handlerFn);
        })) || []);
        app.get('/healthcheck', (_req, res) => res.sendStatus(200));
        app.get('/readiness', (_req, res) => res.sendStatus(readyFlag ? 200 : 500));
        if (staticFiles) {
            app.use(express.static(staticFiles));
            const indexPath = path.join(baseDir, staticFiles, 'index.html');
            if (await utils.pathExists(indexPath)) {
                app.get('/', (_req, res) => res.sendFile(indexPath));
            }
        }
        app.use(graphqlPath, graphqlUpload.graphqlUploadExpress({ maxFileSize, maxFiles }), graphqlHandler(mesh$));
        if (typeof playground !== 'undefined' ? playground : ((_a = process$1.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== 'production') {
            const playgroundMiddleware = playgroundMiddlewareFactory({
                baseDir,
                documents,
                graphqlPath,
                logger: logger,
            });
            if (!staticFiles) {
                app.get('/', playgroundMiddleware);
            }
            app.get(graphqlPath, playgroundMiddleware);
        }
        httpServer
            .listen(parseInt(port.toString()), hostname, () => {
            var _a;
            const shouldntOpenBrowser = ((_a = process$1.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'production' || browser === false;
            if (!shouldntOpenBrowser) {
                open(serverUrl, typeof browser === 'string' ? { app: browser } : undefined).catch(() => { });
            }
        })
            .on('error', handleFatalError);
        return mesh$.then(mesh => ({
            mesh,
            httpServer,
            app,
            readyFlag,
            logger: logger,
        }));
    }
    return null;
}

const SERVE_COMMAND_WARNING = '`serve` command has been replaced by `dev` and `start` commands. Check our documentation for new usage';
async function graphqlMesh() {
    let baseDir = process$1.cwd();
    let logger = new utils.DefaultLogger('🕸️');
    return yargs(helpers.hideBin(process.argv))
        .help()
        .option('r', {
        alias: 'require',
        describe: 'Loads specific require.extensions before running the codegen and reading the configuration',
        type: 'array',
        default: [],
        coerce: (externalModules) => Promise.all(externalModules.map(module => {
            const localModulePath = path.resolve(baseDir, module);
            const islocalModule = fs.existsSync(localModulePath);
            return new Promise(function (resolve) { resolve(_interopNamespace(require(islocalModule ? localModulePath : module))); });
        })),
    })
        .option('dir', {
        describe: 'Modified the base directory to use for looking for meshrc config file',
        type: 'string',
        default: baseDir,
        coerce: dir => {
            if (path.isAbsolute(dir)) {
                baseDir = dir;
            }
            else {
                baseDir = path.resolve(process$1.cwd(), dir);
            }
        },
    })
        .command('serve', SERVE_COMMAND_WARNING, () => { }, () => {
        logger.error(SERVE_COMMAND_WARNING);
    })
        .command('dev', 'Serves a GraphQL server with GraphQL interface by building Mesh artifacts on the fly', builder => {
        builder.option('port', {
            type: 'number',
        });
    }, async (args) => {
        var _a;
        try {
            process$1.env.NODE_ENV = 'development';
            const meshConfig = await findAndParseConfig({
                dir: baseDir,
            });
            logger = meshConfig.logger;
            const serveMeshOptions = {
                baseDir,
                argsPort: args.port,
                getBuiltMesh: () => runtime.getMesh(meshConfig),
                logger: meshConfig.logger.child('Server'),
                rawConfig: meshConfig.config,
                documents: meshConfig.documents,
            };
            if ((_a = meshConfig.config.serve) === null || _a === void 0 ? void 0 : _a.customServerHandler) {
                const customServerHandler = await utils.loadFromModuleExportExpression(meshConfig.config.serve.customServerHandler, {
                    defaultExportName: 'default',
                    cwd: baseDir,
                    importFn: m => new Promise(function (resolve) { resolve(_interopNamespace(require(m))); }).then(m => m.default || m),
                });
                await customServerHandler(serveMeshOptions);
            }
            else {
                await serveMesh(serveMeshOptions);
            }
        }
        catch (e) {
            handleFatalError(e, logger);
        }
    })
        .command('start', 'Serves a GraphQL server with GraphQL interface based on your generated Mesh artifacts', builder => {
        builder.option('port', {
            type: 'number',
        });
    }, async (args) => {
        var _a;
        try {
            const builtMeshArtifactsPath = path.join(baseDir, '.mesh');
            if (!(await utils.pathExists(builtMeshArtifactsPath))) {
                throw new Error(`Seems like you haven't build Mesh artifacts yet to start production server! You need to build artifacts first with "mesh build" command!`);
            }
            process$1.env.NODE_ENV = 'production';
            const mainModule = path.join(builtMeshArtifactsPath, 'index.js');
            const builtMeshArtifacts = await new Promise(function (resolve) { resolve(_interopNamespace(require(mainModule))); }).then(m => m.default || m);
            const getMeshOptions = await builtMeshArtifacts.getMeshOptions();
            logger = getMeshOptions.logger;
            const rawConfig = builtMeshArtifacts.rawConfig;
            const serveMeshOptions = {
                baseDir,
                argsPort: args.port,
                getBuiltMesh: () => runtime.getMesh(getMeshOptions),
                logger: getMeshOptions.logger.child('Server'),
                rawConfig: builtMeshArtifacts.rawConfig,
                documents: builtMeshArtifacts.documentsInSDL.map((documentSdl, i) => ({
                    rawSDL: documentSdl,
                    document: utils.parseWithCache(documentSdl),
                    location: `document_${i}.graphql`,
                })),
            };
            if ((_a = rawConfig.serve) === null || _a === void 0 ? void 0 : _a.customServerHandler) {
                const customServerHandler = await utils.loadFromModuleExportExpression(rawConfig.serve.customServerHandler, {
                    defaultExportName: 'default',
                    cwd: baseDir,
                    importFn: m => new Promise(function (resolve) { resolve(_interopNamespace(require(m))); }).then(m => m.default || m),
                });
                await customServerHandler(serveMeshOptions);
            }
            else {
                await serveMesh(serveMeshOptions);
            }
        }
        catch (e) {
            handleFatalError(e, logger);
        }
    })
        .command('validate', 'Validates artifacts', builder => { }, async (args) => {
        let destroy;
        try {
            if (!(await utils.pathExists(path.join(baseDir, '.mesh')))) {
                throw new Error(`You cannot validate artifacts now because you don't have built artifacts yet! You need to build artifacts first with "mesh build" command!`);
            }
            const importFn = (moduleId) => new Promise(function (resolve) { resolve(_interopNamespace(require(moduleId))); }).then(m => m.default || m);
            const store$1 = new store.MeshStore('.mesh', new store.FsStoreStorageAdapter({
                cwd: baseDir,
                importFn,
            }), {
                readonly: false,
                validate: true,
            });
            logger.info(`Reading Mesh configuration`);
            const meshConfig = await findAndParseConfig({
                dir: baseDir,
                store: store$1,
                importFn,
                ignoreAdditionalResolvers: true,
            });
            logger = meshConfig.logger;
            logger.info(`Generating Mesh schema`);
            const mesh = await runtime.getMesh(meshConfig);
            logger.info(`Artifacts have been validated successfully`);
            destroy = mesh === null || mesh === void 0 ? void 0 : mesh.destroy;
        }
        catch (e) {
            handleFatalError(e, logger);
        }
        if (destroy) {
            destroy();
        }
    })
        .command('build', 'Builds artifacts', builder => { }, async (args) => {
        try {
            const rootArtifactsName = '.mesh';
            const outputDir = path.join(baseDir, rootArtifactsName);
            logger.info('Cleaning existing artifacts');
            await utils.rmdirs(outputDir);
            const importedModulesSet = new Set();
            const importFn = (moduleId) => new Promise(function (resolve) { resolve(_interopNamespace(require(moduleId))); }).then(m => {
                importedModulesSet.add(moduleId);
                return m.default || m;
            });
            const baseDirRequire = utils.getDefaultSyncImport(baseDir);
            const syncImportFn = (moduleId) => {
                const m = baseDirRequire(moduleId);
                importedModulesSet.add(moduleId);
                return m;
            };
            const store$1 = new store.MeshStore(rootArtifactsName, new store.FsStoreStorageAdapter({
                cwd: baseDir,
                importFn,
            }), {
                readonly: false,
                validate: false,
            });
            logger.info(`Reading Mesh configuration`);
            const meshConfig = await findAndParseConfig({
                dir: baseDir,
                store: store$1,
                importFn,
                syncImportFn,
                ignoreAdditionalResolvers: true,
            });
            logger = meshConfig.logger;
            logger.info(`Generating Mesh schema`);
            const { schema, destroy, rawSources } = await runtime.getMesh(meshConfig);
            await utils.writeFile(path.join(outputDir, 'schema.graphql'), utils$1.printSchemaWithDirectives(schema));
            logger.info(`Generating artifacts`);
            await generateTsArtifacts({
                unifiedSchema: schema,
                rawSources,
                mergerType: meshConfig.merger.name,
                documents: meshConfig.documents,
                flattenTypes: false,
                importedModulesSet,
                baseDir,
                meshConfigCode: meshConfig.code,
                logger,
                sdkConfig: meshConfig.config.sdk,
            });
            logger.info(`Cleanup`);
            destroy();
            logger.info('Done! => ' + outputDir);
        }
        catch (e) {
            handleFatalError(e, logger);
        }
    }).argv;
}

graphqlMesh()
    .then(() => { })
    .catch(e => handleFatalError(e, new utils.DefaultLogger('🕸️')));