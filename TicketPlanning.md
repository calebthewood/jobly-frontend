# Ticket Planning
A document to record the planning process for each ticket.

# Applying to Job:
## Research
- must be admin or same user
- post to "/:username/jobs/:id"
- include token
- no other body

## Summary
need apply button/form to send post request with username and job id in the url.
state?

## The Plan:
create applyToJob fn in API
- take job id
- send post request to /:username/jobs/:id

create handleJobApplication fn in App
- call applyToJob with token, username, jobId

create JobApplyBtn component
- prop drill or whatever to move the fn down
- don't use context
<br />
<hr>