---
layout: "../layouts/Page.astro"
title: "API"
---

# Community API
Stormgate World provides a public API for community use. The API, just like the game, is currently in beta and may change without notice. The API is currently read-only and does not require authentication. 

## Usage Guidelines
Feel free to use the API for your own projects, but please be considerate of the server load. Specifically, please do not crawl the API to make a full copy of data. If you need a full copy of the data please contact us and we can provide a dump.

If you made something cool with the API, please let us know! We'd love to feature it on our website.

## Privacy
The API exposes player nicknames, Steam IDs, and match results following the [Privacy Policy]() of Frost Giant Studios. We're building features that will allow players to control the visibility of their data – which may mean that some data is not available via the API.

## OpenAPI Spec & Docs
The API is documented using the OpenAPI 3.1 specification. You can view the [auto-generated documentation](https://api.stormgateworld.com/rapidoc#get-/v0/leaderboards/ranked_1v1) and the specification in [openapi.json](https://api.stormgateworld.com/api-docs/openapi.json).

> Note that while the `/players/*/preferences` endpoint is documented in the OpenAPI specification it is a private endpoint that requires authentication.

## Endpoints

### Leaderboard
```
GET https://api.stormgateworld.com/v0/leaderboards/ranked_1v1
```
[View Live](https://api.stormgateworld.com/v0/leaderboards/ranked_1v1) | [Docs](https://api.stormgateworld.com/rapidoc#get-/v0/leaderboards/ranked_1v1)

#### Example Response
```json
{
    "page": 1,
    "count": 100,
    "total": 714,
    "entries": [
        {
            "player_id": "9kUUT1",
            "anynymous": false,
            "nickname": "dree2044",
            "nickname_discriminator": "3722",
            "steam_id": "76561198795568830",
            "rank": 1,
            "race": "infernals",
            "league": "master",
            "tier": 3,
            "mmr": 2108.8381,
            "points": 1935.2102,
            "wins": 50,
            "losses": 7,
            "ties": 0,
            "matches": 57,
            "win_rate": 87.71929824561403,
            "last_match": {
                "match_id": "JJtoqZ",
                "state": "finished",
                "leaderboard": "ranked_1v1",
                "server": "Tokyo",
                "players": [
                    {
                        "race": "infernals",
                        "team": 0,
                        "party": 0,
                        "rating": 2104.7173,
                        "rating_updated": 2108.8381,
                        "rating_diff": 4.1208496,
                        "result": "win",
                        "ping": 36,
                        "scores": {
                            "xp": 3800,
                            "units_killed": 29,
                            "resources_mined": 9979,
                            "structures_killed": 3,
                            "creep_resources_collected": 185
                        }
                    },
                    {
                        "race": "vanguard",
                        "team": 1,
                        "party": 1,
                        "rating": 1830.5095,
                        "rating_updated": 1809.7941,
                        "rating_diff": -20.715454,
                        "result": "loss",
                        "ping": 27,
                        "scores": {
                            "xp": 4700,
                            "units_killed": 39,
                            "resources_mined": 7990,
                            "structures_killed": 0,
                            "creep_resources_collected": 0
                        }
                    }
                ],
                "created_at": "2024-01-31T17:03:23",
                "ended_at": "2024-01-31T17:12:37",
                "duration": 554
            }
        }
        {
            "etc": "..."
        }
    ]
}
```

### Player
```
GET https://api.stormgateworld.com/v0/players/{player_id}
```
[View Live](https://api.stormgateworld.com/v0/players/9kUUT1) | [Docs](https://api.stormgateworld.com/rapidoc#get-/v0/players/-player_id-)

#### Example Response
```json
{
    "id": "9kUUT1",
    "anonymous": false,
    "nickname": "dree2044",
    "nickname_discriminator": "3722",
    "steam_id": "76561198795568830",
    "leaderboard_entries": [
        {
            "anynymous": false,
            "rank": 1,
            "race": "infernals",
            "league": "master",
            "tier": 2,
            "mmr": 2112.599,
            "points": 1946.9769,
            "wins": 51,
            "losses": 7,
            "ties": 0,
            "matches": 58,
            "win_rate": 87.93103448275862,
            "last_match": {
                "match_id": "UUibOU",
                "state": "finished",
                "leaderboard": "ranked_1v1",
                "server": "Tokyo",
                "players": [
                    {
                        "race": "vanguard",
                        "team": 0,
                        "party": 0,
                        "rating": 1809.7941,
                        "rating_updated": 1792.3271,
                        "rating_diff": -17.466919,
                        "result": "loss",
                        "ping": 27,
                        "scores": {
                            "xp": 32300,
                            "units_killed": 206,
                            "resources_mined": 20738,
                            "structures_killed": 1,
                            "creep_resources_collected": 0
                        }
                    },
                    {
                        "race": "infernals",
                        "team": 1,
                        "party": 1,
                        "rating": 2108.8381,
                        "rating_updated": 2112.599,
                        "rating_diff": 3.7609863,
                        "result": "win",
                        "ping": 35,
                        "scores": {
                            "xp": 16700,
                            "units_killed": 103,
                            "resources_mined": 30806,
                            "structures_killed": 10,
                            "creep_resources_collected": 560
                        }
                    }
                ],
                "created_at": "2024-01-31T17:20:12",
                "ended_at": "2024-01-31T17:38:54",
                "duration": 1122
            }
        }
    ]
}
```

## FAQ

- **How did you get the data?** 
    
    In collaboration with Frost Giant Studios we have created a system that fetches data from the game servers and stores it in normalized form. The API is a read-only interface to that data meant for community usage.
- **Where is the official API?**
    
    There is no official API yet. We're a fan made project trying to help the community by offering an API while the developers at Frost Giant Studios are busy building the game.
- **How often is the data updated?**
    
    The data is updated every 5 minutes.
    

## Contact

Discord Link