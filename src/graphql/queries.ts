import { gql } from '@apollo/client/core';

export const GET_APPLICATIONS = gql`
  query GetApplications {
    listVisaApplications {
      items {
        id
        name
        visaType
        status
        submittedAt
      }
    }
  }
`;
