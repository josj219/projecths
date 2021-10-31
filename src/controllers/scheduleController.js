import Schedule from "../models/Schedule";
//import User from "../models/User";

export const scheduleHome = async (req, res) => {
  console.log("SCHEDULE");
  const scheduleList = await Schedule.find({});
  console.log(scheduleList);
  return res.render("schedule/scheduleList", {
    pageTitle: "Schedule",
    scheduleList,
  });
};

export const write = async (req, res) => {
  console.log("WIRETETETETE");
  const { doto, status } = req.body;
  try {
    const newSchedule = new Schedule({
      doto,
      status,
      createdAt: 123,
    });
    await newSchedule.save();
    console.log("==== Success!! Save New TodoTask ====");
    console.log(newSchedule);
    return res.redirect("/schedule");
  } catch (error) {
    console.log("ERRRORRRRRRRRRRRRRRRRRRRRRRRRRR");
    console.log(error);
    return res.status(400).render("schedule/scheduleList", {
      pageTitle: "Scehdule",
      errorMessage: error._message,
    });
  }
};

export const check = async (req, res) => {
  const { id } = req.params;
  const checkList = await Schedule.findById(id);
  checkList.status = 1;
  await checkList.save();

  return res.redirect("/schedule");
};

export const cancel = async (req, res) => {
  const { id } = req.params;
  const checkList = await Schedule.findById(id);
  checkList.status = 0;
  await checkList.save();

  return res.redirect("/schedule");
};

export const remove = async (req, res) => {
  const { id } = req.params;
  await Schedule.findByIdAndDelete(id);

  return res.redirect("/schedule");
};
