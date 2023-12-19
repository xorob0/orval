/**
 * Generated by orval v6.23.0 🍺
 * Do not edit manually.
 * Swagger Petstore
 * OpenAPI spec version: 1.0.0
 */
import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreatePetsBody, ListPetsParams, Pet, Pets } from '../model';
import { faker } from '@faker-js/faker';
import { HttpResponse, delay, http } from 'msw';
import listPetsMutator from '../mutator/response-type';

/**
 * @summary List all pets
 */
export const listPets = (params?: ListPetsParams, version: number = 1) => {
  return listPetsMutator<Pets>({
    url: `/v${version}/pets`,
    method: 'GET',
    params,
  });
};

/**
 * @summary Create a pet
 */
export const createPets = <TData = AxiosResponse<void>>(
  createPetsBody: CreatePetsBody,
  version: number = 1,
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.post(`/v${version}/pets`, createPetsBody, options);
};

/**
 * @summary Info for a specific pet
 */
export const showPetById = <TData = AxiosResponse<Pet>>(
  petId: string,
  version: number = 1,
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.get(`/v${version}/pets/${petId}`, options);
};

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

export type ListPetsResult = NonNullable<Awaited<ReturnType<typeof listPets>>>;
export type CreatePetsResult = AxiosResponse<void>;
export type ShowPetByIdResult = AxiosResponse<Pet>;

export const getListPetsMock = () =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    id: faker.number.int({ min: undefined, max: undefined }),
    name: 'jon',
    tag: 'jon',
  }));

export const getShowPetByIdMock = () =>
  (() => ({
    id: faker.number.int({ min: 1, max: 99 }),
    name: faker.person.firstName(),
    tag: faker.helpers.arrayElement([faker.word.sample(), void 0]),
  }))();

export const getSwaggerPetstoreMock = () => [
  http.get('*/v:version/pets', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getListPetsMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.post('*/v:version/pets', async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.get('*/v:version/pets/:petId', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getShowPetByIdMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
];
