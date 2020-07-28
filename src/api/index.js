import axios from "axios";

export default {
     getShips() {
        let ships = [];
        return axios("http://swapi.dev/api/starships/")
            .then(response => {
                ships = response.data.results;
                return response.data.count;
            })

            .then(count => {
                const numberOfPagesLeft = Math.ceil((count - 1) / 10);
                let promises = [];

                for (let i = 2; i <= numberOfPagesLeft; i++) {
                    promises.push(axios(`http://swapi.dev/api/starships?page=${i}`));
                }
                return Promise.all(promises);
            })
            .then(response => {
                ships = response.reduce((acc, data) => [...acc, ...data.data.results], ships);
                return(ships);
            })
            .catch(error => console.log("Error", error));
    },
    getSingleShip(data, cb){
        axios(`https://swapi.dev/api/starships/${data.slug}`)
            .then(response => {
                cb(response.data)
            })
    },
    getPilot(link, cb) {
        axios(link)
            .then(response => {
                cb(response.data)
            })
    },
}