export default function serialize(jobs$) {
  return jobs$.map(jobsData => JSON.stringify(
    {
      list: jobsData.list.map(jobData =>
        ({
          title: jobData.title,
          completed: jobData.completed,
          id: jobData.id
        })
      )
    }
  ));
};
