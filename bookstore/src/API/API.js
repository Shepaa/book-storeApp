export class API {
    constructor(url) {
        this.url = url;
    }

    async request(url = '', method = 'GET', body) {
        try {
            const responseData = await fetch(`${this.url}${url}`, {
                method,
                body: body ? JSON.stringify(body) : undefined,
                headers: {
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            return responseData.json()
        } catch (e) {
            throw new Error(`${e.status} ${e.statusText}`);
        }
    }

    getList() {
        return this.request()
            .catch((error) => {
                throw new Error(`Can not fitch: ${error.message}`);
            })
    }
    async getOne (id) {
        try {
            return await this.request(id)
        } catch (error) {
            throw new Error(`Can not fitch one item: ${error.message}`);
        }
    }

    create(data) {
        return this.request('', `POST`, data)
            .catch(error => {
                throw new Error(`Can not create: ${error.message}`);
            })
    }

    delete(id) {
        return this.request(id, `DELETE`)
            .catch((error) => {
                throw new Error(`Can not delete : ${error.message}`);
            })
    }

    update(id, changes) {
        return this.request(id, `PUT`, changes)
            .catch(error => {
                throw new Error(`Can not update: ${error.message}`);
            })
    }
}


