import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
  RequestParameters,
  Variables
} from 'relay-runtime';

let relayEnvironment: Environment | undefined;

const fetchFn: FetchFunction = async (
  request: RequestParameters,
  variables: Variables
) => {
  if (typeof window === 'undefined') {
    return { data: {}, errors: [], extensions: {} };
  }

  const url = `${window.location.origin}/api/graphql`;

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        query: request.text,
        variables,
      }),
    });

    if (!resp.ok) {
      throw new Error(`Network error, status: ${resp.status}`);
    }

    return await resp.json();
  } catch (error) {
    return {
      data: {},
      errors: [{
        message: error instanceof Error ? error.message : 'Network error occurred',
        locations: [],
        path: []
      }],
      extensions: {},
    };
  }
};

export const createRelayEnvironment = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (relayEnvironment) {
    return relayEnvironment;
  }

  try {
    relayEnvironment = new Environment({
      network: Network.create(fetchFn),
      store: new Store(new RecordSource()),
      isServer: false,
    });

    return relayEnvironment;
  } catch (error) {
    return null;
  }
};
