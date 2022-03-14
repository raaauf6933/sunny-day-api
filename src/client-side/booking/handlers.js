const handleNextStep = (navigate, params, next) => {
  //logic here
  navigate();
};

export const getMaxPerson = (rooms) => {
  let max_person = 0;

  if (rooms.length !== 0) {
    rooms.map((e) => (max_person += e.no_person));
  }

  return max_person;
};
