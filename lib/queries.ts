// lib/queries.ts
export const GET_COUNTRIES = `
  query {
  countries {
    code
    name
    continent {
      name
    }
    capital
    native
    phone
    currency
    languages {
      name
    }
    emoji
    emojiU
  }
}

`;
