export default function serialize(ecos$) {
  return ecos$.map(ecosData => JSON.stringify(
    {
      list: ecosData.list.map(ecoData =>
        ({
          title: ecoData.title,
          completed: ecoData.completed,
          id: ecoData.id
        })
      )
    }
  ));
};
