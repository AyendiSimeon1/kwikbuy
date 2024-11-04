const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    username: String!
    password: String!
    createdAt: String!
  }

  type AuthData {
    token: String
    user: User
    error: String
    errorMessage: String
    errorCode: String
  }

  type CreateTemplateResponse {
    success: Boolean
    message: String
    error: String
    errorCode: String
  }

  enum ComponentType {
    HEADER
    BODY
    FOOTER
    BUTTONS
  }

  enum ButtonType {
    PHONE_NUMBER
    URL
    QUICK_REPLY
  }

  enum Category {
    MARKETING
    UTILITY
    AUTHENTICATION
  }

  enum HeaderFormat {
    TEXT
    IMAGE
    VIDEO
    DOCUMENT
  }

  type HeaderExample {
    header_text: [String]
  }

  type BodyExample {
    body_text: [[String!]!]
  }

  type Example {
    header_text: [String]
    body_text: [[String!]!]
  }

  type Button {
    type: ButtonType!
    text: String!
    phone_number: String
    url: String
    example: [String]
  }

  type Component {
    type: ComponentType!
    format: HeaderFormat
    text: String
    buttons: [Button]
    example: Example
  }

  type Template {
    name: String!
    language: String!
    category: Category!
    components: [Component!]!
    status: String
    id: String
  }

  input ButtonInput {
    type: ButtonType!
    text: String!
    phone_number: String
    url: String
    example: [String]
  }

  input ExampleInput {
    header_text: [String]
    body_text: [[String!]!]
  }

  input ComponentInput {
    type: ComponentType!
    format: HeaderFormat
    text: String
    buttons: [ButtonInput]
    example: ExampleInput
  }

  input CreateTemplateInput {
    name: String!
    language: String!
    category: Category!
    components: [ComponentInput!]!
  }

  type Query {
    template(name: String!): Template
    templates: [Template!]!
    me: User
    getTemplates: [Template!]!
  }

  type Mutation {
    signup(email: String!, username: String!, password: String!): AuthData!
    login(email: String!, password: String!): AuthData!
    signupGoogle(token: String!): AuthData!
    createTemplate(input: CreateTemplateInput): Template
    deleteTemplate(name: String!): Boolean!
  }
`;

module.exports = typeDefs;
