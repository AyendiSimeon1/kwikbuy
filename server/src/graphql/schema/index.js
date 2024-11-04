const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar DateTime
scalar JSON

type FlowAnalytics {
  totalVisits: Int!
  completions: Int!
  averageTimeSpent: Float!
  conversionRate: Float!
}

input UpdateFlowInput {
  flowId: ID!
  nodes: [FlowNodeInput!]!
  edges: [FlowEdgeInput!]!
  startNode: ID!
}

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
type CreateTemplateResponse{
  success: Boolean
  message: String
  error: String
  errorCode: Number
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
    header_handle: [String]
  }

  type BodyExample {
    body_text: [[String!]!]
  }

  type Example {
    header_handle: [String]
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
    header_handle: [String]
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
  }

type Query {
  me: User
  getTemplates: [Template!]!
  getChatbots(userId: ID!): [Chatbot!]!
  getChatbotFlow(chatbotId: ID!): ChatbotFlow!
  getFlowAnalytics(flowId: ID!): FlowAnalytics!
}

type Mutation {
  signup(email: String!, username: String!, password: String!): AuthData!
  login(email: String!, password: String!): AuthData!
  signupGoogle(token: String!): AuthData!
  createTemplate(input: CreateTemplateInput!): Template!
  deleteTemplate(name: String!): Boolean!
  sendBroadcastMessage(input: BroadcastMessageInput!): BroadcastMessageResponse!
  createChatbot(input: ChatbotInput!): Chatbot!
  updateChatbotFlow(input: UpdateFlowInput!): ChatbotFlow!
  publishChatbot(chatbotId: ID!): PublishResult!
  toggleChatbotStatus(chatbotId: ID!, active: Boolean!): Chatbot!
}

type Template {
  name: String!
  status: String!
  category: String!
  language: String!
}

input BroadcastMessageInput {
  templateName: String!
  templateLanguage: String!
  recipients: [RecipientInput!]!
  parameters: [TemplateParameterInput!]!
  scheduledTime: DateTime!
}

input RecipientInput {
  phoneNumber: String!
  customParameters: JSON
}

input TemplateParameterInput {
  type: TemplateParameterType!
  index: Int!
  value: String!
}

enum TemplateParameterType {
  BODY
  HEADER
  BUTTON
}

type BroadcastMessageResponse {
  successful: [MessageResult!]!
  failed: [MessageError!]!
  messageId: ID!
  status: BroadcastStatus!
}

type MessageResult {
  recipientPhone: String!
  whatsappMessageId: String!
  status: MessageStatus!
}

type MessageError {
  recipientPhone: String!
  error: String!
  code: String!
}

enum BroadcastStatus {
  SCHEDULED
  IN_PROGRESS
  COMPLETED
  FAILED
}

enum MessageStatus {
  SENT
  DELIVERED
  READ
  FAILED
}

type Chatbot {
  id: ID!
  name: String!
  description: String
  status: ChatbotStatus!
  flow: ChatbotFlow!
  createdAt: DateTime!
  updatedAt: DateTime!
  analytics: ChatbotAnalytics!
}

type ChatbotFlow {
  id: ID!
  nodes: [FlowNode!]!
  edges: [FlowEdge!]!
  startNode: ID!
}

type FlowNode {
  id: ID!
  type: NodeType!
  data: NodeData!
  position: Position!
}

type FlowEdge {
  id: ID!
  source: ID!
  target: ID!
  condition: String
}

type NodeData {
  title: String!
  content: String
  buttons: [Button!]
  mediaUrl: String
  variables: [String!]
  conditions: [Condition!]
}

type Button {
  id: ID!
  text: String!
  value: String!
  action: ButtonAction!
}

type Position {
  x: Float!
  y: Float!
}

type Condition {
  variable: String!
  operator: ConditionOperator!
  value: String!
}

type ChatbotAnalytics {
  totalUsers: Int!
  activeUsers: Int!
  messagesSent: Int!
  messagesReceived: Int!
  completionRate: Float!
  averageResponseTime: Float!
  popularFlows: [PopularFlow!]!
}

type PopularFlow {
  nodeId: ID!
  visits: Int!
  completions: Int!
}

type PublishResult {
  success: Boolean!
  chatbotId: ID!
  deploymentUrl: String
  errors: [String!]
}

input ChatbotInput {
  name: String!
  description: String
  flow: FlowInput
}

input FlowInput {
  nodes: [FlowNodeInput!]!
  edges: [FlowEdgeInput!]!
  startNode: ID!
}

input FlowNodeInput {
  id: ID!
  type: NodeType!
  data: NodeDataInput!
  position: PositionInput!
}

input NodeDataInput {
  title: String!
  content: String
  buttons: [ButtonInput!]
  mediaUrl: String
  variables: [String!]
  conditions: [ConditionInput!]
}

input ButtonInput {
  id: ID!
  text: String!
  value: String!
  action: ButtonAction!
}

input ConditionInput {
  variable: String!
  operator: ConditionOperator!
  value: String!
}

input FlowEdgeInput {
  id: ID!
  source: ID!
  target: ID!
  condition: String
}

input PositionInput {
  x: Float!
  y: Float!
}

enum NodeType {
  MESSAGE
  QUESTION
  CONDITION
  ACTION
  API_CALL
  END
}

enum ButtonAction {
  REPLY
  URL
  PHONE
  NEXT_NODE
}

enum ConditionOperator {
  EQUALS
  NOT_EQUALS
  CONTAINS
  GREATER_THAN
  LESS_THAN
}

enum ChatbotStatus {
  DRAFT
  PUBLISHED
  INACTIVE
}

`;

module.exports = typeDefs;
