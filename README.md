# SetLog

<!-- Screenshot goes here once the app is built. Requirement: screenshot or logo. -->
<!-- ![SetLog](./public/images/screenshot.png) -->

A workout logging app for people who lift. Log a training session, record the exercises you did with the sets, reps and weight for each, and look back at what you lifted last time so you know what to beat.

I built this because I train on a Push/Pull/Legs split and kept losing track of my working weights across sessions — the difference between guessing and progressing is knowing what you did last week.

## Getting Started

- **Deployed app:** _link goes here_
- **Planning materials:** user stories, ERD and route tables are below.

## Planning

### User stories

**Auth**

- AAU, I want to sign up for an account so that my workouts are saved to me.
- AAU, I want to sign in and sign out so that my data stays private.
- AAU, I want to be sent to my workouts page when I sign in so I can start logging straight away.

**Workouts**

- AAU, I want to see a list of all my workouts so I can review my training history.
- AAU, I want to create a new workout with a title and date so I can start logging a session.
- AAU, I want to open a single workout to see every set I recorded in it.
- AAU, I want to edit a workout's title or date in case I made a mistake.
- AAU, I want to delete a workout I logged by accident.
- AAU, I want to only see edit and delete controls on workouts I own, so I can't change someone else's data.

**Exercises**

- AAU, I want to see a list of all available exercises so I can pick from them when logging.
- AAU, I want to add a new exercise to the list when the one I did isn't there yet.

**Sets**

- AAU, I want to add a set to a workout by choosing an exercise and entering reps and weight.
- AAU, I want to remove a set from a workout if I logged it wrong.

### ERD

```
┌─────────────────┐
│      User       │
├─────────────────┤
│ _id             │
│ username        │
│ password        │
└────────┬────────┘
         │ 1
         │
         │ n          (referenced — Workout.owner holds a User _id)
┌────────┴────────┐
│    Workout      │
├─────────────────┤
│ _id             │
│ title           │
│ date            │
│ owner    ───────┼──> User._id
│ sets[]   ───────┼──> embedded setSchema
└────────┬────────┘
         │ 1
         │
         │ n          (embedded — sets live inside the workout document)
┌────────┴────────┐
│      Set        │  (subdocument, no collection of its own)
├─────────────────┤
│ _id             │
│ exercise ───────┼──> Exercise._id   (referenced)
│ reps            │
│ weight          │
└─────────────────┘

┌─────────────────┐
│    Exercise     │  (shared library, not owned by any user)
├─────────────────┤
│ _id             │
│ name            │
│ muscleGroup     │
└─────────────────┘
```

**Relationships**

| Relationship        | Cardinality  | Approach   | Why                                                                 |
| ------------------- | ------------ | ---------- | ------------------------------------------------------------------- |
| User → Workout      | one-to-many  | referenced | Workouts grow without limit; a user document shouldn't grow with them |
| Workout → Set       | one-to-many  | embedded   | A set has no meaning outside its workout and is never queried alone   |
| Set → Exercise      | many-to-one  | referenced | "Bench Press" is one shared record; renaming it updates every set     |

### Routes

**Pages**

| Method | Path | CRUD | Route Name | Payload | Purpose                | Action                  |
| ------ | ---- | ---- | ---------- | ------- | ---------------------- | ----------------------- |
| GET    | `/`  | None | home       | No      | Landing page for guests | `res.render('index')` |

**Auth** — mounted at `/auth`

| Method | Path         | CRUD        | Route Name | Payload | Purpose                | Action                        |
| ------ | ------------ | ----------- | ---------- | ------- | ---------------------- | ----------------------------- |
| GET    | `/sign-up`   | None        | signup     | No      | Render sign up form    | `res.render('auth/sign-up')`  |
| POST   | `/sign-up`   | Create user | register   | Yes     | Create the account     | `res.redirect('/workouts')`   |
| GET    | `/sign-in`   | None        | signin     | No      | Render sign in form    | `res.render('auth/sign-in')`  |
| POST   | `/sign-in`   | None        | login      | Yes     | Start the session      | `res.redirect('/workouts')`   |
| GET    | `/sign-out`  | None        | signout    | No      | Destroy the session    | `res.redirect('/')`           |

**Workouts** — mounted at `/workouts`, private

| Method | Path                | CRUD               | Route Name | Payload | Purpose                          | Action                                |
| ------ | ------------------- | ------------------ | ---------- | ------- | -------------------------------- | ------------------------------------- |
| GET    | `/`                 | Read all workouts  | index      | No      | List the signed in user's workouts | `res.render('workouts/index')`      |
| GET    | `/new`              | None               | new        | No      | Form to create a workout          | `res.render('workouts/new')`         |
| POST   | `/`                 | Create a workout   | create     | Yes     | Save the new workout              | `res.redirect('/workouts/:id')`      |
| GET    | `/:workoutId`       | Read one workout   | show       | No      | Show the workout and its sets     | `res.render('workouts/show')`        |
| GET    | `/:workoutId/edit`  | None               | edit       | No      | Pre-filled form to edit           | `res.render('workouts/edit')`        |
| PUT    | `/:workoutId`       | Update a workout   | update     | Yes     | Save the changes                  | `res.redirect('/workouts/:id')`      |
| DELETE | `/:workoutId`       | Delete a workout   | delete     | No      | Remove the workout                | `res.redirect('/workouts')`          |

**Sets** — mounted at `/workouts/:workoutId/sets`, private, `mergeParams: true`

| Method | Path      | CRUD             | Route Name | Payload | Purpose                     | Action                           |
| ------ | --------- | ---------------- | ---------- | ------- | --------------------------- | -------------------------------- |
| POST   | `/`       | Create a set     | createSet  | Yes     | Add a set to the workout    | `res.redirect('/workouts/:id')` |
| DELETE | `/:setId` | Delete a set     | deleteSet  | No      | Remove a set from a workout | `res.redirect('/workouts/:id')` |

**Exercises** — mounted at `/exercises`, private

| Method | Path | CRUD                | Route Name | Payload | Purpose                     | Action                          |
| ------ | ---- | ------------------- | ---------- | ------- | --------------------------- | ------------------------------- |
| GET    | `/`  | Read all exercises  | index      | No      | List the exercise library   | `res.render('exercises/index')` |
| POST   | `/`  | Create an exercise  | create     | Yes     | Add a new exercise          | `res.redirect('/exercises')`    |

### Wireframes

<!-- Link the Figma / Excalidraw / photos of paper sketches here. -->

_To do: landing, sign in, sign up, workouts index, workout show, workout new, workout edit, exercises index._

## Technologies Used

- JavaScript (Node.js)
- Express
- MongoDB with Mongoose
- EJS
- express-session with connect-mongo
- bcrypt
- CSS (Flexbox and Grid)

## Attributions

_Fill in if any external assets or libraries needing attribution are used. Remove this section if not._

## Next Steps

- Copy a previous workout as a starting point for today's session
- Personal record tracking per exercise, so the show page flags a new best
- Filter the workouts index by exercise, to see every time I benched
- Charts of volume and top set over time
- Rest timer on the workout show page
