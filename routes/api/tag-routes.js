const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // find all tags
    // be sure to include its associated Product data
    const tag = await Tag.findAll({ include: [{ model: Product, through: ProductTag }] });

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).send("Error finding tags!");
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    const idTag = await Category.findByPk(req.params.id, { include: [{ model: Product, through: ProductTag }] });
    res.status(200).json(idTag);
  } catch (err) {
    res.status(500).send("Error retrieving tags!");
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  try {
    // delete on tag by its `id` value
    const deleteTag = await Tag.destroy({ where: { id: req.params.id } });

    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(400).json({ message: "Something went wrong", detail: err });
  }
});

module.exports = router;
