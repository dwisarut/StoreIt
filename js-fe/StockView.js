export default class StockView {
    constructor(root, { onItemSelect, onItemAdd, onItemDelete }) {
        this.root = root;
        this.onItemSelect = onItemSelect;
        this.onItemAdd = onItemAdd;
        this.onItemDelete = onItemDelete;

        this.tableBody = document.root.querySelector('table tbody');
        this.addBtn = document.root.querySelector('.add-btn');
        this.deleteBtn = document.root.querySelector('.delete-btn');
        this.nameInput = document.root.querySelector('.namebar');

        this.addBtn.addEventListener('click', () => {
            this.onItemAdd;
        })

    }
}