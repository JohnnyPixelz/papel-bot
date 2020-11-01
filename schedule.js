const cronJob = require('cron').CronJob;
const { MessageEmbed } = require('discord.js');
var scheduleChannelID = '764479847409254454';

var schedule = [
    {
        name: "Programming",
        host: "Nikolaos Tselikas",
        link: "http://bit.ly/Programming_Tselikas",
        schedule: [
            {
                day: "tuesday",
                time: 9
            },
            {
                day: "wednesday",
                time: 9
            }
        ]
    },
    {
        name: "Physics",
        host: "Fotis Mpairaktaris",
        link: "http://bit.ly/Physics_Mpairaktaris",
        schedule: [
            {
                day: "monday",
                time: 17
            },
            {
                day: "wednesday",
                time: 11
            }
        ]
    },
    {
        name: "Maths",
        host: "Grigorios Karagiorgos",
        link: "http://bit.ly/Maths_Karagiorgos",
        schedule: [
            {
                day: "wednesday",
                time: 14
            },
            {
                day: "thursday",
                time: 14
            }
        ]
    },
    {
        name: "Logical Design",
        host: "Emmanuel Wallace",
        link: "http://bit.ly/LogicalDesign_Wallace",
        schedule: [
            {
                day: "monday",
                time: 13
            },
            {
                day: "tuesday",
                time: 11
            }
        ]
    },
    {
        name: "Programming Lab",
        host: "Nikolaos Tselikas",
        link: "http://bit.ly/Programming_Tselikas",
        schedule: [

        ]
    },
    {
        name: "Logical Design Lab",
        host: "Paris Kostopoulos & Dimitris Nasiopoulos",
        link: "",
        schedule: [

        ]
    }
]

function getDayNum(day) {
    switch (day) {
        case "sunday":
            return 0;
        case "monday":
            return 1;
        case "tuesday":
            return 2;
        case "wednesday":
            return 3;
        case "thursday":
            return 4;
        case "friday":
            return 5;
        case "saturday":
            return 6;
        default:
            return null;
    }
}

function setup() {
    schedule.forEach(lesson => {
        lesson.schedule.forEach(task => {
            new cronJob(`0 0 ${task.time} * * ${getDayNum(task.day)}`, () => {
                let embed = new MessageEmbed();
                embed.setAuthor(`📚 ${lesson.name}`);
                embed.setTitle('Click here for MS Teams link');
                embed.setURL(lesson.link)
                embed.setFooter('Papel Bot', 'https://i.imgur.com/cJdazvt.jpg');
                embed.addField('Host', lesson.host, false);
                embed.setColor('#11dfa5');
                embed.setTimestamp(Date.now());
                require('./index').client.channels.cache.get(scheduleChannelID).send(embed);
            }, null, true, 'Europe/Athens').start();
        });
    })
}

module.exports.setup = setup;