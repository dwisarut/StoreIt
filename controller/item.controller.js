import Item from "../model/item.model.js";

const getItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleItem = async (req, res) => {
  try {
    const { id: partId } = req.params;
    const item = await Item.findOne({ partId });

    if (!item) {
      return res
        .status(404)
        .json({ message: `Item with an ID ${partId} not found` });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id: partId } = req.params;
    const updatedItem = await Item.findOneAndUpdate({ partId }, req.body, {
      new: true,
    });

    if (!updatedItem) {
      return res
        .status(404)
        .json({ message: `Item with an ID ${partId} not found` });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id: partId } = req.params;
    const deletedItem = await Item.findOneAndDelete({ partId });

    if (!deletedItem) {
      return res
        .status(404)
        .json({ message: `Item with an ID ${partId} not found` });
    }
    res.status(200).json({ message: "Item deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getItems, getSingleItem, createItem, updateItem, deleteItem };
