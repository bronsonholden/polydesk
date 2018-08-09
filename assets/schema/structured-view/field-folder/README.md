Structured View: Field Folder
=============================

One configuration of structured view allows you to organize documents in the
view by a particular metadata field value, e.g. Company name, without having
to create a subview for each possible value.

Any further subviews need to pass a parameter indicating which value is
being browsed. This means that any filters that would conflict with the
subview will return no results, i.e. if a field folder is accessed with
`Company = ACME, Inc`, any subviews that filter by `Company` being any other
value will simply not have any results.
