import * as t from 'io-ts';

const StargazerCodec = t.type({
  login: t.string,
  id: t.number,
  avatar_url: t.string,
});

export const StargazersArrayCodec = t.array(StargazerCodec);

export type Stargazer = t.TypeOf<typeof StargazerCodec>;
