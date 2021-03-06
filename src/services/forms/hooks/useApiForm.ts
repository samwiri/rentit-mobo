import React from 'react';
import get from 'lodash/get';
import each from 'lodash/each';
import first from 'lodash/first';

import { useSendHttpData } from '@/services/http';

import useForm from './useForm';

const formatErrors = errors => {
  const result = {};

  each(errors, (values, name) => {
    result[name] = first(values);
  });

  return result;
};

export default fields => {
  const form = useForm(fields);

  const { error, isBusy, send } = useSendHttpData();

  const formatResponseErrors = () => {
    form.updateErrors(formatErrors(get(error, 'response.data.errors', {})));
  };

  React.useEffect(formatResponseErrors, [error]);

  const httpCall = (url, verb, options) => {
    return form.withValidatedData(data => send(url, { ...options, verb, data }));
  };

  return {
    ...form,
    post: (url, options) => httpCall(url, 'post', options),
    put: (url, options) => httpCall(url, 'put', options),
    patch: (url, options) => httpCall(url, 'patch', options),
    destroy: (url, options) => httpCall(url, 'destroy', options),
  };
};
