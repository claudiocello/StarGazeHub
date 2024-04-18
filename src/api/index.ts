import axios from 'axios';
import {fold} from 'fp-ts/lib/Either';
import {pipe} from 'fp-ts/lib/function';
import {StargazersArrayCodec} from '../models/Stargazer';
import {PathReporter} from 'io-ts/PathReporter';
import {Stargazer} from '../models/Stargazer';

export async function fetchStargazers(
  owner: string,
  repo: string,
  page: number = 1,
  perPage: number = 30,
): Promise<Stargazer[]> {
  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/stargazers?page=${page}&per_page=${perPage}`,
  );
  const validationResult = StargazersArrayCodec.decode(response.data);

  return pipe(
    validationResult,
    fold(
      errors => {
        throw new Error(
          'Validation failed: ' +
            PathReporter.report(validationResult).join(', '),
        );
      },
      stargazers => stargazers,
    ),
  );
}
