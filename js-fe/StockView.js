export default class StockView {
    constructor(root, { onItemSelect, onItemAdd, onItemDelete }) {
        this.root = root;
        this.onItemSelect = onItemSelect;
        this.onItemAdd = onItemAdd;
        this.onItemDelete = onItemDelete;

        this.activeItemId = null;

        this.tableBody = this.root.querySelector('table tbody');
        this.addBtn = this.root.querySelector('.add-btn');
        this.deleteBtn = this.root.querySelector('.delete-btn');
        this.nameInput = this.root.querySelector('.namebar');

        this.modal = document.getElementById('item-modal');
        this.modalTitle = this.modal.querySelector('h2');
        this.itemForm = document.getElementById('item-form');
        this.btnSave = document.getElementById('modal-save-btn');
        this.btnCancel = document.getElementById('modal-cancel-btn');

        this.addBtn.addEventListener('click', () => {
            this.showModal('add');
        })

        this.itemForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const itemData = this.getFormInputData();
            this.onItemAdd(itemData);
            this.hideModal();
        })

        this.deleteBtn.addEventListener('click', () => {
            if (this.activeItemId) {
                const doDelete = confirm(`Are you sure you want to delete ${this.activeItemId}?`);

                if (doDelete) {
                    this.onItemDelete(this.activeItemId);
                    this.activeItemId = null;
                }
            }
        })

        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        })
    }

    _createRowHTML(item) {
        const id = item._id;
        //const totalCost = (item.quantity * item.costPerUnit).toFixed(2); <- TO BE DECIDE

        return `
        <tr data-item-id="${id}" class="table-row">
            <td>${rowNum || ''}</td>
            <td>${item.partId || 'N/A'}</td>
            <td>${item.description || 'N/A'}</td>
            <td class="text-right">${item.quantity || 0}</td>
            <td class="text-right">${item.unitOfItem || 'Unit'}</td>
            <td class="text-right">${item.costPerUnit?.toFixed(2) || '0.00'}</td>
            <td class="text-right">${item.costUnit || 'THB'}</td>
        </tr>
        `
    }

    updateStockList(items) {
        this.tableBody.innerHTML = "";

        if (items.length === 0) {
            const emptyRow = this.tableBody.insertRow();
            const cell = emptyRow.insertCell();
            cell.colSpan = 7;
            cell.textContent = "Inventory is empty. Click 'Add' to begin adding item.";
            cell.classList.add('empty-state');
            return;
        }

        items.forEach((item, index) => {
            const html = this._createRowHTML(item, index + 1);
            this.tableBody.insertAdjacentHTML('beforeend', html);
        });

        this.tableBody.querySelectorAll('tr').forEach(row => {
            const itemId = row.dataset.itemId;

            row.addEventListener('click', () => {
                this.setActiveRow(itemId);
                this.onItemSelect(itemId);
            })

            row.addEventListener('dblclick', () => {
                this.onItemSelect(itemId, true);
            })
        })

        if (this.activeItemId) {
            this.setActiveRow(this.activeItemId);
        }
    }

    setActiveRow(id) {
        this.activeItemId = id;

        this.tableBody.querySelectorAll('table-row--select').forEach(row => {
            row.classList.remove("table-row--selected");
        });

        const targetRow = this.tableBody.querySelector(`[data-item-id="${id}"]`);
        if (targetRow) {
            targetRow.classList.add("table-row--selected");
        }
    }

    updateActiveItem(item) {
        this.setActiveRow(item._id);
        this.showModal('edit', item);
    }

    showModal(mode, item = {}) {
        if (mode === 'add') {
            this.modalTitle.textContent = "Add New Item";
            this.itemForm.reset();
            document.getElementById('item-id-input').value = '';
        } else if (mode === 'edit') {
            this.modalTitle.textContent = `Edit Item: ${item.partId}`;
            document.getElementById('item-id-input').value = item._id || '';
            document.getElementById('part-id').value = item.partId || '';
            document.getElementById('description').value = item.description || '';
            document.getElementById('quantity').value = item.quantity || 0;
            document.getElementById('unit').value = item.unitOfItem || '';
            document.getElementById('cost-p-unit').value = item.costPerUnit || 0;
            document.getElementById('currency').value = item.costUnit || '';
        }
        this.modal.style.display = 'block';
    }

    hideModal() {
        this.modal.style.display = 'none';
        this.itemForm.reset();
    }

    getFormInputData() {
        const formData = new FormData(this.itemForm);
        const data = {};

        for (const [key, value] of formData.entries()) {

            if (['quantity', 'costPerUnit'].includes(key)) {
                data[key] = parseFloat(value) || 0;
            } else {
                data[key] = value.trim();
            }
        }

        return data;
    }
}