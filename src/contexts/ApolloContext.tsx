import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { onError } from "@apollo/client/link/error";
import React, {
  Dispatch,
  createContext,
  useContext,
  useMemo,
  useReducer
} from "react";
import { getMainDefinition } from "@apollo/client/utilities";

type State = {
  access_token: string;
  id_token: string;
};
type Action =
  | {
      type: "SET_ACCESS_TOKEN";
      access_token: string;
    }
  | {
      type: "SET_ID_TOKEN";
      id_token: string;
    };

type ApolloDispatch = Dispatch<Action>;

const ApolloStateContext =
  createContext<ApolloClient<NormalizedCacheObject> | null>(null);
const ApolloDispatchContext = createContext<ApolloDispatch | null>(null);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_ACCESS_TOKEN": {
      return {
        ...state,
        access_token: action.access_token
      };
    }
    case "SET_ID_TOKEN": {
      return {
        ...state,
        id_token: action.id_token
      };
    }
    default:
      throw new Error("Unhandled action");
  }
};

export default function ApolloClientProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, {
    access_token: localStorage.getItem("access_token") || "",
    id_token: localStorage.getItem("id_token") || ""
  });

  const _client = useMemo(() => {
    const httpLink = new BatchHttpLink({
      uri: process.env.NEXT_PUBLIC_CF_API_URL + "/graphql",
      batchMax: 5,
      batchInterval: 50
    });

    const splitLink = ApolloLink.split(({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === "OperationDefinition";
    }, httpLink);

    const authLink = new ApolloLink((operation, forward) => {
      const authorization = state.access_token
        ? `Bearer ${state.access_token}`
        : null;

      operation.setContext({
        headers: {
          authorization
        }
      });

      return forward(operation);
    });
    const errorLink = onError(
      ({ graphQLErrors, networkError, operation, forward }) => {
        if (graphQLErrors) {
          for (const err of graphQLErrors) {
            const _errCode = err.extensions?.code;
            switch (_errCode) {
              case "UNAUTHENTICATED": {
                // error code is set to UNAUTHENTICATED
                // when AuthenticationError thrown in resolver
                // modify the operation context with a new token
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${state.access_token}`
                  }
                });
                // retry the request, returning the new observable
                return forward(operation);
              }
              default: {
                console.log(`[GraphQL error]: ${JSON.stringify(err)}`);
                return;
              }
            }
          }
        }
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }
    );

    const retryLink = new RetryLink({
      delay: {
        initial: 300,
        max: Infinity,
        jitter: true
      },
      attempts: {
        max: 5,
        retryIf: (error, _operation) => !!error
      }
    });

    return new ApolloClient({
      link: ApolloLink.from([retryLink, authLink, errorLink, splitLink]),
      uri: process.env.NEXT_PUBLIC_CF_API_URL + "/graphql",
      cache: new InMemoryCache({
        addTypename: false
      }),
      defaultOptions: {
        query: {
          fetchPolicy: "network-only"
        },
        watchQuery: {
          fetchPolicy: "network-only"
        }
      }
    });
  }, [state.access_token]);

  return (
    <ApolloStateContext.Provider value={_client}>
      <ApolloDispatchContext.Provider value={dispatch}>
        {children}
      </ApolloDispatchContext.Provider>
    </ApolloStateContext.Provider>
  );
}

// state 와 dispatch 를 쉽게 사용하기 위한 커스텀 Hooks
export function useApiClient() {
  const state = useContext(ApolloStateContext);
  if (!state) throw new Error("Cannot find ApolloProvider"); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useApiClientDispatch() {
  const dispatch = useContext(ApolloDispatchContext);
  if (!dispatch) throw new Error("Cannot find ApolloProvider"); // 유효하지 않을땐 에러를 발생
  return dispatch;
}
