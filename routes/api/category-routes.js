const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories
    // be sure to include its associated Products
    const category = await Category.findAll({ include: [{ model: Product }] });

    res.status(200).json(category);
  } catch (err) {
    res.status(500).send("Error finding categories!");
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    // be sure to include its associated Products
    const idCategories = await Category.findByPk(req.params.id, { include: [{ model: Product }] });
    res.status(200).json(idCategories);
  } catch (err) {
    res.status(500).send("Error retrieving categories!");
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((update) => {
      res.status(200).json(update);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  try {
    // delete a category by its `id` value
    const deleteCategory = await Category.destroy({ where: { id: req.params.id } });

    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(400).json({ message: "Something went wrong", detail: err });
  }
});

module.exports = router;
