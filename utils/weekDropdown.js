import { last_regular_season_week, leagueID } from "./leagueInfo.mjs";

document.addEventListener('DOMContentLoaded', function() {
    const weekDropdown = document.getElementById('week_num');

    for (let i = 1; i <= last_regular_season_week; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.text = 'Week ' + i;
        weekDropdown.appendChild(option);
    }

    weekDropdown.addEventListener('change', function() {
        getWeeklyMatchupData();
    });
});

function getWeeklyMatchupData() {
    const selectedWeek = document.getElementById('week_num').value;
    const url = 'https://api.sleeper.app/v1/league/' + leagueID + '/matchups/' + selectedWeek;

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            processWeeklyMatchupData(data);
            document.getElementById('responseContainer').innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('responseContainer').innerHTML = 'Error: ' + error.message;
        });
}

function processWeeklyMatchupData(data) {
    const NUM_MATCHUPS = 5;
    const targetMatchup = [1];

    const matchup_one = data.filter(matchup => targetMatchup.includes(matchup.matchup_id));
    if (matchup_one.length > 0) {
        matchup_one.forEach(matchup => {
            console.log("Matchup ID: ", matchup.matchup_id);
            console.log("Roster ID: ", matchup.roster_id);
        });

    } else {
        console.log("No matching matchups found...");
    }
}