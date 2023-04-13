const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route
 */

// get all jobs
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    const query = `SELECT 
        "user"."username", 
        "property"."street",
        "property"."city",
        "property"."state",
        "property"."zipcode",
        "job"."id", 
        "job"."price",
        "job"."date_completed_by" 
        FROM "job"
        JOIN "user" 
        ON "job"."owner_id" = "user"."id"
        JOIN "property" 
        ON "property"."id" = "job"."property_id"
        WHERE "job"."status" = 'incomplete';`;

    pool
      .query(query)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log(`Error getting jobs: `, error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

// GET job by ID
router.get("/", (req, res) => {
  // GET route code here
});

// GET job details by ID
router.get("/detail/:id", (req, res) => {
  // GET route code here
  if (req.isAuthenticated()) {
    const query = `SELECT 
        "user"."username", 
        "property"."street",
        "property"."city",
        "property"."state",
        "property"."zipcode",
        "job"."id", 
        "job"."price",
        "job"."date_completed_by",
        "job"."time" ,
        "job"."owner_id",
        "job"."property_id"
        FROM "job"
        JOIN "user" 
        ON "job"."owner_id" = "user"."id"
        JOIN "property" 
        ON "property"."id" = "job"."property_id"
        WHERE "job"."id" = $1;`;
    pool.query(query, [req.params.id])
    .then((result)=>{
        res.send(result.rows);
    })
    .catch((error) => {
        console.log(`Error getting job detail: `, error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
