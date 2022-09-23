import axios from 'axios';

export function ApiGET(url, setValue)
{
    axios.get(url).then(res =>
        {
            var data = res.data;
            setValue(data);
        })
        .catch((error) =>
        {
            console.log(error);
        })
};

export function ApiPOST(url, data, setValue)
{
    axios.post(url, data).then(res =>
        {
            var data = res.data;
            setValue(data);
        })
        .catch((error) =>
        {
            console.log(error);
        })
};