# axios-hook-typescript

![npm](https://img.shields.io/badge/axios%20interceptor-axios-green)

React hooks for [axios] with built in react-tostify integration. Simple to use with minimum configuration.

![axios-interceptor-hook](https://raw.githubusercontent.com/sheikhfahad67/axios-interceptor/master/.github/images/axios-interceptor-hook.gif 'axios-interceptor-hook')

## Features

- All the [axios] awesomeness you are familiar with
- Zero configuration, but configurable if needed
- Integrated react-toastify for better toast messages
- Minimize file managment

## Installation

`npm install axios react-toastify axios-interceptor-hook`

> `axios` and `react-toastify` are peer dependencies and needs to be installed explicitly

## Example

```js
import { useEffect, useRef } from 'react';
import {
  ApiConfig,
  useJsonApiInterceptor,
  useMultipartInterceptor,
} from 'axios-hook-typescript';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

interface todosObject {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const App = () => {
  const { apiHandler: jsonApiHandler, data: jsonData } =
    useJsonApiInterceptor();
  const { apiHandler: multipartApiHandler } = useMultipartInterceptor();
  const inputRef = useRef(null);

  const getTodos = async () => {
    const config: ApiConfig = {
      url: 'https://jsonplaceholder.typicode.com/todos',
      method: 'GET',
      displayToast: true,
      successMessage: 'Fetch all todos',
      theme: 'colored',
    };
    await jsonApiHandler(config);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleFileChange = async (e: any) => {
    const { files: newFiles } = e.target;
    const formData = new FormData();
    formData.append('image', newFiles[0]);

    const config: ApiConfig = {
      url: 'http://localhost:8000/files',
      data: formData,
      method: 'POST',
      displayToast: true,
      successMessage: 'File uploaded successfully',
    };
    await multipartApiHandler(config);
  };

  return (
    <div className='App'>
      <ToastContainer />
      <h1>Axios Interceptor Examples</h1>
      <input
        id='file'
        type='file'
        multiple
        ref={inputRef}
        onChange={handleFileChange}
      />
      <button className='submit-btn' type='submit'>
        Upload
      </button>
      <div style={{ marginTop: '50px', border: '1px solid green' }}>
        {jsonData &&
          Object.keys(jsonData).length > 0 &&
          jsonData.map((todo: todosObject) => (
            <h1 key={todo.id}>{todo?.title}</h1>
          ))}
      </div>
    </div>
  );
};

export default App;
```

## Documentation

### Hooks

> `useJsonApiInterceptor` - for content-type: application/json.
> `useMultipartInterceptor` - for content-type: multipart/form-data

### Return

It will return following fields:

| Fields     |  Type  |                                                                                   Description |
| ---------- | :----: | --------------------------------------------------------------------------------------------: |
| data       | Object |                                                    It return the response of api `(res.data)` |
| isPending  |  Bool  | For loading purpose return `true` while fetching and return false after completion or failure |
| apiHandler |  Func  |              Function to give you control over calling when you need just by passing `config` |

### For Bearer Token

Need to save your auth token as, interceptor will automatically get it.

> localStorage.setItem('authToken', `<YOUR TOKEN>`);

### Environment Variable for Base URL

Please add env variable into your `.env` or `.env.local` file.

> REACT_APP_BASE_URL="https://jsonplaceholder.typicode.com"

### Config Props

#### Types

> `ApiConfig` - for api configurations

| Fields          |  Type  |                                                                           Description |
| --------------- | :----: | ------------------------------------------------------------------------------------: |
| method          | string |                                               'get', 'post', 'put', 'delete', 'patch' |
| url             | string |                                                              it will be your endpoint |
| delay           | number |                                                                          default 5000 |
| data            | Object |                                                 required on post, put, patch requests |
| successMessage  | string |                                                                         'Any Message' |
| position        | string | 'top-right', 'top-left', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center' |
| hideProgressBar |  Bool  |                                                                     `true` or `false` |
| theme           | string |                                                              'light','dark','colored' |

## License

MIT

[axios]: https://github.com/axios/axios
