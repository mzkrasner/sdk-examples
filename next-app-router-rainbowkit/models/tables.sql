-- LIST accountRelation
table custom_event {
  stream_id text -- The stream id of the post - auto-generated (do not define when creating table)
  controller text -- The DID controller of the post - auto-generated (do not define when creating table)
  address text -- The tag of the post
  page text -- The body of the post
  event_name text -- The event name of the post
  customer_user_id text -- The customer user id of the post
  timestamp DateTime -- The date and time the post was created
}

-- LIST accountRelation
table pageview {
  stream_id text -- The stream id of the post - auto-generated (do not define when creating table)
  controller text -- The DID controller of the post - auto-generated (do not define when creating table)
  address text -- The tag of the post
  page text -- The body of the post
  customer_user_id text -- The customer user id of the post
  timestamp DateTime -- The date and time the post was created
}
