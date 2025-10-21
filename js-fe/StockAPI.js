const API_BASED_URL = "http://localhost:3000/api/storage";

export default class StockAPI {
    /**
     * @returns {Promise<Array>}
     */

    static async getAllItems() {
        try {
            const response = await fetch(API_BASED_URL);

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch storage: ${response.status} ${response.statusText}`
                );
            }

            const items = await response.json();

            return items.sort((a, b) => {
                return new Date(a.updated || 0) > new Date(b.updated || 0) ? -1 : 1;
            });

        } catch (error) {
            console.error("Error in getAllItems:", error);
            return [];
        }

    }

    /**
     * @param {Object} itemToSave
     * @returns {Promise<Object>}
     */

    static async saveItem(itemToSave) {
        const isNewItem = !itemToSave._id;
        const endpoint = isNewItem ? API_BASED_URL : `${API_BASED_URL}/${itemToSave._id}`;
        const method = isNewItem ? 'POST' : 'PUT';

        try {
            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemToSave)
            });

            if (!response.ok) {
                let errorDetail;
                try {
                    errorDetail = await response.json();
                } catch (e) {
                    throw new Error(`API failed to save item: ${response.status} ${response.statusText}`);
                }
                const errorMessage = errorDetail.message || `API failed to save item ${response.status}`;

                throw new Error(errorMessage);
            }

            return await response.json();

        } catch (error) {
            console.error("Error in saveItem", error);
            throw error;
        }
    }

    /**
     * @param {String} id
     * @returns {Promise<void>}
     */
    static async deleteItem(id) {
        try {
            const response = await fetch(`${API_BASED_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Failed to delete: ${response.status}`);
            }

        } catch (error) {
            console.error("Error in deleteItem:", error);
            throw error;
        }

    }
}
