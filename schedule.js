const cronJob = require('cron').CronJob;
const { MessageEmbed } = require('discord.js');
var scheduleChannelID = '764479847409254454';

var schedule = [
    {
        name: "Programming",
        host: "Nikolaos Tselikas",
        link: "https://teams.microsoft.com/dl/launcher/launcher.html?url=%2F_%23%2Fl%2Fmeetup-join%2F19%3Aa531fb132dc249cf9eca1929133dec11%40thread.tacv2%2F1601961400293%3Fcontext%3D%257b%2522Tid%2522%253a%2522cb62fe3a-db7b-42ce-8c4e-d2a2af74d141%2522%252c%2522Oid%2522%253a%2522173a282a-adc4-4d75-a363-e7a05f3a4fdd%2522%257d%26anon%3Dtrue&type=meetup-join&deeplinkId=000e53e0-5016-4bd1-bb82-6bd3d5a3cb09&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true",
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
        link: "https://teams.microsoft.com/dl/launcher/launcher.html?url=%2F_%23%2Fl%2Fteam%2F19%3A00fb36eee1204371896d1d6f8c57d4f0%40thread.tacv2%2Fconversations%3FgroupId%3D6e4f8503-9ee2-446f-a3f6-e7e45b52e183%26tenantId%3Dcb62fe3a-db7b-42ce-8c4e-d2a2af74d141&type=team&deeplinkId=1650a7d9-d874-4f5b-bbf0-f59792c3a63b&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true",
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
        link: "https://teams.microsoft.com/dl/launcher/launcher.html?url=%2F_%23%2Fl%2Fmeetup-join%2F19%3Ad5e03671a36643b088ef6207df92e36e%40thread.tacv2%2F1602190128030%3Fcontext%3D%257b%2522Tid%2522%253a%2522cb62fe3a-db7b-42ce-8c4e-d2a2af74d141%2522%252c%2522Oid%2522%253a%25223453b12c-e5a9-42e5-8134-6befbea30386%2522%257d%26anon%3Dtrue&type=meetup-join&deeplinkId=8fcf1c4d-67f4-4927-9612-750f98ca8e6e&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true",
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
        link: "https://teams.microsoft.com/dl/launcher/launcher.html?url=%2F_%23%2Fl%2Fmeetup-join%2F19%3A640e17aa5c704c5d9aece0476a77d7c4%40thread.tacv2%2F1602430232101%3Fcontext%3D%257b%2522Tid%2522%253a%2522cb62fe3a-db7b-42ce-8c4e-d2a2af74d141%2522%252c%2522Oid%2522%253a%2522c3d98154-02dd-475e-9ea8-64d6795b15b2%2522%257d%26anon%3Dtrue&type=meetup-join&deeplinkId=9ee9bbf9-3c73-4208-93cd-9c80709140ed&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true",
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
        link: "https://teams.microsoft.com/dl/launcher/launcher.html?url=%2F_%23%2Fl%2Fmeetup-join%2F19%3Aa531fb132dc249cf9eca1929133dec11%40thread.tacv2%2F1601961400293%3Fcontext%3D%257b%2522Tid%2522%253a%2522cb62fe3a-db7b-42ce-8c4e-d2a2af74d141%2522%252c%2522Oid%2522%253a%2522173a282a-adc4-4d75-a363-e7a05f3a4fdd%2522%257d%26anon%3Dtrue&type=meetup-join&deeplinkId=000e53e0-5016-4bd1-bb82-6bd3d5a3cb09&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true",
        schedule: [
            {
                day: "tuesday",
                time: 18
            }
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
            new cronJob(`0 45 ${task.time - 1} * * ${getDayNum(task.day)}`, () => {
                let embed = new MessageEmbed();
                embed.setAuthor(`📚 ${lesson.name} in 15 minutes`);
                embed.setTitle('Click here for MS Teams link');
                embed.setURL(lesson.link)
                embed.setFooter('Papel Bot', 'https://i.imgur.com/cJdazvt.jpg');
                embed.addField('Host', lesson.host, false);
                embed.setColor('#11dfa5');
                embed.setTimestamp(Date.now());
                require('./index').client.channels.cache.get(scheduleChannelID).send(embed);
            }, null, true, 'Europe/Athens').start();

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