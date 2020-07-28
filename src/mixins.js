export const mixins = {
    getPageByNumber(number, arr, perPage = 6){
        if(arr.length > perPage){
            const start = number * perPage,
                end = start + perPage;
            return arr.slice(start, end);
        }else{
            return arr;
        }
    },
    sortBy(param, arr) {
        arr.sort(function(a, b){
            let param_a = isNaN(a[param]) ? 0 : a[param],
                param_b = isNaN(b[param]) ? 0 : b[param];

            if (param_a < param_b) {
                return -1;
            }
            if (param_a > param_b) {
                return 1;
            }
            return 0;
        });
        return arr;
    },
    filterBy(min, max, param, arr, cb){
        cb(arr.filter((val) => {
            let val_param = val[param];
            val_param = isNaN(val_param)? 0 : val_param;
            return  val_param >= min && val_param <= max;
        }))
    },
    filterByPilot(pilots, arr, cb){
        let filteredShips = [];
        if(pilots.length < 0)  filteredShips = arr;
        else {
            pilots.forEach((pilot) => {
                arr.forEach((el) => {
                    if (el.pilots.includes(pilot) && !filteredShips.includes(el)) {
                        filteredShips.push(el);
                    }
                });
            });
        }
        cb(filteredShips);
    },
    //Cards
    thumbnailText(name){
        name = name.replace(/-/g, ' ');
        if(name.search(' ') > 0){
            name = name.split(' ');
            return (name[0][0] + name[1][0]).toUpperCase()
        }else{
            return name.slice(0, 2).toUpperCase()
        }
    },

    formatValues(el){
        if (el.crew.search('-') > 0) {
            el.crew = el.crew.split('-')[0];
        }
        if (el.crew.search(',') > 0) {
            el.crew = el.crew.split(',').join('')
        }
        el.crew = parseInt(el.crew);

        el.cost_in_credits =  parseInt(el.cost_in_credits);

        if (el.passengers.search(',') > 0) {
            el.passengers = el.passengers.split(',').join('');
        }
        el.passengers =  parseInt(el.passengers);

        el.MGLT =  parseInt(el.MGLT);
    }



};