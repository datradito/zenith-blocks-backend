export const query = `
query Proposals($first: Int, $skip: Int, $space: String, $state: String, $title: String) {
  proposals(
    first: $first,
    skip: $skip,
    where: {
      space: $space,
      title_contains: $title,
      state: $state
    },
    orderBy: "created",
    orderDirection: desc
  ) {
    id
    title
    body
    state
    space {
      id
      name
    }
  }
}
`;
