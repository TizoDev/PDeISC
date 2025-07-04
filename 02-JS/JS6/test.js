import axios from "axios";

async function fetchData(url) 
{
    try 
    {
        const response = await axios.get(url);
        return response.data;
    } catch (error) 
    {
        throw error;
    }
}

fetchData("https://jsonplaceholder.typicode.com/users?authuser=0")
.then(data => {
    console.log('Datos recibidos:', data);
})
.catch(error => {
    console.error('Error en el componente:', error);
});