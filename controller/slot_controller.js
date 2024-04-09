import { CRONJOB,SLOTSTIME,OPENSTATUS } from "../utils/constant.js"

//cron.schedule("*/5 * * * * *", function () { // every 5 second
cron.schedule("0 0 0 * * *", function () {
    // run once while a day
    /* console.log("---------------------");
    console.log("running a task every 15 seconds",currentDate(day=2)); */
  
    CRONJOB.forEach(async (value, key) => {
      console.log(getNextDay((day = value)), "dadatt \n\n\n");
      let AssigedLogisticeResp = await LogisticModel.SlotsAssign.findOne({
        assignedDate: new Date(getNextDay((day = value))),
      });
  
      let date = new Date().toISOString();
  
      let slotsTimeArray = [];
      for (let i = 0; i < SLOTSTIME.length; i++) {
        let obj = {
          startTime: SLOTSTIME[i],
          slotStatus: "AVAILABLE",
          logisticId: null,
          patientId: null,
        };
        slotsTimeArray.push(obj);
      }
      if (AssigedLogisticeResp === null) {
        let csv = `Date : ${date}- 'Status':'AVAILABLE' - Number of loop-${
          CRONJOB.length
        }- insertedDate:${getNextDay((day = value))}\n`;
        const slotAssigned = new LogisticModel.SlotsAssign({
          assignedDate: new Date(getNextDay((day = value))),
          alotedTime: slotsTimeArray,
          assigneStatus: OPENSTATUS,
        });
        await slotAssigned.save();
        fs.appendFile("cronLogs.csv", csv, function (err) {
          if (err) throw err;
          console.log("server details logged!");
        });
      }
    });
  });