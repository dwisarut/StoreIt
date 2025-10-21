import StockView from "./StockView.js";
import StockAPI from "./StockAPI.js"

export default class App {
    constructor(root) {
        this.items = [];
        this.activeItem = null;
        this.view = new StockView(root, this._handlers());
        this._refreshItems();
    }

    async _refreshItems() {
        const items = await StockAPI.getAllItems();
        this._setItems(items);

        /*if (items.length > 0) {
            this._setActiveItem(items[0]);
        }*/
    }

    _setItems(items) {
        this.items = items;
        this.view.updateItemsList(items);
    }

    _setActiveItem(item) {
        this.activeItem = item;
        this.view.updateActiveItem(item);
    }

    _findItem(id) {
        return this.items.find(item => item._id === id)
    }

    _handlers() {
        return {
            onItemSelect: (id, requestEdit = false) => {
                const item = this._findItem(id);
                this._setActiveItem(item);

                if (requestEdit) {
                    this.view.showModal('edit', item);
                }
            },
            onItemSave: async itemData => {
                try {
                    await StockAPI.saveItem(itemData);
                    this._refreshItems();
                } catch (error) {
                    alert(`Error saving item: Duplicated Part ID`);
                }

            },
            onItemDelete: async id => {
                await StockAPI.deleteItem(id);
                this._refreshItems();
            }
        }
    }
}