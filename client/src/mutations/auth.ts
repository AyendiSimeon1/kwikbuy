import { gql } from '@apollo/client';

const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $username: String!, $password: String!) {
    signup(email: $email, username: $username, password: $password) {
      token
      user {
        email
        username
      }
    }
  }
`;

export default SIGNUP_MUTATION;