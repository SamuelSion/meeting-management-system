# Database — MongoDB

The project uses MongoDB with two collections:

- `devGroups` — the development groups at the company (QA Team, R&D Team, DevOps Team).
- `meetings` — the meetings of the development groups, with `devGroupId` as a foreign key
  to `devGroups`.

## Files in this folder

- `dev-groups.json` — Export of the `devGroups` collection.
- `meetings.json` — Export of the `meetings` collection.

## Import

```
mongoimport --uri="mongodb://localhost:27017/meeting-management" --collection=devGroups --file=./dev-groups.json --jsonArray
mongoimport --uri="mongodb://localhost:27017/meeting-management" --collection=meetings   --file=./meetings.json   --jsonArray
```
