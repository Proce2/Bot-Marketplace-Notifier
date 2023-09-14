
const { getList, filterUSD, filterETH } = require('./axies');
const open = require('open');
//const player = require('play-sound')();
let notifiedList = [];


const run = (cron) => {
  // -------------------- OLD METHOD ----------------------------
  // cron.schedule('*/30 * * * * *', async () => {
  //   console.log(`running a task at ${new Date().toLocaleString()}`);
  //   const list = await getList();
  //   const filterList = filterUSD(list, notifiedList);
  //   if (filterList.length > 0) {
  //     await asyncForEach(filterList, async (item) => {
  //       await aimbot.sendMessage(item);
  //       await waitFor(2500);
  //       notifiedList.push(item.id);
  //       console.log('procesado', item.id)
  //     });
  //   }
  // });
  // ***********************************************************

  // Leer 
  cron.schedule('* * * * * *', async () => {
    try {
      //console.log(`Looking for axie`);
      const list = await getList();
      const filterList = filterETH(list, notifiedList);
      
      
      if (filterList.length > 0) {
       // if (!notifiedList.includes(filterList[0].id)) {
          notifiedList.push(filterList[0].id)
          global.toNotifyList = toNotifyList.concat(filterList);
          console.log(`FOUND => url: ${filterList[0].url} precio:${filterList[0].priceUSD}`);
          // player.play('./media/roadrunner.mp3', (err) => {
          //     if (err) console.log(`Could not play sound: ${err}`);
          // });
          //open(filterList[0].url)
          // await buy(filterList[0].auction);
            //AimBot.sendMessage(filterList[0]);

       // }
        // filterList.map(item => {
        // });
      }
    } catch (error) {
      console.log(error);
    }
  });
  // Notificar
  // cron.schedule('*/10 * * * * *', async () => {
  //   try {
  //     if (toNotifyList.length > 0) {
  //       const axie = toNotifyList[0]
  //       await AimBot.sendMessage(axie);
  //       notifiedList.push(axie.id);
  //       console.log('axie found', axie.id)
  //       global.toNotifyList.shift();
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }

  // });

  cron.schedule('0 0 */1 * * *', async () => {
    notifiedList = [];
    console.log('notifiedList was cleared')
  });
}

module.exports = { run }