export const selectCategoriesMap = (state) => {
  console.log("category selector fired");
  return state.categories.categories.reduce((acc, categoryObj) => {
    const { title, items } = categoryObj;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
};
