function productPreSaveHook(models, ProductSchema) {
  ProductSchema.pre('save', async function() {
    let prod = this;
    await Promise.all([
      syncProductAddition(models.exporter, prod, prod.exporter).catch(console.error),
      syncProductAddition(models.storage, prod, prod.storId).catch(console.error),
    ]);
  });
}

async function syncProductAddition(models, prod, id) {
  const doc = await models.findById(id).catch(console.error);
  doc.products.push(prod);
  const newDoc = await doc.save().catch(console.error);
  console.log(newDoc);
}

function productPreRemoveHook(models, ProductSchema) {
  ProductSchema.pre('remove', async function() {
    let prod = this;
    await Promise.all([
      syncProductDeletion(models.exporter, prod, prod.exporter).catch(console.error),
      syncProductDeletion(models.storage, prod, prod.storId).catch(console.error),
    ]);
  })
}

async function syncProductDeletion(models, prod, id) {
  const doc = await models.findById(id).catch(console.error);
  doc.products.splice(doc.products.indexOf(prod), 1);
  const newDoc = await doc.save().catch(console.error);
  console.log(newDoc);
}

module.exports = {
  productPreSaveHook,
  productPreRemoveHook
};