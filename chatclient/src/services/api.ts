import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';
import { ConversationInterface, MessageInterface, AuthInterface, UserInterface } from '../types';


export interface LoginRequest {
  username: string | undefined;
  password: string | undefined;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}
export interface RegisterResponse {
  message: string;
}


export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9900/api/',
    prepareHeaders: (headers) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = Cookies.get('token');
      if (token) {
        headers.set('authorization', `${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthInterface, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: 'auth/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
    getConversations: builder.query<ConversationInterface[], string>({
      query: (userId) => ({
        url: `conversation/${userId}`,
        method: 'GET',
      }),
    }),
    getMessages: builder.query<MessageInterface[], string>({
      query: (conversationId) => ({
        url: `message/${conversationId}`,
        method: 'GET',
      }),
    }),
    sendMessage: builder.mutation<string, Omit<MessageInterface, '_id' | 'createdAt' | 'updatedAt' >>({
      query: (messageObject) => ({
        url: `message/`,
        method: 'POST',
        body: messageObject,
      }),
    }),
    getUser: builder.query<AuthInterface, string | undefined>({
      query: (userId) => ({
        url: `users?userId=${userId}`,
        method: 'GET',
      }),
    }),
    getAllUsers: builder.query<UserInterface[], string | undefined>({
      query: () => ({
        url: `users/all`,
        method: 'GET',
      }),
    }),
  }),
})

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useGetConversationsQuery, 
  useGetUserQuery, 
  useGetMessagesQuery,
  useSendMessageMutation,
  useGetAllUsersQuery,
} = api
